import { customOrderFile_uni70302 } from "~/lib/custom-order/files/uni-703-02"
import { customOrderLeatherType } from "~/lib/custom-order/values/custom-order-leather-type"
import { customOrderOutsoleType } from "~/lib/custom-order/values/custom-order-outsole-type"
import { customOrderLeatherColor } from "~/lib/custom-order/values/custom-order-leather-color"
import { CustomOrderTexture } from "~/lib/custom-order/custom-order-texture"

const file = customOrderFile_uni70302

export class CustomOrderTexture_uni70302 extends CustomOrderTexture {
  get baseColor() {
    if (this.state.leatherColor === customOrderLeatherColor.black) {
      return file.upper.baseColor.black
    }

    if (this.state.leatherColor === customOrderLeatherColor.blue) {
      return file.upper.baseColor.blue
    }

    if (this.state.leatherColor === customOrderLeatherColor.darkBrown) {
      return file.upper.baseColor.darkBrown
    }

    if (this.state.leatherColor === customOrderLeatherColor.gray) {
      return file.upper.baseColor.gray
    }

    if (this.state.leatherColor === customOrderLeatherColor.lightBrown) {
      return file.upper.baseColor.lightBrown
    }

    if (this.state.leatherColor === customOrderLeatherColor.wineRed) {
      return file.upper.baseColor.wineRed
    }

    // BUG: ↓ テクスチャ「antiqueGray」が存在しない
    if (this.state.leatherColor === customOrderLeatherColor.antiqueGray) {
      return file.upper.baseColor.gray
    }

    throw new Error(`Invalid leather type: ${this.state.leatherColor}`)
  }

  get upper() {
    const file = customOrderFile_uni70302

    if (this.state.leatherType === customOrderLeatherType.baron) {
      return {
        baseColor: this.baseColor,
        normal: file.upper.normal.baron,
        roughness: file.upper.roughness.baron,
        metallic: null,
      }
    }

    if (this.state.leatherType === customOrderLeatherType.kipskin) {
      return {
        baseColor: this.baseColor,
        normal: file.upper.normal.kipskin,
        roughness: file.upper.roughness.kipskin,
        metallic: null,
      }
    }

    if (this.state.leatherType === customOrderLeatherType.crocodileBelly) {
      return {
        baseColor: this.baseColor,
        normal: file.upper.normal.crocodileBelly,
        roughness: file.upper.roughness.crocodileBelly,
        metallic: null,
      }
    }

    if (this.state.leatherType === customOrderLeatherType.crocodileBack) {
      return {
        baseColor: this.baseColor,
        normal: file.upper.normal.crocodileBack,
        roughness: file.upper.roughness.crocodileBack,
        metallic: null,
      }
    }

    if (this.state.leatherType === customOrderLeatherType.embossed01) {
      return {
        baseColor: this.baseColor,
        normal: file.upper.normal.emboss01,
        roughness: file.upper.roughness.emboss01,
        metallic: null,
      }
    }

    if (this.state.leatherType === customOrderLeatherType.embossed03) {
      return {
        baseColor: this.baseColor,
        normal: file.upper.normal.emboss03,
        roughness: file.upper.roughness.emboss03,
        metallic: null,
      }
    }

    if (this.state.leatherType === customOrderLeatherType.embossed04) {
      return {
        baseColor: this.baseColor,
        normal: file.upper.normal.emboss04,
        roughness: file.upper.roughness.emboss04,
        metallic: null,
      }
    }

    if (this.state.leatherType === customOrderLeatherType.embossed05) {
      return {
        baseColor: this.baseColor,
        normal: file.upper.normal.emboss05,
        roughness: file.upper.roughness.emboss05,
        metallic: null,
      }
    }

    if (this.state.leatherType === customOrderLeatherType.ostrichSkin) {
      return {
        baseColor: this.baseColor,
        normal: file.upper.normal.ostrich,
        roughness: file.upper.roughness.ostrich,
        metallic: null,
      }
    }

    throw new Error(`Invalid leather: ${this.state.leatherType}`)
  }

  get outsole() {
    const file = customOrderFile_uni70302

    if (this.state.outsoleType === customOrderOutsoleType.halfRubber01) {
      return {
        baseColor: file.sole.baseColor.halfRubber,
        normal: file.sole.normal.halfRubber,
        roughness: file.sole.roughness.halfRubber,
      }
    }

    if (this.state.outsoleType === customOrderOutsoleType.leather01) {
      return {
        baseColor: file.sole.baseColor.leather01,
        normal: file.sole.normal.leather01,
        roughness: file.sole.roughness.leather01,
      }
    }

    if (this.state.outsoleType === customOrderOutsoleType.leather02) {
      return {
        // map: this.outsoleMap,
        baseColor: file.sole.baseColor.leather02,
        normal: file.sole.normal.leather02,
        roughness: file.sole.roughness.leather02,
      }
    }

    throw new Error(`Invalid outsole type: ${this.state.outsoleType}`)
  }

  insole = null

  get accessory() {
    const file = customOrderFile_uni70302

    if (this.state.outsoleType === customOrderOutsoleType.halfRubber01) {
      return {
        baseColor: file.sole.baseColor.halfRubber,
        normal: file.sole.normal.halfRubber,
        roughness: file.sole.roughness.halfRubber,
        metallic: null,
      }
    }

    if (this.state.outsoleType === customOrderOutsoleType.leather01) {
      return {
        baseColor: file.sole.baseColor.leather01,
        normal: file.sole.normal.leather01,
        roughness: file.sole.roughness.leather01,
        metallic: null,
      }
    }

    if (this.state.outsoleType === customOrderOutsoleType.leather02) {
      return {
        // TODO: ↓ wrong
        baseColor: file.sole.baseColor.leather02,
        normal: file.sole.normal.leather02,
        roughness: file.sole.roughness.leather02,
        metallic: null,
      }
    }

    return {
      baseColor: file.sole.baseColor.halfRubber,
      normal: file.sole.normal.halfRubber,
      roughness: file.sole.roughness.halfRubber,
      metallic: null,
    }
  }

  lining = null

  lace = null
}
