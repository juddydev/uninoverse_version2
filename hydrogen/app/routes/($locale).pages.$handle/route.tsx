import { useLoaderData } from "@remix-run/react"
import { getSeoMeta, SeoConfig } from "@shopify/hydrogen"
import { type LoaderFunctionArgs, MetaArgs, json } from "@shopify/remix-oxygen"
import invariant from "tiny-invariant"
import { graphql } from "~/lib/graphql-storefront"
import { truncate } from "~/utils/truncate"

export function meta({ data }: MetaArgs<typeof loader>) {
  return getSeoMeta(data?.seoConfig)
}

export default function Page() {
  const { page } = useLoaderData<typeof loader>()

  return (
    <main className="container space-y-4">
      <div
        className={"znc font-medium"}
        // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
        dangerouslySetInnerHTML={{ __html: page.body }}
      />
    </main>
  )
}

export async function loader(props: LoaderFunctionArgs) {
  invariant(props.params.handle, "Missing page handle")

  const result = await props.context.storefront.tada(PageQuery, {
    variables: {
      handle: props.params.handle,
      language: props.context.storefront.i18n.language,
    },
  })

  if (!result.page) {
    throw new Response(null, { status: 404 })
  }

  const seoConfig = {
    description: truncate(result.page?.seo?.description || ""),
    title: result.page?.seo?.title ?? result.page?.title,
    titleTemplate: "%s | Page",
    url: props.request.url,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: result.page.title,
    },
  } satisfies SeoConfig

  return json({ seoConfig, page: result.page })
}

const PageQuery = graphql(
  `query Page($language: LanguageCode, $handle: String!) @inContext(language: $language) {
    page(handle: $handle) {
      id
      title
      body
      seo {
        description
        title
      }
    }
  }`,
  [],
)
