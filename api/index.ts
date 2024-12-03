import { api } from "~/interface/api"
import { Env } from "~/worker-configuration"

export default {
  fetch(request, env) {
    return api.fetch(request.clone(), env)
  },
} satisfies ExportedHandler<Env>
