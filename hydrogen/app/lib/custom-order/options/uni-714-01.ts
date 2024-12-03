import { CustomOrder } from "~/lib/custom-order/custom-order"
import { CustomOrderConstruction } from "~/lib/custom-order/types/custom-order-construction"
import { CustomOrderItem } from "~/lib/custom-order/types/custom-order-item"
import { CustomOrderLeatherType } from "~/lib/custom-order/types/custom-order-leather-type"
import { CustomOrderOutsoleType } from "~/lib/custom-order/types/custom-order-outsole-type"
import { customOrderConstruction } from "~/lib/custom-order/values/custom-order-construction"
import { customOrderInsoleType } from "~/lib/custom-order/values/custom-order-insole-type"
import { customOrderItem } from "~/lib/custom-order/values/custom-order-item"
import { customOrderLaceType } from "~/lib/custom-order/values/custom-order-lace-type"
import { customOrderLeatherType } from "~/lib/custom-order/values/custom-order-leather-type"
import { customOrderLiningType } from "~/lib/custom-order/values/custom-order-lining-type"
import { customOrderOutsoleType } from "~/lib/custom-order/values/custom-order-outsole-type"

/**
 * UNI-714-01
 * https://www.notion.so/fujiuni/UNI-714-01-30f946a4e94749ab85e8fc4c72bc4dda?pvs=4
 */
export class CustomOrderOption_uni71401 extends CustomOrder {
  get variants(): CustomOrderItem[] {
    return [
      customOrderItem.construction,
      customOrderItem.leatherType,
      customOrderItem.leatherColor,
      customOrderItem.outsoleType,
      customOrderItem.liningType,
      customOrderItem.size,
    ]
  }

  get constructions(): CustomOrderConstruction[] {
    return [customOrderConstruction.goodyearWelt]
  }

  get leatherTypes(): CustomOrderLeatherType[] {
    return [customOrderLeatherType.baron, customOrderLeatherType.suede]
  }

  get outsoleTypes(): CustomOrderOutsoleType[] {
    return [
      customOrderOutsoleType.halfRubber01,
      customOrderOutsoleType.leather01,
    ]
  }

  get liningTypes() {
    return [customOrderLiningType.deerSkin]
  }

  get laceTypes() {
    return [customOrderLaceType.brown, customOrderLaceType.black]
  }

  get insoleTypes() {
    return [customOrderInsoleType.leather, customOrderInsoleType.leatherCustom]
  }

  get accessoryTypes() {
    return []
  }

  get sizes() {
    return [37, 38, 39, 40, 41, 42, 43, 44, 45, 46]
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
