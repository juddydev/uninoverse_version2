import { CustomOrderConstruction } from "~/lib/custom-order/types/custom-order-construction"
import { CustomOrderLeatherType } from "~/lib/custom-order/types/custom-order-leather-type"
import { CustomOrderLeatherColor } from "~/lib/custom-order/types/custom-order-leather-color"
import { CustomOrderOutsoleType } from "~/lib/custom-order/types/custom-order-outsole-type"
import { CustomOrderAccessoryType } from "~/lib/custom-order/types/custom-order-accessory-type"
import { CustomOrderLiningType } from "~/lib/custom-order/types/custom-order-lining-type"
import { CustomOrderInsoleType } from "~/lib/custom-order/types/custom-order-insole-type"
import { CustomOrderLaceType } from "~/lib/custom-order/types/custom-order-lace-type"

export type CustomOrderState = {
  /**
   * 製法
   */
  construction: CustomOrderConstruction
  /**
   * 革の種類
   */
  leatherType: CustomOrderLeatherType
  /**
   * 革の色
   */
  leatherColor: CustomOrderLeatherColor
  /**
   * アウトソール
   */
  outsoleType: CustomOrderOutsoleType
  /**
   * ライニング（靴の肌に接する面）
   */
  liningType: CustomOrderLiningType
  /**
   * 中敷き
   */
  insoleType: CustomOrderInsoleType
  /**
   * 靴紐
   */
  laceType: CustomOrderLaceType
  /**
   * サイズ
   */
  size: number
  /**
   * ヒールプレート or ダイヤル
   */
  accessoryType: CustomOrderAccessoryType | null
}
