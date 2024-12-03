import { type InferInput, parse, string } from "valibot"

const vValue = string()

type Value = InferInput<typeof vValue>

export class EmailValue {
  constructor(readonly value: Value) {
    parse(vValue, value)
  }
}
