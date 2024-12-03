import { AttributeInput } from "@shopify/hydrogen/storefront-api-types"
import { CustomOrderAccessoryType } from "~/lib/custom-order/types/custom-order-accessory-type"
import { CustomOrderConstruction } from "~/lib/custom-order/types/custom-order-construction"
import { CustomOrderInsoleType } from "~/lib/custom-order/types/custom-order-insole-type"
import { CustomOrderItem } from "~/lib/custom-order/types/custom-order-item"
import { CustomOrderLaceType } from "~/lib/custom-order/types/custom-order-lace-type"
import { CustomOrderLeatherColor } from "~/lib/custom-order/types/custom-order-leather-color"
import { CustomOrderLeatherType } from "~/lib/custom-order/types/custom-order-leather-type"
import { CustomOrderLiningType } from "~/lib/custom-order/types/custom-order-lining-type"
import { CustomOrderOutsoleType } from "~/lib/custom-order/types/custom-order-outsole-type"

export type CustomOrderConfig = {
  variants: CustomOrderItem[]
  constructions: CustomOrderConstruction[]
  leatherTypes: CustomOrderLeatherType[]
  leatherColors: CustomOrderLeatherColor[]
  outsoleTypes: CustomOrderOutsoleType[]
  accessoryTypes: CustomOrderAccessoryType[]
  liningTypes: CustomOrderLiningType[]
  laceTypes: CustomOrderLaceType[]
  insoleTypes: CustomOrderInsoleType[]
  sizes: number[]
  /**
   * cartLineInputs
   */
  attributes: AttributeInput[]
  /**
   * テクスチャ
   */
  upperMaterial: {
    baseColor: string
    normal: string
    roughness: string
    metallic: string | null
  } | null
  soleMaterial: {
    baseColor: string
    normal: string
    roughness: string
  } | null
  insoleMaterial: {
    baseColor: string
    normal: string
    roughness: string
  } | null
  accessoryMaterial: {
    baseColor: string
    normal: string
    roughness: string
  } | null
}
