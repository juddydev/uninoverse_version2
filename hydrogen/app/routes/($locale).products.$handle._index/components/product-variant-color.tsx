import { Link, useNavigate } from "@remix-run/react"
import { VariantOption } from "@shopify/hydrogen"
import { FragmentOf, readFragment } from "gql.tada"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select"
import { graphql } from "~/lib/graphql-storefront"
import { Image } from "@shopify/hydrogen"
import { cn } from "~/lib/utils"

type Props = {
  option: VariantOption
  mediaImages: FragmentOf<typeof ProductFormMediaFragment>[]
  onChangeColor(value: string): void
}

/**
 * 商品の色の選択部分
 */
export function ProductVariantColor(props: Props) {
  const navigate = useNavigate()

  const mediaImages = props.mediaImages.map((node) => {
    return readFragment(ProductFormMediaFragment, node)
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
      // return node.url.includes("product")
      return node.altText !== null
    })

  /**
   * 選択した色の画像を取得する
   */
  const getVariantImage = (color: string) => {
    if (!color) return null
    const colorValue = color.replace("-", "_").toUpperCase()
    const image = productImages.find((image) => {
      // use alt-text
      if (!image.url.includes(".preview")) {
        const nodeValue = image?.altText?.toUpperCase().replaceAll("-", "_")
        return nodeValue?.includes(colorValue) && nodeValue.includes("DEFAULT")
      }
      const nodeValue = image.url.toUpperCase().replaceAll("-", "_")
      // or use url
      if (nodeValue.includes(colorValue.toUpperCase())) {
        if (nodeValue.includes("DEFAULT")) {
          return true
        }
      }
    })
    return image ?? null
  }

  const options = props.option.values.filter(Boolean)

  return (
    <div className="space-y-1">
      <div className="flex gap-x-4 overflow-x-scroll sm:grid-cols-3 md:grid md:overflow-x-visible lg:grid-cols-3">
        {options.map((option, index) => {
          const variantImage = getVariantImage(option.value)
          if (!variantImage) return null
          return (
            <Link className="flex-shrink-0" to={`${option.to}`} key={option.to}>
              {/** TODO: 調整 */}
              {/* {!option.isAvailable &&
              isVisible &&
              index === selectedVariantIndex ? (
                <p className="h-8 rounded-md border border-gray-300 bg-white px-3 py-1 text-center text-sm">
                  在庫なし
                </p>
              ) : (
                <p className="h-8" />
              )} */}
              <button
                type="button"
                onClick={() => {
                  const color = option.value.replace("-", "_").toUpperCase()
                  props.onChangeColor(color)
                }}
              >
                <Image
                  loading={index === 0 ? "eager" : "lazy"}
                  data={variantImage}
                  alt={option.value}
                  className={cn("aspect-square h-full w-full object-cover", {
                    "opacity-40": !option.isAvailable,
                    "rounded border border-gray-400": option.isActive,
                  })}
                  sizes="30vw"
                />
              </button>
            </Link>
          )
        })}
      </div>
      <legend>{"カラー"}</legend>
      <Select
        onValueChange={(value) => {
          const selectedOption = options.find((option) => {
            return option.value === value
          })
          if (selectedOption === undefined) return
          const color = value.replace("-", "_").toUpperCase()
          props.onChangeColor(color)
          navigate(selectedOption.to)
        }}
      >
        <SelectTrigger className="w-full rounded">
          <SelectValue placeholder={props.option.value} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value}
                disabled={!option.isAvailable}
              >
                {option.isAvailable
                  ? option.value
                  : `${option.value} (在庫なし)`}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}

export const ProductFormMediaFragment = graphql(
  `fragment ProductFormMediaFragment on MediaImage {
    id
    image {
      id
      altText
      url
    }
  }`,
)
