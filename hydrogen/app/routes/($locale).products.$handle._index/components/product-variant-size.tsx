import { useNavigate } from "@remix-run/react"
import { VariantOption } from "@shopify/hydrogen"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select"

type Props = {
  option: VariantOption
  onChangeColor(value: string): void
}

/**
 * 商品のサイズの選択部分
 */
export function ProductVariantSize(props: Props) {
  const navigate = useNavigate()

  const options = props.option.values.filter(Boolean)

  return (
    <div className="space-y-1">
      <legend>{"サイズ"}</legend>
      <Select
        onValueChange={(value) => {
          const selectedOption = options.find((option) => {
            return option.value === value
          })
          if (selectedOption) {
            navigate(selectedOption.to)
          }
        }}
      >
        <SelectTrigger className="w-full rounded">
          <SelectValue placeholder={props.option.value} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value}
                disabled={!option.isAvailable}
              >
                {option.value}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
