import { CustomOrderTexture } from "~/lib/custom-order/custom-order-texture"
import { customOrderFile_uni71201 } from "~/lib/custom-order/files/uni-712-01"

const file = customOrderFile_uni71201

/**
 * UNI-712-01
 */
export class CustomOrderTexture_uni71201 extends CustomOrderTexture {
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
      baseColor: file.sole.baseColor.vibram01,
      normal: file.sole.normal.vibram01,
      roughness: file.sole.roughness.vibram01,
      metallic: null,
    }
  }

  insole = null

  accessory = null

  lining = null

  lace = null
}
