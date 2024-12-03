import { CustomOrder } from "~/lib/custom-order/custom-order"
import { customOrderFile_uni203h01 } from "~/lib/custom-order/files/uni-203h-01"
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
 * UNI-203H-01
 * https://www.notion.so/fujiuni/UNI-203H-01-cee2fd441b634d26b4e11e484908f27a?pvs=4
 */
export class CustomOrderOption_uni203h01 extends CustomOrder {
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
    return [
      customOrderConstruction.norwegian,
      customOrderConstruction.goodyearWelt,
    ]
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
      customOrderOutsoleType.halfRubber01,
      customOrderOutsoleType.halfRubber02,
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
  /**
   * Sizes
   */
  get sizes() {
    return [37, 48, 39, 40, 41, 42, 43, 44, 45, 46]
  }
  get attributes() {
    return [
      { key: "construction", value: this.state.construction },
      { key: "size", value: this.state.size.toFixed() },
    ]
  }

  get upperMaterial() {
    const file = customOrderFile_uni203h01

    return {
      baseColor: file.upper.baseColor.black,
      normal: file.upper.normal.deerLeather,
      roughness: file.upper.roughness.deerLeather,
      metallic: null,
    }
  }

  get soleMaterial() {
    const file = customOrderFile_uni203h01

    return {
      baseColor: file.sole.baseColor.leather,
      normal: file.sole.normal.leather,
      roughness: file.sole.roughness.leather,
    }
  }

  insoleMaterial = null

  accessoryMaterial = null
}
