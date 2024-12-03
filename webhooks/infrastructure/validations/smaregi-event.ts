import { array, literal, object, string } from "valibot"

export const vSmaregiEvent = object({
  event: literal("pos:stock"),
  ids: array(object({ productId: string() })),
})
