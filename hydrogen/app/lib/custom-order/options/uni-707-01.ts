import { CustomOrder } from "~/lib/custom-order/custom-order"
import { CustomOrderConstruction } from "~/lib/custom-order/types/custom-order-construction"
import { CustomOrderInsoleType } from "~/lib/custom-order/types/custom-order-insole-type"
import { CustomOrderItem } from "~/lib/custom-order/types/custom-order-item"
import { CustomOrderLaceType } from "~/lib/custom-order/types/custom-order-lace-type"
import { CustomOrderLeatherType } from "~/lib/custom-order/types/custom-order-leather-type"
import { CustomOrderLiningType } from "~/lib/custom-order/types/custom-order-lining-type"
import { CustomOrderOutsoleType } from "~/lib/custom-order/types/custom-order-outsole-type"
import { customOrderConstruction } from "~/lib/custom-order/values/custom-order-construction"
import { customOrderInsoleType } from "~/lib/custom-order/values/custom-order-insole-type"
import { customOrderItem } from "~/lib/custom-order/values/custom-order-item"
import { customOrderLaceType } from "~/lib/custom-order/values/custom-order-lace-type"
import { customOrderLeatherType } from "~/lib/custom-order/values/custom-order-leather-type"
import { customOrderLiningType } from "~/lib/custom-order/values/custom-order-lining-type"
import { customOrderOutsoleType } from "~/lib/custom-order/values/custom-order-outsole-type"

export class CustomOrderOption_uni70701 extends CustomOrder {
  get variants(): CustomOrderItem[] {
    return [
      customOrderItem.construction,
      customOrderItem.leatherType,
      customOrderItem.leatherColor,
      customOrderItem.outsoleType,
      customOrderItem.liningType,
      customOrderItem.size,
    ]
  }

  get constructions(): CustomOrderConstruction[] {
    return [customOrderConstruction.goodyearWeltSpecial]
  }

  get leatherTypes(): CustomOrderLeatherType[] {
    return [
      customOrderLeatherType.baron,
      customOrderLeatherType.crocodileBack,
      customOrderLeatherType.crocodileBelly,
      customOrderLeatherType.ostrichSkin,
      customOrderLeatherType.kipskin,
      customOrderLeatherType.embossed01,
      customOrderLeatherType.embossed02,
      customOrderLeatherType.embossed03,
      customOrderLeatherType.embossed04,
      customOrderLeatherType.embossed05,
    ]
  }

  get outsoleTypes(): CustomOrderOutsoleType[] {
    return [
      customOrderOutsoleType.vibram01,
      customOrderOutsoleType.vibram02,
      customOrderOutsoleType.vibram04,
    ]
  }

  get liningTypes(): CustomOrderLiningType[] {
    return [customOrderLiningType.calfLeather, customOrderLiningType.deerSkin]
  }

  get laceTypes(): CustomOrderLaceType[] {
    return [customOrderLaceType.brown, customOrderLaceType.black]
  }

  get insoleTypes(): CustomOrderInsoleType[] {
    return [customOrderInsoleType.leather, customOrderInsoleType.leatherCustom]
  }

  get accessoryTypes() {
    return []
  }

  get sizes() {
    return [38, 39, 40, 41, 42, 43, 44, 45, 46]
  }

  get attributes() {
    return [
      { key: "construction", value: this.state.construction },
      { key: "size", value: this.state.size.toFixed() },
    ]
  }

  upperMaterial = null

  soleMaterial = null

  insoleMaterial = null

  accessoryMaterial = null
}
