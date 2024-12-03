import type { SetURLSearchParams } from "react-router-dom"

/**
 * 絞り込み機能
 * @param searchParams
 * @param setSearchParams
 * @returns
 */
export function useSearchParamsVariants(
  searchParams: URLSearchParams,
  setSearchParams: SetURLSearchParams,
) {
  const setColor = (payload: string | null) => {
    if (payload === null) {
      searchParams.delete("color")
    } else {
      searchParams.set("color", payload)
    }
    setSearchParams(searchParams, { replace: true, preventScrollReset: true })
  }

  const setSize = (payload: string | null) => {
    if (payload === null) {
      searchParams.delete("size")
    } else {
      searchParams.set("size", payload)
    }
    setSearchParams(searchParams, { replace: true, preventScrollReset: true })
  }

  return {
    color: searchParams.get("color"),
    size: searchParams.get("size"),
    setColor,
    setSize,
  }
}
