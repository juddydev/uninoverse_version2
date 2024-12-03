import { Canvas } from "@react-three/fiber"
import { Environment, OrbitControls } from "@react-three/drei"
import { Suspense } from "react"

type Props = {
  children: React.ReactNode
}

export function CustomOrderPreviewBackground(props: Props) {
  return (
    <div className={"relative h-full"}>
      <Suspense
        fallback={
          <div className="flex h-full items-center justify-center p-4">
            <p>{"読み込み中.."}</p>
          </div>
        }
      >
        <Canvas
          className="absolute h-full w-full"
          shadows
          camera={{ position: [-16, 16, -8], fov: 45 }}
        >
          {/* <spotLight
            intensity={0.5}
            angle={0.1}
            penumbra={1}
            position={[10, 15, 10]}
            castShadow
          /> */}
          {/* <directionalLight color={0xffffff} intensity={1.5} castShadow /> */}
          {/* <directionalLight
            color={0xffffff}
            intensity={1.5}
            castShadow
            position={[10, -25, -10]}
          />
          <directionalLight
            color={0xffffff}
            intensity={1.5}
            castShadow
            position={[10, -25, 10]}
          /> */}
          {props.children}
          <Environment preset={"studio"} />
          {/* <ContactShadows
            position={[0, -0.9, 0]}
            opacity={0.25}
            scale={10}
            blur={1.5}
            far={0.8}
          /> */}
          <OrbitControls
            minPolarAngle={Math.PI * (1 / 5)}
            maxPolarAngle={Math.PI * (4 / 5)}
            enableZoom={false}
            enablePan={false}
          />
        </Canvas>
      </Suspense>
    </div>
  )
}
