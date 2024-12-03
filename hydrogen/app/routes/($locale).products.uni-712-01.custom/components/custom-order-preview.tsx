import { useGLTF, useTexture } from "@react-three/drei"
import { useThree } from "@react-three/fiber"
import { FragmentOf } from "gql.tada"
import { CustomOrderState } from "~/lib/custom-order/custom-order-state"
import {
  ProductModelSourceFragment,
  ProductTextureImageFragment,
} from "~/routes/($locale).products.uni-703-01.custom/components/custom-order-preview"
import { toGeometryFactory } from "~/lib/custom-order/utils/to-geometry-factory"
import { CustomOrderTexture_uni71201 } from "~/lib/custom-order/textures/uni-712-01"
import { MeshStandardMaterial } from "three"
import { flipTextureY } from "~/lib/custom-order/utils/flip-texture-y"
import { productImageUrlFactory } from "~/routes/($locale).products.$handle._index/utils/product-image-url-factory"

type Props = {
  state: CustomOrderState
  modelSource: FragmentOf<typeof ProductModelSourceFragment>
  textureImages: FragmentOf<typeof ProductTextureImageFragment>[]
}

export function CustomOrderPreview_uni71201(props: Props) {
  const { nodes } = useGLTF(props.modelSource.url)

  const { viewport } = useThree()

  const texture = new CustomOrderTexture_uni71201(props.state)

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

  const meshKey = {
    vibram1: "vibram1",
    vibram2: "vibram2",
    vibram4: "vibram4",
    ToeCap: "ToeCap",
    Collar: "Collar",
    HeelLeather: "HeelLeather",
    Lining: "Lining",
    Pieces: "Pieces",
    ShoeBody: "ShoeBody",
    insole: "insole",
  }

  return (
    <group>
      <group rotation={[0, Math.PI, 0]} scale={viewport.width / 40}>
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
          geometry={toGeometry(meshKey.ToeCap)}
          material={outsoleMaterial}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={toGeometry(meshKey.Collar)}
          material={outsoleMaterial}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={toGeometry(meshKey.HeelLeather)}
          material={outsoleMaterial}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={toGeometry(meshKey.Lining)}
          material={outsoleMaterial}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={toGeometry(meshKey.Pieces)}
          material={outsoleMaterial}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={toGeometry(meshKey.ShoeBody)}
          material={outsoleMaterial}
        />
        <mesh
          rotation={[Math.PI / 2, 0, 0]}
          geometry={toGeometry(meshKey.insole)}
          material={upperMaterial}
          castShadow
          receiveShadow
        />
      </group>
    </group>
  )
}
