import { customOrderItems } from "~/lib/custom-order/values/custom-order-items"

export type CustomOrderItem = (typeof customOrderItems)[number]
