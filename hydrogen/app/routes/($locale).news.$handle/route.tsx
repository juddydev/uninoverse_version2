import { useLoaderData } from "@remix-run/react"
import { getSeoMeta, Image, SeoConfig } from "@shopify/hydrogen"
import { type LoaderFunctionArgs, MetaArgs, json } from "@shopify/remix-oxygen"
import invariant from "tiny-invariant"
import { graphql } from "~/lib/graphql-storefront"
import { truncate } from "~/utils/truncate"

const BLOG_HANDLE = "news"

export function meta({ data }: MetaArgs<typeof loader>) {
  return getSeoMeta(data?.seoConfig)
}

export default function Route() {
  const data = useLoaderData<typeof loader>()

  return (
    <main className="container space-y-4 pt-4">
      <header>
        <h1>{data.article.title}</h1>
        <p>{data.formattedDate}</p>
        <p>{data.article.author?.name}</p>
      </header>
      <section>
        {data.article.image && (
          <Image data={data.article.image} sizes="90vw" loading="eager" />
        )}
        <div
          className={"znc font-medium"}
          // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
          dangerouslySetInnerHTML={{ __html: data.article.contentHtml }}
        />
      </section>
    </main>
  )
}

export async function loader(props: LoaderFunctionArgs) {
  const { language, country } = props.context.storefront.i18n

  invariant(props.params.handle, "Missing journal handle")

  const result = await props.context.storefront.tada(ArticleQuery, {
    variables: {
      blogHandle: BLOG_HANDLE,
      articleHandle: props.params.handle,
      language,
    },
  })

  if (!result.blog?.articleByHandle) {
    throw new Response(null, { status: 404 })
  }

  const article = result.blog.articleByHandle

  const intl = new Intl.DateTimeFormat(`${language}-${country}`, {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const formattedDate = intl.format(new Date(article?.publishedAt))

  const seoConfig = {
    title: article?.seo?.title ?? article?.title,
    description: truncate(article?.seo?.description ?? ""),
    titleTemplate: "%s | Journal",
    url: props.request.url,
    media: {
      type: "image",
      url: article?.image?.url,
      height: article?.image?.height,
      width: article?.image?.width,
      altText: article?.image?.altText,
    },
    // TODO: JsonLd
    // jsonLd: {
    //   "@context": "https://schema.org",
    //   "@type": "Article",
    //   alternativeHeadline: article.title,
    //   articleBody: article.contentHtml,
    //   datePublished: article?.publishedAt,
    //   description: truncate(
    //     article?.seo?.description || article?.excerpt || "",
    //   ),
    //   headline: article?.seo?.title || "",
    //   image: article?.image?.url,
    //   url,
    // },
  } satisfies SeoConfig

  return json({ seoConfig, article, formattedDate })
}

const ArticleQuery = graphql(
  `query Article(
    $language: LanguageCode
    $blogHandle: String!
    $articleHandle: String!
  ) @inContext(language: $language) {
    blog(handle: $blogHandle) {
      articleByHandle(handle: $articleHandle) {
        title
        contentHtml
        publishedAt
        author: authorV2 {
          name
        }
        image {
          id
          altText
          url
          width
          height
        }
        seo {
          description
          title
        }
      }
    }
  }`,
)
