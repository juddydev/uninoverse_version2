import { Await, defer, useLoaderData, useSearchParams } from "@remix-run/react"
import {
  AnalyticsPageType,
  getSelectedProductOptions,
  SeoConfig,
  getSeoMeta,
  ShopifyAnalyticsProduct,
  VariantSelector,
} from "@shopify/hydrogen"
import { LoaderFunctionArgs, MetaArgs, redirect } from "@shopify/remix-oxygen"
import { Suspense } from "react"
import invariant from "tiny-invariant"
import { CustomBreadcrumb } from "~/components/custom/custom-breadcrumb"
import { graphql } from "~/lib/graphql-storefront"
import {
  ProductCarousel,
  ProductCarouselFragment,
} from "~/routes/($locale).products.$handle._index/components/product-carousel"
import {
  ProductDetails,
  ProductDetailsFragment,
} from "~/routes/($locale).products.$handle._index/components/product-details"
import {
  ProductCard,
  ProductCardFragment,
} from "~/routes/($locale).products._index/components/product-card"
import { truncate } from "~/utils/truncate"
import {
  ProductFormMediaFragment,
  ProductVariantColor,
} from "~/routes/($locale).products.$handle._index/components/product-variant-color"
import { readFragment } from "gql.tada"
import {
  ProductTitle,
  ProductTitleFragment,
} from "~/routes/($locale).products.$handle._index/components/product-title"
import { ProductVariantSize } from "~/routes/($locale).products.$handle._index/components/product-variant-size"
import { useSearchParamsVariants } from "~/routes/($locale).products.$handle._index/utils/use-search-params-variants"
import {
  ProductPaymentForm,
  ProductPaymentFormFragment,
} from "~/routes/($locale).products.$handle._index/components/product-payment-form"

export function meta({ data }: MetaArgs<typeof loader>) {
  return getSeoMeta(data?.seoConfig)
}

export default function Route() {
  const data = useLoaderData<typeof loader>()

  const [searchParams, setSearchParams] = useSearchParams()

  const variants = useSearchParamsVariants(searchParams, setSearchParams)

  /**
   * 製品の画像
   */
  const mediaImages = data.product.media.nodes
    .filter((node) => {
      return node.__typename === "MediaImage"
    })
    .filter((node) => {
      return node !== null
    })

  const productBreadcrumb = readFragment(
    ProductBreadcrumbFragment,
    data.product,
  )

  const variantSelector = readFragment(
    ProductVariantSelectorFragment,
    data.product,
  )

  return (
    <main className="container pt-4">
      <CustomBreadcrumb
        items={[
          { title: "全てのアイテム", href: "/products" },
          {
            title: productBreadcrumb.title,
            href: `/products/${productBreadcrumb.handle}`,
          },
        ]}
      />
      <section className="flex flex-col gap-4 sm:gap-8 md:flex-row">
        <div className="flex-1">
          <ProductCarousel
            selectedColor={variants.color}
            mediaImages={mediaImages}
          />
        </div>
        <div className="w-full flex-1 space-y-8 md:max-w-xs">
          <div className="space-y-2">
            <ProductTitle product={data.product} />
            <Suspense fallback={null}>
              <Await
                errorElement="There was a problem loading related products"
                resolve={data.variantsPromise}
              >
                {(resp) => (
                  <VariantSelector
                    handle={variantSelector.handle}
                    options={variantSelector.options}
                    variants={resp.product?.variants.nodes || []}
                  >
                    {(context) => {
                      if (context.option.name === "color") {
                        return (
                          <ProductVariantColor
                            option={context.option}
                            mediaImages={mediaImages}
                            onChangeColor={variants.setColor}
                          />
                        )
                      }
                      if (context.option.name === "size") {
                        return (
                          <ProductVariantSize
                            option={context.option}
                            onChangeColor={variants.setSize}
                          />
                        )
                      }
                    }}
                  </VariantSelector>
                )}
              </Await>
            </Suspense>
          </div>
          <ProductDetails product={data.product} />
          <ProductPaymentForm product={data.product} />
        </div>
      </section>
      <section className="pt-8">
        <h2>{"関連商品"}</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:px-16">
          {data.relatedProducts.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      </section>
    </main>
  )
}

export async function loader(props: LoaderFunctionArgs) {
  invariant(props.params.handle, "Missing handle param, check route filename")

  const selectedOptions = getSelectedProductOptions(props.request)

  const data = await props.context.storefront.tada(ProductQuery, {
    variables: {
      handle: props.params.handle,
      selectedOptions,
      country: props.context.storefront.i18n.country,
      language: props.context.storefront.i18n.language,
    },
  })

  const product = readFragment(LoaderProductFragment, data.product)

  if (product === null) {
    throw new Response("product", { status: 404 })
  }

  const selectedVariant = readFragment(
    SelectedVariantFragment,
    data.product?.selectedVariant,
  )

  if (!data.product?.selectedVariant) {
    const url = new URL(props.request.url)

    const searchParams = new URLSearchParams(url.search)

    const [firstVariant] = product?.variants.nodes ?? []

    for (const option of firstVariant.selectedOptions) {
      searchParams.set(option.name, option.value)
    }

    url.search = searchParams.toString()

    throw redirect(url.href.replace(url.origin, ""), 302)
    // throw redirectToFirstVariant({ product, request: props.request })
  }

  const variants = props.context.storefront.tada(ClientVariantsQuery, {
    variables: {
      handle: props.params.handle,
      country: props.context.storefront.i18n.country,
      language: props.context.storefront.i18n.language,
    },
  })

  const relatedProductsResult = await props.context.storefront.tada(
    RecommendedProductsQuery,
    { variables: { productId: product.id, count: 12 } },
  )

  invariant(relatedProductsResult, "No data returned from Shopify API")

  const relatedProducts = (relatedProductsResult.recommended ?? [])
    .concat(relatedProductsResult.additional.nodes)
    .filter((value, index, array) => {
      return array.findIndex((value2) => value2.id === value.id) === index
    })
    .filter((node) => {
      return node.id !== product.id
    })
    .filter((node) => {
      return !node.handle.includes("custom")
    })

  const [firstVariant] = product.variants.nodes

  const productVariant = selectedVariant ?? firstVariant ?? null

  /**
   * TODO: 用途を調べる
   */
  const productAnalytics: ShopifyAnalyticsProduct = {
    productGid: product.id,
    variantGid: productVariant.id,
    name: product.title,
    variantName: productVariant.title,
    brand: product.vendor,
    price: productVariant.price.amount,
  }

  const seoConfig = {
    title: product?.seo?.title ?? product?.title,
    description: truncate(
      product?.seo?.description ?? product?.description ?? "",
    ),
    media: productVariant?.image,
    // TODO: JsonLd
    // jsonLd: productJsonLd({ product, selectedVariant, url: props.request.url }),
  } satisfies SeoConfig

  return defer({
    seoConfig,
    variantsPromise: variants,
    product: data.product,
    relatedProducts: relatedProducts,
    analytics: {
      pageType: AnalyticsPageType.product,
      resourceId: product.id,
      products: [productAnalytics],
      totalValue: Number.parseFloat(productVariant.price.amount),
    },
  })
}

const RecommendedProductsQuery = graphql(
  `query productRecommendations(
    $productId: ID!
    $count: Int
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    recommended: productRecommendations(productId: $productId) {
      id
      handle
      ...ProductCardFragment
    }
    additional: products(first: $count, sortKey: BEST_SELLING) {
      nodes {
        id
        handle
        ...ProductCardFragment
      }
    }
  }`,
  [ProductCardFragment],
)
const ProductVariantSelectorFragment = graphql(
  `fragment ProductVariantSelectorFragment on Product @_unmask {
    id
    handle
    options {
      id
      name
      values
      optionValues {
        id
        name
      }
    }
  }`,
)

const ProductBreadcrumbFragment = graphql(
  `fragment ProductBreadcrumbFragment on Product @_unmask {
    id
    title
    handle
  }`,
)

const ProductVariantsFormFragment = graphql(
  `fragment ProductVariantsFormFragment on ProductVariant @_unmask {
    id
    availableForSale
    price {
      ...on MoneyV2 {
        amount
        currencyCode
      }
    }
    compareAtPrice {
      ...on MoneyV2 {
        amount
        currencyCode
      }
    }
  }`,
)

/**
 * 最新の在庫を取得する
 */
export const ClientVariantsQuery = graphql(
  `query variants(
    $country: CountryCode
    $language: LanguageCode
    $handle: String!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      variants(first: 128) {
        nodes {
          id
          ...ProductVariantsFormFragment
        }
      }
    }
  }`,
  [ProductVariantsFormFragment],
)

export const LoaderProductSeoFragment = graphql(
  `fragment LoaderProductSeoFragment on SEO @_unmask {
    title
    description
  }`,
)

export const SelectedVariantFragment = graphql(
  `fragment SelectedVariantFragment on ProductVariant @_unmask {
    id
    selectedOptions {
      name
      value
    }
    title
    price {
      ...on MoneyV2 {
        amount
        currencyCode
      }
    }
    image {
      id
      altText
      height
      width
      url
    }
  }`,
)

export const LoaderProductFragment = graphql(
  `fragment LoaderProductFragment on Product {
    id
    title
    vendor
    description
    variants(first: 1) {
      nodes {
        ...SelectedVariantFragment
      }
    }
    seo {
      ...LoaderProductSeoFragment
    }
  }`,
  [SelectedVariantFragment, LoaderProductSeoFragment],
)

const ProductQuery = graphql(
  `query Product(
    $country: CountryCode
    $language: LanguageCode
    $handle: String!
    $selectedOptions: [SelectedOptionInput!]!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      ...LoaderProductFragment
      ...ProductBreadcrumbFragment
      ...ProductTitleFragment
      ...ProductDetailsFragment
      ...ProductVariantSelectorFragment
      ...ProductPaymentFormFragment
      selectedVariant: variantBySelectedOptions(selectedOptions: $selectedOptions, ignoreUnknownOptions: true, caseInsensitiveMatch: true) {
        ...SelectedVariantFragment
      }
      media(first: 128) {
        nodes {
          __typename
          ... on MediaImage {
            ...ProductCarouselFragment
            ...ProductFormMediaFragment
          }
        }
      }
    }
  }`,
  [
    LoaderProductFragment,
    LoaderProductSeoFragment,
    ProductCarouselFragment,
    ProductDetailsFragment,
    ProductFormMediaFragment,
    ProductBreadcrumbFragment,
    ProductTitleFragment,
    SelectedVariantFragment,
    ProductVariantSelectorFragment,
    ProductPaymentFormFragment,
  ],
)
