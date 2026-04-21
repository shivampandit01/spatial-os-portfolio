import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { XR, createXRStore } from '@react-three/xr'; // ⬅️ UPDATED IMPORTS
import GlassPanel from './GlassPanel';
import DisplayArea from './DisplayArea';

// 1. Initialize the new XR engine!
const store = createXRStore();

export default function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', backgroundColor: '#1a1a1a', position: 'relative' }}>
      
      {/* 2. The new custom AR Button */}
      <button 
        onClick={() => store.enterAR()}
        style={{
          position: 'absolute',
          bottom: '30px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          padding: '15px 30px',
          fontSize: '18px',
          fontWeight: 'bold',
          backgroundColor: '#ffffff',
          color: '#000000',
          border: 'none',
          borderRadius: '30px',
          cursor: 'pointer',
          boxShadow: '0 10px 15px rgba(0,0,0,0.5)'
        }}
      >
        Enter AR
      </button>

      <Canvas camera={{ position: [0, 2, 8], fov: 45 }}>
        {/* 3. We MUST pass the store to the XR wrapper! */}
        <XR store={store}>
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