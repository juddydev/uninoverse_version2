import { useNavigate } from "@remix-run/react"
import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { toast } from "sonner"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { client } from "~/lib/client"

export default function SignUpPage() {
  const navigate = useNavigate()

  const mutate = useMutation({
    async mutationFn() {
      const resp = await client.api.users.$post({
        json: {
          email: email,
          password,
        },
      })
      const user = await resp.json()
      return user
    },
  })

  const [email, setEmail] = useState("")

  const [password, setPassword] = useState("")

  const onSubmit = async () => {
    try {
      const result = await mutate.mutateAsync()
      console.log(result)
      toast("ログインしてください。")
      navigate("/")
    } catch (error) {
      console.error(error)
      toast("エラーが発生した。")
    }
  }

  return (
    <div className={"mx-auto max-w-xs space-y-4 p-4 pt-40"}>
      <h1>{"新しいアカウント"}</h1>
      <form
        className="space-y-2"
        onSubmit={(event) => {
          event.preventDefault()
          onSubmit()
        }}
      >
        <Input
          type={"email"}
          placeholder="メールアドレス"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value)
          }}
        />
        <Input
          type={"password"}
          placeholder="パスワード"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value)
          }}
        />
        <Button type={"submit"} className="w-full">
          {"登録する"}
        </Button>
      </form>
    </div>
  )
}
