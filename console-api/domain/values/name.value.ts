import {
  type InferInput,
  maxLength,
  minLength,
  parse,
  pipe,
  string,
} from "valibot"

const vValue = pipe(string(), minLength(2), maxLength(128))

type Value = InferInput<typeof vValue>

export class NameValue {
  constructor(readonly value: Value) {
    parse(vValue, value)
  }

  /**
   * 長過ぎる
   */
  get isTooLong() {
    return 12 < this.value.length
  }

  /**
   * デバッグ用の値を返す
   * @returns
   */
  static debug() {
    return new NameValue("John Doe")
  }
}
