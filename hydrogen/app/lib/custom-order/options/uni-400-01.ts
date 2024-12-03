import { CustomOrder } from "~/lib/custom-order/custom-order"
import { customOrderFile_uni40001 } from "~/lib/custom-order/files/uni-400-01"
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
 * UNI-400-01
 * https://www.notion.so/fujiuni/UNI-400-01-819c89e4bde5408ea3bc36ba52b85f73?pvs=4
 */
export class CustomOrderOption_uni40001 extends CustomOrder {
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
    return [customOrderLeatherType.baron, customOrderLeatherType.kipskin]
  }

  get outsoleTypes(): CustomOrderOutsoleType[] {
    return [
      customOrderOutsoleType.vibram01,
      customOrderOutsoleType.halfRubber01,
      customOrderOutsoleType.halfRubber02,
      customOrderOutsoleType.leather01,
      customOrderOutsoleType.leather02,
      customOrderOutsoleType.leather03,
    ]
  }

  get liningTypes(): CustomOrderLiningType[] {
    return [customOrderLiningType.calfLeather]
  }

  get laceTypes(): CustomOrderLaceType[] {
    return [customOrderLaceType.brown, customOrderLaceType.black]
  }

  get insoleTypes(): CustomOrderInsoleType[] {
    return [customOrderInsoleType.leather, customOrderInsoleType.leatherCustom]
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

  get upperMaterial() {
    const file = customOrderFile_uni40001

    return {
      baseColor: file.upper.baseColor.black,
      normal: file.upper.normal.baron,
      roughness: file.upper.roughness,
      metallic: null,
    }
  }

  get soleMaterial() {
    const file = customOrderFile_uni40001

    return {
      baseColor: file.sole.baseColor.black,
      normal: file.sole.normal.halfRubber,
      roughness: file.sole.roughness.halfRubber,
    }
  }

  get insoleMaterial() {
    const file = customOrderFile_uni40001

    return {
      baseColor: file.insole.baseColor,
      roughness: file.insole.roughness,
      // TODO: ↓ 確認
      normal: file.insole.roughness,
    }
  }

  get accessoryMaterial() {
    const file = customOrderFile_uni40001

    return {
      baseColor: file.accessory.baseColor.metalHeel,
      metallic: file.accessory.metallic.metalHeel,
      normal: file.accessory.normal.metalHeel,
      roughness: file.accessory.roughness.metalHeel,
    }
  }
}
