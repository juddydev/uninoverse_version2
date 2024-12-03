import { CustomOrder } from "~/lib/custom-order/custom-order"
import { customOrderFile_uni40002 } from "~/lib/custom-order/files/uni-400-02"
import { CustomOrderConstruction } from "~/lib/custom-order/types/custom-order-construction"
import { CustomOrderItem } from "~/lib/custom-order/types/custom-order-item"
import { CustomOrderLeatherType } from "~/lib/custom-order/types/custom-order-leather-type"
import { customOrderConstruction } from "~/lib/custom-order/values/custom-order-construction"
import { customOrderInsoleType } from "~/lib/custom-order/values/custom-order-insole-type"
import { customOrderItem } from "~/lib/custom-order/values/custom-order-item"
import { customOrderLaceType } from "~/lib/custom-order/values/custom-order-lace-type"
import { customOrderLeatherType } from "~/lib/custom-order/values/custom-order-leather-type"
import { customOrderLiningType } from "~/lib/custom-order/values/custom-order-lining-type"
import { customOrderOutsoleType } from "~/lib/custom-order/values/custom-order-outsole-type"

/**
 * UNI-400-02
 * https://www.notion.so/fujiuni/UNI-400-02-7d3b02c1efa940288d0005a54a5fd39a?pvs=4
 */
export class CustomOrderOption_uni40002 extends CustomOrder {
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
    return [customOrderConstruction.norwegian]
  }

  get leatherTypes(): CustomOrderLeatherType[] {
    return [
      customOrderLeatherType.baron,
      customOrderLeatherType.boxCalf,
      customOrderLeatherType.suede,
    ]
  }

  get outsoleTypes() {
    return [
      customOrderOutsoleType.vibram01,
      customOrderOutsoleType.halfRubber01,
      customOrderOutsoleType.leather01,
      customOrderOutsoleType.leather02,
    ]
  }

  get liningTypes() {
    return [customOrderLiningType.calfLeather, customOrderLiningType.deerSkin]
  }

  get laceTypes() {
    return [customOrderLaceType.brown, customOrderLaceType.black]
  }

  get insoleTypes() {
    return [customOrderInsoleType.leather, customOrderInsoleType.leatherCustom]
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

  get upperMaterial() {
    const file = customOrderFile_uni40002
    return {
      baseColor: file.upper.baseColor.black,
      normal: file.upper.normal.baron,
      roughness: file.upper.roughness.baron,
      metallic: null,
    }
  }

  get soleMaterial() {
    const file = customOrderFile_uni40002
    return {
      baseColor: file.sole.baseColor.halfRubber,
      normal: file.sole.normal.halfRubber,
      roughness: file.sole.roughness.halfRubber,
    }
  }

  insoleMaterial = null

  accessoryMaterial = null
}
