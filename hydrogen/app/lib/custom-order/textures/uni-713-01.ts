import { CustomOrderTexture } from "~/lib/custom-order/custom-order-texture"
import { customOrderFile_uni71301 } from "~/lib/custom-order/files/uni-713-01"

const file = customOrderFile_uni71301

export class CustomOrderTexture_uni71301 extends CustomOrderTexture {
  get upper() {
    return {
      baseColor: file.upper.baseColor.black,
      normal: file.upper.normal,
      roughness: file.upper.roughness,
      metallic: null,
    }
  }

  get outsole() {
    return {
      baseColor: file.outsole.baseColor.halfRubber.black,
      normal: file.outsole.normal,
      roughness: file.outsole.roughness,
      metallic: null,
    }
  }

  insole = null

  get accessory() {
    return {
      baseColor: file.accessory.baseColor,
      normal: file.accessory.normal,
      roughness: file.accessory.roughness,
      metallic: null,
    }
  }

  lining = null

  lace = null
}
