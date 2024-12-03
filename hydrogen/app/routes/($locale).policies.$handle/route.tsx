import { useLoaderData } from "@remix-run/react"
import { getSeoMeta, SeoConfig } from "@shopify/hydrogen"
import { json, LoaderFunctionArgs, MetaArgs } from "@shopify/remix-oxygen"
import invariant from "tiny-invariant"
import { CustomBreadcrumb } from "~/components/custom/custom-breadcrumb"
import { Separator } from "~/components/ui/separator"
import { graphql } from "~/lib/graphql-storefront"

export function meta({ data }: MetaArgs<typeof loader>) {
  return getSeoMeta(data?.seoConfig)
}

export default function PolicyPage() {
  const data = useLoaderData<typeof loader>()

  return (
    <main>
      <div className="container">
        <CustomBreadcrumb
          items={[
            { title: "プライバシー・ポリシー", href: "/policies/privacy" },
          ]}
        />
      </div>
      <header className="max-auto container max-w-screen-xl space-y-2 py-12">
        <h1 className={"text-4xl"}>{"PRIVACY"}</h1>
        <p className="text-sm opacity-40">{"プライバシー・ポリシー"}</p>
      </header>
      <Separator />
      <div
        className={"html container my-8 max-w-2xl"}
        // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
        dangerouslySetInnerHTML={{ __html: data.policy.body }}
      />
    </main>
  )
}

type Handle = "privacy" | "shipping" | "refund"

export async function loader(props: LoaderFunctionArgs) {
  invariant(props.params.handle, "Missing policy handle")

  const policyName = props.params.handle as Handle

  const result = await props.context.storefront.tada(PolicyListQuery, {
    variables: {
      language: props.context.storefront.i18n.language,
    },
  })

  const getPolicy = (name: string) => {
    if (name === "privacy") {
      return result.shop.privacyPolicy ?? null
    }
    if (name === "shipping") {
      return result.shop.shippingPolicy ?? null
    }
    if (name === "refund") {
      return result.shop.refundPolicy ?? null
    }
    return null
  }

  invariant(result, "No data returned from Shopify API")

  const policy = getPolicy(policyName)

  if (!policy) {
    throw new Response(null, { status: 404 })
  }

  // const origin = new URL(props.request.url).origin

  const seoConfig = {
    title: "Policies",
    titleTemplate: "%s | ポリシー",
    description: "すべてのポリシー",
    // TODO: JsonLd
    // jsonLd: [
    //   {
    //     "@context": "https://schema.org",
    //     "@type": "BreadcrumbList",
    //     itemListElement,
    //   },
    //   {
    //     "@context": "https://schema.org",
    //     "@type": "WebPage",
    //     description: "Hydrogen store policies",
    //     name: "Policies",
    //     url: props.request.url,
    //   },
    // ],
  } satisfies SeoConfig

  return json({ seoConfig, policy })
}

const PolicyListQuery = graphql(
  `query PolicyList(
    $language: LanguageCode
  ) @inContext(language: $language) {
    shop {
      privacyPolicy {
        id
        body
      }
      shippingPolicy {
        id
        body
      }
      refundPolicy {
        id
        body
      }
    }
  }`,
  [],
)
