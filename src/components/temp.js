import { useEffect, useRef } from "react";
import * as THREE from 'three';
import glsl from 'babel-plugin-glsl/macro';

function Temp() {
  const canvasRef = useRef();

  useEffect(() => {
    let container = canvasRef.current;
    let camera, scene, renderer, clock;
    let uniforms;

    if (!container) return;

    init();
    animate();

    function init() {
      camera = new THREE.Camera();
      camera.position.z = 1;

      scene = new THREE.Scene();
      clock = new THREE.Clock();

      const geometry = new THREE.PlaneGeometry(2, 2);

      uniforms = {
        u_time: { type: "f", value: 1.0 },
        u_resolution: { type: "v2", value: new THREE.Vector2() },
        u_mouse: { type: "v2", value: new THREE.Vector2() }
      };

      const material = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: `
        void main() {
            gl_Position = vec4( position, 1.0 );
        }
                `,
        fragmentShader: `
        uniform vec2 u_resolution;
        uniform float u_time;

        void main() {
            vec2 st = gl_FragCoord.xy/u_resolution.xy;
            gl_FragColor=vec4(st.x,st.y,0.0,1.0);
        }
                `
      });

      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      renderer = new THREE.WebGLRenderer();
      renderer.setPixelRatio(window.devicePixelRatio);

      container.appendChild(renderer.domElement);

      onWindowResize();
      window.addEventListener('resize', onWindowResize, false);

      document.onmousemove = function (e) {
        uniforms.u_mouse.value.x = e.pageX;
        uniforms.u_mouse.value.y = e.pageY;
      }
    }

    function onWindowResize() {
      renderer.setSize(window.innerWidth, window.innerHeight);
      uniforms.u_resolution.value.x = renderer.domElement.width;
      uniforms.u_resolution.value.y = renderer.domElement.height;
    }

    function animate() {
      requestAnimationFrame(animate);
      render();
    }

    function render() {
      uniforms.u_time.value += clock.getDelta();
      renderer.render(scene, camera);
    }

    return () => {
      window.removeEventListener('resize', onWindowResize);
      container.removeChild(renderer.domElement);
    };
  }, []);

  return (<div ref={canvasRef} className="bg-black mx-auto my-auto" style={{ borderRadius: '3rem' }}></div>);
}

export default Temp;


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