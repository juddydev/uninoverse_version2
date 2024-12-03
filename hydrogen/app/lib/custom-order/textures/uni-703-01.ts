import { customOrderFile_uni70301 } from "~/lib/custom-order/files/uni-703-01"
import { customOrderLeatherType } from "~/lib/custom-order/values/custom-order-leather-type"
import { customOrderOutsoleType } from "~/lib/custom-order/values/custom-order-outsole-type"
import { customOrderLeatherColor } from "~/lib/custom-order/values/custom-order-leather-color"
import { customOrderAccessoryType } from "~/lib/custom-order/values/custom-order-accessory-type"
import { CustomOrderTexture } from "~/lib/custom-order/custom-order-texture"

const file = customOrderFile_uni70301

/**
 * UNI-703-01
 */
export class CustomOrderTexture_uni70301 extends CustomOrderTexture {
  get upperBaseColor() {
    if (this.state.leatherColor === customOrderLeatherColor.antiqueGray) {
      return file.upper.baseColor.antiqueGray
    }

    if (this.state.leatherColor === customOrderLeatherColor.black) {
      return file.upper.baseColor.black
    }

    if (this.state.leatherColor === customOrderLeatherColor.blue) {
      return file.upper.baseColor.blue
    }

    if (this.state.leatherColor === customOrderLeatherColor.darkBrown) {
      return file.upper.baseColor.darkBrown
    }

    if (this.state.leatherColor === customOrderLeatherColor.lightBrown) {
      return file.upper.baseColor.lightBrown
    }

    if (this.state.leatherColor === customOrderLeatherColor.wineRed) {
      return file.upper.baseColor.wineRed
    }

    throw new Error("Invalid leather type")
  }

  get upper() {
    if (this.state.leatherType === customOrderLeatherType.baron) {
      return {
        baseColor: this.upperBaseColor,
        normal: file.upper.normal.baron,
        roughness: file.upper.roughness.baron,
        metallic: null,
      }
    }

    if (this.state.leatherType === customOrderLeatherType.kipskin) {
      return {
        baseColor: this.upperBaseColor,
        normal: file.upper.normal.kipskin,
        roughness: file.upper.roughness.kipskin,
        metallic: null,
      }
    }

    if (this.state.leatherType === customOrderLeatherType.crocodileBack) {
      return {
        baseColor: this.upperBaseColor,
        normal: file.upper.normal.crocodileBack,
        roughness: file.upper.roughness.crocodileBack,
        metallic: null,
      }
    }

    if (this.state.leatherType === customOrderLeatherType.crocodileBelly) {
      return {
        baseColor: this.upperBaseColor,
        normal: file.upper.normal.crocodileBelly,
        roughness: file.upper.roughness.crocodileBelly,
        metallic: null,
      }
    }

    if (this.state.leatherType === customOrderLeatherType.embossed01) {
      return {
        baseColor: this.upperBaseColor,
        normal: file.upper.normal.emboss01,
        roughness: file.upper.roughness.emboss01,
        metallic: null,
      }
    }

    if (this.state.leatherType === customOrderLeatherType.embossed02) {
      return {
        baseColor: this.upperBaseColor,
        normal: file.upper.normal.emboss02,
        roughness: file.upper.roughness.emboss02,
        metallic: null,
      }
    }

    if (this.state.leatherType === customOrderLeatherType.embossed03) {
      return {
        baseColor: this.upperBaseColor,
        normal: file.upper.normal.emboss03,
        roughness: file.upper.roughness.emboss03,
        metallic: null,
      }
    }

    if (this.state.leatherType === customOrderLeatherType.embossed04) {
      return {
        baseColor: this.upperBaseColor,
        normal: file.upper.normal.emboss04,
        roughness: file.upper.roughness.emboss04,
        metallic: null,
      }
    }

    if (this.state.leatherType === customOrderLeatherType.embossed05) {
      return {
        baseColor: this.upperBaseColor,
        normal: file.upper.normal.emboss05,
        roughness: file.upper.roughness.emboss05,
        metallic: null,
      }
    }

    throw new Error(`Invalid leather: ${this.state.leatherType}`)
  }

  get outsole() {
    const file = customOrderFile_uni70301

    if (this.state.outsoleType === customOrderOutsoleType.halfRubber01) {
      return {
        baseColor: file.outsole.baseColor.halfRubber.black,
        normal: file.outsole.normal.halfRubber,
        roughness: file.outsole.roughness.halfRubber,
      }
    }

    if (this.state.outsoleType === customOrderOutsoleType.halfRubber02) {
      return {
        baseColor: file.outsole.baseColor.halfRubber.black,
        // map: this.outsoleMap,
        normal: file.outsole.normal.halfRubber,
        roughness: file.outsole.roughness.halfRubber,
      }
    }

    if (this.state.outsoleType === customOrderOutsoleType.leather01) {
      return {
        baseColor: file.outsole.baseColor.leather01.black,
        normal: file.outsole.normal.leather01,
        roughness: file.outsole.roughness.leather01,
      }
    }

    if (this.state.outsoleType === customOrderOutsoleType.leather02) {
      return {
        // map: this.outsoleMap,
        baseColor: file.outsole.baseColor.leather02.black,
        normal: file.outsole.normal.leather02,
        roughness: file.outsole.roughness.leather02,
      }
    }

    if (this.state.outsoleType === customOrderOutsoleType.leather03) {
      return {
        baseColor: file.outsole.baseColor.leather03.default,
        normal: file.outsole.normal.leather03,
        roughness: file.outsole.roughness.leather03,
      }
    }

    throw new Error(`Invalid outsole type: ${this.state.outsoleType}`)
  }

  get outsoleAccessoryBaseColor() {
    const file = customOrderFile_uni70301

    if (
      this.state.outsoleType !== customOrderOutsoleType.halfRubber02 &&
      this.state.outsoleType !== customOrderOutsoleType.leather02
    ) {
      return file.outsole.baseColor.halfRubber.black
    }

    if (this.state.accessoryType === customOrderAccessoryType.heelMetalPlate) {
      return file.outsole.baseColor.halfRubber.black
    }

    if (
      this.state.accessoryType === customOrderAccessoryType.heelPlateAntiqueGray
    ) {
      return file.outsole.baseColor.halfRubber.antiqueGray
    }

    if (this.state.accessoryType === customOrderAccessoryType.heelPlateBlack) {
      return file.outsole.baseColor.halfRubber.black
    }

    if (
      this.state.accessoryType === customOrderAccessoryType.heelPlateDarkBrown
    ) {
      return file.outsole.baseColor.halfRubber.darkBrown
    }

    if (this.state.accessoryType === customOrderAccessoryType.heelPlateBlue) {
      return file.outsole.baseColor.halfRubber.purpleBlue
    }

    if (
      this.state.accessoryType === customOrderAccessoryType.heelPlateWineRed
    ) {
      return file.outsole.baseColor.halfRubber.wineRed
    }

    if (
      this.state.accessoryType === customOrderAccessoryType.heelPlateLightBrown
    ) {
      return file.outsole.baseColor.halfRubber.lightBrown
    }

    throw new Error(`Invalid outsole type: ${this.state.outsoleType}`)
  }

  insole = null

  get accessory() {
    const file = customOrderFile_uni70301

    if (this.state.accessoryType === customOrderAccessoryType.heelMetalPlate) {
      return {
        baseColor: file.accessory.metalHeel.baseColor,
        normal: file.accessory.metalHeel.normal,
        roughness: file.accessory.metalHeel.roughness,
        metallic: file.accessory.metalHeel.metallic,
      }
    }

    if (this.state.outsoleType === customOrderOutsoleType.halfRubber01) {
      return {
        baseColor: file.outsole.baseColor.halfRubber.black,
        normal: file.outsole.normal.halfRubber,
        roughness: file.outsole.roughness.halfRubber,
        metallic: null,
      }
    }

    if (this.state.outsoleType === customOrderOutsoleType.halfRubber02) {
      return {
        baseColor: this.outsoleAccessoryBaseColor,
        normal: file.outsole.normal.halfRubber,
        roughness: file.outsole.roughness.halfRubber,
        metallic: null,
      }
    }

    if (this.state.outsoleType === customOrderOutsoleType.leather01) {
      return {
        baseColor: file.outsole.baseColor.leather01.black,
        normal: file.outsole.normal.leather01,
        roughness: file.outsole.roughness.leather01,
        metallic: null,
      }
    }

    if (this.state.outsoleType === customOrderOutsoleType.leather02) {
      return {
        // TODO: ↓ wrong
        baseColor: this.outsoleAccessoryBaseColor,
        normal: file.outsole.normal.leather02,
        roughness: file.outsole.roughness.leather02,
        metallic: null,
      }
    }

    if (this.state.outsoleType === customOrderOutsoleType.leather03) {
      return {
        baseColor: file.outsole.baseColor.leather03.default,
        normal: file.outsole.normal.leather03,
        roughness: file.outsole.roughness.leather03,
        metallic: null,
      }
    }

    throw new Error(`Invalid outsole type: ${this.state.outsoleType}`)
  }

  lining = null

  lace = null
}
