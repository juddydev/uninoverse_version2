import { CustomOrderTexture } from "~/lib/custom-order/custom-order-texture"
import { customOrderFile_uni80002 } from "~/lib/custom-order/files/uni-800-02"

const file = customOrderFile_uni80002

export class CustomOrderTexture_uni80002 extends CustomOrderTexture {
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
      baseColor: file.outsole.baseColor.gray,
      normal: file.outsole.normal,
      roughness: file.outsole.roughness,
    }
  }

  insole = null

  get accessory() {
    return {
      baseColor: file.accessory.baseColor.black,
      normal: file.accessory.normal,
      roughness: file.accessory.roughness,
      metallic: null,
    }
  }

  lining = null

  lace = null
}
