import { customOrderAccessoryTypes } from "~/lib/custom-order/values/custom-order-accessory-types"

/**
 * ヒールプレート
 */
export type CustomOrderAccessoryType =
  (typeof customOrderAccessoryTypes)[number]
