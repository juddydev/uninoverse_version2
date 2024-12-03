import { object, string } from "valibot"

export const vSmaregiStock = object({
  storeId: string(),
  productId: string(),
  stockAmount: string(),
  layawayStockAmount: string(),
  updDateTime: string(),
})
