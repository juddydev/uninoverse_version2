/// <reference types="vite/client" />
/// <reference types="@shopify/remix-oxygen" />
/// <reference types="@shopify/oxygen-workers-types" />

import type { HydrogenCart, HydrogenSessionData } from "@shopify/hydrogen"
import type { AppSession } from "~/lib/session.server"
import type { I18nLocale } from "~/lib/locale"
import type { EnhancedStorefront } from "~/lib/enhance-storefront-client"
import type { EnhancedCustomerAccount } from "~/lib/enhance-customer-account-client"

declare global {
  const process: { env: { NODE_ENV: "production" | "development" } }
  interface Env {
    PRIVATE_STOREFRONT_API_TOKEN: string
    PUBLIC_CHECKOUT_DOMAIN: string
    PUBLIC_CUSTOMER_ACCOUNT_API_CLIENT_ID: string
    PUBLIC_CUSTOMER_ACCOUNT_API_URL: string
    PUBLIC_STOREFRONT_API_TOKEN: string
    PUBLIC_STOREFRONT_ID: string
    PUBLIC_STORE_DOMAIN: string
    SESSION_SECRET: string
    SHOP_ID: string
  }
}

declare module "@shopify/remix-oxygen" {
  /**
   * Declare local additions to the Remix loader context.
   */
  export interface AppLoadContext {
    waitUntil: ExecutionContext["waitUntil"]
    session: AppSession
    /**
     * ストアフロントAPI
     */
    storefront: EnhancedStorefront<I18nLocale> // Storefront<I18nLocale>
    /**
     * バックエンドで使用する顧客API
     */
    customerAccount: EnhancedCustomerAccount // CustomerAccount
    cart: HydrogenCart
    env: Env
  }

  /**
   * Declare local additions to the Remix session data.
   */
  interface SessionData extends HydrogenSessionData {}
}
