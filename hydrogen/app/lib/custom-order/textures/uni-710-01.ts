import { CustomOrderTexture } from "~/lib/custom-order/custom-order-texture"
import { customOrderFile_uni71001 } from "~/lib/custom-order/files/uni-710-01"

const file = customOrderFile_uni71001

export class CustomOrderTexture_uni71001 extends CustomOrderTexture {
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
      baseColor: file.outsole.baseColor.vibram1,
      normal: file.outsole.normal.vibram1,
      roughness: file.outsole.roughness.vibram1,
    }
  }

  insole = null

  accessory = null

  lining = null

  lace = null
}
