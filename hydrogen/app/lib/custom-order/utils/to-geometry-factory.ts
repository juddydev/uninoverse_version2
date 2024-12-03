import { Object3DEventMap, Object3D, Mesh } from "three"

type ThreeNode = {
  [name: string]: Object3D<Object3DEventMap>
}

export function toGeometryFactory(object: ThreeNode) {
  return (key: string) => {
    const mesh = object[key] as Mesh

    if (mesh === undefined) {
      throw new Error(`Node not found: ${key}`)
    }

    if (mesh.type !== "Mesh") {
      throw new Error(`Node is not Mesh: ${key}`)
    }

    return mesh.geometry
  }
}
