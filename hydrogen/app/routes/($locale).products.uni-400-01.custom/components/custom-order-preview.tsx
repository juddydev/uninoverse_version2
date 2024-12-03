import { useThree } from "@react-three/fiber"
import { useGLTF, useTexture } from "@react-three/drei"
import { FragmentOf } from "gql.tada"
import { flipTextureY } from "~/lib/custom-order/utils/flip-texture-y"
import { toGeometryFactory } from "~/lib/custom-order/utils/to-geometry-factory"
import {
  ProductModelSourceFragment,
  ProductTextureImageFragment,
} from "~/routes/($locale).products.uni-703-01.custom/components/custom-order-preview"
import { productImageUrlFactory } from "~/routes/($locale).products.$handle._index/utils/product-image-url-factory"
import { MeshStandardMaterial } from "three"
import { CustomOrderState } from "~/lib/custom-order/custom-order-state"
import { CustomOrderTexture_uni40001 } from "~/lib/custom-order/textures/uni-400-01"

type Props = {
  state: CustomOrderState
  modelSource: FragmentOf<typeof ProductModelSourceFragment>
  textureImages: FragmentOf<typeof ProductTextureImageFragment>[]
}

export function CustomOrderPreview_uni40001(props: Props) {
  const { viewport } = useThree()

  const texture = new CustomOrderTexture_uni40001(props.state)

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

  const insoleTexture = useTexture({
    map: toImageUrl(texture.insole.baseColor),
    roughnessMap: toImageUrl(texture.insole.roughness),
  })

  flipTextureY(insoleTexture)

  const insoleMaterial = new MeshStandardMaterial(insoleTexture)

  const accessoryTexture = useTexture({
    map: toImageUrl(texture.accessory.baseColor),
    normalMap: toImageUrl(texture.accessory.normal),
    roughnessMap: toImageUrl(texture.accessory.roughness),
    // metallicMap: toImageUrl(file.accessory.metallic.metal_heel),
  })

  flipTextureY(accessoryTexture)

  const accessoryMaterial = new MeshStandardMaterial(accessoryTexture)

  // flipTextureY(insoleTexture)

  const meshKey = {
    construction_norwegian: "Decoration",
    shoeBody: "ShoeBody",
    toeCap: "ToeCap",
    plate: "plate",
    pieces: "Pieces",
    heelLeather: "HeelLeather",
    heelStrip: "HeelStrip",
    lining: "Lining",
    vibram: "vibram1",
    insole: "insole2",
    outsole: {
      halfRubber01: "halfrubber1",
      halfRubber02: "half_rubber2",
      leather01: "leather1",
      leather02: "leather2",
    },
  }

  const toGeometry = toGeometryFactory(nodes)

  return (
    <group dispose={null}>
      <group rotation={[Math.PI / 2, 0, 0]} scale={viewport.width / 40}>
        {/** Construction */}
        <mesh
          receiveShadow
          castShadow
          geometry={toGeometry(meshKey.construction_norwegian)}
          material={upperMaterial}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={toGeometry(meshKey.shoeBody)}
          material={upperMaterial}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={toGeometry(meshKey.toeCap)}
          material={upperMaterial}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={toGeometry(meshKey.plate)}
          material={outsoleMaterial}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={toGeometry(meshKey.pieces)}
          material={upperMaterial}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={toGeometry(meshKey.heelLeather)}
          material={upperMaterial}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={toGeometry(meshKey.heelStrip)}
          material={upperMaterial}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={toGeometry(meshKey.lining)}
          material={upperMaterial}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={toGeometry(meshKey.vibram)}
          material={accessoryMaterial}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={toGeometry(meshKey.insole)}
          material={insoleMaterial}
        />
      </group>
    </group>
  )
}
