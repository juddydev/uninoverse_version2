import { parse, string } from "valibot"
import { getSmaregiAccessToken } from "~/interface/helpers/get-smaregi-access-token"

const apiToken = parse(string("SMAREGI_API_TOKEN"), Bun.env.SMAREGI_API_TOKEN)

const accessToken = await getSmaregiAccessToken(apiToken)

console.log(accessToken)
