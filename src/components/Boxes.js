import { OrbitControls, OrthographicCamera, Stats } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useRef } from "react";
import { useSpring, animated } from '@react-spring/three';

/* const Box = ({ rotationX = 0, rotationY = 0, rotationZ = 0, positions = [0, 0, 0], cond }) => {
    const boxRef = useRef();
    return (
        <mesh ref={boxRef} rotation-x={rotationX} rotation-y={rotationY} rotation-z={rotationZ} position={positions}>
            <boxGeometry args={[1.5, 2, 1]} />
            <meshStandardMaterial wireframe />
        </mesh>
    );
}; */

const hold = 500;

const Scene = () => {
    const boxOneRef = useRef();
    const boxTwoRef = useRef();

    const {boxRotation, boxPosX, boxPosY, boxPosThreeY, boxPosThreeX} = useSpring({
        from: {
            boxRotation: 0,
            boxPosX: -0.7,
            boxPosY: 0.5,
            boxPosThreeY: -0.5,
            boxPosThreeX: -0.7,
        },
        to: [
            { 
                boxRotation: Math.PI / 2,
                boxPosX:-0.5,
                boxPosY:0.7,
                boxPosThreeY: -0.2,
                boxPosThreeX: -0.8,
                delay: hold, 
            },
            {
                boxRotation: Math.PI,
                boxPosX: -0.7,
                boxPosY: 0.5,
                boxPosThreeY: -0.5,
                boxPosThreeX: -0.7,
                delay: hold, 
            },
            { 
                boxRotation: Math.PI * 1.5,
                boxPosX:-0.5,
                boxPosY:0.7,
                boxPosThreeY: -0.2,
                boxPosThreeX: -0.8,
                delay: hold, 
            },
            { 
                boxRotation: Math.PI * 2,
                boxPosX: -0.7,
                boxPosY: 0.5,
                boxPosThreeY: -0.5,
                boxPosThreeX: -0.7,
                delay: hold, 
            },
        ],
        config: {
            mass: 1,
            tension: 400,
            friction: 50,
        },
        loop: true,
        delay: hold, // Apply the delay to the entire animation sequence
        immediate: true,
    });
    
    return (
        <>
        <animated.mesh ref={boxOneRef} position={[-0.7,1,-0.5]}  rotation={[0, Math.PI, 0]} position-x={boxPosX} rotation-z={boxRotation}>
            <boxGeometry args={[1.4, 2, 1]} />
            <meshStandardMaterial wireframe/>
        </animated.mesh>
        <animated.mesh ref={boxTwoRef} rotation={[Math.PI/2, 0, Math.PI/2]} rotation-y={boxRotation} position={[1,0.5,0.7]} position-y={boxPosY} >
            <boxGeometry args={[1.4, 2, 1]} />
            <meshStandardMaterial wireframe />
        </animated.mesh>
        <animated.mesh rotation={[Math.PI/2, 0, 0]} position={[-0.7,-0.5,1]} position-y={boxPosThreeY} position-x={boxPosThreeX}>
            <boxGeometry args={[1.4, 2, 1]} />
            <meshStandardMaterial wireframe />
        </animated.mesh>
        </>
    );
};

function Boxes() {
    
    return (
        <Canvas >
            <Stats />
            <OrbitControls enableZoom={false}/>
            <Scene />
            <OrthographicCamera
                makeDefault
                zoom={100}
                near={1}
                far={2000}
                position={[-200, 200, 200]}
            />
        </Canvas>
    );
}

export default Boxes;