import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox, Text } from '@react-three/drei';
import * as THREE from 'three';
import SpatialButton from './SpatialButton';
import { useStore } from './store';

const ANIMATION_MENU = {
  // UPDATE THESE WITH YOUR REAL TREX ANIMATION NAMES
  trex: ['Animation_Walk_001', 'Trex_Roar_Final', 'Run_Cycle'], 
  cat: ['Cat idle (1_143)', "Cat scratching (1-143)", 'Cat licking (1-143)'],
  shenron: [] 
};

export default function GlassPanel() {
  const groupRef = useRef();
  const [isOpen, setIsOpen] = useState(true);
  const activeModel = useStore((state) => state.activeModel);
  const setActiveAnimation = useStore((state) => state.setActiveAnimation);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const targetX = isOpen ? -4 : -7.5;
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, delta * 6);
  });

  const currentAnimations = ANIMATION_MENU[activeModel] || [];

  return (
    <group ref={groupRef} position={[-7.5, 0, 3]}>
      <RoundedBox args={[2.5, 4.5, 0.1]} radius={0.15} smoothness={4}>
        <meshPhysicalMaterial 
          color="#ffffff" transmission={0.7} opacity={1}
          metalness={0.2} roughness={0.1} ior={1.5} thickness={0.5} 
        />
      </RoundedBox>

      <SpatialButton position={[0, 1.5, 0.1]} label="T-Rex" modelId="trex" />
      <SpatialButton position={[0, 0.5, 0.1]} label="Cat" modelId="cat" />
      <SpatialButton position={[0, -0.5, 0.1]} label="Shenron" modelId="shenron" />

      <group position={[0, -2, 0.1]}>
        {currentAnimations.length > 0 && (
          <Text position={[0, 0.4, 0]} fontSize={0.15} color="#333" anchorX="center">
            ANIMATIONS
          </Text>
        )}
        
        {currentAnimations.map((animName, index) => (
          <group 
            key={animName} 
            position={[0, -index * 0.35, 0]}
            onClick={(e) => { e.stopPropagation(); setActiveAnimation(animName); }}
            onPointerOver={(e) => { e.stopPropagation(); document.body.style.cursor = 'pointer'; }}
            onPointerOut={(e) => { e.stopPropagation(); document.body.style.cursor = 'auto'; }}
          >
            <RoundedBox args={[2, 0.25, 0.05]} radius={0.05}>
              <meshStandardMaterial color="#444" />
            </RoundedBox>
            <Text position={[0, 0, 0.03]} fontSize={0.12} color="#fff" anchorX="center" anchorY="middle">
              {animName.split('(')[0].replace(/_/g, ' ').toUpperCase().substring(0, 15)}
            </Text>
          </group>
        ))}
      </group>

      <group position={[1.5, 0, 0]} onClick={(e) => { e.stopPropagation(); setIsOpen(!isOpen); }}>
        <RoundedBox args={[0.5, 1, 0.1]} radius={0.1}>
          <meshStandardMaterial color={isOpen ? "#333333" : "#ffffff"} roughness={0.2} />
        </RoundedBox>
        <Text position={[0, 0, 0.06]} fontSize={0.3} color={isOpen ? "#ffffff" : "#000000"} anchorX="center" anchorY="middle">
          {isOpen ? "<" : ">"}
        </Text>
      </group>
    </group>
  );
}