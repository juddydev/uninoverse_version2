import { CustomOrderTexture } from "~/lib/custom-order/custom-order-texture"
import { customOrderFile_uni70001 } from "~/lib/custom-order/files/uni-700-01"

const file = customOrderFile_uni70001

export class CustomOrderTexture_uni70001 extends CustomOrderTexture {
  get upper() {
    return {
      baseColor: file.upper.baseColor.black,
      normal: file.upper.normal.baron,
      roughness: file.upper.roughness.baron,
      metallic: null,
    }
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
}
