import type { Config } from "drizzle-kit"

export default {
  dialect: "sqlite",
  schema: "drizzle.schema.ts",
  out: "migrations",
  driver: "d1-http",
  dbCredentials: {
    accountId: "",
    databaseId: "",
    token: "",
  },
} satisfies Config
