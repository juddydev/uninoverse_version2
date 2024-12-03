import { Button } from "~/components/ui/button"
import { CustomOrderItem } from "~/lib/custom-order/types/custom-order-item"
import { customOrderItem } from "~/lib/custom-order/values/custom-order-item"
import { useTranslation } from "~/lib/use-translation"

type Props = {
  keys: CustomOrderItem[]
  tabValue: string
  onChange(value: CustomOrderItem): void
}

export function CustomOrderTabButtons(props: Props) {
  const t = useTranslation()

  return (
    <div className="flex w-full min-w-32 flex-row gap-4 overflow-x-auto p-0 lg:w-32 lg:flex-col lg:overflow-visible">
      {props.keys.map((key) => (
        <Button
          key={key}
          value={key}
          className={"rounded-full"}
          variant={props.tabValue === key ? "default" : "outline"}
          onClick={() => {
            props.onChange(key)
          }}
        >
          {key === customOrderItem.construction && t("製法", "Construction")}
          {key === customOrderItem.leatherType && t("レザー", "Leather")}
          {key === customOrderItem.leatherColor && t("カラー", "Leather Color")}
          {key === customOrderItem.outsoleType && t("ソール", "Outer Sole")}
          {key === customOrderItem.laceType && t("靴紐", "Lace")}
          {key === customOrderItem.insoleType && t("インソール", "Insole")}
          {key === customOrderItem.liningType && t("ライニング", "Lining")}
          {key === customOrderItem.size && t("サイズ", "Size")}
          {key === customOrderItem.accessoryHeelType && t("プレート", "Plate")}
          {key === customOrderItem.accessoryBuckleType &&
            t("ダイヤル", "Buckle")}
        </Button>
      ))}
    </div>
  )
}
