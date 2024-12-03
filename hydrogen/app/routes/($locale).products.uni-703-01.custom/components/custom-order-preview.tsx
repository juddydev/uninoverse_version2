import { useThree } from "@react-three/fiber"
import { useGLTF, useTexture } from "@react-three/drei"
import { graphql } from "~/lib/graphql-storefront"
import { FragmentOf } from "gql.tada"
import { productImageUrlFactory } from "~/routes/($locale).products.$handle._index/utils/product-image-url-factory"
import { MeshStandardMaterial } from "three"
import { flipTextureY } from "~/lib/custom-order/utils/flip-texture-y"
import { toGeometryFactory } from "~/lib/custom-order/utils/to-geometry-factory"
import { CustomOrderState } from "~/lib/custom-order/custom-order-state"
import { CustomOrderTexture_uni70301 } from "~/lib/custom-order/textures/uni-703-01"
import { customOrderOutsoleType } from "~/lib/custom-order/values/custom-order-outsole-type"

type Props = {
  state: CustomOrderState
  modelSource: FragmentOf<typeof ProductModelSourceFragment>
  textureImages: FragmentOf<typeof ProductTextureImageFragment>[]
}

export function CustomOrderPreview_uni70301(props: Props) {
  const { viewport } = useThree()

  const { nodes } = useGLTF(props.modelSource.url)

  const texture = new CustomOrderTexture_uni70301(props.state)

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
    // metallicMap: file.outsoleAccessory.metallic
    //   ? toImageUrl(file.outsoleAccessory.metallic)
    //   : "",
  })

  const accessoryMaterial = new MeshStandardMaterial(accessoryTexture)

  flipTextureY(accessoryTexture)

  /**
   * アクセサリーを持つテクスチャ
   */
  const hasOutsoleAccessory =
    props.state.outsoleType === "half-rubber-02" ||
    props.state.outsoleType === "leather-02"

  const meshKey = {
    construction_norwegian: ["Decoration2"],
    upper: ["メッシュ007", "メッシュ007_1"],
    plate: "plate",
    outsole: {
      halfRubber01: "halfrubber1",
      halfRubber02: "half_rubber2",
      leather01: "leather1",
      leather02: "leather2",
      leather03: "leather3",
    },
  }

  const toGeometry = toGeometryFactory(nodes)

  return (
    <group>
      <group rotation={[Math.PI / 2, 0, 0]} scale={viewport.width / 40}>
        {/** Construction */}
        {props.state.construction === "norwegian" &&
          meshKey.construction_norwegian.map((key) => (
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
        {/** Outsole */}
        {props.state.outsoleType === customOrderOutsoleType.halfRubber01 && (
          <mesh
            receiveShadow
            castShadow
            geometry={toGeometry(meshKey.outsole.halfRubber01)}
            material={outsoleMaterial}
          />
        )}
        {/** Outsole */}
        {props.state.outsoleType === customOrderOutsoleType.halfRubber02 && (
          <mesh
            receiveShadow
            castShadow
            geometry={toGeometry(meshKey.outsole.halfRubber02)}
            material={outsoleMaterial}
          />
        )}
        {/** Outsole */}
        {props.state.outsoleType === customOrderOutsoleType.leather01 && (
          <mesh
            receiveShadow
            castShadow
            geometry={toGeometry(meshKey.outsole.leather01)}
            material={outsoleMaterial}
          />
        )}
        {/** Outsole */}
        {props.state.outsoleType === customOrderOutsoleType.leather02 && (
          <mesh
            receiveShadow
            castShadow
            geometry={toGeometry(meshKey.outsole.leather02)}
            material={outsoleMaterial}
          />
        )}
        {/** Outsole */}
        {props.state.outsoleType === customOrderOutsoleType.leather03 && (
          <mesh
            receiveShadow
            castShadow
            geometry={toGeometry(meshKey.outsole.leather03)}
            material={outsoleMaterial}
          />
        )}
        {hasOutsoleAccessory && (
          <mesh
            receiveShadow
            castShadow
            geometry={toGeometry(meshKey.plate)}
            material={accessoryMaterial}
          />
        )}
      </group>
    </group>
  )
}

export const ProductModelSourceFragment = graphql(
  `fragment ProductModelSource on Model3dSource @_unmask {
    url
    mimeType
  }`,
)

export const ProductTextureImageFragment = graphql(
  `fragment ProductTextureImage on Image @_unmask {
    id
    altText
    url
    width
    height
  }`,
)
