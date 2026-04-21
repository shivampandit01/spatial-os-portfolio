import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import { useStore } from './store';

export default function SpatialButton({ position, label, modelId }) {
  const buttonRef = useRef();
  const [hovered, setHovered] = useState(false);
  const { activeModel, setActiveModel } = useStore();
  const isActive = activeModel === modelId;

  useFrame((state, delta) => {
    if (!buttonRef.current) return;
    const targetScale = hovered || isActive ? 1.08 : 1.0;
    const currentScale = buttonRef.current.scale.x;
    const newScale = THREE.MathUtils.lerp(currentScale, targetScale, delta * 12);
    buttonRef.current.scale.set(newScale, newScale, newScale);
    
    const targetColor = isActive ? '#ffffff' : '#333333';
    buttonRef.current.material.color.lerp(new THREE.Color(targetColor), delta * 10);
  });

  return (
    <group position={position}>
      <mesh
        ref={buttonRef}
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; }}
        onPointerOut={(e) => { e.stopPropagation(); setHovered(false); document.body.style.cursor = 'auto'; }}
        onClick={(e) => { e.stopPropagation(); setActiveModel(modelId); }}
      >
        <RoundedBox args={[1.8, 0.6, 0.1]} radius={0.15} smoothness={4}>
          <meshStandardMaterial color="#333333" roughness={0.3} metalness={0.5} />
        </RoundedBox>
      </mesh>
      
      <Text position={[0, 0, 0.06]} fontSize={0.22} color={isActive ? "#000000" : "#ffffff"} anchorX="center" anchorY="middle" fontWeight="bold">
        {label}
      </Text>
    </group>
  );
}