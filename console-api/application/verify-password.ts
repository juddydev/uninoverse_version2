import { compareSync } from "bcrypt-ts"
import { eq } from "drizzle-orm"
import { drizzle } from "drizzle-orm/d1"
import { schema } from "~/lib/schema"
import type { Env } from "~/worker-configuration"

type Props = {
  email: string
  password: string
}

/**
 * パスワードを検証する
 */
export class VerifyPassword {
  constructor(private env: Env) {}

  async execute(props: Props) {
    const db = drizzle(this.env.DB)

    const user = await db
      .select()
      .from(schema.users)
      .where(eq(schema.users.email, props.email))
      .get()

    if (user === undefined) {
      return null
    }

    if (user.hashedPassword === null) {
      return null
    }

    const result = compareSync(props.password, user.hashedPassword)

    if (result === false) {
      return null
    }

    return { id: user.id }
  }
}
