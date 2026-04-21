import React, { useEffect, useMemo, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { SkeletonUtils } from 'three-stdlib'
import { useStore } from './store'

export default function TRex(props) {
  const group = useRef()
  const activeAnimation = useStore((state) => state.activeAnimation)
  
  const { scene, animations } = useGLTF('/models/TRex.glb')
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene])
  const { actions, names } = useAnimations(animations, group) 

  // 1. THE FRUSTUM CULLING FIX (Stops the model from disappearing)
  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.frustumCulled = false; 
      }
    });
  }, [scene]);

  // 2. THE ANIMATION LOGIC (Restored the missing top half!)
  useEffect(() => {
    // We have to define these variables before we can use them
    const defaultAnim = names.length > 0 ? names[0] : null;
    const animToPlay = activeAnimation || defaultAnim;
    const action = actions[animToPlay];

    if (action) {
      action.reset().fadeIn(0.5).play();
    } else {
      console.warn("⚠️ T-Rex Name Mismatch! You asked for:", animToPlay);
      console.log("👉 Copy exactly from this list:", names);
    }

    // React's natural, glitch-free cleanup
    return () => {
      if (action) {
        action.fadeOut(0.5);
      }
    };
  }, [activeAnimation, actions, names]);

  return (
    <group ref={group} {...props} dispose={null}>
      <primitive object={clone} />
    </group>
  )
}

useGLTF.preload('/models/TRex.glb')