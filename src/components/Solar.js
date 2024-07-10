import { OrbitControls, Stats } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";

const Sphere = (props) => {
    const meshRef = useRef()
    const [hovered, setHovered] = useState(false)
    const [active, setActive] = useState(false)

    useFrame((state, delta) => (meshRef.current.rotation.x += delta))
    
    return (
        <mesh
            {...props}
            ref = {meshRef}
            scale = {active?1.2: 1}
            onClick= {(event) => setActive(!active)}
            onPointerOver={(event) => setHovered(true)}
            onPointerOut={(event) => setHovered(false)}>
            <sphereGeometry args={[5, 12, 12]} />
            <meshStandardMaterial color={"orange"} />
        </mesh>
    )
}

function Solar() {
    return (
        <Canvas
        style={{ height: window.innerWidth * 9 / 16, width: window.innerWidth}}
        camera={{position: [0,40,10]}}>
            <Stats />
            <OrbitControls />
            <ambientLight />
            <Sphere />
        </Canvas>
    )
}

export default Solar;