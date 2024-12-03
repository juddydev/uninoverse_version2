import { CustomOrderTexture } from "~/lib/custom-order/custom-order-texture"
import { customOrderFile_uni70102 } from "~/lib/custom-order/files/uni-701-02"

const file = customOrderFile_uni70102

/**
 * UNI-701-02
 * https://www.notion.so/fujiuni/UNI-701-02-bfa07fe79d67491d8097bb3346a38a26?pvs=4
 */
export class CustomOrderTexture_uni70102 extends CustomOrderTexture {
  get upper() {
    return {
      baseColor: file.upper.baseColor.black,
      normal: file.upper.normal.emboss01,
      roughness: file.upper.roughness.emboss01,
      metallic: null,
    }
  }

  get outsole() {
    return {
      baseColor: file.outsole.baseColor.vibram01,
      normal: file.outsole.normal.vibram01,
      roughness: file.outsole.roughness.vibram01,
    }
  }

  insole = null

  accessory = null

  lining = null

  lace = null
}
