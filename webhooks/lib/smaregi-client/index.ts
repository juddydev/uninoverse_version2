import { Hono } from "hono"
import { hc } from "hono/client"
import { InferOutput } from "valibot"
import { BlankEnv } from "hono/types"
import { StatusCode } from "hono/utils/http-status"
import { vSmaregiProduct } from "~/lib/smaregi-client/validations/smaregi-product"
import { vSmaregiStock } from "~/lib/smaregi-client/validations/smaregi-stock"

export type HonoSmaregi = Hono<
  BlankEnv,
  {
    "/:id/pos/products": {
      $get: {
        input: {
          param: { id: string }
          header: { authorization: string }
          query: { group_code?: string }
        }
        output: InferOutput<typeof vSmaregiProduct>[]
        outputFormat: "json"
        status: StatusCode
      }
    }
    "/:id/pos/products/:product": {
      $get: {
        input: {
          param: {
            id: string
            product: string
          }
          header: { authorization: string }
        }
        output: InferOutput<typeof vSmaregiProduct>
        outputFormat: "json"
        status: StatusCode
      }
      $patch: {
        input: {
          param: { id: string }
          header: { authorization: string }
          json: {
            groupCode: string
          }
        }
        output: InferOutput<typeof vSmaregiProduct>
        outputFormat: "json"
        status: StatusCode
      }
    }
    "/:id/pos/stock": {
      $get: {
        input: {
          param: { id: string }
          header: { authorization: string }
          query: { product_id?: string | null }
        }
        output: InferOutput<typeof vSmaregiStock>[]
        outputFormat: "json"
        status: StatusCode
      }
    }
  }
>

export const smaregiHc = hc<HonoSmaregi>("https://api.smaregi.jp")
