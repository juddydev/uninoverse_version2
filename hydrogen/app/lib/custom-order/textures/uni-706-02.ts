import { CustomOrderTexture } from "~/lib/custom-order/custom-order-texture"
import { customOrderFile_uni70602 } from "~/lib/custom-order/files/uni-706-02"

const file = customOrderFile_uni70602

export class CustomOrderTexture_uni70602 extends CustomOrderTexture {
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
      baseColor: file.outsole.baseColor.halfRubber.black,
      normal: file.outsole.normal.halfRubber,
      roughness: file.outsole.roughness.halfRubber,
      metallic: null,
    }
  }

  insole = null

  get accessory() {
    return {
      baseColor: file.accessory.baseColor.metalHeel,
      normal: file.accessory.normal.metalHeel,
      roughness: file.accessory.roughness.metalHeel,
      metallic: null,
    }
  }

  lining = null

  lace = null
}
