import type { CustomerAddressInput } from "@shopify/hydrogen/customer-account-api-types"
import { type ActionFunction, json, redirect } from "@shopify/remix-oxygen"
import invariant from "tiny-invariant"
import { graphql } from "~/lib/graphql-customer-account"

export const accountAddressAction: ActionFunction = async ({
  request,
  context,
  params,
}) => {
  const formData = await request.formData()

  const isLoggedIn = await context.customerAccount.isLoggedIn()

  // Double-check current user is logged in.
  // Will throw a logout redirect if not.
  if (!isLoggedIn) {
    throw await context.customerAccount.logout()
  }

  const addressId = formData.get("addressId")

  invariant(typeof addressId === "string", "You must provide an address id.")

  if (request.method === "DELETE") {
    try {
      const result = await context.customerAccount.tada(UpdateAddressMutation, {
        variables: { addressId },
      })

      return redirect(
        params?.locale
          ? `${params?.locale}/account/address`
          : "/account/address",
      )
    } catch (error) {
      const message = error instanceof Error ? error.message : undefined
      return json({ formError: message }, { status: 400 })
    }
  }

  const address: CustomerAddressInput = {
    territoryCode: "JP",
  }

  const keys: (keyof CustomerAddressInput)[] = [
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
    if (typeof value === "string") {
      address[key] = value
    }
  }

  const defaultAddress = formData.has("defaultAddress")
    ? String(formData.get("defaultAddress")) === "on"
    : false

  try {
    const result = await context.customerAccount.tada(UpdateAddressMutation, {
      variables: {
        address,
        addressId,
        defaultAddress,
      },
    })

    console.log(result)

    return redirect(
      params?.locale ? `${params?.locale}/account/address` : "/account/address",
    )
  } catch (error) {
    const message = error instanceof Error ? error.message : undefined
    return json({ formError: message }, { status: 400 })
  }
}

/**
 * NOTE: https://shopify.dev/docs/api/customer/latest/mutations/customerAddressUpdate
 */
const UpdateAddressMutation = graphql(`
  mutation UpdateCustomerAddress(
    $address: CustomerAddressInput!
    $addressId: ID!
    $defaultAddress: Boolean
 ) {
    customerAddressUpdate(
      address: $address
      addressId: $addressId
      defaultAddress: $defaultAddress
    ) {
      userErrors {
        code
        field
        message
      }
    }
  }
`)

/**
 * 未使用
 * NOTE: https://shopify.dev/docs/api/customer/latest/mutations/customerAddressDelete
 */
export const DeleteCustomerAddress = graphql(`
  mutation DeleteCustomerAddress(
    $addressId: ID!,
  ) {
    customerAddressDelete(addressId: $addressId) {
      deletedAddressId
      userErrors {
        code
        field
        message
      }
    }
  }
`)
