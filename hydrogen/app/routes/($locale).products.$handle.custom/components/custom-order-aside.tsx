import { Dispatch, useState } from "react"
import { Tabs, TabsContent } from "~/components/ui/tabs"
import { AddToCartButton } from "~/components/add-to-cart-button"
import { FragmentOf, readFragment } from "gql.tada"
import { CustomOrderControllerCard } from "~/components/custom-order/custom-order-controller-card"
import { CustomOrderTabButtons } from "~/components/custom-order/custom-order-tab-buttons"
import { customOrderItem } from "~/lib/custom-order/values/custom-order-item"
import { CustomOrderOptionConstruction } from "~/components/custom-order/custom-order-option-construction"
import { CustomOrderAction } from "~/lib/custom-order/types/custom-order-action"
import { CustomOrderOptionSize } from "~/components/custom-order/custom-order-option-size"
import { CustomOrderState } from "~/lib/custom-order/custom-order-state"
import { CustomOrderItem } from "~/lib/custom-order/types/custom-order-item"
import { graphql } from "~/lib/graphql-storefront"
import { CustomOrderOptionAccessory } from "~/components/custom-order/custom-order-option-accessory"
import { CustomOrderOptionInsole } from "~/components/custom-order/custom-order-option-insole"
import { CustomOrderOptionLace } from "~/components/custom-order/custom-order-option-lace"
import { CustomOrderOptionLeather } from "~/components/custom-order/custom-order-option-leather"
import { CustomOrderOptionLeatherColor } from "~/components/custom-order/custom-order-option-leather-color"
import { CustomOrderOptionLining } from "~/components/custom-order/custom-order-option-lining"
import { CustomOrderOptionOutsole } from "~/components/custom-order/custom-order-option-sole"
import { CustomOrder } from "~/lib/custom-order/custom-order"

type Props = {
  variants: FragmentOf<typeof ProductVariantFragment>[]
  options: FragmentOf<typeof CustomOrderProductOptionFragment>[]
  state: CustomOrderState
  option: CustomOrder
  /**
   * パス
   * 例: uni-705-01
   */
  productId: string
  onDispatch: Dispatch<CustomOrderAction>
}

export function CustomOrderAside(props: Props) {
  const [tabValue, setTabValue] = useState<CustomOrderItem>(
    customOrderItem.leatherType,
  )

  const variants = props.variants.map((node) => {
    return readFragment(ProductVariantFragment, node)
  })

  const currentVariant = variants.find((variant) => {
    return variant.selectedOptions.find((option) => {
      return option.value === props.state.construction
    })
  })

  return (
    <CustomOrderControllerCard to={`/products/${props.productId}`}>
      <Tabs
        value={tabValue}
        className="flex h-full flex-1 flex-col items-start justify-start gap-4 lg:flex-row"
      >
        <CustomOrderTabButtons
          keys={props.option.variants}
          tabValue={tabValue}
          onChange={setTabValue}
        />
        <TabsContent
          value={customOrderItem.construction}
          className="mt-0 w-full"
        >
          <CustomOrderOptionConstruction
            values={props.option.constructions}
            value={props.state.construction}
            onValueChange={(payload) => {
              props.onDispatch({ type: "UPDATE_CONSTRUCTION", payload })
            }}
          />
        </TabsContent>
        {props.option.variants.includes(customOrderItem.leatherType) && (
          <TabsContent
            value={customOrderItem.leatherType}
            className="mt-0 w-full"
          >
            <CustomOrderOptionLeather
              values={props.option.leatherTypes}
              value={props.state.leatherType}
              onValueChange={(payload) => {
                props.onDispatch({ type: "UPDATE_LEATHER", payload })
              }}
            />
          </TabsContent>
        )}
        {props.option.variants.includes(customOrderItem.leatherColor) && (
          <TabsContent
            value={customOrderItem.leatherColor}
            className="mt-0 w-full"
          >
            <CustomOrderOptionLeatherColor
              values={props.option.leatherColors}
              value={props.state.leatherColor}
              onValueChange={(payload) => {
                props.onDispatch({ type: "UPDATE_LEATHER_COLOR", payload })
              }}
            />
          </TabsContent>
        )}
        {props.option.variants.includes(customOrderItem.outsoleType) && (
          <TabsContent
            value={customOrderItem.outsoleType}
            className="mt-0 w-full"
          >
            <CustomOrderOptionOutsole
              values={props.option.outsoleTypes}
              value={props.state.outsoleType}
              onValueChange={(payload) => {
                props.onDispatch({ type: "UPDATE_OUTSOLE_TYPE", payload })
              }}
            />
          </TabsContent>
        )}
        {props.option.variants.includes(customOrderItem.accessoryHeelType) && (
          <TabsContent
            value={customOrderItem.accessoryHeelType}
            className="mt-0 w-full"
          >
            <CustomOrderOptionAccessory
              values={props.option.accessoryTypes}
              value={props.state.accessoryType}
              onValueChange={(payload) => {
                props.onDispatch({
                  type: "UPDATE_ACCESSORY_HEEL_PLATE",
                  payload,
                })
              }}
            />
          </TabsContent>
        )}
        {props.option.variants.includes(
          customOrderItem.accessoryBuckleType,
        ) && (
          <TabsContent
            value={customOrderItem.accessoryBuckleType}
            className="mt-0 w-full"
          >
            <CustomOrderOptionAccessory
              values={props.option.accessoryTypes}
              value={props.state.accessoryType}
              onValueChange={(payload) => {
                props.onDispatch({
                  type: "UPDATE_ACCESSORY_HEEL_PLATE",
                  payload,
                })
              }}
            />
          </TabsContent>
        )}
        {props.option.variants.includes(customOrderItem.liningType) && (
          <TabsContent
            value={customOrderItem.liningType}
            className="mt-0 w-full"
          >
            <CustomOrderOptionLining
              values={props.option.liningTypes}
              value={props.state.liningType}
              onValueChange={(payload) => {
                props.onDispatch({ type: "UPDATE_LINING", payload })
              }}
            />
          </TabsContent>
        )}
        {props.option.variants.includes(customOrderItem.laceType) && (
          <TabsContent value={customOrderItem.laceType} className="mt-0 w-full">
            <CustomOrderOptionLace
              values={props.option.laceTypes}
              value={props.state.laceType}
              onValueChange={(payload) => {
                props.onDispatch({ type: "UPDATE_LACE", payload })
              }}
            />
          </TabsContent>
        )}
        {props.option.variants.includes(customOrderItem.insoleType) && (
          <TabsContent
            value={customOrderItem.insoleType}
            className="mt-0 w-full"
          >
            <CustomOrderOptionInsole
              values={props.option.insoleTypes}
              value={props.state.insoleType}
              onValueChange={(payload) => {
                props.onDispatch({ type: "UPDATE_INSOLE", payload })
              }}
            />
          </TabsContent>
        )}
        <TabsContent value={customOrderItem.size} className="mt-0 w-full">
          <CustomOrderOptionSize
            values={props.option.sizes}
            value={props.state.size}
            onValueChange={(payload) => {
              props.onDispatch({ type: "UPDATE_SIZE", payload })
            }}
          />
        </TabsContent>
      </Tabs>
      <div className="items-end justify-end gap-4 whitespace-nowrap lg:flex">
        <div className="space-x-1">
          <span className="pl-2 font-semibold text-xl">{`¥${currentVariant?.price.amount}`}</span>
          <span className="text-sm">(税込)</span>
        </div>
      </div>
      {currentVariant && (
        <AddToCartButton
          lines={[
            {
              quantity: 1,
              merchandiseId: currentVariant.id,
              attributes: props.option.attributes,
            },
          ]}
        >
          <div className="w-full rounded-none p-6 lg:w-[300px]">
            {"カートに入れる"}
          </div>
        </AddToCartButton>
      )}
    </CustomOrderControllerCard>
  )
}

export const CustomOrderProductOptionFragment = graphql(
  `fragment CustomOrderProductOption on ProductOption {
    id
    name
    optionValues {
      id
      name
    }
  }`,
)

export const ProductVariantFragment = graphql(
  `fragment ProductVariantFragment on ProductVariant {
    id
    selectedOptions {
      name
      value
    }
    title
    price {
      ...on MoneyV2 {
        amount
        currencyCode
      }
    }
  }`,
)
