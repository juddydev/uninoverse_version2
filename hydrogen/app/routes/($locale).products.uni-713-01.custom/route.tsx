import { useReducer } from "react"
import { defer, useLoaderData } from "@remix-run/react"
import { getSelectedProductOptions } from "@shopify/hydrogen"
import { LoaderFunctionArgs } from "@shopify/remix-oxygen"
import { CustomOrderLayout } from "~/components/custom-order/custom-order-layout"
import { LoaderQuery } from "~/routes/($locale).products.$handle.custom/queries/loader"
import { CustomOrderPreview_uni71301 } from "~/routes/($locale).products.uni-713-01.custom/components/custom-order-preview"
import { toProductTextureImages } from "~/routes/($locale).products.$handle.custom/utils/to-product-texture-images"
import { toModelSource } from "~/routes/($locale).products.$handle.custom/utils/to-model-source"
import { customOrderReducer } from "~/lib/custom-order/custom-order-reducer"
import { customOrderConstruction } from "~/lib/custom-order/values/custom-order-construction"
import { customOrderInsoleType } from "~/lib/custom-order/values/custom-order-insole-type"
import { customOrderLaceType } from "~/lib/custom-order/values/custom-order-lace-type"
import { customOrderLeatherColor } from "~/lib/custom-order/values/custom-order-leather-color"
import { customOrderLeatherType } from "~/lib/custom-order/values/custom-order-leather-type"
import { customOrderLiningType } from "~/lib/custom-order/values/custom-order-lining-type"
import { customOrderOutsoleType } from "~/lib/custom-order/values/custom-order-outsole-type"
import { CustomOrderAside } from "~/routes/($locale).products.$handle.custom/components/custom-order-aside"
import { CustomOrderOption_uni71301 } from "~/lib/custom-order/options/uni-713-01"

export default function Route() {
  const data = useLoaderData<typeof loader>()

  const [state, dispatch] = useReducer(customOrderReducer, {
    construction: customOrderConstruction.goodyearWelt,
    leatherType: customOrderLeatherType.baron,
    leatherColor: customOrderLeatherColor.black,
    outsoleType: customOrderOutsoleType.vibram01,
    liningType: customOrderLiningType.calfLeather,
    laceType: customOrderLaceType.black,
    insoleType: customOrderInsoleType.leather,
    size: 40,
    accessoryType: null,
  })

  const textureImages = toProductTextureImages(data)

  const modelSource = toModelSource(data)

  const option = new CustomOrderOption_uni71301(state)

  return (
    <main className="container">
      <CustomOrderLayout
        aside={
          <CustomOrderAside
            productId={"uni-713-01"}
            variants={data.product.variants.nodes}
            options={data.product.options}
            state={state}
            option={option}
            onDispatch={dispatch}
          />
        }
      >
        <CustomOrderPreview_uni71301
          state={state}
          modelSource={modelSource}
          textureImages={textureImages}
        />
      </CustomOrderLayout>
    </main>
  )
}

export async function loader(props: LoaderFunctionArgs) {
  const handle = "uni-713-01-custom"

  const selectedOptions = getSelectedProductOptions(props.request)

  const { product } = await props.context.storefront.tada(LoaderQuery, {
    variables: {
      handle: handle,
      selectedOptions,
      country: props.context.storefront.i18n.country,
      language: props.context.storefront.i18n.language,
    },
  })

  if (product === null) {
    throw new Response("product", { status: 404 })
  }

  return defer({ product })
}
