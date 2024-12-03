import "@shopify/shopify-api/adapters/cf-worker"

import { api } from "~/interface/api"
import { Env } from "~/worker-configuration"

export default { fetch: api.fetch } satisfies ExportedHandler<Env>
