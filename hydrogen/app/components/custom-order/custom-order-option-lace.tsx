import { Card } from "~/components/ui/card"
import { CustomOrderLaceType } from "~/lib/custom-order/types/custom-order-lace-type"
import { useTranslation } from "~/lib/use-translation"
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group"

type Props = {
  values: CustomOrderLaceType[]
  value: CustomOrderLaceType
  onValueChange(value: CustomOrderLaceType): void
}

export function CustomOrderOptionLace(props: Props) {
  const t = useTranslation()

  const getLabel = (value: CustomOrderLaceType) => {
    if (value === "black") {
      return t("ブラック", "Black")
    }

    if (value === "brown") {
      return t("ブラウン", "Brown")
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
