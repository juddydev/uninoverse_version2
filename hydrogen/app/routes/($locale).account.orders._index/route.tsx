import { useOutletContext } from "@remix-run/react"
import { FragmentOf, readFragment } from "gql.tada"
import { graphql } from "~/lib/graphql-customer-account"
import {
  OrderCard,
  OrderCardFragment,
} from "~/routes/($locale).account/components/order-card"

/**
 * アカウント > 注文履歴
 */
export default function Route() {
  const context = useOutletContext<FragmentOf<typeof AccountOrdersFragment>>()

  const account = readFragment(AccountOrdersFragment, context)

  return (
    <div className="space-y-8 lg:space-y-16">
      <header className="space-y-1">
        <h1 className={"text-3xl"}>{"ORDERS"}</h1>
        <p className="text-sm opacity-40">{"注文履歴"}</p>
      </header>
      {account.orders.nodes.length !== 0 && (
        <ul className="space-y-16">
          {account.orders.nodes.map((order) => (
            <li key={order.id}>
              <OrderCard order={order} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export const AccountOrdersFragment = graphql(
  `fragment AccountOrders on Customer {
    id
    orders(first: 128) {
      nodes {
        id
        ...OrderCard
      }
    }
  }`,
  [OrderCardFragment],
)
