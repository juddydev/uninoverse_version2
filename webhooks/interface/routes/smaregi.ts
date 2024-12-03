import { honoFactory } from "~/interface/factory"
import { parse } from "valibot"
import { vSmaregiEvent } from "~/infrastructure/validations/smaregi-event"
import { SyncShopifyStock } from "~/application/sync-shopify-stock"

export const smaregiRoutes = honoFactory
  .createApp()
  /**
   * POST
   */
  .post("/", async (c) => {
    const json = await c.req.json<{ event: "pos:stock" }>()

    if (json.event === "pos:stock") {
      const smaregiEvent = parse(vSmaregiEvent, json)
      const [id] = smaregiEvent.ids
      const syncShopifyStock = new SyncShopifyStock(c.env)
      await syncShopifyStock.execute({ smaregiProductId: id.productId })
    }

    return c.json({})
  })
