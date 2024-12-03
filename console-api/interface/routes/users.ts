import { vValidator } from "@hono/valibot-validator"
import { object, string } from "valibot"
import { HTTPException } from "hono/http-exception"
import { CreateUser } from "~/application/create-user"
import { apiFactory } from "~/interface/api-factory"

export const usersRoute = apiFactory
  .createApp()
  /**
   * アカウント作成する
   */
  .post(
    "/",
    vValidator("json", object({ email: string(), password: string() })),
    async (c) => {
      try {
        const json = c.req.valid("json")

        const createUser = new CreateUser(c.env)

        const account = await createUser.execute({
          email: json.email,
          password: json.password,
        })

        if (account instanceof Error) {
          throw new HTTPException(500, {
            message: "アカウントの作成に失敗しました。",
          })
        }

        return c.json({})
      } catch (error) {
        if (error instanceof Error) {
          throw new HTTPException(500, { message: error.message })
        }
        throw new HTTPException(500)
      }
    },
  )
