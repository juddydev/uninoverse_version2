import { CustomOrderLiningType } from "~/lib/custom-order/types/custom-order-lining-type"
import { useTranslation } from "~/lib/use-translation"

export function useCustomOrderLintingLabel(
  value: CustomOrderLiningType,
): string {
  const t = useTranslation()

  if (value === "calf-leather") {
    return t("カーフレザー", "Calf Leather")
  }

  if (value === "deer-skin") {
    return t("鹿革", "Deer Skin")
  }

  throw new Error(`Unknown value: ${value}`)
}
