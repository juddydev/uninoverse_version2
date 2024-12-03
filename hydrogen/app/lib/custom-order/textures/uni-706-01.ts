import { CustomOrderTexture } from "~/lib/custom-order/custom-order-texture"
import { customOrderFile_uni70601 } from "~/lib/custom-order/files/uni-706-01"
import { customOrderLeatherType } from "~/lib/custom-order/values/custom-order-leather-type"
import { customOrderLeatherColor } from "~/lib/custom-order/values/custom-order-leather-color"

const file = customOrderFile_uni70601

export class CustomOrderTexture_uni70601 extends CustomOrderTexture {
  get upper() {
    if (this.state.leatherType === customOrderLeatherType.baron) {
      return {
        baseColor: this.upperBaseColor,
        normal: file.upper.normal.baron,
        roughness: file.upper.roughness.baron,
        metallic: null,
      }
    }

    if (this.state.leatherType === customOrderLeatherType.boxCalf) {
      return {
        baseColor: this.upperBaseColor,
        normal: file.upper.normal.boxCalf,
        roughness: file.upper.roughness.boxCalf,
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
        roughness: file.upper.roughness.emboss01,
        metallic: null,
      }
    }

    if (this.state.leatherType === customOrderLeatherType.embossed02) {
      return {
        baseColor: this.upperBaseColor,
        normal: file.upper.normal.emboss2,
        roughness: file.upper.roughness.emboss02,
        metallic: null,
      }
    }

    if (this.state.leatherType === customOrderLeatherType.embossed03) {
      return {
        baseColor: this.upperBaseColor,
        normal: file.upper.normal.emboss3,
        roughness: file.upper.roughness.emboss03,
        metallic: null,
      }
    }

    if (this.state.leatherType === customOrderLeatherType.embossed04) {
      return {
        baseColor: this.upperBaseColor,
        normal: file.upper.normal.emboss4,
        roughness: file.upper.roughness.emboss04,
        metallic: null,
      }
    }

    if (this.state.leatherType === customOrderLeatherType.embossed05) {
      return {
        baseColor: this.upperBaseColor,
        normal: file.upper.normal.emboss5,
        roughness: file.upper.roughness.emboss05,
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

    if (this.state.leatherType === customOrderLeatherType.scotchGrain) {
      return {
        baseColor: this.upperBaseColor,
        normal: file.upper.normal.scotchGrain,
        roughness: file.upper.roughness.scotchGrain,
        metallic: null,
      }
    }

    throw new Error(`Unknown leatherType: ${this.state.leatherType}`)
  }

  get outsole() {
    return {
      baseColor: file.outsole.baseColor.halfRubber,
      normal: file.outsole.normal.halfRubber,
      roughness: file.outsole.roughness.halfRubber,
    }
  }

  insole = null

  accessory = null

  lining = null

  lace = null

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
      return file.upper.baseColor.gray
    }

    throw new Error(`Unknown leatherColor: ${this.state.leatherColor}`)
  }
}
