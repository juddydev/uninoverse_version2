import { CustomOrderTexture } from "~/lib/custom-order/custom-order-texture"
import { customOrderFile_uni80001 } from "~/lib/custom-order/files/uni-800-01"

const file = customOrderFile_uni80001

export class CustomOrderTexture_uni80001 extends CustomOrderTexture {
  get upper() {
    return {
      baseColor: file.upper.baseColor.white,
      normal: file.upper.normal,
      roughness: file.upper.roughness,
      metallic: null,
    }
  }

  // get upper_2() {
  //   const file = customOrderFile_uni80001
  //   return {
  //     baseColor: file.upper_2.base_color.white,
  //     normal: file.upper_2.normal,
  //     roughness: file.upper_2.roughness,
  //   }
  // }

  get outsole() {
    return {
      baseColor: file.outsole.baseColor.white,
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
