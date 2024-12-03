import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core"

/**
 * 管理画面の利用者
 */
export const users = sqliteTable("users", {
  id: text("id", { length: 36 }).primaryKey(),
  name: text("name", { length: 256 }).notNull(),
  email: text("email", { length: 256 }).notNull().unique(),
  hashedPassword: text("hashed_password", { length: 256 }),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
})
