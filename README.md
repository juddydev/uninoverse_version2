# Uninoverse

[![Deploy - Console API](https://github.com/nockers/uninoverse/actions/workflows/deploy-console-api.yml/badge.svg)](https://github.com/nockers/uninoverse/actions/workflows/deploy-console-api.yml)

```
$ bun i
```

## Hydrogen (Shopify Web site)

```
$ bun run --cwd hydrogen dev
```

## Uninoverse API

```
$ bun run --cwd api dev
```

## Uninoverse Webhooks

```
$ bun run --cwd webhooks dev
```

## Uninoverse Console

```
$ bun run --cwd console-api dev
$ bun run --cwd console dev
```

# メモ

## bun --bun

このように使用するとプロセスが適切に終了しない。

```bash
$ bun --bun run --cwd console-api build
```

暫くは `process.env` を使用すること。

```ts
process.env
// Bun.env
```

## Node.js

まだViteなどのライブラリがNode.jsに依存している。22以上を使用すること。

```bash
$ node -v
v22.8.0
```

https://volta.sh/

バージョンはpackage.jsonに記載されている。

```json
"volta": {
  "node": "22.8.0"
}
```
