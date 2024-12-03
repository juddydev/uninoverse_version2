import { CustomOrderPreviewBackground } from "~/components/custom-order/custom-order-preview-background"

type Props = {
  aside: React.ReactNode
  children: React.ReactNode
}

export function CustomOrderLayout(props: Props) {
  return (
    <div className="flex h-viewer w-full flex-col overflow-hidden rounded-md bg-gray-50 lg:flex-row">
      <div className="flex-1 overflow-hidden">
        <CustomOrderPreviewBackground>
          {props.children}
        </CustomOrderPreviewBackground>
      </div>
      <div className="h-min lg:h-full lg:w-[28rem]">{props.aside}</div>
    </div>
  )
}
