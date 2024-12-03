# Uninoverse Console

## 開発

開発で使用するGraphQLの型を生成する。サイズが1MBを超えているのでGitにあげないこと。

```
$ bun run --cwd console build:schema
```

開発サーバーを起動する。

```
$ bun run --cwd console-api dev
$ bun run --cwd console dev
```
