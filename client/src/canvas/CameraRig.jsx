/* eslint-disable react/prop-types */
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { easing } from 'maath';
import { useSnapshot } from 'valtio';

// Import the global state from a store
import state from '../store';

const CameraRig = ({ children }) => {
  // Create a ref for the group that contains the camera and model
  const group = useRef();

  // Get the current snapshot of the global state using useSnapshot
  const snap = useSnapshot(state);

  // Use useFrame to update the camera and model position and rotation each frame
  useFrame((state, delta) => {
    // Determine if the viewport width is below certain breakpoints
    const isBreakpoint = window.innerWidth <= 1260;
    const isMobile = window.innerWidth <= 600;

    // Set the initial position of the 3D model based on intro state and viewport size
    let targetPosition = [-0.4, 0, 2];
    if (snap.intro) {
      if (isBreakpoint) targetPosition = [0, 0.34, 2];
      if (isMobile) targetPosition = [0, 0.52, 2.5];
    } else {
      if (isMobile) targetPosition = [0, 0, 2.5];
      else targetPosition = [0, 0, 2];
    }

    // Smoothly interpolate the camera position using easing.damp3
    easing.damp3(state.camera.position, targetPosition, 0.25, delta);

    // Smoothly interpolate the model rotation using easing.dampE
    easing.dampE(
      group.current.rotation,
      [state.pointer.y / 10, -state.pointer.x / 5, 0],
      0.25,
      delta
    );
  });

  // Render the children components within a group, which allows for coordinated movement
  return <group ref={group}>{children}</group>;
}

export default CameraRig;
