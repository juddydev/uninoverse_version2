import { useGLTF, useTexture } from "@react-three/drei"
import { useThree } from "@react-three/fiber"
import { FragmentOf } from "gql.tada"
import {
  ProductModelSourceFragment,
  ProductTextureImageFragment,
} from "~/routes/($locale).products.uni-703-01.custom/components/custom-order-preview"
import { toGeometryFactory } from "~/lib/custom-order/utils/to-geometry-factory"
import { CustomOrderState } from "~/lib/custom-order/custom-order-state"
import { CustomOrderTexture_uni70601 } from "~/lib/custom-order/textures/uni-706-01"
import { MeshStandardMaterial } from "three"
import { flipTextureY } from "~/lib/custom-order/utils/flip-texture-y"
import { productImageUrlFactory } from "~/routes/($locale).products.$handle._index/utils/product-image-url-factory"
import { customOrderOutsoleType } from "~/lib/custom-order/values/custom-order-outsole-type"

type Props = {
  state: CustomOrderState
  modelSource: FragmentOf<typeof ProductModelSourceFragment>
  textureImages: FragmentOf<typeof ProductTextureImageFragment>[]
}

export function CustomOrderPreview_uni70601(props: Props) {
  const { viewport } = useThree()

  const { nodes } = useGLTF(props.modelSource.url)

  const texture = new CustomOrderTexture_uni70601(props.state)

  console.log("texture", texture)

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

  // const meshKey = {
  //   deco: "deco",
  //   upper: "upper",
  //   goodyear1: "goodyear1",
  //   vibram4: "vibram4",
  //   leather1: "leather1",
  //   leather2: "leather2",
  //   vibram1: "vibram1",
  //   halfrubber: "halfrubber",
  // }

  const meshKey = {
    deco: "deco",
    upper: "upper",
    goodyear1: "goodyear1",
    outsole: {
      vibram01: "vibram1",
      vibram04: "vibram4",
      leather01: "leather1",
      leather02: "leather2",
      halfRubber01: "halfrubber",
    },
  }

  return (
    <group>
      <group rotation={[Math.PI / 2, 0, 0]} scale={viewport.width / 40}>
        {/** Construction */}
        <mesh
          castShadow
          receiveShadow
          geometry={toGeometry(meshKey.deco)}
          material={upperMaterial}
        />
        {/** Upper */}
        <mesh
          castShadow
          receiveShadow
          geometry={toGeometry(meshKey.upper)}
          material={upperMaterial}
          position={[0, 0.004, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={toGeometry(meshKey.goodyear1)}
          material={upperMaterial}
          position={[-0.001, 0.005, 0.007]}
        />
        {/** Outsole */}
        {props.state.outsoleType === customOrderOutsoleType.leather01 && (
          <mesh
            receiveShadow
            castShadow
            geometry={toGeometry(meshKey.outsole.leather01)}
            material={outsoleMaterial}
          />
        )}
        {props.state.outsoleType === customOrderOutsoleType.leather02 && (
          <mesh
            receiveShadow
            castShadow
            geometry={toGeometry(meshKey.outsole.leather02)}
            material={outsoleMaterial}
          />
        )}
        {props.state.outsoleType === customOrderOutsoleType.vibram01 && (
          <mesh
            receiveShadow
            castShadow
            geometry={toGeometry(meshKey.outsole.vibram01)}
            position={[0, 0.001, 0]}
            material={outsoleMaterial}
          />
        )}
        {props.state.outsoleType === customOrderOutsoleType.vibram04 && (
          <mesh
            receiveShadow
            castShadow
            geometry={toGeometry(meshKey.outsole.vibram04)}
            material={outsoleMaterial}
          />
        )}
        {props.state.outsoleType === customOrderOutsoleType.halfRubber01 && (
          <mesh
            receiveShadow
            castShadow
            geometry={toGeometry(meshKey.outsole.halfRubber01)}
            material={outsoleMaterial}
            position={[0, 0.003, 0]}
          />
        )}
      </group>
    </group>
  )
}
