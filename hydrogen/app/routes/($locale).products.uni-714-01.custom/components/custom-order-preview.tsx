import { useThree } from "@react-three/fiber"
import { useGLTF, useTexture } from "@react-three/drei"
import { FragmentOf } from "gql.tada"
import { CustomOrderState } from "~/lib/custom-order/custom-order-state"
import {
  ProductModelSourceFragment,
  ProductTextureImageFragment,
} from "~/routes/($locale).products.uni-703-01.custom/components/custom-order-preview"
import { toGeometryFactory } from "~/lib/custom-order/utils/to-geometry-factory"
import { CustomOrderTexture_uni71401 } from "~/lib/custom-order/textures/uni-714-01"
import { productImageUrlFactory } from "~/routes/($locale).products.$handle._index/utils/product-image-url-factory"
import { MeshStandardMaterial } from "three"
import { flipTextureY } from "~/lib/custom-order/utils/flip-texture-y"

type Props = {
  state: CustomOrderState
  modelSource: FragmentOf<typeof ProductModelSourceFragment>
  textureImages: FragmentOf<typeof ProductTextureImageFragment>[]
}

export function CustomOrderPreview_uni71401(props: Props) {
  const { nodes } = useGLTF(props.modelSource.url)

  const { viewport } = useThree()

  const texture = new CustomOrderTexture_uni71401(props.state)

  const toImageUrl = productImageUrlFactory(props.textureImages)

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

  const toGeometry = toGeometryFactory(nodes)

  console.log(nodes)

  const meshKey = {
    upper: "upper",
    halfrubber: "halfrubber",
    leather1: "leather1",
  }

  return (
    <group>
      <group rotation={[Math.PI / 2, 0, 0]} scale={viewport.width / 40}>
        <mesh
          castShadow
          receiveShadow
          geometry={toGeometry(meshKey.upper)}
          material={upperMaterial}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={toGeometry(meshKey.halfrubber)}
          material={outsoleMaterial}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={toGeometry(meshKey.leather1)}
          material={outsoleMaterial}
        />
      </group>
    </group>
  )
}
