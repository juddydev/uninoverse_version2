import { Await, defer, Link, useLoaderData } from "@remix-run/react"
import type { LoaderFunctionArgs, MetaArgs } from "@shopify/remix-oxygen"
import { Suspense } from "react"
import { HomeAboutAvatar } from "~/routes/($locale)._index/components/home-about-avatar"
import { HomeAboutCustom } from "~/routes/($locale)._index/components/home-about-custom"
import { HomeAboutUs } from "~/routes/($locale)._index/components/home-about-us"
import { HomeFirstView } from "~/routes/($locale)._index/components/home-first-view"
import { HomeInstagram } from "~/routes/($locale)._index/components/home-instagram"
import { HomeItemCategory } from "~/routes/($locale)._index/components/home-item-category"
import { HomeRecommended } from "~/routes/($locale)._index/components/home-recommended"
import { HomeStore } from "~/routes/($locale)._index/components/home-store"
import {
  RecommendedProductCard,
  RecommendedProductCardFragment,
} from "~/routes/($locale)._index/components/recommended-product-card"
import {
  CacheLong,
  generateCacheControlHeader,
  getSeoMeta,
  SeoConfig,
} from "@shopify/hydrogen"
import { graphql } from "~/lib/graphql-storefront"

export function meta({ data }: MetaArgs<typeof loader>) {
  return getSeoMeta(data?.seoConfig)
}

/**
 * ホーム
 */
export default function Route() {
  const data = useLoaderData<typeof loader>()

  return (
    <main className="space-y-12 pb-16 md:space-y-16 lg:space-y-24">
      <HomeFirstView />
      <HomeItemCategory />
      <HomeRecommended>
        <Suspense>
          <Await resolve={data.featuredProducts}>
            {(context) => {
              const products = context.products.nodes.filter((_, i) => i < 6)
              return products.map((product) => (
                <Link key={product.id} to={`/products/${product.handle}`}>
                  <RecommendedProductCard key={product.id} product={product} />
                </Link>
              ))
            }}
          </Await>
        </Suspense>
      </HomeRecommended>
      <HomeStore />
      <HomeInstagram />
      <HomeAboutUs />
      <HomeAboutAvatar />
      <HomeAboutCustom />
    </main>
  )
}

export async function loader(props: LoaderFunctionArgs) {
  const products = props.context.storefront.tada(LoaderQuery, {
    variables: {
      country: props.context.storefront.i18n.country,
      language: props.context.storefront.i18n.language,
    },
  })

  const seoConfig = {
    title: "UNINOVERSE",
    description: "The best place to buy snowboarding products",
    robots: {
      noIndex: false,
      noFollow: false,
    },
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "トップページ",
    },
  } satisfies SeoConfig

  return defer(
    {
      seoConfig: seoConfig,
      featuredProducts: products,
    },
    {
      headers: {
        "Cache-Control": generateCacheControlHeader(CacheLong()),
      },
    },
  )
}

const LoaderQuery = graphql(
  `query IndexPage($country: CountryCode, $language: LanguageCode) @inContext(country: $country, language: $language) {
    shop {
      id
      name
      description
      primaryDomain {
        url
      }
      brand {
        logo {
          image {
            url
          }
        }
      }
    }
    products(first: 8) {
      nodes {
        id
        handle
        ...RecommendedProductCard
      }
    }
  }
`,
  [RecommendedProductCardFragment],
)
