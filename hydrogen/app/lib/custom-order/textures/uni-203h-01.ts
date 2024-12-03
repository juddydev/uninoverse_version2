import { CustomOrderTexture } from "~/lib/custom-order/custom-order-texture"
import { customOrderFile_uni203h01 } from "~/lib/custom-order/files/uni-203h-01"
import { customOrderLeatherColor } from "~/lib/custom-order/values/custom-order-leather-color"
import { customOrderLeatherType } from "~/lib/custom-order/values/custom-order-leather-type"

const file = customOrderFile_uni203h01

/**
 * UNI-203H-01
 * https://www.notion.so/fujiuni/UNI-203H-01-cee2fd441b634d26b4e11e484908f27a?pvs=4
 */
export class CustomOrderTexture_uni203h01 extends CustomOrderTexture {
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

    if (this.state.leatherType === customOrderLeatherType.suede) {
      return {
        baseColor: this.upperBaseColor,
        normal: file.upper.normal.suede,
        roughness: file.upper.roughness.suede,
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

  get accessory() {
    return {
      baseColor: file.accessory.baseColor.metalHeel,
      normal: file.accessory.normal.metalHeel,
      roughness: file.accessory.roughness.metalHeel,
      metallic: null,
    }
  }

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
