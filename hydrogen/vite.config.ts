import { defineConfig } from "vite"
import { hydrogen } from "@shopify/hydrogen/vite"
import { oxygen } from "@shopify/mini-oxygen/vite"
import { vitePlugin } from "@remix-run/dev"
import tsconfigPaths from "vite-tsconfig-paths"
import { resolve } from "node:path"

export default defineConfig({
  plugins: [
    hydrogen(),
    oxygen(),
    vitePlugin({
      presets: [
        // @ts-ignore
        hydrogen.preset(),
      ],
    }),
    tsconfigPaths(),
  ],
  ssr: {
    /**
     * MiniOxygen couldn't load your app's entry point.
     * Try adding react-reconciler/constants to the ssr.optimizeDeps.include array in your Vite config.
     * ↑ このエラーが発生して勝手に追加される
     */
    optimizeDeps: {
      include: [
        "react-reconciler",
        "react-reconciler/constants",
        "prop-types",
        "react-dom/client",
        "debounce",
        "scheduler",
      ],
    },
  },
  optimizeDeps: {
    include: [
      "clsx",
      "react-use/esm/useScroll",
      "react-use/esm/useDebounce",
      "react-use/esm/useWindowScroll",
    ],
  },
  build: {
    // Allow a strict Content-Security-Policy
    // withtout inlining assets as base64:
    assetsInlineLimit: 0,
  },
  resolve: {
    alias: {
      "use-sync-external-store/shim/with-selector.js": resolve(
        __dirname,
        "alias/use-sync-external-store-with-selector.js",
      ),
      rehackt: "react",
    },
  },
})
