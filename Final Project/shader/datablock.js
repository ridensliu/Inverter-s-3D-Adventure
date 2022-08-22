AFRAME.registerShader('data-block', {
  schema: {
    timeMsec: { type:'time', is:'uniform' },
    color: { type: 'color', is: 'uniform' }
  },
  vertexShader: `
varying vec3 worldPos;
  
void main() {
  worldPos = (modelMatrix * vec4(position, 1.0)).xyz;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`,
  fragmentShader: `
uniform vec3 color;

varying vec3 worldPos;

void main() {
  gl_FragColor = mix(
    vec4(0.25, 0.77, 0.85, 0.5),
    vec4(color, 1.0),
    clamp(-worldPos.z / 16.0, 0.0, 1.0)
  );
}
`})