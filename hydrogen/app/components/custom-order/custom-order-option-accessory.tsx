import { Card } from "~/components/ui/card"
import { CustomOrderAccessoryType } from "~/lib/custom-order/types/custom-order-accessory-type"
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group"
import { useTranslation } from "~/lib/use-translation"
import { customOrderAccessoryType } from "~/lib/custom-order/values/custom-order-accessory-type"

type Props = {
  values: CustomOrderAccessoryType[]
  value: CustomOrderAccessoryType | null
  onValueChange(value: CustomOrderAccessoryType): void
}

export function CustomOrderOptionAccessory(props: Props) {
  const t = useTranslation()

  /**
   * @param value
   */
  const getLabelName = (value: CustomOrderAccessoryType) => {
    if (value === customOrderAccessoryType.heelMetalPlate) {
      return t("ヒールメタルプレート", "Heel Metal Plate")
    }

    if (value === customOrderAccessoryType.heelPlateBlack) {
      return t("ヒールプレート（ブラック）", "Heel Plate (Black)")
    }

    if (value === customOrderAccessoryType.heelPlateDarkBrown) {
      return t("ヒールプレート（ダークブラウン）", "Heel Plate (Dark Brown)")
    }

    if (value === customOrderAccessoryType.heelPlateBlue) {
      return t("ヒールプレート（ブルー）", "Heel Plate (Blue)")
    }

    if (value === customOrderAccessoryType.heelPlateWineRed) {
      return t("ヒールプレート（ワインレッド）", "Heel Plate (Wine Red)")
    }

    if (value === customOrderAccessoryType.heelPlateLightBrown) {
      return t("ヒールプレート（ライトブラウン）", "Heel Plate (Light Brown)")
    }

    if (value === customOrderAccessoryType.heelPlateAntiqueGray) {
      return t("ヒールプレート（グレー）", "Heel Plate (Antique Gray)")
    }

    if (value === customOrderAccessoryType.buckleBlack) {
      return t("黒ダイヤル", "Black Buckle")
    }

    if (value === customOrderAccessoryType.buckleWhite) {
      return t("白ダイヤル", "White Buckle")
    }

    throw new Error(`Unknown value: ${props.value}`)
  }

  const isDisabled = (value: CustomOrderAccessoryType) => {
    return !props.values.includes(value)
  }

  return (
    <Card className="min-h-28 w-full p-4">
      <RadioGroup
        value={props.value ?? ""}
        onValueChange={props.onValueChange}
        className="flex flex-row gap-4 overflow-x-auto lg:flex-col lg:overflow-visible"
      >
        {props.values.map((value) => (
          <div key={value} className="flex cursor-pointer items-center">
            <RadioGroupItem
              id={value}
              className="mr-2"
              value={value}
              disabled={isDisabled(value)}
            />
            <label htmlFor={value}>{getLabelName(value)}</label>
          </div>
        ))}
      </RadioGroup>
    </Card>
  )
}
