import { type InferInput, instance, object, parse, string } from "valibot"
import { EmailValue } from "~/domain/values/email.value"
import { NameValue } from "~/domain/values/name.value"
import { PasswordValue } from "~/domain/values/password.value"

const vProps = object({
  id: string(),
  name: instance(NameValue),
  email: instance(EmailValue),
  hashedPassword: instance(PasswordValue),
})

type Props = InferInput<typeof vProps>

/**
 * ユーザ
 */
export class UserEntity implements Props {
  /**
   * ID
   */
  readonly id!: Props["id"]

  readonly name!: Props["name"]

  readonly email!: Props["email"]

  readonly hashedPassword!: Props["hashedPassword"]

  constructor(props: Props) {
    Object.assign(this, parse(vProps, props))
    Object.freeze(this)
  }

  updateName(value: NameValue) {
    return new UserEntity({ ...this, name: value })
  }

  updatePassword(value: PasswordValue) {
    return new UserEntity({ ...this, hashedPassword: value.hash() })
  }
}
