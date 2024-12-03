import { CustomOrderState } from "~/lib/custom-order/custom-order-state"

export abstract class CustomOrderTexture {
  readonly state: CustomOrderState

  constructor(state: CustomOrderState) {
    this.state = state
  }

  /**
   * TODO: baseColor => map
   */
  abstract get upper(): {
    baseColor: string
    normal: string
    roughness: string
    metallic: string | null
  } | null

  abstract get outsole(): {
    baseColor: string
    normal: string
    roughness: string
  } | null

  abstract get insole(): {
    baseColor: string
    normal: string | null
    roughness: string
  } | null

  abstract get accessory(): {
    baseColor: string
    normal: string
    roughness: string
    metallic: string | null
  } | null

  abstract get lining(): {
    baseColor: string
    roughness: string
  } | null

  abstract get lace(): {
    baseColor: string
    normal: string
    roughness: string
  } | null
}
