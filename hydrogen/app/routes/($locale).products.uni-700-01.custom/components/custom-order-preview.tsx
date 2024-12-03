import { useGLTF, useTexture } from "@react-three/drei"
import { useThree } from "@react-three/fiber"
import { FragmentOf } from "gql.tada"
import { MeshStandardMaterial } from "three"
import { CustomOrderState } from "~/lib/custom-order/custom-order-state"
import { CustomOrderTexture_uni70001 } from "~/lib/custom-order/textures/uni-700-01"
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

export function CustomOrderPreview_uni70001(props: Props) {
  const { viewport } = useThree()

  const { nodes } = useGLTF(props.modelSource.url)

  const texture = new CustomOrderTexture_uni70001(props.state)

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

  const accessoryTexture = useTexture({
    map: toImageUrl(texture.accessory.baseColor),
    normalMap: toImageUrl(texture.accessory.normal),
    roughnessMap: toImageUrl(texture.accessory.roughness),
    // metallicMap: toImageUrl(file.accessory.metallic.metal_heel),
  })

  flipTextureY(accessoryTexture)

  const accessoryMaterial = new MeshStandardMaterial(accessoryTexture)

  console.log(Object.keys(nodes))

  const toGeometry = toGeometryFactory(nodes)

  console.log("texture", texture)

  const meshKey = {
    goodyear: "goodyear",
    upper: "upper",
    vibram4: "vibram4",
    leather1: "leather1",
    leather2: "leather2",
    halfrubber: "halfrubber",
    plate: "plate",
    vibram1: "vibram1",
    deco: "deco",
  }

  return (
    <group dispose={null}>
      <group scale={viewport.width / 40}>
        <mesh
          receiveShadow
          castShadow
          rotation={[Math.PI / 2, 0, 0]}
          geometry={toGeometry(meshKey.goodyear)}
          material={upperMaterial}
        />
        <mesh
          receiveShadow
          castShadow
          rotation={[Math.PI / 2, 0, 0]}
          geometry={toGeometry(meshKey.upper)}
          material={upperMaterial}
        />
        <mesh
          receiveShadow
          castShadow
          rotation={[Math.PI / 2, 0, 0]}
          geometry={toGeometry(meshKey.vibram4)}
          material={outsoleMaterial}
        />
        <mesh
          receiveShadow
          castShadow
          rotation={[Math.PI / 2, 0, 0]}
          geometry={toGeometry(meshKey.leather1)}
          material={outsoleMaterial}
        />
        <mesh
          receiveShadow
          castShadow
          rotation={[Math.PI / 2, 0, 0]}
          geometry={toGeometry(meshKey.leather2)}
          material={outsoleMaterial}
        />
        <mesh
          receiveShadow
          castShadow
          geometry={toGeometry(meshKey.halfrubber)}
          material={outsoleMaterial}
        />
        <mesh
          receiveShadow
          castShadow
          rotation={[Math.PI / 2, 0, 0]}
          geometry={toGeometry(meshKey.plate)}
          material={accessoryMaterial}
        />
        <mesh
          receiveShadow
          castShadow
          rotation={[Math.PI / 2, 0, 0]}
          geometry={toGeometry(meshKey.vibram1)}
          material={outsoleMaterial}
        />
        <mesh
          receiveShadow
          castShadow
          rotation={[Math.PI / 2, 0, 0]}
          geometry={toGeometry(meshKey.deco)}
          material={outsoleMaterial}
        />
      </group>
    </group>
  )
}
