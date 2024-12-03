import type { CustomerAddressInput } from "@shopify/hydrogen/customer-account-api-types"
import { type ActionFunction, json, redirect } from "@shopify/remix-oxygen"
import { graphql } from "~/lib/graphql-customer-account"

export const addAccountAddressAction: ActionFunction = async ({
  request,
  context,
  params,
}) => {
  if (request.method !== "POST") {
    return json({ formError: "ERROR" }, { status: 400 })
  }

  const isLoggedIn = await context.customerAccount.isLoggedIn()

  if (!isLoggedIn) {
    throw await context.customerAccount.logout()
  }

  const formData = await request.formData()

  const address: CustomerAddressInput = {
    territoryCode: "JP",
  }

  type InputFields = keyof CustomerAddressInput

  const keys: InputFields[] = [
    "lastName",
    "firstName",
    "address1",
    "address2",
    "city",
    "zoneCode",
    // "territoryCode",
    "zip",
    "phoneNumber",
    "company",
  ]

  for (const key of keys) {
    const value = formData.get(key)
    if (typeof value !== "string") continue
    address[key] = value
  }

  const isDefaultAddress = formData.has("defaultAddress")
    ? String(formData.get("defaultAddress")) === "on"
    : false

  try {
    const result = await context.customerAccount.tada(CreateAddressMutation, {
      variables: { address, defaultAddress: isDefaultAddress },
    })
    console.log("result", result)

    return redirect(
      params?.locale ? `${params?.locale}/account/address` : "/account/address",
    )
  } catch (error) {
    const message = error instanceof Error ? error.message : undefined
    return json({ formError: message }, { status: 400 })
  }
}

/**
 * NOTE: https://shopify.dev/docs/api/customer/latest/mutations/customerAddressCreate
 */
export const CreateAddressMutation = graphql(`
  mutation CreateCustomerAddress(
    $address: CustomerAddressInput!
    $defaultAddress: Boolean
  ) {
    customerAddressCreate(
      address: $address
      defaultAddress: $defaultAddress
    ) {
      customerAddress {
        id
      }
      userErrors {
        code
        field
        message
      }
    }
  }
`)
