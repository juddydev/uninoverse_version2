import { CustomOrderConstruction } from "~/lib/custom-order/types/custom-order-construction"
import { CustomOrderLeatherType } from "~/lib/custom-order/types/custom-order-leather-type"
import { CustomOrderLeatherColor } from "~/lib/custom-order/types/custom-order-leather-color"
import { CustomOrderOutsoleType } from "~/lib/custom-order/types/custom-order-outsole-type"
import { CustomOrderAccessoryType } from "~/lib/custom-order/types/custom-order-accessory-type"
import { CustomOrderLiningType } from "~/lib/custom-order/types/custom-order-lining-type"
import { CustomOrderInsoleType } from "~/lib/custom-order/types/custom-order-insole-type"
import { CustomOrderLaceType } from "~/lib/custom-order/types/custom-order-lace-type"

export type CustomOrderAction =
  | {
      type: "UPDATE_CONSTRUCTION"
      payload: CustomOrderConstruction
    }
  | {
      type: "UPDATE_LEATHER_COLOR"
      payload: CustomOrderLeatherColor
    }
  | {
      type: "UPDATE_LEATHER"
      payload: CustomOrderLeatherType
    }
  | {
      type: "UPDATE_OUTSOLE_TYPE"
      payload: CustomOrderOutsoleType
    }
  | {
      type: "UPDATE_LINING"
      payload: CustomOrderLiningType
    }
  | {
      type: "UPDATE_INSOLE"
      payload: CustomOrderInsoleType
    }
  | {
      type: "UPDATE_LACE"
      payload: CustomOrderLaceType
    }
  | {
      type: "UPDATE_SIZE"
      payload: number
    }
  | {
      type: "UPDATE_ACCESSORY_HEEL_PLATE"
      payload: CustomOrderAccessoryType
    }
