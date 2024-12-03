import { CustomOrderLeatherColor } from "~/lib/custom-order/types/custom-order-leather-color"
import { CustomOrderLeatherType } from "~/lib/custom-order/types/custom-order-leather-type"

/**
 * 未使用
 */
export const leatherColorsMap = new Map<
  CustomOrderLeatherType,
  CustomOrderLeatherColor[]
>([
  [
    "baron",
    ["light-brown", "dark-brown", "antique-gray", "black", "wine-red", "blue"],
  ],
  [
    "milled-kip",
    ["light-brown", "dark-brown", "antique-gray", "black", "wine-red", "blue"],
  ],
  [
    "crocodile-belly",
    ["black", "dark-brown", "light-brown", "antique-gray", "blue", "wine-red"],
  ],
  [
    "crocodile-back",
    ["black", "blue", "dark-brown", "light-brown", "wine-red"],
  ],
  [
    "embossed-01",
    ["black", "antique-gray", "blue", "dark-brown", "light-brown", "wine-red"],
  ],
  [
    "embossed-02",
    ["black", "antique-gray", "blue", "dark-brown", "light-brown", "wine-red"],
  ],
  [
    "embossed-03",
    ["black", "antique-gray", "blue", "dark-brown", "light-brown", "wine-red"],
  ],
  [
    "embossed-04",
    ["black", "antique-gray", "blue", "dark-brown", "light-brown", "wine-red"],
  ],
  [
    "embossed-05",
    ["black", "antique-gray", "blue", "dark-brown", "light-brown", "wine-red"],
  ],
])
