import { useGLTF, useTexture } from "@react-three/drei"
import { useThree } from "@react-three/fiber"
import { FragmentOf } from "gql.tada"
import { MeshStandardMaterial } from "three"
import { CustomOrderState } from "~/lib/custom-order/custom-order-state"
import { CustomOrderTexture_uni70102 } from "~/lib/custom-order/textures/uni-701-02"
import { flipTextureY } from "~/lib/custom-order/utils/flip-texture-y"
import { toGeometryFactory } from "~/lib/custom-order/utils/to-geometry-factory"
import { productImageUrlFactory } from "~/routes/($locale).products.$handle._index/utils/product-image-url-factory"
import {
  ProductModelSourceFragment,
  ProductTextureImageFragment,
} from "~/routes/($locale).products.uni-703-01.custom/components/custom-order-preview"

type Props = {
  state: CustomOrderState
  modelSource: FragmentOf<typeof ProductModelSourceFragment>
  textureImages: FragmentOf<typeof ProductTextureImageFragment>[]
}

export function CustomOrderPreview_uni70102(props: Props) {
  const { viewport } = useThree()

  const texture = new CustomOrderTexture_uni70102(props.state)

  console.log("texture", texture)

  const { nodes } = useGLTF(props.modelSource.url)

  console.log(Object.keys(nodes))

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

  const meshKey = {
    goodyear: "goodyear",
    upper: "upper",
    halfrubber: "halfrubber",
    vibram2: "vibram2",
    vibram4: "vibram4",
    Decoration: "Decoration",
    vibram1: "vibram1",
  }

  const toGeometry = toGeometryFactory(nodes)

  return (
    <group dispose={null}>
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
          geometry={toGeometry(meshKey.goodyear)}
          material={upperMaterial}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={toGeometry(meshKey.halfrubber)}
          material={upperMaterial}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={toGeometry(meshKey.vibram1)}
          material={outsoleMaterial}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={toGeometry(meshKey.vibram2)}
          material={outsoleMaterial}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={toGeometry(meshKey.vibram4)}
          material={outsoleMaterial}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={toGeometry(meshKey.Decoration)}
          material={upperMaterial}
        />
      </group>
    </group>
  )
}
