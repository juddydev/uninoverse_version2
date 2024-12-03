import { HTTPException } from "hono/http-exception"
import { UserEntity } from "~/domain/entities/user.entity"
import { EmailValue } from "~/domain/values/email.value"
import { NameValue } from "~/domain/values/name.value"
import { PasswordValue } from "~/domain/values/password.value"
import { UserRepository } from "~/infrastructure/repositories/user.repository"
import type { Env } from "~/worker-configuration"

type Props = {
  email: string
  password: string
}

/**
 * ユーザを作成する
 */
export class CreateUser {
  constructor(
    env: Env,
    public deps = {
      userRepository: new UserRepository(env),
    },
  ) {}

  async execute(props: Props) {
    const email = new EmailValue(props.email)

    const hashedPassword = new PasswordValue(props.password).hash()

    const userId = crypto.randomUUID()

    const userEntity = new UserEntity({
      id: userId,
      name: new NameValue(props.email),
      email: email,
      hashedPassword: hashedPassword,
    })

    const result = await this.deps.userRepository.write(userEntity)

    if (result instanceof Error) {
      return new HTTPException(400, { message: "ユーザの作成に失敗しました。" })
    }

    return null
  }
}
