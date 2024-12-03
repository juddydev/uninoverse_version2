import { Card } from "~/components/ui/card"
import { useTranslation } from "~/lib/use-translation"
import { CustomOrderLiningType } from "~/lib/custom-order/types/custom-order-lining-type"
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group"

type Props = {
  values: CustomOrderLiningType[]
  value: CustomOrderLiningType
  onValueChange(value: CustomOrderLiningType): void
}

export function CustomOrderOptionLining(props: Props) {
  const t = useTranslation()

  const getLabel = (value: CustomOrderLiningType) => {
    if (value === "calf-leather") {
      return t("カーフレザー", "Calf Leather")
    }

    if (value === "deer-skin") {
      return t("ディアレザー", "Deer Skin")
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
