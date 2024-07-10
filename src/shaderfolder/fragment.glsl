precision mediump float;

uniform vec3 uColor;
uniform float uTime;

varying vec2 vUv;

void main() {
    gl_FragColor = vec4(abs(sin(vUv.x + uTime) * uColor), 1.0);
  }