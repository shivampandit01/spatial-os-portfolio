import { useRef, Suspense } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, Center } from '@react-three/drei';
import { useStore } from './store';

import TRex from './TRex';
import Cat from './Cat';
import Shenron from './Shenron';

function Loader() {
  return (
    <Html center>
      <div style={{ color: 'white', background: 'rgba(0,0,0,0.7)', padding: '10px 20px', borderRadius: '8px' }}>
        Loading Asset...
      </div>
    </Html>
  );
}

export default function DisplayArea() {
  const groupRef = useRef();
  const activeModel = useStore((state) => state.activeModel);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={[0, -1, 0]}>
      <Suspense fallback={<Loader />}>
        <Center>
          {activeModel === 'trex' && <TRex scale={0.1} position={[0, -1, 0]} />}
          {activeModel === 'cat' && <Cat scale={5} position={[0, -1, 0]} />}
          {activeModel === 'shenron' && <Shenron scale={0.5} position={[0, -1, 0]} />}
        </Center>
      </Suspense>
    </group>
  );
}