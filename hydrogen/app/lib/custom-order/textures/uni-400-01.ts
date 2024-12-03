import { CustomOrderTexture } from "~/lib/custom-order/custom-order-texture"
import { customOrderFile_uni40001 } from "~/lib/custom-order/files/uni-400-01"

const file = customOrderFile_uni40001

/**
 * UNI-400-01
 * https://www.notion.so/fujiuni/UNI-400-01-819c89e4bde5408ea3bc36ba52b85f73?pvs=4
 */
export class CustomOrderTexture_uni40001 extends CustomOrderTexture {
  get upper() {
    return {
      baseColor: file.upper.baseColor.black,
      normal: file.upper.normal.baron,
      roughness: file.upper.roughness,
      metallic: null,
    }
  }

  get outsole() {
    return {
      baseColor: file.sole.baseColor.black,
      normal: file.sole.normal.halfRubber,
      roughness: file.sole.roughness.halfRubber,
    }
  }

  get insole() {
    return {
      baseColor: file.insole.baseColor,
      roughness: file.insole.roughness,
      // TODO: ↓ 確認
      normal: null,
    }
  }

  get accessory() {
    return {
      baseColor: file.accessory.baseColor.metalHeel,
      metallic: file.accessory.metallic.metalHeel,
      normal: file.accessory.normal.metalHeel,
      roughness: file.accessory.roughness.metalHeel,
    }
  }

  lining = null

  lace = null
}
