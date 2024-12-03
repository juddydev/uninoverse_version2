import { ResultOf } from "gql.tada"
import { LoaderQuery } from "~/routes/($locale).products.$handle.custom/queries/loader"

export function toModelSource(result: ResultOf<typeof LoaderQuery>) {
  if (result.product === null) {
    throw new Error("Product is not defined")
  }

  const [modelSource = null] = result.product.media.nodes
    .filter((node) => {
      return node.__typename === "Model3d"
    })
    .map((node) => {
      if (node.__typename !== "Model3d") throw new Error()
      return node.sources[0]
    })

  if (modelSource === null) {
    throw new Error("Model source is not defined")
  }

  return modelSource
}
