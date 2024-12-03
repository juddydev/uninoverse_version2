import { CustomOrderTexture } from "~/lib/custom-order/custom-order-texture"
import { customOrderFile_uni71401 } from "~/lib/custom-order/files/uni-714-01"

const file = customOrderFile_uni71401

/**
 * UNI-714-01
 * https://www.notion.so/fujiuni/UNI-714-01-30f946a4e94749ab85e8fc4c72bc4dda?pvs=4
 */
export class CustomOrderTexture_uni71401 extends CustomOrderTexture {
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
      metallic: null,
    }
  }

  insole = null

  accessory = null

  lining = null

  lace = null
}
