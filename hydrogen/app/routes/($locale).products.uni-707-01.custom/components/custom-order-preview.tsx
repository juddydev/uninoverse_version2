import { useGLTF, useTexture } from "@react-three/drei"
import { useThree } from "@react-three/fiber"
import { FragmentOf } from "gql.tada"
import { CustomOrderState } from "~/lib/custom-order/custom-order-state"
import {
  ProductModelSourceFragment,
  ProductTextureImageFragment,
} from "~/routes/($locale).products.uni-703-01.custom/components/custom-order-preview"
import { toGeometryFactory } from "~/lib/custom-order/utils/to-geometry-factory"
import { CustomOrderTexture_uni70701 } from "~/lib/custom-order/textures/uni-707-01"
import { MeshStandardMaterial } from "three"
import { flipTextureY } from "~/lib/custom-order/utils/flip-texture-y"
import { productImageUrlFactory } from "~/routes/($locale).products.$handle._index/utils/product-image-url-factory"
import { customOrderOutsoleType } from "~/lib/custom-order/values/custom-order-outsole-type"

type Props = {
  state: CustomOrderState
  modelSource: FragmentOf<typeof ProductModelSourceFragment>
  textureImages: FragmentOf<typeof ProductTextureImageFragment>[]
}

export function CustomOrderPreview_uni70701(props: Props) {
  const { nodes } = useGLTF(props.modelSource.url)

  const { viewport } = useThree()

  const texture = new CustomOrderTexture_uni70701(props.state)

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

  const insoleTexture = useTexture({
    map: toImageUrl(texture.insole.baseColor),
    roughnessMap: toImageUrl(texture.insole.roughness),
  })

  flipTextureY(insoleTexture)

  const insoleMaterial = new MeshStandardMaterial(insoleTexture)

  const liningTexture = useTexture({
    map: toImageUrl(texture.lining.baseColor),
    roughnessMap: toImageUrl(texture.lining.roughness),
  })

  flipTextureY(liningTexture)

  const liningMaterial = new MeshStandardMaterial(liningTexture)

  const laceTexture = useTexture({
    map: toImageUrl(texture.lace.baseColor),
    roughnessMap: toImageUrl(texture.lace.roughness),
    normalMap: toImageUrl(texture.lace.normal),
  })

  flipTextureY(laceTexture)

  const laceMaterial = new MeshStandardMaterial(laceTexture)

  console.log("texture", texture)

  const toGeometry = toGeometryFactory(nodes)

  console.log(nodes)

  const meshKey = {
    Decoration: "Decoration",
    insole: "insole",
    Lining1: "Lining1",
    Shoelace3_01: "Shoelace3_01",
    upper: "upper",
    outsole: {
      vibram01: "vibram1",
      vibram04: "vibram4",
      vibram02: "vibram2 ",
    },
  }

  return (
    <group>
      <group rotation={[Math.PI / 2, 0, 0]} scale={viewport.width / 40}>
        <mesh
          castShadow
          receiveShadow
          geometry={toGeometry(meshKey.Decoration)}
          material={upperMaterial}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={toGeometry(meshKey.insole)}
          material={insoleMaterial}
        />
        {props.state.outsoleType === customOrderOutsoleType.vibram01 && (
          <mesh
            receiveShadow
            castShadow
            geometry={toGeometry(meshKey.outsole.vibram01)}
            position={[0, 0.001, 0]}
            material={outsoleMaterial}
          />
        )}
        {props.state.outsoleType === customOrderOutsoleType.vibram02 && (
          <mesh
            receiveShadow
            castShadow
            geometry={toGeometry(meshKey.outsole.vibram02)}
            position={[0, 0.001, 0]}
            material={outsoleMaterial}
          />
        )}
        {props.state.outsoleType === customOrderOutsoleType.vibram04 && (
          <mesh
            receiveShadow
            castShadow
            geometry={toGeometry(meshKey.outsole.vibram04)}
            position={[0, 0.001, 0]}
            material={outsoleMaterial}
          />
        )}
        <mesh
          castShadow
          receiveShadow
          geometry={toGeometry(meshKey.Lining1)}
          material={liningMaterial}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={toGeometry(meshKey.Shoelace3_01)}
          material={laceMaterial}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={toGeometry(meshKey.upper)}
          material={upperMaterial}
        />
      </group>
    </group>
  )
}
