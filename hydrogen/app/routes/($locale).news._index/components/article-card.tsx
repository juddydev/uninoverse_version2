import { Image } from "@shopify/hydrogen"
import { FragmentOf, readFragment } from "gql.tada"
import { Card, CardContent } from "~/components/ui/card"
import { graphql } from "~/lib/graphql-storefront"

type Props = {
  article: FragmentOf<typeof ArticleCardFragment>
  loading: "eager" | undefined
}

export function ArticleCard(props: Props) {
  const article = readFragment(ArticleCardFragment, props.article)

  return (
    <Card>
      <CardContent className={"p-4"}>
        {article.image && (
          <div className="card-image aspect-[3/2]">
            <Image
              alt={article.image.altText || article.title}
              className="w-full object-cover"
              data={article.image}
              aspectRatio="3/2"
              loading={props.loading}
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          </div>
        )}
        <div className="space-y-1">
          <h2 className="font-medium">{article.title}</h2>
          <span className="block">{article.publishedAt}</span>
        </div>
      </CardContent>
    </Card>
  )
}

export const ArticleCardFragment = graphql(
  `fragment ArticleCard on Article {
    id
    title
    publishedAt
    image {
      id
      altText
    }
  }`,
)
