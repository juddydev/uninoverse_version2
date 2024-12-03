import { FragmentOf, readFragment } from "gql.tada"
import { graphql } from "~/lib/graphql-storefront"

type Props = {
  product: FragmentOf<typeof RecommendedProductCardFragment>
}

export function RecommendedProductCard(props: Props) {
  const product = readFragment(RecommendedProductCardFragment, props.product)

  return (
    <div className="space-y-2">
      <img alt="" src={product.featuredImage?.url} />
      <p className="text-sm">{product.title}</p>
    </div>
  )
}

export const RecommendedProductCardFragment = graphql(
  `fragment RecommendedProductCard on Product {
    id
    title
    featuredImage {
      url
    }
  }`,
)
