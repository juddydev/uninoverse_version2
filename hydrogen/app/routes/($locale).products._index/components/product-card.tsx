import { Link } from "@remix-run/react"
import type { ShopifyAnalyticsProduct } from "@shopify/hydrogen"
import { Image, Money, flattenConnection } from "@shopify/hydrogen"
import type { MoneyV2 } from "@shopify/hydrogen/storefront-api-types"
import { FragmentOf, readFragment } from "gql.tada"
import { AddToCartButton } from "~/components/add-to-cart-button"
import { Button } from "~/components/ui/button"
import { cn } from "~/lib/utils"
import { graphql } from "~/lib/graphql-storefront"
import { CompareAtPrice } from "~/routes/($locale).products._index/components/compare-at-price-text"
import { ProductBadge } from "~/routes/($locale).products._index/components/product-badge"
import { isDiscounted } from "~/utils/is-discounted"
import { isNewArrival } from "~/utils/is-new-arraival"

type Props = {
  product: FragmentOf<typeof ProductCardFragment>
  className?: string
  loading?: HTMLImageElement["loading"]
  onClick?(): void
  quickAdd?: boolean
}

export function ProductCard(props: Props) {
  const product = readFragment(ProductCardFragment, props.product)

  if (!product.variants?.nodes?.length) {
    return null
  }

  const [firstVariant] = flattenConnection(product.variants)

  if (!firstVariant) {
    return null
  }

  if (firstVariant.image == null) {
    return null
  }

  const _isDiscounted = isDiscounted(
    firstVariant.price as MoneyV2,
    firstVariant.compareAtPrice as MoneyV2,
  )

  const _isNewArrival = isNewArrival(product.publishedAt)

  const productAnalytics: ShopifyAnalyticsProduct = {
    productGid: product.id,
    variantGid: firstVariant.id,
    name: product.title,
    variantName: firstVariant.title,
    brand: product.vendor,
    price: firstVariant.price.amount,
    quantity: 1,
  }

  if (product.featuredImage == null) return null

  return (
    <div className="flex flex-col gap-2">
      <div className={cn("grid gap-4", props.className)}>
        <div className="card-image bg-primary/5">
          <Link
            className={"block"}
            onClick={props.onClick}
            to={`/products/${product.handle}`}
            prefetch="intent"
          >
            <Image
              className="fadeIn w-full object-cover"
              sizes="(min-width: 64em) 25vw, (min-width: 48em) 30vw, 45vw"
              data={product.featuredImage}
              alt={product.title}
              loading={props.loading}
            />
          </Link>
        </div>
        <div className="space-y-2">
          {/* <Button
            size={"sm"}
            className="block h-6 w-full border-none bg-neutral-400 font-normal text-white text-xs"
            style={{ borderRadius: "0.2rem" }}
          >
            {"試着リスト ＋"}
          </Button> */}
          <Link
            className={"block"}
            onClick={props.onClick}
            to={`/products/${product.handle}`}
            prefetch="intent"
          >
            <div className="space-y-1">
              <div>
                <h3 className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-sm">
                  {product.title}
                </h3>
                <div className="flex gap-4">
                  <span className="flex gap-4 text-sm">
                    <Money withoutTrailingZeros data={firstVariant.price} />
                    {isDiscounted(
                      firstVariant.price as MoneyV2,
                      firstVariant.compareAtPrice as MoneyV2,
                    ) && (
                      <CompareAtPrice
                        className={"opacity-50"}
                        data={firstVariant.compareAtPrice as MoneyV2}
                      />
                    )}
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap gap-1">
                {_isNewArrival && <ProductBadge type={"NEW"} />}
                {_isDiscounted && <ProductBadge type={"DISCOUNTED"} />}
                {/* <ProductBadge type="CUSTOMIZE" /> */}
              </div>
            </div>
          </Link>
        </div>
      </div>
      {props.quickAdd && firstVariant.availableForSale && (
        <AddToCartButton
          lines={[
            {
              quantity: 1,
              merchandiseId: firstVariant.id,
            },
          ]}
          analytics={{
            products: [productAnalytics],
            totalValue: Number.parseFloat(productAnalytics.price),
          }}
        >
          <span className="flex items-center justify-center gap-2 text-sm">
            {"Add to Cart"}
          </span>
        </AddToCartButton>
      )}
      {props.quickAdd && !firstVariant.availableForSale && (
        <Button variant="secondary" className="mt-2" disabled>
          <span className="flex items-center justify-center gap-2 text-sm">
            {"Sold out"}
          </span>
        </Button>
      )}
    </div>
  )
}

export const ProductCardFragment = graphql(
  `fragment ProductCardFragment on Product {
    id
    title
    handle
    vendor
    publishedAt
    featuredImage {
      id
      altText
      height
      src
      originalSrc
      url
      width
    }
    variants(first: 128) {
      nodes {
        id
        title
        availableForSale
        image {
          id
        }
        price {
          ... on MoneyV2 {
            amount
            currencyCode
          }
        }
        compareAtPrice {
          ... on MoneyV2 {
            amount
            currencyCode
          }
        }
      }
    }
  }`,
)
