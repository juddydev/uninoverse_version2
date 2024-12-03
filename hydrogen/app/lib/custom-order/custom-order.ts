import { AttributeInput } from "@shopify/hydrogen/storefront-api-types"
import { CustomOrderState } from "~/lib/custom-order/custom-order-state"
import { CustomOrderAccessoryType } from "~/lib/custom-order/types/custom-order-accessory-type"
import { CustomOrderConstruction } from "~/lib/custom-order/types/custom-order-construction"
import { CustomOrderInsoleType } from "~/lib/custom-order/types/custom-order-insole-type"
import { CustomOrderItem } from "~/lib/custom-order/types/custom-order-item"
import { CustomOrderLaceType } from "~/lib/custom-order/types/custom-order-lace-type"
import { CustomOrderLeatherType } from "~/lib/custom-order/types/custom-order-leather-type"
import { CustomOrderLiningType } from "~/lib/custom-order/types/custom-order-lining-type"
import { CustomOrderOutsoleType } from "~/lib/custom-order/types/custom-order-outsole-type"
import { customOrderAccessoryTypeMap } from "~/lib/custom-order/values/custom-order-accessory-type-map"
import { customOrderLeatherColorMap } from "~/lib/custom-order/values/custom-order-leather-color-map"

export abstract class CustomOrder {
  readonly state: CustomOrderState

  constructor(state: CustomOrderState) {
    this.state = state
  }

  /**
   * ※順番を変更しないように注意
   */
  abstract get variants(): CustomOrderItem[]

  /**
   * 製法
   */
  abstract get constructions(): CustomOrderConstruction[]

  abstract get leatherTypes(): CustomOrderLeatherType[]

  get leatherColors() {
    const values = customOrderLeatherColorMap.get(
      this.state.leatherType as never,
    )

    return values || []
  }

  abstract get outsoleTypes(): CustomOrderOutsoleType[]

  get accessoryTypes(): CustomOrderAccessoryType[] {
    const value = customOrderAccessoryTypeMap.get(
      this.state.outsoleType as never,
    )

    return value || []
  }

  abstract get liningTypes(): CustomOrderLiningType[]

  abstract get laceTypes(): CustomOrderLaceType[]

  abstract get insoleTypes(): CustomOrderInsoleType[]

  abstract get sizes(): number[]

  /**
   * Attributes
   * ※Shopifyに送信するデータ
   */
  abstract get attributes(): AttributeInput[]
}
