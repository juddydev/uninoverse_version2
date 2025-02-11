import { type LoaderFunctionArgs, redirect } from "@shopify/remix-oxygen"

/**
 * fallback wild card for all unauthenticated routes in account section
 */
export async function loader({ context, params }: LoaderFunctionArgs) {
  context.customerAccount.handleAuthStatus()

  const locale = params.locale

  return redirect(locale ? `/${locale}/account` : "/account", {})
}
