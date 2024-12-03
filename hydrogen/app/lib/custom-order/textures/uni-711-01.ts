import { CustomOrderTexture } from "~/lib/custom-order/custom-order-texture"
import { customOrderFile_uni71101 } from "~/lib/custom-order/files/uni-711-01"

const file = customOrderFile_uni71101

/**
 * UNI-711-01
 * https://www.notion.so/fujiuni/UNI-711-01-f0bd79c0280b4e54ac6dfa490e26fe24?pvs=4
 */
export class CustomOrderTexture_uni71101 extends CustomOrderTexture {
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
      baseColor: file.outsole.baseColor.vibram01,
      normal: file.outsole.normal.vibram01,
      roughness: file.outsole.roughness.vibram01,
      metallic: null,
    }
  }

  insole = null

  accessory = null

  lining = null

  lace = null
}
