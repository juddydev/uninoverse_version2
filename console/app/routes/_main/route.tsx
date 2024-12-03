import { MetaFunction } from "@remix-run/cloudflare"
import { useSession } from "@hono/auth-js/react"
import { LoginPage } from "~/components/login-page"
import { LoadingPage } from "~/components/loading-page"
import { Suspense } from "react"
import { Outlet } from "@remix-run/react"

export default function Route() {
  const session = useSession()

  if (session.status === "loading") {
    return null
  }

  if (session.status === "unauthenticated") {
    return <LoginPage />
  }

  return (
    <Suspense fallback={<LoadingPage />}>
      <Outlet />
    </Suspense>
  )
}

export const meta: MetaFunction = () => {
  return [{ robots: "noindex" }]
}
