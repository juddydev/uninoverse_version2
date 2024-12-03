import { CustomOrder } from "~/lib/custom-order/custom-order"
import { CustomOrderConstruction } from "~/lib/custom-order/types/custom-order-construction"
import { CustomOrderInsoleType } from "~/lib/custom-order/types/custom-order-insole-type"
import { CustomOrderItem } from "~/lib/custom-order/types/custom-order-item"
import { CustomOrderLaceType } from "~/lib/custom-order/types/custom-order-lace-type"
import { CustomOrderLeatherType } from "~/lib/custom-order/types/custom-order-leather-type"
import { CustomOrderLiningType } from "~/lib/custom-order/types/custom-order-lining-type"
import { CustomOrderOutsoleType } from "~/lib/custom-order/types/custom-order-outsole-type"
import { customOrderConstruction } from "~/lib/custom-order/values/custom-order-construction"
import { customOrderInsoleType } from "~/lib/custom-order/values/custom-order-insole-type"
import { customOrderItem } from "~/lib/custom-order/values/custom-order-item"
import { customOrderLaceType } from "~/lib/custom-order/values/custom-order-lace-type"
import { customOrderLeatherType } from "~/lib/custom-order/values/custom-order-leather-type"
import { customOrderLiningType } from "~/lib/custom-order/values/custom-order-lining-type"
import { customOrderOutsoleType } from "~/lib/custom-order/values/custom-order-outsole-type"

export class CustomOrderOption_uni80002 extends CustomOrder {
  get variants(): CustomOrderItem[] {
    return [
      customOrderItem.construction,
      customOrderItem.leatherType,
      customOrderItem.leatherColor,
      customOrderItem.outsoleType,
      customOrderItem.accessoryBuckleType,
      customOrderItem.liningType,
      customOrderItem.size,
    ]
  }

  get constructions(): CustomOrderConstruction[] {
    return [customOrderConstruction.cement]
  }

  get leatherTypes(): CustomOrderLeatherType[] {
    return [customOrderLeatherType.waterproofCalf]
  }

  get outsoleTypes(): CustomOrderOutsoleType[] {
    return [
      customOrderOutsoleType.vibramGolfWhite,
      customOrderOutsoleType.vibramGolfGray,
    ]
  }

  get liningTypes(): CustomOrderLiningType[] {
    return [customOrderLiningType.sports]
  }

  get laceTypes(): CustomOrderLaceType[] {
    return [customOrderLaceType.brown, customOrderLaceType.black]
  }

  get insoleTypes(): CustomOrderInsoleType[] {
    return [customOrderInsoleType.golf, customOrderInsoleType.golfCustom]
  }

  get sizes() {
    return [35, 36, 37, 38, 39, 40, 41, 42, 43, 44]
  }

  get attributes() {
    return [
      { key: "construction", value: this.state.construction },
      { key: "size", value: this.state.size.toFixed() },
    ]
  }

  upperMaterial = null

  soleMaterial = null

  insoleMaterial = null

  accessoryMaterial = null
}
