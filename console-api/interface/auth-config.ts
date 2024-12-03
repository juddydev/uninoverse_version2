import type { AuthConfig } from "@auth/core"
import type { Context } from "hono"
import CredentialsProvider from "@auth/core/providers/credentials"
import type { Env } from "~/worker-configuration"
import { VerifyPassword } from "~/application/verify-password"

export function authConfig(c: Context<{ Bindings: Env }>): AuthConfig {
  return {
    secret: c.env.AUTH_SECRET,
    providers: [
      CredentialsProvider({
        type: "credentials",
        credentials: {
          email: { type: "text" },
          password: { type: "password" },
        },
        async authorize(credentials) {
          if (
            typeof credentials.email !== "string" ||
            typeof credentials.password !== "string"
          ) {
            return null
          }

          const verifyPassword = new VerifyPassword(c.env)

          const user = await verifyPassword.execute({
            email: credentials.email,
            password: credentials.password,
          })

          if (user === null) {
            return null
          }

          return {
            id: user.id,
            email: credentials.email,
            name: credentials.email,
          }
        },
      }),
    ],
    callbacks: {
      jwt(props) {
        if (props.user === undefined) {
          return props.token
        }
        return {
          ...props.token,
          userId: props.user.id,
          email: props.user.email,
          name: props.user.name,
          debug: 1,
        }
      },
      session(props) {
        return {
          ...props.session,
          userId: props.token.sub,
          debug: props.token.debug,
        }
      },
    },
  }
}
