import { CachingStrategy, I18nBase, Storefront } from "@shopify/hydrogen"
import { ResultOf, TadaDocumentNode } from "gql.tada"
import { print } from "graphql"

export type TadaClient = <Result, Variables>(
  node: TadaDocumentNode<Result, Variables, void>,
  options?: {
    variables: Variables
    displayName?: string
    headers?: HeadersInit
    storefrontApiVersion?: string
    cache?: CachingStrategy
  },
) => Promise<ResultOf<typeof node>>

export type EnhancedStorefront<TI18n extends I18nBase = I18nBase> =
  Storefront<TI18n> & {
    tada: TadaClient
  }

export function enhanceStorefrontClient<TI18n extends I18nBase = I18nBase>(
  client: Storefront<TI18n>,
): EnhancedStorefront<TI18n> {
  const tada: TadaClient = async (node, options) => {
    const result = await client.query(print(node), options as never)
    if (result.errors !== undefined) {
      for (const error of result.errors) {
        throw error
      }
    }
    return result
  }

  return Object.assign(client, { tada })
}
