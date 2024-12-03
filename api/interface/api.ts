import { apiFactory } from "~/interface/api-factory"

export const api = apiFactory
  .createApp()
  // .use(
  //   bearerAuth({
  //     async verifyToken(token, c) {
  //       return token === c.env.API_TOKEN
  //     },
  //   }),
  // )
  .get("/debug", async (c) => {
    return c.text("hello")
  })
  .post("/forms", async (c) => {
    return c.json({ status: "ok" })
  })
