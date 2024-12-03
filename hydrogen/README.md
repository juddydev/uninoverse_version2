# Hydrogen

# メモ

## bun --bun

BunでViteが正しく動かない。暫くはNode.jsを使用する。

```
$ bun run --bun --cwd hydrogen dev
```

## cli

このcli-hydrogenはdependenciesにないと開発サーバが起動しない。

```
@shopify/cli-hydrogen
```

このようになる。

```
╭─ warning ────────────────────────────────────────────────────────────────────────────╮
│                                                                                      │
│  Looks like you're trying to run a Hydrogen command outside of a Hydrogen project.   │
│  Run `shopify hydrogen init` to create a new Hydrogen project.                       │
│                                                                                      │
╰──────────────────────────────────────────────────────────────────────────────────────╯
```

## Ngrokでログインできない問題

https://github.com/Shopify/hydrogen/issues/2399#issuecomment-2270632466

## PUBLIC_STORE_DOMAIN

以下のように設定するとGraphQLが機能しなくなる。

```
PUBLIC_STORE_DOMAIN="https://uninoverse.com"
```
