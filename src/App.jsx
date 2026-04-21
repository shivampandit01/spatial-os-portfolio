import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { ARButton, XR } from '@react-three/xr'; // ⬅️ NEW IMPORTS
import GlassPanel from './GlassPanel';
import DisplayArea from './DisplayArea';

export default function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', backgroundColor: '#1a1a1a' }}>
      
      {/* 1. This creates the "Enter AR" button on your screen */}
      <ARButton />

      <Canvas camera={{ position: [0, 2, 8], fov: 45 }}>
        {/* 2. Wrap your entire 3D world inside the XR engine */}
        <XR>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 10, 5]} intensity={1} castShadow />
          <Environment preset="city" />

          {/* Your UI and Models */}
          <GlassPanel />
          <DisplayArea />

          <OrbitControls makeDefault />
        </XR>
      </Canvas>
    </div>
  );
}