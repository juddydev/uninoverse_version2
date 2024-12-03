import { Separator } from "@radix-ui/react-separator"
import { FragmentOf, readFragment } from "gql.tada"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion"
import { Card } from "~/components/ui/card"
import { Table, TableBody, TableCell, TableRow } from "~/components/ui/table"
import { graphql } from "~/lib/graphql-storefront"

type Props = {
  product: FragmentOf<typeof ProductDetailsFragment>
}

export function ProductDetails(props: Props) {
  const product = readFragment(ProductDetailsFragment, props.product)

  const materialsLabels = product.footwear_material?.references?.nodes
    .map((node) => {
      if (node.__typename !== "Metaobject") return null
      return node.fields.find((field) => field.key === "label") ?? null
    })
    .filter((node) => node !== null)

  const [materialsLabel = null] = materialsLabels ?? []

  const careInstructions = product.care_instructions?.references?.nodes
    .map((node) => {
      if (node.__typename !== "Metaobject") return null
      return node.fields.find((field) => field.key === "label") ?? null
    })
    .filter((node) => node !== null)

  const [careInstruction = null] = careInstructions ?? []

  return (
    <Accordion type="multiple" defaultValue={["description", "material"]}>
      <Separator />
      {product.descriptionHtml && (
        <AccordionItem value="description">
          <AccordionTrigger>{"アイテム説明"}</AccordionTrigger>
          <AccordionContent>
            <div
              // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
              dangerouslySetInnerHTML={{
                __html: product.descriptionHtml,
              }}
            />
          </AccordionContent>
        </AccordionItem>
      )}
      <AccordionItem value="material">
        <AccordionTrigger>{"素材"}</AccordionTrigger>
        <AccordionContent>
          <Card>
            <Table className="text-xs">
              <TableBody>
                {materialsLabel && (
                  <TableRow>
                    <TableCell className="bg-neutral-100">{"素材"}</TableCell>
                    <TableCell>{materialsLabel.value}</TableCell>
                  </TableRow>
                )}
                <TableRow>
                  <TableCell className="bg-neutral-100">{"原産国"}</TableCell>
                  <TableCell>{product.country_of_origin?.value}</TableCell>
                </TableRow>
                {careInstruction && (
                  <TableRow>
                    <TableCell className="bg-neutral-100">
                      {"お手入れ"}
                    </TableCell>
                    <TableCell>{careInstruction.value}</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Card>
        </AccordionContent>
      </AccordionItem>
      {/* <AccordionItem value="usage">
        <AccordionTrigger>{"お手入れ方法"}</AccordionTrigger>
        <AccordionContent>{"お手入れ方法の説明"}</AccordionContent>
      </AccordionItem> */}
    </Accordion>
  )
}

export const ProductDetailsFragment = graphql(
  `fragment ProductDetailsFragment on Product {
    id
    descriptionHtml
    footwear_material: metafield(key: "footwear-material", namespace: "shopify") {
      id
      references(first: 4) {
        nodes {
          __typename
          ... on Metaobject {
            fields {
              key
              type
              value
            }
          }
        }
      }
    }
    care_instructions: metafield(key: "care-instructions", namespace: "shopify") {
      id
      references(first: 4) {
        nodes {
          __typename
          ... on Metaobject {
            fields {
              key
              type
              value
            }
          }
        }
      }
    }
    country_of_origin: metafield(key: "country_of_origin", namespace: "custom") {
      id
      value
    }
  }`,
)
