import { ResultOf } from "gql.tada"
import { LoaderQuery } from "~/routes/($locale).products.$handle.custom/queries/loader"

export function toProductTextureImages(result: ResultOf<typeof LoaderQuery>) {
  if (result.product === null) {
    return []
  }

  return result.product.media.nodes
    .filter((node) => {
      return node.__typename === "MediaImage"
    })
    .map((node) => {
      if (node.__typename !== "MediaImage") throw new Error()
      return node.image
    })
    .filter((node) => node !== null)
}
