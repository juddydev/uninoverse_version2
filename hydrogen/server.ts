// @ts-ignore
// Virtual entry point for the app
import * as remixBuild from "virtual:remix/server-build"
import {
  createRequestHandler,
  getStorefrontHeaders,
} from "@shopify/remix-oxygen"
import {
  cartGetIdDefault,
  cartSetIdDefault,
  createCartHandler,
  createStorefrontClient,
  storefrontRedirect,
  createCustomerAccountClient,
} from "@shopify/hydrogen"
import { AppSession } from "~/lib/session.server"
import { getLocaleFromRequest } from "~/utils/get-locale-from-request"
import { enhanceStorefrontClient } from "~/lib/enhance-storefront-client"
import { enhanceCustomerAccountClient } from "~/lib/enhance-customer-account-client"

/**
 * Export a fetch handler in module format.
 */
export default {
  async fetch(
    request: Request,
    env: Env,
    executionContext: ExecutionContext,
  ): Promise<Response> {
    try {
      /**
       * Open a cache instance in the worker and a custom session instance.
       */
      if (!env?.SESSION_SECRET) {
        throw new Error("SESSION_SECRET environment variable is not set")
      }

      const waitUntil = executionContext.waitUntil.bind(executionContext)

      const [cache, session] = await Promise.all([
        caches.open("hydrogen"),
        AppSession.init(request, [env.SESSION_SECRET]),
      ])

      /**
       * Create Hydrogen's Storefront client.
       */
      const { storefront } = createStorefrontClient({
        cache,
        waitUntil,
        i18n: getLocaleFromRequest(request),
        publicStorefrontToken: env.PUBLIC_STOREFRONT_API_TOKEN,
        privateStorefrontToken: env.PRIVATE_STOREFRONT_API_TOKEN,
        storeDomain: env.PUBLIC_STORE_DOMAIN,
        storefrontId: env.PUBLIC_STOREFRONT_ID,
        storefrontHeaders: getStorefrontHeaders(request),
      })

      /**
       * Create a client for Customer Account API.
       */
      const customerAccount = createCustomerAccountClient({
        waitUntil,
        request,
        session,
        customerAccountId: env.PUBLIC_CUSTOMER_ACCOUNT_API_CLIENT_ID,
        // customerAccountUrl: env.PUBLIC_CUSTOMER_ACCOUNT_API_URL,
        shopId: env.SHOP_ID,
      })

      const cart = createCartHandler({
        storefront: storefront,
        customerAccount: customerAccount,
        getCartId: cartGetIdDefault(request.headers),
        setCartId: cartSetIdDefault(),
      })

      /**
       * Create a Remix request handler and pass
       * Hydrogen's Storefront client to the loader context.
       */
      const handleRequest = createRequestHandler({
        build: remixBuild,
        mode: process.env.NODE_ENV,
        getLoadContext() {
          return {
            session,
            waitUntil,
            storefront: enhanceStorefrontClient(storefront),
            customerAccount: enhanceCustomerAccountClient(customerAccount),
            cart,
            env,
          }
        },
      })

      const response = await handleRequest(request)

      if (response.status === 404) {
        /**
         * Check for redirects only when there's a 404 from the app.
         * If the redirect doesn't exist, then `storefrontRedirect`
         * will pass through the 404 response.
         */
        return storefrontRedirect({ request, response, storefront })
      }

      /**
       * https://github.com/Shopify/hydrogen/issues/2399#issuecomment-2270632466
       */
      if (session.isPending) {
        response.headers.set("Set-Cookie", await session.commit())
      }

      return response
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error)
      return new Response("An unexpected error occurred", { status: 500 })
    }
  },
}
