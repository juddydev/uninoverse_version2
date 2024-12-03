import { drizzle } from "drizzle-orm/d1"
import { schema } from "~/lib/schema"
import type { UserEntity } from "~/domain/entities/user.entity"
import type { Env } from "~/worker-configuration"

/**
 * 管理者
 */
export class UserRepository {
  constructor(private env: Env) {}

  async write(entity: UserEntity) {
    try {
      const db = drizzle(this.env.DB)

      await db.insert(schema.users).values({
        id: entity.id,
        name: entity.name.value,
        email: entity.email.value,
        hashedPassword: entity.hashedPassword.value,
        createdAt: new Date(),
        updatedAt: new Date(),
      })

      return null
    } catch (error) {
      console.error(error)
      if (error instanceof Error) {
        return error
      }
      return new Error("UNKNOWN_ERROR")
    }
  }
}
