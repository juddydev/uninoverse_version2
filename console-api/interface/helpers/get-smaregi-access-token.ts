import { smaregiIdHc } from "~/lib/smaregi-id"

export async function getSmaregiAccessToken(token: string) {
  const resp = await smaregiIdHc.app[":id"].token.$post({
    param: { id: "skcr313b9" },
    header: {
      authorization: `Basic ${token}`,
      "content-type": "application/x-www-form-urlencoded",
    },
    form: {
      grant_type: "client_credentials",
      scope: "pos.stock:read pos.products:read pos.products:write",
    },
  })

  const json = await resp.json()

  if (resp.ok === false) {
    throw new Error(JSON.stringify(json))
  }

  return json.access_token
}
