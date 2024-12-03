import { FragmentOf, readFragment } from "gql.tada"
import { graphql } from "~/lib/graphql-storefront"
import { ProductBadge } from "~/routes/($locale).products._index/components/product-badge"

type Props = {
  product: FragmentOf<typeof ProductTitleFragment>
}

export function ProductTitle(props: Props) {
  const product = readFragment(ProductTitleFragment, props.product)

  return (
    <>
      <ProductBadge type="NEW" />
      <div>
        {product.vendor && <p className={"opacity-60"}>{product.vendor}</p>}
        <h1 className="text-lg">{product.title}</h1>
      </div>
    </>
  )
}

export const ProductTitleFragment = graphql(
  `fragment ProductTitleFragment on Product {
    id
    title
    vendor
  }`,
)
