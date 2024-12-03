import { useState } from "react"
import { toast } from "sonner"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { signIn } from "@hono/auth-js/react"

export function LoginPage() {
  const [email, setEmail] = useState("")

  const [password, setPassword] = useState("")

  const onSubmit = async () => {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    })
    if (result?.error) {
      toast.error("IDかパスワードが違う")
      return
    }
    toast.success("ログインしました。")
  }

  return (
    <div className={"mx-auto max-w-xs space-y-4 p-4 pt-40"}>
      <h1 className="font-bold">{"UNINOVERSE"}</h1>
      <form
        className="space-y-2"
        onSubmit={(event) => {
          event.preventDefault()
          onSubmit()
        }}
      >
        <Input
          type="email"
          placeholder="メールアドレス"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <Input
          type="password"
          placeholder="パスワード"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <Button type="submit" className="w-full">
          {"ログイン"}
        </Button>
      </form>
    </div>
  )
}
