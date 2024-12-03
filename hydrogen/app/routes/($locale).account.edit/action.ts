import type { CustomerUpdateInput } from "@shopify/hydrogen/customer-account-api-types"
import { type ActionFunction, json, redirect } from "@shopify/remix-oxygen"
import { graphql } from "~/lib/graphql-customer-account"
import { formDataHas } from "~/routes/($locale).account.edit/utils/form-data-has"

/**
 * アカウント情報を更新する
 */
export const accountEditAction: ActionFunction = async ({
  request,
  context,
  params,
}) => {
  const formData = await request.formData()

  const isLoggedIn = await context.customerAccount.isLoggedIn()

  if (!isLoggedIn) {
    throw await context.customerAccount.logout()
  }

  try {
    const customer: CustomerUpdateInput = {}

    if (formDataHas(formData, "firstName")) {
      customer.firstName = formData.get("firstName") as string
    }

    if (formDataHas(formData, "lastName")) {
      customer.lastName = formData.get("lastName") as string
    }

    const result = await context.customerAccount.tada(UpdateCustomerMutation, {
      variables: { customer },
    })

    console.log("result", result)

    return redirect(
      params?.locale ? `${params.locale}/account/address` : "/account/address",
    )
  } catch (error) {
    const message = error instanceof Error ? error.message : undefined
    return json(
      { formError: message },
      {
        status: 400,
      },
    )
  }
}

export const UpdateCustomerMutation = graphql(
  `mutation UpdateCustomer($customer: CustomerUpdateInput!) {
  customerUpdate(input: $customer) {
    userErrors {
      code
      field
      message
    }
  }
}`,
)
