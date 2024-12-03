import type { LoaderFunctionArgs } from "@shopify/remix-oxygen"
import invariant from "tiny-invariant"
import { graphql } from "~/lib/graphql-storefront"
import { toSitemap } from "~/routes/[sitemap.xml]/utils/to-sitemap"

/**
 * the google limit is 50K, however, SF API only allow querying for 250 resources each time
 */
const MAX_URLS = 250

export async function loader(props: LoaderFunctionArgs) {
  const data = await props.context.storefront.tada(SitemapQuery, {
    variables: {
      urlLimits: MAX_URLS,
      language: props.context.storefront.i18n.language,
    },
  })

  invariant(data, "Sitemap data is missing")

  return new Response(
    toSitemap({ data, baseUrl: new URL(props.request.url).origin }),
    {
      headers: {
        "content-type": "application/xml",
        "cache-control": `max-age=${60 * 60 * 24}`,
      },
    },
  )
}

export const SitemapQuery = graphql(
  `query sitemaps($urlLimits: Int, $language: LanguageCode) @inContext(language: $language) {
    products(
      first: $urlLimits
      query: "published_status:'online_store:visible'"
    ) {
      nodes {
        updatedAt
        handle
        onlineStoreUrl
        title
        featuredImage {
          url
          altText
        }
      }
    }
    collections(
      first: $urlLimits
      query: "published_status:'online_store:visible'"
    ) {
      nodes {
        updatedAt
        handle
        onlineStoreUrl
      }
    }
    pages(first: $urlLimits, query: "published_status:'published'") {
      nodes {
        updatedAt
        handle
        onlineStoreUrl
      }
    }
  }`,
)
