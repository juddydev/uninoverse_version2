import { Card } from "~/components/ui/card"
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group"
import { CustomOrderConstruction } from "~/lib/custom-order/types/custom-order-construction"
import { customOrderConstruction } from "~/lib/custom-order/values/custom-order-construction"
import { useTranslation } from "~/lib/use-translation"

type Props = {
  values: CustomOrderConstruction[]
  value: CustomOrderConstruction
  onValueChange(value: CustomOrderConstruction): void
}

export function CustomOrderOptionConstruction(props: Props) {
  const t = useTranslation()

  const getLabelName = (value: CustomOrderConstruction) => {
    if (value === customOrderConstruction.goodyearWelt) {
      return t("グッドイヤー", "Goodyear Welt")
    }

    if (value === customOrderConstruction.goodyearWeltSpecial) {
      return t("グッドイヤー（特別）", "Goodyear Welt Special")
    }

    if (value === customOrderConstruction.norwegian) {
      return t("ノルウェージャン", "Norwegian")
    }

    if (value === customOrderConstruction.norwegianSpecial) {
      return t("ノルウェージャン（特別）", "Norwegian Special")
    }

    if (value === customOrderConstruction.cement) {
      return t("セメント", "Cement")
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
            <label htmlFor={value}>{getLabelName(value)}</label>
          </div>
        ))}
      </RadioGroup>
    </Card>
  )
}
