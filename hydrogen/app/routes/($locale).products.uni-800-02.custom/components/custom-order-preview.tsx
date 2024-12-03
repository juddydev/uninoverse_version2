import { useThree } from "@react-three/fiber"
import { useGLTF, useTexture } from "@react-three/drei"
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
import { CustomOrderTexture_uni80002 } from "~/lib/custom-order/textures/uni-800-02"

type Props = {
  state: CustomOrderState
  modelSource: FragmentOf<typeof ProductModelSourceFragment>
  textureImages: FragmentOf<typeof ProductTextureImageFragment>[]
}

export function CustomOrderPreview_uni80002(props: Props) {
  const { viewport } = useThree()

  const texture = new CustomOrderTexture_uni80002(props.state)

  console.log("textureImages", props.textureImages)

  const toImageUrl = productImageUrlFactory(props.textureImages)

  const { nodes } = useGLTF(props.modelSource.url)

  const upperTexture = useTexture({
    map: toImageUrl(texture.upper.baseColor),
    normalMap: toImageUrl(texture.upper.normal),
    roughnessMap: toImageUrl(texture.upper.roughness),
  })

  flipTextureY(upperTexture)

  const upperMaterial = new MeshStandardMaterial(upperTexture)

  /*
  const upper2Texture = useTexture({
    map: toImageUrl(file.upper_2.base_color.white),
    normalMap: toImageUrl(file.upper_2.normal),
    roughnessMap: toImageUrl(file.upper_2.roughness),
  })
  */

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
  })

  flipTextureY(accessoryTexture)

  const accessoryMaterial = new MeshStandardMaterial(accessoryTexture)

  const meshKey = {
    upper: "upper",
    sole: "sole",
    buckle: "buckle",
  }

  const toGeometry = toGeometryFactory(nodes)

  return (
    <group dispose={null}>
      <group
        rotation={[Math.PI / 2, 0, Math.PI / 1]}
        scale={viewport.width / 4}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={toGeometry(meshKey.sole)}
          material={outsoleMaterial}
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
          geometry={toGeometry(meshKey.buckle)}
          material={accessoryMaterial}
        />
      </group>
    </group>
  )
}
