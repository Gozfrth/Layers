import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';

function ThreeDView() {
    const meshRef = useRef();

    const [varLen, setVarLen] = useState(0.2);

    useFrame(({ clock }) => {
        // Calculate a sine wave value between 0 and 1
        const oscillation = Math.sin(clock.elapsedTime);
        // Map the sine wave to the range [0, 1]
        const mappedValue = (oscillation + 1) / 4;
        setVarLen(mappedValue + 0.2);
    });

    return (
            <mesh ref={meshRef}>
                <octahedronGeometry args={[varLen]} />
                <meshStandardMaterial />
            </mesh>
    );
}

export default ThreeDView;