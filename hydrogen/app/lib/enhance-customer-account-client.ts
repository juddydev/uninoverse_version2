import { CustomerAccount } from "@shopify/hydrogen"
import { ResultOf, TadaDocumentNode } from "gql.tada"
import { print } from "graphql"

export type TadaClient = <Result, Variables>(
  node: TadaDocumentNode<Result, Variables, void>,
  options?: { variables: Variables },
) => Promise<ResultOf<typeof node>>

export type EnhancedCustomerAccount = CustomerAccount & {
  tada: TadaClient
}

export function enhanceCustomerAccountClient(
  client: CustomerAccount,
): EnhancedCustomerAccount {
  const tada: TadaClient = async (node, options) => {
    const result = await client.query(print(node), options as never)
    if (result.errors !== undefined) {
      for (const error of result.errors) {
        throw error
      }
    }
    return result.data
  }

  return Object.assign(client, { tada })
}
