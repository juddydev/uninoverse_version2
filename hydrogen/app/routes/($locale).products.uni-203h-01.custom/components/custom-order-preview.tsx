import { useGLTF, useTexture } from "@react-three/drei"
import { useThree } from "@react-three/fiber"
import { FragmentOf } from "gql.tada"
import { MeshStandardMaterial } from "three"
import { CustomOrderState } from "~/lib/custom-order/custom-order-state"
import { CustomOrderTexture_uni203h01 } from "~/lib/custom-order/textures/uni-203h-01"
import { flipTextureY } from "~/lib/custom-order/utils/flip-texture-y"
import { toGeometryFactory } from "~/lib/custom-order/utils/to-geometry-factory"
import { customOrderOutsoleType } from "~/lib/custom-order/values/custom-order-outsole-type"
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

export function CustomOrderPreview_uni203h01(props: Props) {
  const { viewport } = useThree()

  const { nodes } = useGLTF(props.modelSource.url)

  console.log(nodes)

  const texture = new CustomOrderTexture_uni203h01(props.state)

  console.log("props.textureImages", props.textureImages)

  const toImageUrl = productImageUrlFactory(props.textureImages)

  const upperTexture = useTexture({
    map: toImageUrl(texture.upper.baseColor),
    normalMap: toImageUrl(texture.upper.normal),
    roughnessMap: toImageUrl(texture.upper.roughness),
  })

  const upperMaterial = new MeshStandardMaterial(upperTexture)

  flipTextureY(upperTexture)

  const outsoleTexture = useTexture({
    map: toImageUrl(texture.outsole.baseColor),
    normalMap: toImageUrl(texture.outsole.normal),
    roughnessMap: toImageUrl(texture.outsole.roughness),
  })

  const outsoleMaterial = new MeshStandardMaterial(outsoleTexture)

  flipTextureY(outsoleTexture)

  const accessoryTexture = useTexture({
    map: toImageUrl(texture.accessory.baseColor),
    normalMap: toImageUrl(texture.accessory.normal),
    roughnessMap: toImageUrl(texture.accessory.roughness),
  })

  const accessoryMaterial = new MeshStandardMaterial(accessoryTexture)

  flipTextureY(accessoryTexture)

  const nodeKeys = Object.keys(nodes)

  console.log("nodeKeys", nodeKeys)

  const meshKey = {
    upper: "upper",
    decoration: "Decoration",
    leather1: "leather1",
    plate: "plate",
    halfRubber1: "halfrubber1",
    halfRubber2: "half_rubber2",
  }

  const toGeometry = toGeometryFactory(nodes)

  const isOutsoleLeather =
    props.state.outsoleType === customOrderOutsoleType.leather01 ||
    customOrderOutsoleType.leather02

  return (
    <group rotation={[Math.PI / 2, 0, Math.PI]} scale={viewport.width / 40}>
      <mesh
        castShadow
        receiveShadow
        geometry={toGeometry(meshKey.upper)}
        material={upperMaterial}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={toGeometry(meshKey.decoration)}
        material={accessoryMaterial}
      />
      {isOutsoleLeather && (
        <mesh
          castShadow
          receiveShadow
          geometry={toGeometry(meshKey.leather1)}
          material={outsoleMaterial}
        />
      )}
      <mesh
        castShadow
        receiveShadow
        geometry={toGeometry(meshKey.plate)}
        material={accessoryMaterial}
      />
      {props.state.outsoleType === customOrderOutsoleType.halfRubber01 && (
        <mesh
          castShadow
          receiveShadow
          geometry={toGeometry(meshKey.halfRubber1)}
          material={outsoleMaterial}
        />
      )}
      {props.state.outsoleType === customOrderOutsoleType.halfRubber02 && (
        <mesh
          castShadow
          receiveShadow
          geometry={toGeometry(meshKey.halfRubber2)}
          material={outsoleMaterial}
        />
      )}
    </group>
  )
}
