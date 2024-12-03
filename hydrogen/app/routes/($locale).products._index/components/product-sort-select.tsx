import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select"
import { appConfig } from "~/app-config"

type Props = {
  value: string | undefined
  onSelectedSort(sort: string | null): void
}

export function ProductSortSelect(props: Props) {
  const items = appConfig.product.sorts
  return (
    <Select
      defaultValue="recommended"
      value={props.value || "recommended"}
      onValueChange={props.onSelectedSort}
    >
      <SelectTrigger className="w-40 rounded-full">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="recommended">{"おすすめ順"}</SelectItem>
          {items.map((item) => (
            <SelectItem key={item.slug} value={item.slug}>
              {item.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
