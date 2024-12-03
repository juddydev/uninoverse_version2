import { createFactory } from "hono/factory"
import { Env } from "~/worker-configuration"

export const honoFactory = createFactory<{ Bindings: Env }>()
