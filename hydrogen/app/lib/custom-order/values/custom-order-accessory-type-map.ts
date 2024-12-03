import { customOrderAccessoryType } from "~/lib/custom-order/values/custom-order-accessory-type"
import { customOrderOutsoleType } from "~/lib/custom-order/values/custom-order-outsole-type"

export const customOrderAccessoryTypeMap = new Map([
  [
    customOrderOutsoleType.leather02,
    [
      customOrderAccessoryType.heelMetalPlate,
      customOrderAccessoryType.heelPlateAntiqueGray,
      customOrderAccessoryType.heelPlateBlack,
      customOrderAccessoryType.heelPlateBlue,
      customOrderAccessoryType.heelPlateDarkBrown,
      customOrderAccessoryType.heelPlateLightBrown,
      customOrderAccessoryType.heelPlateWineRed,
    ],
  ],
  [
    customOrderOutsoleType.halfRubber02,
    [
      customOrderAccessoryType.heelMetalPlate,
      customOrderAccessoryType.heelPlateAntiqueGray,
      customOrderAccessoryType.heelPlateBlack,
      customOrderAccessoryType.heelPlateBlue,
      customOrderAccessoryType.heelPlateDarkBrown,
      customOrderAccessoryType.heelPlateLightBrown,
      customOrderAccessoryType.heelPlateWineRed,
    ],
  ],
  [
    customOrderOutsoleType.vibramGolfGray,
    [
      customOrderAccessoryType.buckleWhite,
      customOrderAccessoryType.buckleBlack,
    ],
  ],
  [
    customOrderOutsoleType.vibramGolfWhite,
    [
      customOrderAccessoryType.buckleWhite,
      customOrderAccessoryType.buckleBlack,
    ],
  ],
])
