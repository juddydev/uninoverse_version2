import { useThree } from "@react-three/fiber"
import { useGLTF, useTexture } from "@react-three/drei"
import { graphql } from "~/lib/graphql-storefront"
import { FragmentOf } from "gql.tada"
import { productImageUrlFactory } from "~/routes/($locale).products.$handle._index/utils/product-image-url-factory"
import { MeshStandardMaterial } from "three"
import { flipTextureY } from "~/lib/custom-order/utils/flip-texture-y"
import { toGeometryFactory } from "~/lib/custom-order/utils/to-geometry-factory"
import { CustomOrderState } from "~/lib/custom-order/custom-order-state"
import { customOrderOutsoleType } from "~/lib/custom-order/values/custom-order-outsole-type"
import { CustomOrderTexture_uni70302 } from "~/lib/custom-order/textures/uni-703-02"

type Props = {
  state: CustomOrderState
  modelSource: FragmentOf<typeof ProductModelSourceFragment>
  textureImages: FragmentOf<typeof ProductTextureImageFragment>[]
}

export function CustomOrderPreview_uni70301(props: Props) {
  const { viewport } = useThree()

  const { nodes } = useGLTF(props.modelSource.url)

  const texture = new CustomOrderTexture_uni70302(props.state)

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

  const plateTexture = useTexture({
    map: toImageUrl(texture.accessory.baseColor),
    normalMap: toImageUrl(texture.accessory.normal),
    roughnessMap: toImageUrl(texture.accessory.roughness),
    // metallicMap: file.outsoleAccessory.metallic
    //   ? toImageUrl(file.outsoleAccessory.metallic)
    //   : "",
  })

  flipTextureY(plateTexture)

  const plateMaterial = new MeshStandardMaterial(plateTexture)

  const meshKey = {
    construction_norwegian: ["Decoration_001"],
    upper: ["HeelStrip", "Tongue", "ToeCap", "ShoeBody"],
    lining: "Lining",
    shoelace: "Shoelace30",
    outsole: {
      halfRubber: "halfrubber",
      leather: "leather1",
      leather02: "leather2",
    },
    insole: "Insole",
  } as const

  const toGeometry = toGeometryFactory(nodes)

  const isHalfRubber =
    props.state.outsoleType === customOrderOutsoleType.halfRubber01 ||
    props.state.outsoleType === customOrderOutsoleType.halfRubber02

  const isLeather01 =
    props.state.outsoleType === customOrderOutsoleType.leather01 ||
    props.state.outsoleType === customOrderOutsoleType.leather03

  const isLeather02 =
    props.state.outsoleType === customOrderOutsoleType.leather02

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
        {/** Lining */}
        <mesh
          receiveShadow
          castShadow
          geometry={toGeometry(meshKey.lining)}
          material={outsoleMaterial}
        />
        {/** Shoelace */}
        <mesh
          receiveShadow
          castShadow
          geometry={toGeometry(meshKey.shoelace)}
          material={outsoleMaterial}
        />
        {/** Outsole */}
        {isHalfRubber && (
          <mesh
            receiveShadow
            castShadow
            geometry={toGeometry(meshKey.outsole.halfRubber)}
            material={plateMaterial}
          />
        )}
        {isLeather01 && (
          <mesh
            receiveShadow
            castShadow
            geometry={toGeometry(meshKey.outsole.leather)}
            material={plateMaterial}
          />
        )}
        {isLeather02 && (
          <mesh
            receiveShadow
            castShadow
            geometry={toGeometry(meshKey.outsole.leather02)}
            material={plateMaterial}
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
