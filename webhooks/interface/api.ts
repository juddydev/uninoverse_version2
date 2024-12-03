import { Hono } from "hono"
import { shopifyCustomerCreatedRoutes } from "~/interface/routes/shopify-customer-created"
import { smaregiRoutes } from "~/interface/routes/smaregi"
import { Env } from "~/worker-configuration"

export const api = new Hono<{ Bindings: Env }>()
  .route("/smaregi", smaregiRoutes)
  .route("/shopify/customer/created", shopifyCustomerCreatedRoutes)
