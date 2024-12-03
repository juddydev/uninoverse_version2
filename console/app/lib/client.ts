import { hc } from "hono/client"
import type { ApiType } from "~/../console-api"

const baseUrl = typeof window !== "undefined" ? window.location.origin : "/"

export const client = hc<ApiType>(baseUrl)
