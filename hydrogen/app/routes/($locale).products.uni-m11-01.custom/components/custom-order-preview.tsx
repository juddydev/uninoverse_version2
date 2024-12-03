import { useGLTF, useTexture } from "@react-three/drei"
import { useThree } from "@react-three/fiber"
import { FragmentOf } from "gql.tada"
import {
  ProductModelSourceFragment,
  ProductTextureImageFragment,
} from "~/routes/($locale).products.uni-703-01.custom/components/custom-order-preview"
import { productImageUrlFactory } from "~/routes/($locale).products.$handle._index/utils/product-image-url-factory"
import { MeshStandardMaterial } from "three"
import { flipTextureY } from "~/lib/custom-order/utils/flip-texture-y"
import { toGeometryFactory } from "~/lib/custom-order/utils/to-geometry-factory"
import { CustomOrderState } from "~/lib/custom-order/custom-order-state"
import { CustomOrderTexture_unim1101 } from "~/lib/custom-order/textures/uni-m11-01"
import { customOrderOutsoleType } from "~/lib/custom-order/values/custom-order-outsole-type"

type Props = {
  state: CustomOrderState
  modelSource: FragmentOf<typeof ProductModelSourceFragment>
  textureImages: FragmentOf<typeof ProductTextureImageFragment>[]
}

export function CustomOrderPreview_unim1101(props: Props) {
  const { viewport } = useThree()

  const texture = new CustomOrderTexture_unim1101(props.state)

  const toImageUrl = productImageUrlFactory(props.textureImages)

  const { nodes } = useGLTF(props.modelSource.url)

  const upperTexture = useTexture({
    map: toImageUrl(texture.upper.baseColor),
    normalMap: toImageUrl(texture.upper.normal),
    roughnessMap: toImageUrl(texture.upper.roughness),
  })

  flipTextureY(upperTexture)

  const upperMaterial = new MeshStandardMaterial(upperTexture)

  const outsoleTexture = useTexture({
    map: toImageUrl(texture.outsole.baseColor),
    normalMap: toImageUrl(texture.outsole.normal),
    roughnessMap: toImageUrl(texture.outsole.roughness),
  })

  flipTextureY(outsoleTexture)

  const outsoleMaterial = new MeshStandardMaterial(outsoleTexture)

  const meshKey = {
    upper: ["upper"],
    sole: {
      halfRubber: "halfrubber",
      leather01: "leather1",
    },
  }

  const toGeometry = toGeometryFactory(nodes)

  console.log("state", props.state)

  return (
    <group>
      <group rotation={[Math.PI / 2, 0, 0]} scale={viewport.width / 40}>
        {/** Upper */}
        {meshKey.upper.map((key) => (
          <mesh
            key={key}
            receiveShadow
            castShadow
            geometry={toGeometry(key)}
            material={upperMaterial}
          />
        ))}
        {/** Sole */}
        {props.state.outsoleType === customOrderOutsoleType.halfRubber01 && (
          <mesh
            receiveShadow
            castShadow
            geometry={toGeometry(meshKey.sole.halfRubber)}
            material={outsoleMaterial}
          />
        )}
        {/** Sole */}
        {props.state.outsoleType === customOrderOutsoleType.leather01 && (
          <mesh
            receiveShadow
            castShadow
            geometry={toGeometry(meshKey.sole.leather01)}
            material={outsoleMaterial}
          />
        )}
      </group>
    </group>
  )
}
