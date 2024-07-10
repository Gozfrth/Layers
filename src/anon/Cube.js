import { useRef } from "react";

const fragmentShader = `
void main() {
    gl_FragColor = vec4(0.0, 0.3, 1.0, 1.0);
  }
  
`;

const vertexShader = `
void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    modelPosition.y += sin(modelPosition.x * 4.0) * 0.2;
  
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
  
    gl_Position = projectedPosition;
  }
`;

function Cube() {
    const mesh = useRef();
  
    return (
        <mesh ref={mesh} position={[0,0,0]} rotation={[-Math.PI/ 2,0,0]} scale={1.5}>
            <planeGeometry args={[1, 1, 16, 16]} />
            <shaderMaterial
            fragmentShader={fragmentShader}
            vertexShader={vertexShader}
            wireframe
            />
        </mesh>
    );
};

export default Cube;