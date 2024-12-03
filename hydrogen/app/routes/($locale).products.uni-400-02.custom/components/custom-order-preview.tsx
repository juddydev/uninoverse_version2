import { useThree } from "@react-three/fiber"
import { useGLTF, useTexture } from "@react-three/drei"
import { FragmentOf } from "gql.tada"
import { productImageUrlFactory } from "~/routes/($locale).products.$handle._index/utils/product-image-url-factory"
import { MeshStandardMaterial } from "three"
import { flipTextureY } from "~/lib/custom-order/utils/flip-texture-y"
import { toGeometryFactory } from "~/lib/custom-order/utils/to-geometry-factory"
import {
  ProductModelSourceFragment,
  ProductTextureImageFragment,
} from "~/routes/($locale).products.uni-703-01.custom/components/custom-order-preview"
import { CustomOrderState } from "~/lib/custom-order/custom-order-state"
import { CustomOrderTexture_uni40002 } from "~/lib/custom-order/textures/uni-400-02"

type Props = {
  state: CustomOrderState
  modelSource: FragmentOf<typeof ProductModelSourceFragment>
  textureImages: FragmentOf<typeof ProductTextureImageFragment>[]
}

export function CustomOrderPreview_uni40002(props: Props) {
  const { viewport } = useThree()

  const texture = new CustomOrderTexture_uni40002(props.state)

  const toImageUrl = productImageUrlFactory(props.textureImages)

  const { nodes } = useGLTF(props.modelSource.url)

  console.log("texture", texture)

  const upperTexture = useTexture({
    map: toImageUrl(texture.upper.baseColor),
    normalMap: toImageUrl(texture.upper.normal),
    roughnessMap: toImageUrl(texture.upper.roughness),
  })

  flipTextureY(upperTexture)

  const soleTexture = useTexture({
    map: toImageUrl(texture.outsole.baseColor),
    normalMap: toImageUrl(texture.outsole.normal),
    roughnessMap: toImageUrl(texture.outsole.roughness),
  })

  const upperMaterial = new MeshStandardMaterial(upperTexture)

  const soleMaterial = new MeshStandardMaterial(soleTexture)

  flipTextureY(soleTexture)

  const meshKey = {
    shoelace: "Shoelace",
    toeCap: "ToeCap",
    plate: "plate",
    pieces: "Pieces",
    heelLeather: "HeelLeather1",
    heelStrip: "HeelStrip",
    lining: "Lining",
    vibram: "vibram1",
    insole: "insole2",
    outsole: {
      halfRubber1: "halfrubber1",
      halfRubber2: "half_rubber2",
      leather1: "leather1",
      leather2: "leather2",
    },
  }

  const toGeometry = toGeometryFactory(nodes)

  return (
    <group dispose={null}>
      <group scale={viewport.width / 40}>
        <mesh
          castShadow
          receiveShadow
          geometry={toGeometry(meshKey.shoelace)}
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
          geometry={toGeometry(meshKey.heelLeather)}
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
          geometry={toGeometry(meshKey.heelStrip)}
          material={upperMaterial}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={toGeometry(meshKey.insole)}
          material={upperMaterial}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={toGeometry(meshKey.outsole.halfRubber1)}
          material={soleMaterial}
        />
        {/* <mesh
          castShadow
          receiveShadow
          geometry={toGeometry(meshKey.leather2)}
          material={materials.Outsole5}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={toGeometry(meshKey.vibram1)}
          material={materials.aiStandardSurface3}
          position={[0.005, -0.004, -0.011]}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={toGeometry(meshKey.leather1)}
          material={materials.Outsole4}
        /> */}
      </group>
    </group>
  )
}
