import { LoaderIcon } from "lucide-react"

export function LoadingPage() {
  return (
    <div className={"flex w-full items-center justify-center py-40"}>
      <LoaderIcon className={"h-8 w-8 animate-spin"} />
    </div>
  )
}
