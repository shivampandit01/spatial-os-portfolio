import React, { useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import * as THREE from 'three'
import { useStore } from './store'

export default function Cat(props) {
  const group = useRef()
  const previousAnimation = useRef(null)
  const activeAnimation = useStore((state) => state.activeAnimation)
  
  const { scene, animations } = useGLTF('/models/Cat.glb')
  const { actions, names } = useAnimations(animations, group)
  
  // 1. THE FUR FIX (Applied directly to the original scene, no cloning!)
  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        // Stop the mesh from exploding/disappearing during extreme animations
        child.frustumCulled = false; 
        
        if (child.material) {
          child.material.transparent = false; 
          child.material.alphaTest = 0.5; 
          child.material.side = THREE.DoubleSide; 
          child.material.depthWrite = true;
        }
      }
    });
  }, [scene]);

  // 2. THE ANIMATION LOGIC
  useEffect(() => {
    const animToPlay = activeAnimation || "Cat idle (1_143)"; 
    const action = actions[animToPlay];

    if (action) {
      action.reset().fadeIn(0.5).play();

      if (previousAnimation.current && previousAnimation.current !== action) {
        previousAnimation.current.fadeOut(0.5);
      }
      previousAnimation.current = action;
    } else {
      console.warn("⚠️ Cat Name Mismatch! You asked for:", animToPlay);
    }

    return () => {
      action?.fadeOut(0.5);
    };
  }, [activeAnimation, actions, names]);

  return (
    <group ref={group} {...props} dispose={null}>
      {/* 3. Render the raw scene instead of a clone! */}
      <primitive object={scene} />
    </group>
  )
}

useGLTF.preload('/models/Cat.glb')