import { Card } from "~/components/ui/card"
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group"
import { CustomOrderLeatherType } from "~/lib/custom-order/types/custom-order-leather-type"
import { customOrderLeatherType } from "~/lib/custom-order/values/custom-order-leather-type"
import { useTranslation } from "~/lib/use-translation"

type Props = {
  values: CustomOrderLeatherType[]
  value: CustomOrderLeatherType
  onValueChange(value: CustomOrderLeatherType): void
}

/**
 * 全ての靴で共通する項目
 * @param props
 * @returns
 */
export function CustomOrderOptionLeather(props: Props) {
  const t = useTranslation()

  /**
   * @param value
   */
  const getLabelName = (value: CustomOrderLeatherType) => {
    if (value === customOrderLeatherType.baron) {
      return t("バロン", "Baron")
    }

    if (value === customOrderLeatherType.boxCalf) {
      return t("Box Calf", "Box Calf")
    }

    if (value === customOrderLeatherType.crocodileBelly) {
      return t("クロコダイル・腹", "Crocodile Belly")
    }

    if (value === customOrderLeatherType.crocodileBack) {
      return t("クロコダイル・背", "Crocodile Back")
    }

    if (value === customOrderLeatherType.deerSkin) {
      return t("ディアスキン", "Deer Skin")
    }

    if (value === customOrderLeatherType.embossed01) {
      return t("エンボス・01", "Embossed 01")
    }

    if (value === customOrderLeatherType.embossed02) {
      return t("エンボス・02", "Embossed 02")
    }

    if (value === customOrderLeatherType.embossed03) {
      return t("エンボス・03", "Embossed 03")
    }

    if (value === customOrderLeatherType.embossed04) {
      return t("エンボス・04", "Embossed 04")
    }

    if (value === customOrderLeatherType.embossed05) {
      return t("エンボス・05", "Embossed 05")
    }

    if (value === customOrderLeatherType.kipskin) {
      return t("キップ・スキン", "Milled Kip")
    }

    if (value === customOrderLeatherType.ostrichSkin) {
      return t("オーストリッチ", "Ostrich Skin")
    }

    if (value === customOrderLeatherType.scotchGrain) {
      return t("スコッチグレイン", "Scotch Grain")
    }

    if (value === customOrderLeatherType.suede) {
      return t("スエード", "Suede")
    }

    if (value === customOrderLeatherType.waterproofCalf) {
      return t("ウォータープルーフカーフ", "Waterproof Calf")
    }
  }

  return (
    <Card className="min-h-28 w-full p-4">
      <RadioGroup
        value={props.value}
        onValueChange={props.onValueChange}
        className="flex flex-row gap-4 overflow-x-auto lg:flex-col lg:overflow-visible"
      >
        {props.values.map((value) => (
          <div key={value} className="flex cursor-pointer items-center">
            <RadioGroupItem id={value} className="mr-2" value={value} />
            <label htmlFor={value}>{getLabelName(value)}</label>
          </div>
        ))}
      </RadioGroup>
    </Card>
  )
}
