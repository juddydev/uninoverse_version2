// @ts-nocheck

import g from "react"

function n(a, b) {
  return (a === b && (0 !== a || 1 / a === 1 / b)) || (a !== a && b !== b)
}
const p = "function" === typeof Object.is ? Object.is : n
const q = g.useSyncExternalStore
const r = g.useRef
const t = g.useEffect
const u = g.useMemo
const v = g.useDebugValue

export function useSyncExternalStoreWithSelector(a, b, e, l, h) {
  let c = r(null)
  let f
  if (null === c.current) {
    f = { hasValue: !1, value: null }
    c.current = f
  } else {
    f = c.current
  }
  c = u(() => {
    function a(a) {
      if (!c) {
        c = !0
        d = a
        a = l(a)
        if (void 0 !== h && f.hasValue) {
          const b = f.value
          if (h(b, a)) return (k = b)
        }
        return (k = a)
      }
      b = k
      if (p(d, a)) return b
      const e = l(a)
      if (void 0 !== h && h(b, e)) return b
      d = a
      return (k = e)
    }
    let c = !1
    let d
    let k
    const m = void 0 === e ? null : e
    return [() => a(b()), null === m ? void 0 : () => a(m())]
  }, [b, e, l, h])
  const d = q(a, c[0], c[1])
  t(() => {
    f.hasValue = !0
    f.value = d
  }, [d])
  v(d)
  return d
}

export default useSyncExternalStoreWithSelector
