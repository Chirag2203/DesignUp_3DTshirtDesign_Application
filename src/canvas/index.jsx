import { Canvas } from '@react-three/fiber';
import { Environment, Center } from '@react-three/drei';
import { useSnapshot } from 'valtio';
import state from '../components/store'; 
import { moveLogoLeft, moveLogoRight, moveLogoUp, moveLogoDown } from '../components/store';

import Shirt from './Shirt';
import Backdrop from './Backdrop';
import CameraRig from './CameraRig';

const CanvasModel = () => {
  const snap = useSnapshot(state);
  const defaultLogoPosition = { x: 0, y: 0 };
  return (
    <Canvas
      shadows
      id='your-canvas-id'
      camera={{ position: [0, 0, 0], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
      className=" check"
    >
      <ambientLight intensity={0.5} />
      {/* <Environment preset="space" /> */}

      <CameraRig>
        <Backdrop />
        <Center>
          {/* <Shirt  /> */}
          <Shirt logoPosition={snap.logoPosition} defaultLogoPosition={defaultLogoPosition} />
        </Center>
      </CameraRig>
    </Canvas> 
  )
}

export default CanvasModel;
