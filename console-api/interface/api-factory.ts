import { createFactory } from "hono/factory"
import { Env } from "~/worker-configuration"

export const apiFactory = createFactory<{ Bindings: Env }>()
