import React from 'react';
import { easing } from 'maath';
import { useSnapshot } from 'valtio';
import { useFrame } from '@react-three/fiber';
import { Decal, useGLTF, useTexture } from '@react-three/drei';

import state from '../store';

// const Shirt = ({ logoPosition }) => {

// if (!logoPosition || typeof logoPosition !== 'object') {
//     // Handle the case where logoPosition is not provided or not in the expected format
//     // For example, you might set a default value or return null
//     return null;
//   }

  // const snap = useSnapshot(state);
  // const { nodes, materials } = useGLTF('/shirt_baked.glb');

  // const logoTexture = useTexture(snap.logoDecal);
  // const fullTexture = useTexture(snap.fullDecal);

  // useFrame((state, delta) => easing.dampC(materials.lambert1.color, snap.color, 0.25, delta));

  // const stateString = JSON.stringify(snap);
  const Shirt = ({ logoPosition, defaultLogoPosition }) => {
    if (!logoPosition || typeof logoPosition !== 'object') {
      // Use the defaultLogoPosition if logoPosition is not provided or not in the expected format
      logoPosition = defaultLogoPosition;
    }
  
    const snap = useSnapshot(state);
    const { nodes, materials } = useGLTF('/shirt_baked.glb');
  
    const logoTexture = useTexture(snap.logoDecal);
    const fullTexture = useTexture(snap.fullDecal);
  
    useFrame((state, delta) => easing.dampC(materials.lambert1.color, snap.color, 0.25, delta));
  
    const stateString = JSON.stringify(snap);
  
    // Check if the logo position goes beyond the shirt's boundaries
    const maxX = 10; // Adjust the maximum X position based on the shirt's boundaries
    const maxY = 10; // Adjust the maximum Y position based on the shirt's boundaries
  
    if (logoPosition.x < -maxX) logoPosition.x = -maxX;
    if (logoPosition.x > maxX) logoPosition.x = maxX;
    if (logoPosition.y < -maxY) logoPosition.y = -maxY;
    if (logoPosition.y > maxY) logoPosition.y = maxY;

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
          scale={0.15}
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





// import React from 'react';
// import { easing } from 'maath';
// import { useSnapshot } from 'valtio';
// import { useFrame } from '@react-three/fiber';
// import { Decal, useGLTF, useTexture } from '@react-three/drei';

// // Remove the import statement for 'state'

// const Shirt = () => {
//   const snap = useSnapshot(); // Using useSnapshot without an argument to access the entire state
//   const { nodes, materials } = useGLTF('/shirt_baked.glb');

//   const logoTexture = useTexture(snap.logoDecal);
//   const fullTexture = useTexture(snap.fullDecal);

//   useFrame((state, delta) => easing.dampC(materials.lambert1.color, snap.color, 0.25, delta));

//   const stateString = JSON.stringify(snap);

//   // Check if the logo position goes beyond the shirt's boundaries
//   const maxX = 10; // Adjust the maximum X position based on the shirt's boundaries
//   const maxY = 10; // Adjust the maximum Y position based on the shirt's boundaries

//   if (snap.logoPosition.x < -maxX) snap.logoPosition.x = -maxX;
//   if (snap.logoPosition.x > maxX) snap.logoPosition.x = maxX;
//   if (snap.logoPosition.y < -maxY) snap.logoPosition.y = -maxY;
//   if (snap.logoPosition.y > maxY) snap.logoPosition.y = maxY;

//   return (
//     <group key={stateString}>
//       <mesh
//         castShadow
//         geometry={nodes.T_Shirt_male.geometry}
//         material={materials.lambert1}
//         material-roughness={2}
//         dispose={null}
//       >
//         {snap.isFullTexture && (
//           <Decal 
//             position={[0, 0, 0]}
//             rotation={[0, 0, 0]}
//             scale={1}
//             map={fullTexture}
//           />
//         )}

//         {snap.isLogoTexture && (
//           <Decal 
//             position={[0, 0.04 + snap.logoPosition.y / 100, 0.15 + snap.logoPosition.x / 100]}
//             rotation={[0, 0, 0]}
//             scale={0.15}
//             map={logoTexture}
//             map-anisotropy={16}
//             depthTest={false}
//             depthWrite={true}
//           />
//         )}
//       </mesh>
//     </group>
//   );
// }

// export default Shirt;
