import { CustomOrderAction } from "~/lib/custom-order/types/custom-order-action"
import { CustomOrderState } from "~/lib/custom-order/custom-order-state"

export function customOrderReducer(
  state: CustomOrderState,
  action: CustomOrderAction,
): CustomOrderState {
  if (action.type === "UPDATE_CONSTRUCTION") {
    return {
      ...state,
      construction: action.payload,
    }
  }

  if (action.type === "UPDATE_LEATHER") {
    return {
      ...state,
      leatherType: action.payload,
    }
  }

  if (action.type === "UPDATE_LEATHER_COLOR") {
    return {
      ...state,
      leatherColor: action.payload,
    }
  }

  if (action.type === "UPDATE_OUTSOLE_TYPE") {
    return {
      ...state,
      outsoleType: action.payload,
    }
  }

  if (action.type === "UPDATE_LINING") {
    return {
      ...state,
      liningType: action.payload,
    }
  }

  if (action.type === "UPDATE_LACE") {
    return {
      ...state,
      laceType: action.payload,
    }
  }

  if (action.type === "UPDATE_INSOLE") {
    return {
      ...state,
      insoleType: action.payload,
    }
  }

  if (action.type === "UPDATE_SIZE") {
    return {
      ...state,
      size: action.payload,
    }
  }

  if (action.type === "UPDATE_ACCESSORY_HEEL_PLATE") {
    return {
      ...state,
      accessoryType: action.payload,
    }
  }

  throw new Error("Invalid action type")
}
