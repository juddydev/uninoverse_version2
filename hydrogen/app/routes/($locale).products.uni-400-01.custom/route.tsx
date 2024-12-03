import { useReducer } from "react"
import { useLoaderData } from "@remix-run/react"
import { LoaderFunctionArgs } from "@shopify/remix-oxygen"
import { getSelectedProductOptions } from "@shopify/hydrogen"
import { toModelSource } from "~/routes/($locale).products.$handle.custom/utils/to-model-source"
import { toProductTextureImages } from "~/routes/($locale).products.$handle.custom/utils/to-product-texture-images"
import { CustomOrderLayout } from "~/components/custom-order/custom-order-layout"
import { CustomOrderPreview_uni40001 } from "~/routes/($locale).products.uni-400-01.custom/components/custom-order-preview"
import { customOrderLeatherColor } from "~/lib/custom-order/values/custom-order-leather-color"
import { customOrderAccessoryType } from "~/lib/custom-order/values/custom-order-accessory-type"
import { customOrderConstruction } from "~/lib/custom-order/values/custom-order-construction"
import { customOrderInsoleType } from "~/lib/custom-order/values/custom-order-insole-type"
import { customOrderLaceType } from "~/lib/custom-order/values/custom-order-lace-type"
import { customOrderLeatherType } from "~/lib/custom-order/values/custom-order-leather-type"
import { customOrderLiningType } from "~/lib/custom-order/values/custom-order-lining-type"
import { customOrderOutsoleType } from "~/lib/custom-order/values/custom-order-outsole-type"
import { customOrderReducer } from "~/lib/custom-order/custom-order-reducer"
import { CustomOrderAside } from "~/routes/($locale).products.$handle.custom/components/custom-order-aside"
import { LoaderQuery } from "~/routes/($locale).products.$handle.custom/queries/loader"
import { CustomOrderOption_uni40001 } from "~/lib/custom-order/options/uni-400-01"

export default function Route() {
  const data = useLoaderData<typeof loader>()

  const [state, dispatch] = useReducer(customOrderReducer, {
    construction: customOrderConstruction.goodyearWelt,
    leatherType: customOrderLeatherType.baron,
    leatherColor: customOrderLeatherColor.black,
    outsoleType: customOrderOutsoleType.leather01,
    liningType: customOrderLiningType.calfLeather,
    laceType: customOrderLaceType.black,
    insoleType: customOrderInsoleType.leather,
    size: 40,
    accessoryType: customOrderAccessoryType.heelPlateBlack,
  })

  const textureImages = toProductTextureImages(data)

  const modelSource = toModelSource(data)

  const config = new CustomOrderOption_uni40001(state)

  //const fileIds = getObjectValues(config.texture)

  // const textureImageUrls = textureImages.map((node) => node.url)

  // validateTextureImageUrls(fileIds, textureImageUrls)

  return (
    <main className="container">
      <CustomOrderLayout
        aside={
          <CustomOrderAside
            productId="uni-400-01"
            variants={data.product.variants.nodes}
            options={data.product.options}
            state={state}
            option={config}
            onDispatch={dispatch}
          />
        }
      >
        <CustomOrderPreview_uni40001
          state={state}
          modelSource={modelSource}
          textureImages={textureImages}
        />
      </CustomOrderLayout>
    </main>
  )
}

export async function loader(props: LoaderFunctionArgs) {
  const handle = "uni-400-01"

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

  return { product }
}
