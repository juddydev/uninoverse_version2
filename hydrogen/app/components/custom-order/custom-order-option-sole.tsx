import { Card } from "~/components/ui/card"
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group"
import { CustomOrderOutsoleType } from "~/lib/custom-order/types/custom-order-outsole-type"
import { customOrderOutsoleType } from "~/lib/custom-order/values/custom-order-outsole-type"
import { useTranslation } from "~/lib/use-translation"

type Props = {
  values: CustomOrderOutsoleType[]
  value: CustomOrderOutsoleType
  onValueChange(value: CustomOrderOutsoleType): void
}

export function CustomOrderOptionOutsole(props: Props) {
  const t = useTranslation()

  /**
   * @param value
   */
  const getLabelName = (value: CustomOrderOutsoleType) => {
    if (value === customOrderOutsoleType.halfRubber01)
      return t("ハーフラバー I", "Half Rubber I")

    if (value === customOrderOutsoleType.halfRubber02) {
      return t("ハーフラバー II", "Half Rubber II")
    }

    if (value === customOrderOutsoleType.leather01) {
      return t("レザー I", "Leather I")
    }

    if (value === customOrderOutsoleType.leather02) {
      return t("レザー II", "Leather II")
    }

    if (value === customOrderOutsoleType.leather03) {
      return t("レザー III", "Leather III")
    }

    if (value === customOrderOutsoleType.vibram01) {
      return t("Vibram I", "Vibram I")
    }

    if (value === customOrderOutsoleType.vibram02) {
      return t("Vibram II", "Vibram II")
    }

    if (value === customOrderOutsoleType.vibram04) {
      return t("Vibram IV", "Vibram IV")
    }

    if (value === customOrderOutsoleType.vibramGolfGray) {
      return t("Vibram Golf Gray", "Vibram Golf Gray")
    }

    if (value === customOrderOutsoleType.vibramGolfWhite) {
      return t("Vibram Golf White", "Vibram Golf White")
    }

    throw new Error(`Unknown value: ${value}`)
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
