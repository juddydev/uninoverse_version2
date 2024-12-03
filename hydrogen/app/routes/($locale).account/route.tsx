import { Separator } from "@radix-ui/react-separator"
import { defer, Link, MetaArgs, Outlet, useLoaderData } from "@remix-run/react"
import { getSeoMeta } from "@shopify/hydrogen"
import { LoaderFunctionArgs } from "@shopify/remix-oxygen"
import { CustomBreadcrumb } from "~/components/custom/custom-breadcrumb"
import { cn } from "~/lib/utils"
import { graphql } from "~/lib/graphql-customer-account"
import { AccountFragment } from "~/routes/($locale).account._index/route"
import { AccountAddressFragment } from "~/routes/($locale).account.address.$address/route"
import { AccountAddressListFragment } from "~/routes/($locale).account.address._index/route"
import { AccountEditFragment } from "~/routes/($locale).account.edit/route"
import { AccountOrdersFragment } from "~/routes/($locale).account.orders._index/route"
import { LogoutForm } from "~/routes/($locale).account/components/logout-button"

export function meta(args: MetaArgs<typeof loader>) {
  return getSeoMeta({
    title: "アカウント",
  })
}

export default function Route() {
  const data = useLoaderData<typeof loader>()

  return (
    <main>
      <div className="container">
        <CustomBreadcrumb
          items={[
            { title: "マイページ", href: "/account" },
            { title: "ホーム", href: "/account" },
          ]}
        />
      </div>
      <header className="max-auto container max-w-screen-xl space-y-2 py-12">
        <h1 className={"text-4xl"}>{"MY PAGE"}</h1>
        <p className="text-sm opacity-40">{"マイページ"}</p>
      </header>
      <Separator className="hidden md:block" />
      <div
        className={cn(
          "max-auto container max-w-screen-xl pb-12 md:pt-12",
          "flex flex-col-reverse gap-8 md:flex-row lg:gap-x-16",
        )}
      >
        <nav className="w-full max-w-40">
          <ul className="space-y-4 text-sm">
            <li>
              <Link to="/account">{"ホーム"}</Link>
            </li>
            <li>
              <Link to="/account/address">{"アカウント情報"}</Link>
            </li>
            <li>
              <Link to="/account/orders">{"注文履歴"}</Link>
            </li>
            <li>
              <div className="opacity-40">{"スキャンデータ"}</div>
            </li>
            <li>
              <div className="opacity-40">{"試着リスト"}</div>
            </li>
            <li>
              <div className="opacity-40">{"保存したコーディネート"}</div>
            </li>
            <li>
              <div className="opacity-40">{"保存したカスタマイズ"}</div>
            </li>
            <li>
              <div className="opacity-40">{"ポイント・クーポン"}</div>
            </li>
            <li>
              <div className="opacity-40">{"ご利用ガイド"}</div>
            </li>
            <li>
              <LogoutForm>
                <button type="submit">{"ログアウト"}</button>
              </LogoutForm>
            </li>
          </ul>
        </nav>
        <Outlet context={data.customer} />
      </div>
    </main>
  )
}

export async function loader(props: LoaderFunctionArgs) {
  /**
   * ログインページに遷移されるのでTry-Catchしてはいけない
   */
  const customer = await props.context.customerAccount.tada(AccountQuery)

  return defer({ customer: customer.customer }, {})
}

const AccountQuery = graphql(
  `query Account {
    customer {
      id
      ...Account
      ...AccountAddress
      ...AccountAddressList
      ...AccountEdit
      ...AccountOrders
    }
  }`,
  [
    AccountAddressFragment,
    AccountAddressListFragment,
    AccountEditFragment,
    AccountFragment,
    AccountOrdersFragment,
  ],
)
