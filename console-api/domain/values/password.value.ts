import { type InferInput, parse, string } from "valibot"
import { genSaltSync, hashSync } from "bcrypt-ts"

const vValue = string()

type Value = InferInput<typeof vValue>

export class PasswordValue {
  constructor(readonly value: Value) {
    parse(vValue, value)
  }

  hash() {
    const salt = genSaltSync(10)
    const hashedPassword = hashSync(this.value, salt)
    return new PasswordValue(hashedPassword)
  }
}
