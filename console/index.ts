import { type ServerBuild, createRequestHandler } from "@remix-run/cloudflare"
import { getLoadContext } from "./load-context"
import type { Env } from "./worker-configuration"

// @ts-ignore This file won’t exist if it hasn’t yet been built
import * as build from "./build/server"

const handleRemixRequest = createRequestHandler(build as unknown as ServerBuild)

export default {
  async fetch(request, env, ctx) {
    try {
      const loadContext = getLoadContext({
        request,
        context: {
          cloudflare: {
            /**
             * https://developers.cloudflare.com/workers/wrangler/api/#getplatformproxy
             */
            cf: request.cf,
            ctx: {
              waitUntil: ctx.waitUntil.bind(ctx),
              passThroughOnException: ctx.passThroughOnException.bind(ctx),
            },
            caches,
            env,
          },
        },
      })
      return await handleRemixRequest(request, loadContext)
    } catch (error) {
      console.log(error)
      return new Response("An unexpected error occurred", { status: 500 })
    }
  },
} satisfies ExportedHandler<Env>
