import { Card } from "~/components/ui/card"
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group"

type Props = {
  values: number[]
  value: number
  onValueChange(value: number): void
}

export function CustomOrderOptionSize(props: Props) {
  return (
    <Card className="min-h-28 w-full p-4">
      <RadioGroup
        value={props.value.toFixed()}
        onValueChange={(value) => {
          props.onValueChange(Number.parseInt(value))
        }}
        className="flex flex-row gap-4 overflow-x-auto lg:flex-col lg:overflow-visible"
      >
        {props.values.map((value) => (
          <div key={value} className="flex cursor-pointer items-center">
            <RadioGroupItem
              id={value.toFixed()}
              className="mr-2"
              value={value.toFixed()}
            />
            <label htmlFor={value.toFixed()}>{value}</label>
          </div>
        ))}
      </RadioGroup>
    </Card>
  )
}
