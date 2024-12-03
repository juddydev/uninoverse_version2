import { flattenConnection } from "@shopify/hydrogen"
import { ResultOf } from "gql.tada"
import { renderUrlTag } from "~/routes/[sitemap.xml]/utils/render-url-tag"
import { xmlEncode } from "~/routes/[sitemap.xml]/utils/xml-encode"
import type { SitemapQuery } from "~/routes/[sitemap.xml]/route"

interface ProductEntry {
  url: string
  lastMod: string
  changeFreq: string
  image?: {
    url: string
    title?: string
    caption?: string
  }
}

type Props = {
  data: ResultOf<typeof SitemapQuery>
  baseUrl: string
}

export function toSitemap({ data, baseUrl }: Props) {
  const productsData = flattenConnection(data.products)
    .filter((product) => product.onlineStoreUrl)
    .map((product) => {
      const url = `${baseUrl}/products/${xmlEncode(product.handle)}`

      const finalObject: ProductEntry = {
        url,
        lastMod: product.updatedAt,
        changeFreq: "daily",
      }

      if (product.featuredImage?.url) {
        finalObject.image = {
          url: xmlEncode(product.featuredImage.url),
        }
        if (product.title) {
          finalObject.image.title = xmlEncode(product.title)
        }
        if (product.featuredImage.altText) {
          finalObject.image.caption = xmlEncode(product.featuredImage.altText)
        }
      }

      return finalObject
    })

  const collectionsData = flattenConnection(data.collections)
    .filter((collection) => collection.onlineStoreUrl)
    .map((collection) => {
      const url = `${baseUrl}/collections/${collection.handle}`

      return {
        url,
        lastMod: collection.updatedAt,
        changeFreq: "daily",
      }
    })

  const pagesData = flattenConnection(data.pages)
    .filter((page) => page.onlineStoreUrl)
    .map((page) => {
      const url = `${baseUrl}/pages/${page.handle}`

      return {
        url,
        lastMod: page.updatedAt,
        changeFreq: "weekly",
      }
    })

  const urlsDatas = [...productsData, ...collectionsData, ...pagesData]

  return `
    <urlset
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
    >
      ${urlsDatas.map((url) => renderUrlTag(url)).join("")}
    </urlset>`
}
