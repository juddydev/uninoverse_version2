import { useGLTF, useTexture } from "@react-three/drei"
import { useThree } from "@react-three/fiber"
import { FragmentOf } from "gql.tada"
import { MeshStandardMaterial } from "three"
import { CustomOrderState } from "~/lib/custom-order/custom-order-state"
import { CustomOrderTexture_uni71001 } from "~/lib/custom-order/textures/uni-710-01"
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

export function CustomOrderPreview_uni71001(props: Props) {
  const { viewport } = useThree()

  const { nodes } = useGLTF(props.modelSource.url)

  const texture = new CustomOrderTexture_uni71001(props.state)

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

  console.log("texture", texture)

  console.log(Object.keys(nodes))

  const meshKey = {
    Decoration: "Decoration",
    vibram4: "vibram4",
    vibram1: "vibram1",
    vibram2: "vibram2",
    upper: "upper",
    goodyear1: "goodyear1",
  }

  const toGeometry = toGeometryFactory(nodes)

  return (
    <group dispose={null}>
      <group rotation={[Math.PI / 2, 0, 0]} scale={viewport.width / 40}>
        {/** Construction */}
        <mesh
          receiveShadow
          castShadow
          geometry={toGeometry(meshKey.Decoration)}
          material={upperMaterial}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={toGeometry(meshKey.goodyear1)}
          material={upperMaterial}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={toGeometry(meshKey.upper)}
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
      </group>
    </group>
  )
}
