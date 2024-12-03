import { FragmentOf, readFragment } from "gql.tada"
import { useState } from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselApi,
} from "~/components/ui/carousel"
import { graphql } from "~/lib/graphql-storefront"
import { Image } from "@shopify/hydrogen"

type Props = {
  selectedColor: string | null
  mediaImages: FragmentOf<typeof ProductCarouselFragment>[]
}

/**
 * 商品画像のカルーセル部分
 */
export function ProductCarousel(props: Props) {
  const [api, setApi] = useState<CarouselApi>()

  const mediaImages = props.mediaImages.map((node) => {
    if (node.__typename !== "MediaImage") {
      return null
    }
    return readFragment(ProductCarouselFragment, node)
  })

  /**
   * 製品の画像
   */
  const productImages = mediaImages
    .filter((node) => {
      return node !== null
    })
    .map((node) => {
      return node.image
    })
    .filter((node) => {
      return node !== null
    })
    .filter((node) => {
      // 3Dモデルの画像を除外する
      if (node.url.includes(".preview")) {
        return true
      }
      // or use alt-text
      return node.altText !== null
    })

  /**
   * 選択された色の画像
   */
  const selectedColorImages = productImages.filter((node) => {
    if (props.selectedColor === null) {
      return true
    }
    const value = props.selectedColor.toUpperCase().replaceAll("-", "_")
    // use alt-text
    if (!node.url.includes(".preview")) {
      const nodeValue = node.altText?.toUpperCase().replaceAll("-", "_")
      return nodeValue?.includes(value)
    }
    const nodeValue = node.url.toUpperCase().replaceAll("-", "_")
    return nodeValue.includes(value)
  })

  return (
    <div>
      <Carousel className="relative w-full" setApi={setApi}>
        <CarouselContent>
          {selectedColorImages.map((node, i) => (
            <CarouselItem key={node.id}>
              <div>
                <Image
                  loading={i === 0 ? "eager" : "lazy"}
                  data={{
                    ...node,
                    altText: node.id || "Product image",
                  }}
                  className="aspect-square h-full w-full object-cover"
                  sizes={"auto"}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4 border-none" />
        <CarouselNext className="right-4 border-none" />
      </Carousel>
      <div className="flex gap-x-4 overflow-x-scroll sm:grid-cols-4 md:grid md:overflow-x-visible lg:grid-cols-6">
        {selectedColorImages.map((node, i) => (
          <button
            type="button"
            key={node?.id}
            onClick={() => {
              api?.scrollTo(i)
            }}
            className="flex-shrink-0"
          >
            <Image
              loading={i === 0 ? "eager" : "lazy"}
              data={node}
              className="aspect-square h-full w-full object-cover"
              sizes="20vw"
            />
          </button>
        ))}
      </div>
    </div>
  )
}

export const ProductCarouselFragment = graphql(
  `fragment ProductCarouselFragment on MediaImage @_unmask {
    __typename
    id
    image {
      id
      altText
      height
      width
      url
    }
  }`,
)
