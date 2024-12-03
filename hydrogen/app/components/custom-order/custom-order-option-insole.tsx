import { Card } from "~/components/ui/card"
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group"
import { CustomOrderInsoleType } from "~/lib/custom-order/types/custom-order-insole-type"
import { customOrderInsoleType } from "~/lib/custom-order/values/custom-order-insole-type"
import { useTranslation } from "~/lib/use-translation"

type Props = {
  values: CustomOrderInsoleType[]
  value: CustomOrderInsoleType
  onValueChange(value: CustomOrderInsoleType): void
}

export function CustomOrderOptionInsole(props: Props) {
  const t = useTranslation()

  const getLabel = (value: CustomOrderInsoleType) => {
    if (value === customOrderInsoleType.leatherCustom) {
      return t("カスタム革靴", "Custom Leather")
    }

    if (value === customOrderInsoleType.leather) {
      return t("革靴", "Leather 01")
    }

    if (value === customOrderInsoleType.golf) {
      return t("ゴルフ", "Golf")
    }

    if (value === customOrderInsoleType.golfCustom) {
      return t("カスタムゴルフ", "Custom Golf")
    }

    throw new Error(`Unknown value: ${props.value}`)
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
            <label htmlFor={value}>{getLabel(value)}</label>
          </div>
        ))}
      </RadioGroup>
    </Card>
  )
}
