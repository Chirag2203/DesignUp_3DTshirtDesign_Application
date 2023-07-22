import {useEffect} from 'react';
import { easing } from 'maath';
import { useSnapshot } from 'valtio';
import { useFrame } from '@react-three/fiber';
import { Decal, useGLTF, useTexture } from '@react-three/drei';

import state from '../store';
// import { useEffect } from 'react';

  const Shirt = ({ logoPosition, defaultLogoPosition }) => {
    const snap = useSnapshot(state);
    useFrame((state, delta) => easing.dampC(materials.lambert1.color, snap.color, 0.25, delta));
    // Initialize the logo scale to 1
   
    if (!logoPosition || typeof logoPosition !== 'object') {
      // Use the defaultLogoPosition if logoPosition is not provided or not in the expected format
      logoPosition = defaultLogoPosition;
    }
  
   
    // const {  logoScale } = snap;
    // state.logoScale=1;
    const { nodes, materials } = useGLTF('/shirt_baked.glb');
  
    const logoTexture = useTexture(snap.logoDecal);
    const fullTexture = useTexture(snap.fullDecal);
  
  
    // 
    const stateString = JSON.stringify(snap);
  
    // Check if the logo position goes beyond the shirt's boundaries
    const maxX = 0; // Adjust the maximum X position based on the shirt's boundaries
    const maxY = 10; // Adjust the maximum Y position based on the shirt's boundaries
  
    //for scaling
    useEffect(() => {
      state.logoScale = 1;
      state.logoRotation = 0;
      // state.position = { 0.04:0.15}
    }, []);
    // logorotation= snap.logoRotation;
    const logoScale = snap.logoScale;
        // Update the scale of the logo using the logoScale prop
      const scale = 0.15 * logoScale;
      // Inside the Shirt component
// const rotation = [0, snap.logoRotation % (2 * Math.PI), 0];
// Inside the Shirt component
// const rotation  = [0, ((snap.logoRotation % (2 * Math.PI)) - Math.PI)*4, 0];


  return (
    <group key={stateString}>
      <mesh
        castShadow
        geometry={nodes.T_Shirt_male.geometry}
        material={materials.lambert1}
        material-roughness={2}
        dispose={null}
      >
        {snap.isFullTexture && (
          <Decal 
            position={[0, 0, 0]}
            rotation={[0, 0, 0]}
            scale={1}
            map={fullTexture}
          />
        )}

{snap.isLogoTexture && (
        <Decal 
          position={[0, 0.04 + logoPosition.y / 100, 0.15 + logoPosition.x / 100]}
          rotation={[0, 0, 0]}
          // rotation={rotation}  
          scale={scale}
          map={logoTexture}
          map-anisotropy={16}
          depthTest={false}
          depthWrite={true}
        />
      )}
      </mesh>
    </group>
  )
}

export default Shirt;

