import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group"

type Group = {
  name: string
  value: string
}

type Props = {
  groups: Group[]
  selectedValue: string
  onValueChange(value: string): void
}

export function RadioGroupComponent(props: Props) {
  return (
    <RadioGroup
      defaultValue={props.selectedValue}
      onValueChange={props.onValueChange}
      className="flex flex-row gap-4 overflow-x-auto lg:flex-col lg:overflow-visible"
    >
      {props.groups.map((group) => (
        <div key={group.value} className="flex cursor-pointer items-center">
          <RadioGroupItem
            value={group.value}
            className="mr-2"
            id={group.value}
          />
          <label htmlFor={group.value}>{group.name}</label>
        </div>
      ))}
    </RadioGroup>
  )
}
