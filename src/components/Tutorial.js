import { Canvas, useFrame, extend } from "@react-three/fiber";
import React, { useRef, Suspense } from "react";
import * as THREE from 'three';
import glsl from 'babel-plugin-glsl/macro';
import { shaderMaterial, Stats } from "@react-three/drei";
import { OrbitControls, OrthographicCamera } from "@react-three/drei";


const WaveShaderMaterial = shaderMaterial(
  // Uniform
  {
    uAmp: 0.10,
    uTime: 0,
    uColor: new THREE.Color(0, 0.1, 0.25),
    uResolution: new THREE.Vector2(window.innerWidth, window.innerHeight),
    uMouse: new THREE.Vector2(0.5, 0.5),
  },
  // Vertex Shader
  glsl`
    precision mediump float;

    varying vec2 vUv;

    uniform float uTime;

    uniform float uAmp;

    uniform vec2 uResolution;

    #pragma glslify: snoise3 = require(glsl-noise/simplex/3d);


    void main() {
        vUv = uv;
        
        vec3 pos = position;
        float noiseFreq = 1.5;
        vec3 noisePos = vec3(pos.x * noiseFreq + uTime, pos.y, pos.z);
        pos.z += snoise3(noisePos) * uAmp;
        pos.x += snoise3(noisePos) * uAmp;
  
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
    `,
  // Fragment Shader
  glsl`
    precision mediump float;

    uniform vec3 uColor;
    uniform float uTime;
    uniform vec2 uMouse;
    uniform vec2 uResolution;

    varying vec2 vUv;

    void main() {
          vec2 st = gl_FragCoord.xy/uResolution.xy;
          st.y = 1.0 - st.y;
          vec2 normalizedMouse = uMouse / uResolution;

          float dist = distance(normalizedMouse, st); 
          float epsilon = 0.1; 

          float value = log((sin(vUv.x  / 2.0) + 1.0) * (1.0 / (dist + epsilon)));

          gl_FragColor = vec4(value * uColor, 1.0);

          // gl_FragColor = vec4(log((sin(vUv.x + uTime/2.0)+1.0)*10.0*(1.0/dist))) * uColor, 1.0);

        }
    `,
);

const Wave = () => {
  var ampInc = 0.001;
  const ref = useRef();
  useFrame(({ clock }) => {
    ref.current.uTime = clock.getElapsedTime();
    if (ref.current.uAmp >= 0.5 || ref.current.uAmp <= 0.5) {
      ampInc *= -1;
    }
    ref.current.uAmp += ampInc;

  });
  document.onmousemove = function (e) {
    ref.current.uMouse.x = e.pageX;
    ref.current.uMouse.y = e.pageY;
    console.log();
  }
  // window.addEventListener('resize', onWindowResize);
  function onWindowResize() {
    ref.current.uResolution.x = window.innerWidth;
    ref.current.uResolution.y = window.innerHeight;
  }
  extend({ WaveShaderMaterial })

  return (
    <mesh rotation-x={Math.PI / 1.75} rotation-z={Math.PI / 2}>
      <planeGeometry args={[2, 1, 16, 16]} />
      <waveShaderMaterial ref={ref} />
    </mesh>
  );
};

const Scene = () => {
  return (
    <Canvas>
      <Stats />
      <OrbitControls enableZoom={false} />
      <OrthographicCamera
        makeDefault
        zoom={200}
        top={200}
        bottom={-200}
        left={200}
        right={-200}
        near={1}
        far={2000}
        position={[0, 0, 200]}
      />
      <Suspense fallback={null}>
        <Wave />
      </Suspense>
    </Canvas>
  );
};

const Tutorial = () => {
  return (
    <Scene />
  );
};

export default Tutorial;


/* const WaveShaderMaterial = shaderMaterial(
    // Uniform
    {
      uTime: 0,
      uColor: new THREE.Color(0.0, 0.0, 0.0),
      uTexture: new THREE.Texture()
    },
    // Vertex Shader
    glsl`
      precision mediump float;
   
      varying vec2 vUv;
      varying float vWave;
  
      uniform float uTime;
  
      #pragma glslify: snoise3 = require(glsl-noise/simplex/3d.glsl);
  
      void main() {
        vUv = uv;
  
        vec3 pos = position;
        float noiseFreq = 2.0;
        float noiseAmp = 0.4;
        vec3 noisePos = vec3(pos.x * noiseFreq + uTime, pos.y, pos.z);
        pos.z += snoise3(noisePos) * noiseAmp;
        vWave = pos.z;
  
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);  
      }
    `,
    // Fragment Shader
    glsl`
      precision mediump float;
  
      uniform vec3 uColor;
      uniform float uTime;
      uniform sampler2D uTexture;
  
      varying vec2 vUv;
      varying float vWave;
  
      void main() {
        float wave = vWave * 0.2;
        vec3 texture = texture2D(uTexture, vUv + wave).rgb;
        gl_FragColor = vec4(texture, 1.0); 
      }
    `
  );
  
  extend({ WaveShaderMaterial }); */