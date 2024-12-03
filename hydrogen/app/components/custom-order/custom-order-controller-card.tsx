import { Link } from "@remix-run/react"
import { XIcon } from "lucide-react"
import { Button } from "~/components/ui/button"
import { Card, CardContent } from "~/components/ui/card"

type Props = {
  children: React.ReactNode
  to: string
}

export function CustomOrderControllerCard(props: Props) {
  return (
    <Card className="h-full min-h-28 w-full overflow-y-auto">
      <CardContent className="flex h-full w-full flex-col gap-4 p-4">
        <div className="hidden justify-end lg:flex">
          <Link className="block" to={props.to}>
            <Button variant={"secondary"} size="icon" className="rounded-full">
              <XIcon className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        {props.children}
      </CardContent>
    </Card>
  )
}
