import { Hono } from "hono"
import { hc } from "hono/client"
import { BlankEnv } from "hono/types"
import { StatusCode } from "hono/utils/http-status"

export type HonoSmaregiId = Hono<
  BlankEnv,
  {
    "/app/:id/token": {
      $post: {
        input: {
          param: { id: string }
          form: {
            grant_type: string
            scope: string
          }
          header: {
            authorization: string
            "content-type": "application/x-www-form-urlencoded"
          }
        }
        output: {
          scope: string
          token_type: string
          expires_in: number
          access_token: string
        }
        outputFormat: "json"
        status: StatusCode
      }
    }
  }
>

export const smaregiIdHc = hc<HonoSmaregiId>("https://id.smaregi.jp", {
  async fetch(input: RequestInfo | URL, init?: RequestInit) {
    if (init?.body instanceof FormData) {
      const resp = await fetch(input, {
        ...init,
        body: new URLSearchParams(init.body as never),
      })
      return resp
    }
    return fetch(input, init)
  },
})
