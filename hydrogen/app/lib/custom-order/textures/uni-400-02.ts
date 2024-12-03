import { CustomOrderTexture } from "~/lib/custom-order/custom-order-texture"
import { customOrderFile_uni40002 } from "~/lib/custom-order/files/uni-400-02"

const file = customOrderFile_uni40002

/**
 * UNI-400-02
 * https://www.notion.so/fujiuni/UNI-400-02-7d3b02c1efa940288d0005a54a5fd39a?pvs=4
 */
export class CustomOrderTexture_uni40002 extends CustomOrderTexture {
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
