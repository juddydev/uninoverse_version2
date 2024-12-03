import { honoFactory } from "~/interface/factory"

/**
 * https://webhooks.uninoverse.dev/shopify/customer/created
 */
export const shopifyCustomerCreatedRoutes = honoFactory
  .createApp()
  .post("/", async (c) => {
    const json = await c.req.json<{ id: string }>()

    const customerId = json.id

    console.log("shopify customerId", customerId)

    // ユーザ情報を書き込む（電話番号とメールアドレスはユニーク）

    return c.json({})
  })
