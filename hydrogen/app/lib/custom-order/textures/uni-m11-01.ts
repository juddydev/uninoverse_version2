import { CustomOrderTexture } from "~/lib/custom-order/custom-order-texture"
import { customOrderFile_unim1101 } from "~/lib/custom-order/files/uni-m11-01"

const file = customOrderFile_unim1101

/**
 * UNI-M11-01
 * https://www.notion.so/fujiuni/UNI-M11-01-464f7be37388461f8740a151a748ee04?pvs=4
 */
export class CustomOrderTexture_unim1101 extends CustomOrderTexture {
  get upper() {
    return {
      baseColor: file.upper.baseColor.black,
      normal: file.upper.normal.crocodileBack,
      roughness: file.upper.roughness.crocodileBack,
      metallic: null,
    }
  }

  get outsole() {
    return {
      baseColor: file.sole.baseColor.halfRubber,
      normal: file.sole.normal.halfRubber,
      roughness: file.sole.roughness.halfRubber,
    }
  }

  insole = null

  accessory = null

  lining = null

  lace = null
}
