import { customOrderFile_uni70301 } from "~/lib/custom-order/files/uni-703-01"
import { CustomOrderConstruction } from "~/lib/custom-order/types/custom-order-construction"
import { CustomOrderInsoleType } from "~/lib/custom-order/types/custom-order-insole-type"
import { CustomOrderItem } from "~/lib/custom-order/types/custom-order-item"
import { CustomOrderLaceType } from "~/lib/custom-order/types/custom-order-lace-type"
import { CustomOrderLeatherType } from "~/lib/custom-order/types/custom-order-leather-type"
import { CustomOrderLiningType } from "~/lib/custom-order/types/custom-order-lining-type"
import { CustomOrderOutsoleType } from "~/lib/custom-order/types/custom-order-outsole-type"
import { customOrderItem } from "~/lib/custom-order/values/custom-order-item"
import { customOrderConstruction } from "~/lib/custom-order/values/custom-order-construction"
import { customOrderLeatherType } from "~/lib/custom-order/values/custom-order-leather-type"
import { customOrderOutsoleType } from "~/lib/custom-order/values/custom-order-outsole-type"
import { customOrderLiningType } from "~/lib/custom-order/values/custom-order-lining-type"
import { customOrderLaceType } from "~/lib/custom-order/values/custom-order-lace-type"
import { customOrderInsoleType } from "~/lib/custom-order/values/custom-order-insole-type"
import { customOrderLeatherColor } from "~/lib/custom-order/values/custom-order-leather-color"
import { customOrderAccessoryType } from "~/lib/custom-order/values/custom-order-accessory-type"
import { CustomOrder } from "~/lib/custom-order/custom-order"

/**
 * UNI-703-01
 * @param state
 * @returns
 */
export class CustomOrderOption_uni70301 extends CustomOrder {
  /**
   * ※順番を変更しないように注意
   */
  override get variants(): CustomOrderItem[] {
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
      customOrderConstruction.goodyearWelt,
      customOrderConstruction.norwegian,
    ]
  }

  get leatherTypes(): CustomOrderLeatherType[] {
    return [
      customOrderLeatherType.baron,
      customOrderLeatherType.crocodileBack,
      customOrderLeatherType.crocodileBelly,
      customOrderLeatherType.kipskin,
      customOrderLeatherType.embossed01,
      customOrderLeatherType.embossed02,
      customOrderLeatherType.embossed03,
      customOrderLeatherType.embossed04,
      customOrderLeatherType.embossed05,
    ]
  }

  get outsoleTypes(): CustomOrderOutsoleType[] {
    return [
      customOrderOutsoleType.halfRubber01,
      customOrderOutsoleType.halfRubber02,
      customOrderOutsoleType.leather01,
      customOrderOutsoleType.leather02,
      customOrderOutsoleType.leather03,
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
    return [39, 40, 41, 42, 43, 44, 45, 46]
  }

  get attributes() {
    return [
      { key: "construction", value: this.state.construction },
      { key: "leather-type", value: this.state.leatherType },
      { key: "leather-color", value: this.state.leatherColor },
      { key: "outsole-type", value: this.state.outsoleType },
      { key: "lining-type", value: this.state.liningType },
      { key: "insole-type", value: this.state.insoleType },
      { key: "lace-type", value: this.state.laceType },
      {
        key: "outsole-plate",
        value: this.state.accessoryType ?? "",
      },
      { key: "size", value: this.state.size.toFixed() },
    ]
  }

  get upperBaseColor() {
    const file = customOrderFile_uni70301
    const state = this.state

    if (state.leatherColor === customOrderLeatherColor.antiqueGray) {
      return file.upper.baseColor.antiqueGray
    }

    if (state.leatherColor === customOrderLeatherColor.black) {
      return file.upper.baseColor.black
    }

    if (state.leatherColor === customOrderLeatherColor.blue) {
      return file.upper.baseColor.blue
    }

    if (state.leatherColor === customOrderLeatherColor.darkBrown) {
      return file.upper.baseColor.darkBrown
    }

    if (state.leatherColor === customOrderLeatherColor.lightBrown) {
      return file.upper.baseColor.lightBrown
    }

    if (state.leatherColor === customOrderLeatherColor.wineRed) {
      return file.upper.baseColor.wineRed
    }

    throw new Error("Invalid leather type")
  }

  get upperMaterial() {
    const file = customOrderFile_uni70301

    const state = this.state

    if (state.leatherType === customOrderLeatherType.baron) {
      return {
        baseColor: this.upperBaseColor,
        normal: file.upper.normal.baron,
        roughness: file.upper.roughness.baron,
        metallic: null,
      }
    }

    if (state.leatherType === customOrderLeatherType.kipskin) {
      return {
        baseColor: this.upperBaseColor,
        normal: file.upper.normal.kipskin,
        roughness: file.upper.roughness.kipskin,
        metallic: null,
      }
    }

    if (state.leatherType === customOrderLeatherType.crocodileBack) {
      return {
        baseColor: this.upperBaseColor,
        normal: file.upper.normal.crocodileBack,
        roughness: file.upper.roughness.crocodileBack,
        metallic: null,
      }
    }

    if (state.leatherType === customOrderLeatherType.crocodileBelly) {
      return {
        baseColor: this.upperBaseColor,
        normal: file.upper.normal.crocodileBelly,
        roughness: file.upper.roughness.crocodileBelly,
        metallic: null,
      }
    }

    if (state.leatherType === customOrderLeatherType.embossed01) {
      return {
        baseColor: this.upperBaseColor,
        normal: file.upper.normal.emboss01,
        roughness: file.upper.roughness.emboss01,
        metallic: null,
      }
    }

    if (state.leatherType === customOrderLeatherType.embossed02) {
      return {
        baseColor: this.upperBaseColor,
        normal: file.upper.normal.emboss02,
        roughness: file.upper.roughness.emboss02,
        metallic: null,
      }
    }

    if (state.leatherType === customOrderLeatherType.embossed03) {
      return {
        baseColor: this.upperBaseColor,
        normal: file.upper.normal.emboss03,
        roughness: file.upper.roughness.emboss03,
        metallic: null,
      }
    }

    if (state.leatherType === customOrderLeatherType.embossed04) {
      return {
        baseColor: this.upperBaseColor,
        normal: file.upper.normal.emboss04,
        roughness: file.upper.roughness.emboss04,
        metallic: null,
      }
    }

    if (state.leatherType === customOrderLeatherType.embossed05) {
      return {
        baseColor: this.upperBaseColor,
        normal: file.upper.normal.emboss05,
        roughness: file.upper.roughness.emboss05,
        metallic: null,
      }
    }

    throw new Error(`Invalid leather: ${state.leatherType}`)
  }

  get soleMaterial() {
    const file = customOrderFile_uni70301

    const state = this.state

    if (state.outsoleType === customOrderOutsoleType.halfRubber01) {
      return {
        baseColor: file.outsole.baseColor.halfRubber.black,
        normal: file.outsole.normal.halfRubber,
        roughness: file.outsole.roughness.halfRubber,
      }
    }

    if (state.outsoleType === customOrderOutsoleType.halfRubber02) {
      return {
        baseColor: file.outsole.baseColor.halfRubber.black,
        // map: this.outsoleMap,
        normal: file.outsole.normal.halfRubber,
        roughness: file.outsole.roughness.halfRubber,
      }
    }

    if (state.outsoleType === customOrderOutsoleType.leather01) {
      return {
        baseColor: file.outsole.baseColor.leather01.black,
        normal: file.outsole.normal.leather01,
        roughness: file.outsole.roughness.leather01,
      }
    }

    if (state.outsoleType === customOrderOutsoleType.leather02) {
      return {
        // map: this.outsoleMap,
        baseColor: file.outsole.baseColor.leather02.black,
        normal: file.outsole.normal.leather02,
        roughness: file.outsole.roughness.leather02,
      }
    }

    if (state.outsoleType === customOrderOutsoleType.leather03) {
      return {
        baseColor: file.outsole.baseColor.leather03.default,
        normal: file.outsole.normal.leather03,
        roughness: file.outsole.roughness.leather03,
      }
    }

    throw new Error(`Invalid outsole type: ${state.outsoleType}`)
  }

  get outsoleAccessoryBaseColor() {
    const file = customOrderFile_uni70301

    const state = this.state

    if (
      state.outsoleType !== customOrderOutsoleType.halfRubber02 &&
      state.outsoleType !== customOrderOutsoleType.leather02
    ) {
      return file.outsole.baseColor.halfRubber.black
    }

    if (state.accessoryType === customOrderAccessoryType.heelMetalPlate) {
      return file.outsole.baseColor.halfRubber.black
    }

    if (state.accessoryType === customOrderAccessoryType.heelPlateAntiqueGray) {
      return file.outsole.baseColor.halfRubber.antiqueGray
    }

    if (state.accessoryType === customOrderAccessoryType.heelPlateBlack) {
      return file.outsole.baseColor.halfRubber.black
    }

    if (state.accessoryType === customOrderAccessoryType.heelPlateDarkBrown) {
      return file.outsole.baseColor.halfRubber.darkBrown
    }

    if (state.accessoryType === customOrderAccessoryType.heelPlateBlue) {
      return file.outsole.baseColor.halfRubber.purpleBlue
    }

    if (state.accessoryType === customOrderAccessoryType.heelPlateWineRed) {
      return file.outsole.baseColor.halfRubber.wineRed
    }

    if (state.accessoryType === customOrderAccessoryType.heelPlateLightBrown) {
      return file.outsole.baseColor.halfRubber.lightBrown
    }

    throw new Error(`Invalid outsole type: ${state.outsoleType}`)
  }

  insoleMaterial = null

  get accessoryMaterial() {
    const file = customOrderFile_uni70301

    const state = this.state

    if (state.accessoryType === customOrderAccessoryType.heelMetalPlate) {
      return {
        baseColor: file.accessory.metalHeel.baseColor,
        normal: file.accessory.metalHeel.normal,
        roughness: file.accessory.metalHeel.roughness,
        metallic: file.accessory.metalHeel.metallic,
      }
    }

    if (state.outsoleType === customOrderOutsoleType.halfRubber01) {
      return {
        baseColor: file.outsole.baseColor.halfRubber.black,
        normal: file.outsole.normal.halfRubber,
        roughness: file.outsole.roughness.halfRubber,
        metallic: null,
      }
    }

    if (state.outsoleType === customOrderOutsoleType.halfRubber02) {
      return {
        baseColor: this.outsoleAccessoryBaseColor,
        normal: file.outsole.normal.halfRubber,
        roughness: file.outsole.roughness.halfRubber,
        metallic: null,
      }
    }

    if (state.outsoleType === customOrderOutsoleType.leather01) {
      return {
        baseColor: file.outsole.baseColor.leather01.black,
        normal: file.outsole.normal.leather01,
        roughness: file.outsole.roughness.leather01,
        metallic: null,
      }
    }

    if (state.outsoleType === customOrderOutsoleType.leather02) {
      return {
        // TODO: ↓ wrong
        baseColor: this.outsoleAccessoryBaseColor,
        normal: file.outsole.normal.leather02,
        roughness: file.outsole.roughness.leather02,
        metallic: null,
      }
    }

    if (state.outsoleType === customOrderOutsoleType.leather03) {
      return {
        baseColor: file.outsole.baseColor.leather03.default,
        normal: file.outsole.normal.leather03,
        roughness: file.outsole.roughness.leather03,
        metallic: null,
      }
    }

    throw new Error(`Invalid outsole type: ${state.outsoleType}`)
  }
}
