import { initAuthConfig, authHandler } from "@hono/auth-js"
import { HTTPException } from "hono/http-exception"
import { apiFactory } from "~/interface/api-factory"
import { authConfig } from "~/interface/auth-config"
import { shopifyProductsRoutes } from "~/interface/routes/shopify/products"
import { usersRoute } from "~/interface/routes/users"

export const api = apiFactory
  .createApp()
  .basePath("api")
  .use("*", initAuthConfig(authConfig))
  .use("/auth/*", authHandler())
  .route("/users", usersRoute)
  /**
   * /console
   */
  .route("/shopify/products", shopifyProductsRoutes)
  .onError((error, c) => {
    if (error instanceof HTTPException) {
      return c.json({ error: error.message }, error.status)
    }
    return c.json({ error: "Internal Server Error" }, 500)
  })
