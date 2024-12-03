import { WorkerEntrypoint } from "cloudflare:workers"
import { api } from "~/interface/api"
import { Env } from "~/worker-configuration"

export type ApiType = typeof api

export default class extends WorkerEntrypoint<Env> {
  fetch(request: Request) {
    return api.fetch(request.clone(), this.env)
  }
}
