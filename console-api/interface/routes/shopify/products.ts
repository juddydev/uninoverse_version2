import "@shopify/shopify-api/adapters/cf-worker"

import { ApiVersion, shopifyApi } from "@shopify/shopify-api"
import { restResources } from "@shopify/shopify-api/rest/admin/2024-07"
import { apiFactory } from "~/interface/api-factory"

export const shopifyProductsRoutes = apiFactory
  .createApp()
  .post("/", async (c) => {
    /**
     * TODO: GraphQLに移行する
     */
    const shopify = shopifyApi({
      apiSecretKey: c.env.SHOPIFY_API_SECRET_KEY,
      apiVersion: ApiVersion.July24,
      isCustomStoreApp: true,
      adminApiAccessToken: c.env.SHOPIFY_ADMIN_API_ACCESS_TOKEN,
      isEmbeddedApp: false,
      hostName: "localhost",
      restResources,
      future: {
        customerAddressDefaultFix: true,
        lineItemBilling: true,
        unstable_managedPricingSupport: true,
      },
    })

    const session = shopify.session.customAppSession("fea8a5-ec.myshopify.com")

    const resp = await shopify.rest.Product.all({
      session: session,
    })

    const products = resp.data.map((product) => {
      if (!Array.isArray(product.options)) {
        throw new Error("product.options is undefined")
      }
      if (!Array.isArray(product.variants)) {
        throw new Error("product.options is undefined")
      }
      return {
        id: product.id,
        options: product.options.map((option) => {
          return {
            id: option.id as string,
            name: option.name as string,
            values: option.values as string[],
          }
        }),
        // biome-ignore lint/suspicious/noExplicitAny:
        variants: product.variants.map((variant: any) => {
          return {
            id: variant.id as string,
            title: variant.title as string,
            option1: variant.option1 as string,
            option2: variant.option2 as string,
            inventory_quantity: variant.inventory_quantity as number,
          }
        }),
      }
    })

    return c.json(products)
  })
