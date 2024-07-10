import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";

function Box ({ rotationX = 0, rotationY = 0, rotationZ = 0, positions = [0, 0, 0], cond }) {
  const boxRef = useRef();
  const [isHolding, setIsHolding] = useState(false);

  useFrame(() => {
    if (!isHolding) {
      if (cond === "x") {
        boxRef.current.rotation.x += 0.01;
      } else if (cond === "y") {
        boxRef.current.rotation.y += 0.01;
      }

      // Check if rotation is a multiple of 180 degrees
      if (Math.abs(boxRef.current.rotation.y % (Math.PI)) < 0.01 || Math.abs(boxRef.current.rotation.x % (Math.PI)) < 0.01) {
        setIsHolding(true);
        setTimeout(() => {
          setIsHolding(false);
        }, 2000);
      }
    }
  });

  return (
    <Canvas>
    <mesh ref={boxRef} rotation-x={rotationX} rotation-y={rotationY} rotation-z={rotationZ} position={positions}>
      <boxGeometry args={[1.5, 2, 1]} />
      <meshStandardMaterial wireframe />
    </mesh>
    </Canvas>
  );
};

export default Box;