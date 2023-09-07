import { useRef } from 'react';
import { AccumulativeShadows, RandomizedLight } from '@react-three/drei';

const Backdrop = () => {
  // Create a ref for the shadows
  const shadows = useRef();

  return (
    <AccumulativeShadows
      ref={shadows} // Assign the ref to the AccumulativeShadows component
      temporal // Enable temporal accumulation for smoother shadows
      frames={60} // Number of frames for temporal accumulation
      alphaTest={0.85} // Alpha test threshold for shadows
      scale={2} // Scale of the shadow plane
      rotation={[Math.PI / 2, 0, 0]} // Rotation of the shadow plane
      position={[0, 0, -0.14]} // Position of the shadow plane
    >
      {/* RandomizedLight component for creating randomized lights */}
      <RandomizedLight 
        amount={4} // Number of lights to create
        radius={9} // Radius of the lights' influence
        intensity={1.8} // Intensity of the lights
        ambient={0.05} // Ambient lighting
        position={[5, 5, -10]} // Position of the lights
      />
      <RandomizedLight 
        amount={4} // Number of lights to create
        radius={5} // Radius of the lights' influence
        intensity={1.95} // Intensity of the lights
        ambient={0.15} // Ambient lighting
        position={[-4, 5, -9]} // Position of the lights
      />
    </AccumulativeShadows>
  )
}

export default Backdrop;
