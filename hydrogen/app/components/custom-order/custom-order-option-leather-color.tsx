import { Card } from "~/components/ui/card"
import { Button } from "~/components/ui/button"
import { Check } from "lucide-react"
import { CustomOrderLeatherColor } from "~/lib/custom-order/types/custom-order-leather-color"
import { customOrderLeatherColorCode } from "~/lib/custom-order/values/custom-order-leather-color-code"
import { useTranslation } from "~/lib/use-translation"
import { customOrderLeatherColor } from "~/lib/custom-order/values/custom-order-leather-color"

type Props = {
  values: CustomOrderLeatherColor[]
  value: CustomOrderLeatherColor
  onValueChange(value: CustomOrderLeatherColor): void
}

export function CustomOrderOptionLeatherColor(props: Props) {
  const t = useTranslation()

  /**
   * @param value
   */
  const getLabelName = (value: CustomOrderLeatherColor) => {
    if (value === customOrderLeatherColor.lightBrown) {
      return t("ライトブラウン", "Light Brown")
    }

    if (value === customOrderLeatherColor.darkBrown) {
      return t("ダークブラウン", "Dark Brown")
    }

    if (value === customOrderLeatherColor.antiqueGray) {
      return t("アンティークグレー", "Antique Gray")
    }

    if (value === customOrderLeatherColor.black) {
      return t("ブラック", "Black")
    }

    if (value === customOrderLeatherColor.wineRed) {
      return t("ワインレッド", "Wine Red")
    }

    if (value === customOrderLeatherColor.blue) {
      return t("ブルー", "Blue")
    }

    if (value === customOrderLeatherColor.white) {
      return t("ホワイト", "White")
    }

    if (value === customOrderLeatherColor.green) {
      return t("グリーン", "Green")
    }

    if (value === customOrderLeatherColor.gray) {
      return t("グレー", "Gray")
    }

    throw new Error(`Unknown value: ${value}`)
  }

  const isDisabled = (value: CustomOrderLeatherColor) => {
    return !props.values.includes(value)
  }

  return (
    <Card className="min-h-28 w-full p-4">
      <div className="scrollbar-hide overflow-x-auto lg:overflow-visible">
        <div className="flex flex-row gap-x-4 lg:flex-col lg:space-y-4">
          {props.values.map((value) => (
            <div
              key={value}
              className="flex flex-col items-center gap-x-4 gap-y-2 lg:flex-row"
            >
              <Button
                style={{
                  backgroundColor: customOrderLeatherColorCode.get(value),
                }}
                className="relative flex aspect-square w-24 min-w-24 rounded hover:opacity-80"
                disabled={isDisabled(value)}
                onClick={() => {
                  props.onValueChange(value)
                }}
              >
                {props.value === value && (
                  <Check className="absolute top-0 right-0 bottom-0 left-0 m-auto text-white" />
                )}
              </Button>
              <div>{getLabelName(value)}</div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}
