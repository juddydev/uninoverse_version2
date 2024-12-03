import { initGraphQLTada } from "gql.tada"
import { introspection } from "~/graphql-env"

export const graphql = initGraphQLTada<{
  introspection: introspection
  scalars: {
    URL: `${string}`
    DateTime: `${string}`
    HTML: `${string}`
    Decimal: `${string}`
  }
}>()
