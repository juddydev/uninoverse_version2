import { CustomOrderTexture } from "~/lib/custom-order/custom-order-texture"
import { customOrderFile_uni70701 } from "~/lib/custom-order/files/uni-707-01"
import { customOrderLeatherType } from "~/lib/custom-order/values/custom-order-leather-type"
import { customOrderLeatherColor } from "~/lib/custom-order/values/custom-order-leather-color"

const file = customOrderFile_uni70701

export class CustomOrderTexture_uni70701 extends CustomOrderTexture {
  get upper() {
    if (this.state.leatherType === customOrderLeatherType.baron) {
      return {
        baseColor: this.upperBaseColor,
        normal: file.upper.normal.baron,
        roughness: file.upper.roughness.baron,
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
        normal: file.upper.normal.emboss1,
        roughness: file.upper.roughness.emboss1,
        metallic: null,
      }
    }

    if (this.state.leatherType === customOrderLeatherType.embossed03) {
      return {
        baseColor: this.upperBaseColor,
        normal: file.upper.normal.emboss3,
        roughness: file.upper.roughness.emboss3,
        metallic: null,
      }
    }

    if (this.state.leatherType === customOrderLeatherType.embossed04) {
      return {
        baseColor: this.upperBaseColor,
        normal: file.upper.normal.emboss4,
        roughness: file.upper.roughness.emboss4,
        metallic: null,
      }
    }

    if (this.state.leatherType === customOrderLeatherType.embossed05) {
      return {
        baseColor: this.upperBaseColor,
        normal: file.upper.normal.emboss5,
        roughness: file.upper.roughness.emboss5,
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

    if (this.state.leatherType === customOrderLeatherType.ostrichSkin) {
      return {
        baseColor: this.upperBaseColor,
        normal: file.upper.normal.ostrich,
        roughness: file.upper.roughness.ostrich,
        metallic: null,
      }
    }

    throw new Error(`Unknown leatherType: ${this.state.leatherType}`)

  }

  get outsole() {
    return {
      baseColor: file.sole.baseColor.vibram1,
      normal: file.sole.normal.vibram1,
      roughness: file.sole.roughness.vibram1,
      metallic: null,
    }
  }

  get insole() {
    return {
      baseColor: file.insole.baseColor,
      normal: null,
      roughness: file.insole.roughness,
      metallic: null,
    }
  }

  accessory = null

  get lining() {
    return {
      baseColor: file.lining.baseColor,
      normal: null,
      roughness: file.lining.roughness,
    }
  }

  get lace() {
    return {
      baseColor: file.shoelace.baseColor,
      normal: file.shoelace.normal,
      roughness: file.shoelace.roughness,
    }
  }

  private get upperBaseColor() {
    if (this.state.leatherColor === customOrderLeatherColor.black) {
      return file.upper.baseColor.black
    }

    if (this.state.leatherColor === customOrderLeatherColor.darkBrown) {
      return file.upper.baseColor.darkBrown
    }

    if (this.state.leatherColor === customOrderLeatherColor.lightBrown) {
      return file.upper.baseColor.lightBrown
    }

    if (this.state.leatherColor === customOrderLeatherColor.blue) {
      return file.upper.baseColor.blue
    }

    if (this.state.leatherColor === customOrderLeatherColor.wineRed) {
      return file.upper.baseColor.wineRed
    }

    if (this.state.leatherColor === customOrderLeatherColor.antiqueGray) {
      return file.upper.baseColor.antiqueGray
    }

    if (this.state.leatherColor === customOrderLeatherColor.gray) {
      return file.upper.baseColor.gray
    }

    throw new Error(`Unknown leatherColor: ${this.state.leatherColor}`)
  }
}
