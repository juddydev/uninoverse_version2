import { graphql } from "~/lib/graphql-storefront"
import {
  CustomOrderProductOptionFragment,
  ProductVariantFragment,
} from "~/routes/($locale).products.$handle.custom/components/custom-order-aside"

export const ProductModelSourceFragment = graphql(
  `fragment ProductModelSource on Model3dSource @_unmask {
    url
    mimeType
  }`,
)

export const ProductTextureImageFragment = graphql(
  `fragment ProductTextureImage on Image @_unmask {
    id
    altText
    url
    width
    height
  }`,
)

export const LoaderQuery = graphql(
  `query Product(
    $country: CountryCode
    $language: LanguageCode
    $handle: String!
    $selectedOptions: [SelectedOptionInput!]!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      id
      title
      handle
      options {
        ...CustomOrderProductOption
      }
      selectedVariant: variantBySelectedOptions(selectedOptions: $selectedOptions, ignoreUnknownOptions: true, caseInsensitiveMatch: true) {
        id
      }
      media(first: 128) {
        nodes {
          ... on MediaImage {
            __typename
            id
            alt
            image {
              ...ProductTextureImage
            }
          }
          ... on Model3d {
            __typename
            id
            sources {
              ...ProductModelSource
            }
          }
        }
      }
      variants(first: 128) {
        nodes {
          id
          ...ProductVariantFragment
        }
      }
      seo {
        description
        title
      }
    }
  }`,
  [
    ProductModelSourceFragment,
    ProductTextureImageFragment,
    CustomOrderProductOptionFragment,
    ProductVariantFragment,
  ],
)
