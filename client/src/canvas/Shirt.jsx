/* eslint-disable react/no-unknown-property */
import { easing } from 'maath';
import { useSnapshot } from 'valtio';
import { useFrame } from '@react-three/fiber';
import { Decal, useGLTF, useTexture } from '@react-three/drei';

// Import the global state from a store
import state from '../store';

const Shirt = () => {
  // Get the current snapshot of the global state using useSnapshot
  const snap = useSnapshot(state);

  // Load the GLTF model and its associated nodes and materials
  const { nodes, materials } = useGLTF('/shirt_baked.glb');

  // Load logo and full textures using useTexture
  const logoTexture = useTexture(snap.logoDecal);
  const fullTexture = useTexture(snap.fullDecal);

  // Use useFrame to update the shirt's color over time using easing.dampC
  useFrame((state, delta) => easing.dampC(materials.lambert1.color, snap.color, 0.25, delta));

  // Serialize the global state to a string to use as a key for reactivity
  const stateString = JSON.stringify(snap);

  return (
    <group key={stateString}>
      <mesh
        castShadow
        geometry={nodes.T_Shirt_male.geometry}
        material={materials.lambert1}
        material-roughness={1}
        dispose={null}
      >
        {/* Render a decal for the full texture if snap.isFullTexture is true */}
        {snap.isFullTexture && (
          <Decal 
            position={[0, 0, 0]}
            rotation={[0, 0, 0]}
            scale={1}
            map={fullTexture}
          />
        )}

        {/* Render a decal for the logo texture if snap.isLogoTexture is true */}
        {snap.isLogoTexture && (
          <Decal 
            position={[0, 0.04, 0.15]}
            rotation={[0, 0, 0]}
            scale={0.15}
            map={logoTexture}
            mapAnisotropy={16}
            depthTest={false}
            depthWrite={true}
          />
        )}
      </mesh>
    </group>
  )
}

export default Shirt;
