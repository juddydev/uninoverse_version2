import { Link } from "@remix-run/react"
import { FragmentOf, readFragment } from "gql.tada"
import { appConfig } from "~/app-config"
import { Button } from "~/components/ui/button"
import { graphql } from "~/lib/graphql-storefront"

type Props = {
  product: FragmentOf<typeof ProductPaymentFormFragment>
}

export function ProductPaymentForm(props: Props) {
  const product = readFragment(ProductPaymentFormFragment, props.product)

  const featureCustomOrder = product.featureCustomOrder?.value ?? false

  if (appConfig.features.purchase === false) {
    return (
      <div>
        <Button className="w-full" variant={"secondary"}>
          {"準備中"}
        </Button>
      </div>
    )
  }

  // TODO: 決済機能を復元する
  // const isOutOfStock = !props.selectedVariant?.availableForSale
  // {props.selectedVariant && (
  //   <div className="grid items-stretch gap-4">
  //     {isOutOfStock ? (
  //       <Button variant="secondary" disabled>
  //         {"売り切れ"}
  //       </Button>
  //     ) : (
  //       <div className="space-y-1">
  //         <p className="text-center text-sm">{"本日から8日以内に発送"}</p>
  //         <AddToCartButton
  //           lines={[
  //             {
  //               merchandiseId: props.selectedVariant.id,
  //               quantity: 1,
  //             },
  //           ]}
  //           analytics={{
  //             products: [productAnalytics],
  //             totalValue: Number.parseFloat(productAnalytics.price),
  //           }}
  //         >
  //           {"カートに入れる"}
  //         </AddToCartButton>
  //       </div>
  //     )}
  //   </div>
  // )}

  if (featureCustomOrder) {
    return (
      <div className="space-y-2">
        <Link to={`/products/${product.handle}/custom`}>
          <Button className="w-full" variant={"default"}>
            {"カスタマイズ選択に進む"}
          </Button>
        </Link>
        <Button className="w-full" variant={"default"}>
          {"カートに入れる"}
        </Button>
      </div>
    )
  }

  return (
    <div>
      <Button className="w-full" variant={"default"}>
        {"準備中"}
      </Button>
    </div>
  )
}

export const ProductPaymentFormFragment = graphql(
  `fragment ProductPaymentFormFragment on Product {
    id
    handle
    featureCustomOrder: metafield(key: "feature-custom-order", namespace: "custom") {
      id
      value
    }
  }`,
)
