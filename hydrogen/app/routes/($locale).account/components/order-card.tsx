import { Money } from "@shopify/hydrogen"
import { FragmentOf, readFragment } from "gql.tada"
import { Separator } from "~/components/ui/separator"
import { graphql } from "~/lib/graphql-customer-account"

type Props = {
  order: FragmentOf<typeof OrderCardFragment>
}

/**
 * 注文履歴
 */
export function OrderCard(props: Props) {
  const order = readFragment(OrderCardFragment, props.order)

  const idText = order.id.split("/").pop() ?? ""

  // const [fulfillments] = order.fulfillments.nodes

  return (
    <div className="space-y-4">
      <div className="flex gap-x-8">
        <div className="space-x-4">
          <span className="opacity-60">{"ご注文日"}</span>
          <span>{"2025.10.10"}</span>
        </div>
        <div className="space-x-4">
          <span className="opacity-60">{"ご注文コード"}</span>
          <span>{`#${order.number}`}</span>
        </div>
        <div className="space-x-4">
          <span className="opacity-60">{"合計金額"}</span>
          <span>
            <Money className="inline" data={order.totalPrice} />
          </span>
        </div>
      </div>
      <Separator />
      {order.lineItems.nodes.map((lineItem) => (
        <div key={lineItem.title} className="flex">
          {/* {lineItem.image && (
            <Image
              width={168}
              height={168}
              className="fadeIn cover w-40"
              alt={lineItem.image?.altText ?? "Order image"}
              src={lineItem.image.url}
            />
          )} */}
          <div>
            <div>{lineItem.title}</div>
          </div>
        </div>
      ))}
      {/* {appConfig.features.orderDetail && (
        <div className="flex">
          <Link
            className="underline"
            to={`/account/orders/${idText}`}
            prefetch="intent"
          >
            <p>{"注文詳細"}</p>
          </Link>
        </div>
      )} */}
    </div>
  )
}

export const OrderCardFragment = graphql(
  `fragment OrderCard on Order {
    id
    number
    totalPrice {
      amount
      ... on MoneyV2 {
        amount
        currencyCode
      }
    }
    lineItems(first: 64) {
      nodes {
        id
        title
      }
    }
    fulfillments(first: 64) {
      nodes {
        id
      }
    }
  }`,
)
