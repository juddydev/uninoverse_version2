import { Texture } from "three"

type Props = {
  map: Texture
  normalMap?: Texture
  roughnessMap?: Texture
}

export function flipTextureY(textures: Props) {
  textures.map.flipY = false

  if (textures.normalMap) {
    textures.normalMap.flipY = false
  }

  if (textures.roughnessMap) {
    textures.roughnessMap.flipY = false
  }
}
