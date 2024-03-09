import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import './App.css';

const fragmentShader = `
uniform float u_test;

// Rest of fragment shader code
void main(){
  gl_FragColor = vec4(1.0,0.0,0.5,0.5);
}
`;

const vertexShader = `
uniform float u_test;

// Rest of vertex shader code

uniform float u_time;

varying vec2 vUv;

void main() {
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  modelPosition.y += sin(modelPosition.x * 4.0 + u_time * 2.0) * 0.2;
  
  // Uncomment the code and hit the refresh button below for a more complex effect 🪄
  // modelPosition.y += sin(modelPosition.z * 6.0 + u_time * 2.0) * 0.1;

  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;
}

`;

const Cube =() => {
  const mesh_ref = useRef();
  const uniforms = useMemo(
    () => ({
      u_test: {
        value: 1.0,
      },
      u_time: {
        value:0,
      }
    }),
    []
  );

  // useFrame(() => {
  //   mesh_ref.current.material.uniforms.u_time.value += 0.05
  // });

  //console.log( mesh_ref.current.material.uniforms.u_time.value);
  return (
    <mesh ref={mesh_ref}>
      <boxGeometry args={[1, 1, 1]} />
      <shaderMaterial
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={uniforms}
      />
    </mesh>
  );
};

const App = () => {
  return (
    <div className='container'>
      <Canvas>
      <Cube />
    </Canvas>
    </div>
  );
};

export default App;