import { Link, useLoaderData } from "@remix-run/react"
import { getSeoMeta, SeoConfig } from "@shopify/hydrogen"
import { json, MetaArgs, type LoaderFunctionArgs } from "@shopify/remix-oxygen"
import { PAGINATION_SIZE } from "~/lib/const"
import { getImageLoadingPriority } from "~/lib/get-image-loading-priority"
import { graphql } from "~/lib/graphql-storefront"
import {
  ArticleCard,
  ArticleCardFragment,
} from "~/routes/($locale).news._index/components/article-card"
import { truncate } from "~/utils/truncate"

const BLOG_HANDLE = "news"

export function meta({ data }: MetaArgs<typeof loader>) {
  return getSeoMeta(data?.seoConfig)
}

export default function NewsIndexPage() {
  const data = useLoaderData<typeof loader>()

  return (
    <main className="container space-y-4 pt-4">
      <header>
        <h1>{"お知らせ"}</h1>
      </header>
      <section>
        <ul>
          {data.articles.map((post, i) => (
            <li key={post.id}>
              <Link to={`/${BLOG_HANDLE}/${BLOG_HANDLE.toLowerCase()}`}>
                <ArticleCard
                  article={post}
                  loading={getImageLoadingPriority(i, 2)}
                />
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}

export const loader = async ({ request, context }: LoaderFunctionArgs) => {
  const { language, country } = context.storefront.i18n

  const data = await context.storefront.tada(ArticleListQuery, {
    variables: {
      blogHandle: BLOG_HANDLE,
      pageBy: PAGINATION_SIZE,
      language,
    },
  })

  if (!data.blog) {
    throw new Response("Not found", { status: 404 })
  }

  const intl = new Intl.DateTimeFormat(`${language}-${country}`, {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const nodes = data.blog.articles.nodes

  const articles = nodes.map((article) => {
    const date = new Date(article.publishedAt)
    const publishedAt = intl.format(date)
    return { ...article, publishedAt }
  })

  const seoConfig = {
    title: data.blog?.seo?.title,
    description: truncate(data.blog?.seo?.description || ""),
    titleTemplate: "%s | Blog",
    url: request.url,
    // TODO: JsonLd
    // jsonLd: {
    //   "@context": "https://schema.org",
    //   "@type": "Blog",
    //   name: data.blog?.seo?.title || data.blog?.title || "",
    //   description: data.blog?.seo?.description || "",
    //   url: request.url,
    // },
  } satisfies SeoConfig

  return json({
    seoConfig,
    articles,
  })
}

const ArticleListQuery = graphql(
  `query ArticleList(
    $language: LanguageCode
    $blogHandle: String!
    $pageBy: Int!
    $cursor: String
  ) @inContext(language: $language) {
    blog(handle: $blogHandle) {
      title
      seo {
        title
        description
      }
      articles(first: $pageBy, after: $cursor) {
        nodes {
          id
          publishedAt
          ...ArticleCard
        }
      }
    }
  }`,
  [ArticleCardFragment],
)
