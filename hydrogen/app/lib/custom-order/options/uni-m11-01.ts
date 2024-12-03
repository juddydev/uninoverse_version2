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

/**
 * UNI-M11-01
 * https://www.notion.so/fujiuni/UNI-M11-01-464f7be37388461f8740a151a748ee04?pvs=4
 */
export class CustomOrderOption_unim1101 extends CustomOrder {
  get variants(): CustomOrderItem[] {
    return [
      customOrderItem.construction,
      customOrderItem.leatherType,
      customOrderItem.leatherColor,
      customOrderItem.outsoleType,
      customOrderItem.accessoryHeelType,
      customOrderItem.liningType,
      customOrderItem.size,
    ]
  }

  get constructions(): CustomOrderConstruction[] {
    return [customOrderConstruction.cement]
  }

  get leatherTypes(): CustomOrderLeatherType[] {
    return [
      customOrderLeatherType.ostrichSkin,
      customOrderLeatherType.deerSkin,
      customOrderLeatherType.crocodileBack,
      customOrderLeatherType.crocodileBelly,
    ]
  }

  get outsoleTypes(): CustomOrderOutsoleType[] {
    return [
      customOrderOutsoleType.halfRubber01,
      customOrderOutsoleType.leather01,
    ]
  }

  get liningTypes(): CustomOrderLiningType[] {
    return [customOrderLiningType.calfLeather, customOrderLiningType.deerSkin]
  }

  get laceTypes(): CustomOrderLaceType[] {
    return [customOrderLaceType.brown, customOrderLaceType.black]
  }

  get insoleTypes(): CustomOrderInsoleType[] {
    return [customOrderInsoleType.leather, customOrderInsoleType.leatherCustom]
  }

  get sizes() {
    return [38, 39, 40, 41, 42, 43, 44, 45, 46]
  }

  get attributes() {
    return [
      { key: "construction", value: this.state.construction },
      { key: "size", value: this.state.size.toFixed() },
    ]
  }
}
