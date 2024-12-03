import { useThree } from "@react-three/fiber"
import { useGLTF, useTexture } from "@react-three/drei"
import { FragmentOf } from "gql.tada"
import { productImageUrlFactory } from "~/routes/($locale).products.$handle._index/utils/product-image-url-factory"
import { MeshStandardMaterial } from "three"
import { flipTextureY } from "~/lib/custom-order/utils/flip-texture-y"
import { toGeometryFactory } from "~/lib/custom-order/utils/to-geometry-factory"
import { CustomOrderState } from "~/lib/custom-order/custom-order-state"
import { CustomOrderTexture_uni70501 } from "~/lib/custom-order/textures/uni-705-01"
import {
  ProductModelSourceFragment,
  ProductTextureImageFragment,
} from "~/routes/($locale).products.$handle.custom/queries/loader"

type Props = {
  state: CustomOrderState
  modelSource: FragmentOf<typeof ProductModelSourceFragment>
  textureImages: FragmentOf<typeof ProductTextureImageFragment>[]
}

export function CustomOrderPreview_uni70501(props: Props) {
  const { viewport } = useThree()

  const { nodes } = useGLTF(props.modelSource.url)

  const texture = new CustomOrderTexture_uni70501(props.state)

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
    construction_norwegian: ["deco"],
    upper: ["upper"],
    sole: {
      halfRubber: "halfrubber",
      leather01: "leather1",
      leather02: "leather2",
    },
  }

  const toGeometry = toGeometryFactory(nodes)

  const norwegianKeys =
    props.state.construction === "norwegian"
      ? meshKey.construction_norwegian
      : []

  return (
    <group>
      <group rotation={[Math.PI / 2, 0, 0]} scale={viewport.width / 40}>
        {/** Construction */}
        {norwegianKeys.map((key) => (
          <mesh
            key={key}
            receiveShadow
            castShadow
            geometry={toGeometry(key)}
            material={upperMaterial}
          />
        ))}
        {/** Upper */}
        {meshKey.upper.map((key) => (
          <mesh
            key={key}
            receiveShadow
            castShadow
            geometry={toGeometry(key)}
            material={upperMaterial}
          />
        ))}
        {/** Sole */}
        <mesh
          receiveShadow
          castShadow
          geometry={toGeometry(meshKey.sole.halfRubber)}
          material={outsoleMaterial}
        />
      </group>
    </group>
  )
}
