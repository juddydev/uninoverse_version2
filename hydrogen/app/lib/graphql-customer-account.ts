import { initGraphQLTada } from "gql.tada"
import { introspection } from "~/graphql-env.customer-account.d"

export const graphql = initGraphQLTada<{
  introspection: introspection
  scalars: {
    Decimal: `${string}`
  }
}>()

export const graphqlCustomerAccount = graphql
