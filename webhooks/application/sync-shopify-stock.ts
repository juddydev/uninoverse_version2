import { ApiVersion, shopifyApi } from "@shopify/shopify-api"
import { restResources } from "@shopify/shopify-api/rest/admin/2024-07"
import { getSmaregiAccessToken } from "~/interface/helpers/get-smaregi-access-token"
import { smaregiHc } from "~/lib/smaregi-client"
import { Env } from "~/worker-configuration"

type Props = {
  smaregiProductId: string
}

/**
 * Shopifyの在庫を更新する
 */
export class SyncShopifyStock {
  constructor(private env: Env) {}

  async execute(props: Props) {
    const shopify = shopifyApi({
      apiSecretKey: this.env.SHOPIFY_API_SECRET_KEY,
      apiVersion: ApiVersion.July24,
      isCustomStoreApp: true,
      adminApiAccessToken: this.env.SHOPIFY_ADMIN_API_ACCESS_TOKEN,
      isEmbeddedApp: false,
      hostName: "localhost",
      restResources,
    })

    const session = shopify.session.customAppSession("fea8a5-ec.myshopify.com")

    const accessToken = await getSmaregiAccessToken(this.env.SMAREGI_API_TOKEN)

    const resp = await smaregiHc[":id"].pos.products[":product"].$get({
      param: { id: "skcr313b9", product: props.smaregiProductId },
      header: { authorization: `Bearer ${accessToken}` },
    })

    const smaregiProduct = await resp.json()

    const smaregiStocksResp = await smaregiHc[":id"].pos.stock.$get({
      header: { authorization: `Bearer ${accessToken}` },
      param: { id: "skcr313b9" },
      query: { product_id: props.smaregiProductId },
    })

    const smaregiStocks = await smaregiStocksResp.json()

    const shopifyProductId = smaregiProduct.groupCode

    if (shopifyProductId === null) {
      throw new Error("Product not found")
    }

    const shopifyProduct = await shopify.rest.Product.find({
      session: session,
      id: shopifyProductId,
    })

    if (shopifyProduct === null) {
      throw new Error("Product not found")
    }

    if (!Array.isArray(shopifyProduct.variants)) {
      throw new Error("Product options is not an array")
    }

    for (const variant of shopifyProduct.variants) {
      // biome-ignore lint/suspicious/noExplicitAny:
      const anyVariant = variant as any

      /**
       * 例: black, white, wine-red
       */
      const smaregiProductColor = smaregiProduct.color
        ?.toLocaleLowerCase()
        .replaceAll(" ", "-")

      /**
       * 例: 42, 43, 44
       */
      const smaregiProductSize = smaregiProduct.size?.toLocaleLowerCase()

      // どちらのオプションもカラーに一致しない
      if (
        anyVariant.option1 !== smaregiProductColor &&
        anyVariant.option2 !== smaregiProductColor
      ) {
        continue
      }

      // どちらのオプションもサイズに一致しない
      if (
        anyVariant.option1 !== smaregiProductSize &&
        anyVariant.option2 !== smaregiProductSize
      ) {
        continue
      }

      const shopifyInventoryLevel = new shopify.rest.InventoryLevel({
        session,
      })

      for (const stock of smaregiStocks) {
        // 表参道
        if (stock.storeId === "1") {
          await shopifyInventoryLevel.set({
            location_id: 71842594999,
            inventory_item_id: anyVariant.inventory_item_id,
            available: stock.stockAmount,
          })
        }
        // 本社
        if (stock.storeId === "2") {
          await shopifyInventoryLevel.set({
            location_id: 69710676151,
            inventory_item_id: anyVariant.inventory_item_id,
            available: stock.stockAmount,
          })
        }
      }
    }
  }
}
