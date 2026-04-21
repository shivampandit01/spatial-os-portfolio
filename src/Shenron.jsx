import React, { useEffect } from 'react'
import { useGraph } from '@react-three/fiber'
import { useGLTF, useAnimations } from '@react-three/drei'
import { SkeletonUtils } from 'three-stdlib'

export default function Shenron(props) {
  const group = React.useRef()
  const { scene, animations } = useGLTF('/models/Shenron.gltf')
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene])
  const { nodes, materials } = useGraph(clone)
  const { actions } = useAnimations(animations, group)
  
  // 🟢 WE ADDED THIS: The Auto-Play Hook!
  useEffect(() => {
    const animationNames = Object.keys(actions);
    console.log("Shenron Animation:", animationNames); // Just to verify the name in your console
    
    if (animationNames.length > 0) {
      // Play the very first (and only) animation in his file
      actions[animationNames[0]]?.reset().fadeIn(0.5).play();
    }
  }, [actions]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group>
        <group name="2ccd80b27e00447cb9540809286844b7fbx">
          <group name="RootNode">
            <group name="Skeleton">
              <group name="Hair" position={[0, -0.409, 0]}>
                <group name="pPlane2" position={[0.421, 16.737, 2.912]} rotation={[-2.458, 0.659, -1.644]} scale={[1.906, 1.916, 3.296]}>
                  <group name="pPlane2_lambert7_0">
                    <mesh name="pPlane2_lambert7_0_1" geometry={nodes.pPlane2_lambert7_0_1.geometry} material={materials.lambert7} />
                    <mesh name="pPlane2_lambert7_0_2" geometry={nodes.pPlane2_lambert7_0_2.geometry} material={materials.lambert7} />
                  </group>
                </group>
                <group name="pPlane3" position={[-0.107, 15.632, 1.896]} rotation={[-2.703, 0.691, 1.737]} scale={[2.24, 1.917, 3.296]}>
                  <mesh name="pPlane3_lambert7_0" geometry={nodes.pPlane3_lambert7_0.geometry} material={materials.lambert7} />
                </group>
                <group name="pPlane4" position={[-1.08, 16.57, 2.2]} rotation={[-2.547, -0.362, 1.708]} scale={[2.125, 1.917, 4.171]}>
                  <mesh name="pPlane4_lambert7_0" geometry={nodes.pPlane4_lambert7_0.geometry} material={materials.lambert7} />
                </group>
                <group name="pPlane5" position={[-0.985, 16.722, 2.118]} rotation={[-2.561, -0.369, -1.459]} scale={[2.125, 1.916, 3.391]}>
                  <mesh name="pPlane5_lambert7_0" geometry={nodes.pPlane5_lambert7_0.geometry} material={materials.lambert7} />
                </group>
              </group>
              <primitive object={nodes.ROOT_01} />
              <group name="group1" position={[-0.82, -0.492, 0.816]} scale={1.323}>
                <group name="pSphere1" position={[0.682, 0.709, -1.786]} scale={0.308}>
                  <mesh name="pSphere1_lambert8_0" geometry={nodes.pSphere1_lambert8_0.geometry} material={materials.lambert8} />
                </group>
                <group name="pSphere2" position={[0.768, 0.709, -3.364]} scale={0.308}>
                  <mesh name="pSphere2_lambert8_0" geometry={nodes.pSphere2_lambert8_0.geometry} material={materials.lambert8} />
                </group>
                <group name="pSphere3" position={[1.331, 0.709, -2.211]} scale={0.308}>
                  <mesh name="pSphere3_lambert8_0" geometry={nodes.pSphere3_lambert8_0.geometry} material={materials.lambert8} />
                </group>
                <group name="pSphere4" position={[0.056, 0.709, -2.985]} scale={0.308}>
                  <mesh name="pSphere4_lambert8_0" geometry={nodes.pSphere4_lambert8_0.geometry} material={materials.lambert8} />
                </group>
                <group name="pSphere5" position={[-0.002, 0.709, -2.229]} scale={0.308}>
                  <mesh name="pSphere5_lambert8_0" geometry={nodes.pSphere5_lambert8_0.geometry} material={materials.lambert8} />
                </group>
                <group name="pSphere6" position={[1.413, 0.709, -2.923]} scale={0.308}>
                  <mesh name="pSphere6_lambert8_0" geometry={nodes.pSphere6_lambert8_0.geometry} material={materials.lambert8} />
                </group>
                <group name="pSphere7" position={[0.69, 0.709, -2.569]} scale={0.308}>
                  <mesh name="pSphere7_lambert8_0" geometry={nodes.pSphere7_lambert8_0.geometry} material={materials.lambert8} />
                </group>
              </group>
              <group name="pPlane6" position={[0, 0, -2.517]} scale={14.18}>
                <mesh name="pPlane6_lambert9_0" geometry={nodes.pPlane6_lambert9_0.geometry} material={materials.lambert9} />
              </group>
            </group>
          </group>
        </group>
        <group name="m_tongue_blinn2_0">
          <skinnedMesh name="m_tongue_blinn2_0_1" geometry={nodes.m_tongue_blinn2_0_1.geometry} material={materials.blinn2} skeleton={nodes.m_tongue_blinn2_0_1.skeleton} />
          <skinnedMesh name="m_tongue_blinn2_0_2" geometry={nodes.m_tongue_blinn2_0_2.geometry} material={materials.blinn2} skeleton={nodes.m_tongue_blinn2_0_2.skeleton} />
        </group>
        <group name="m_body_blinn1_0">
          <skinnedMesh name="m_body_blinn1_0_1" geometry={nodes.m_body_blinn1_0_1.geometry} material={materials.blinn1} skeleton={nodes.m_body_blinn1_0_1.skeleton} />
          <skinnedMesh name="m_body_blinn1_0_2" geometry={nodes.m_body_blinn1_0_2.geometry} material={materials.blinn1} skeleton={nodes.m_body_blinn1_0_2.skeleton} />
        </group>
        <group name="m_head_blinn2_0">
          <skinnedMesh name="m_head_blinn2_0_1" geometry={nodes.m_head_blinn2_0_1.geometry} material={materials.blinn2} skeleton={nodes.m_head_blinn2_0_1.skeleton} />
          <skinnedMesh name="m_head_blinn2_0_2" geometry={nodes.m_head_blinn2_0_2.geometry} material={materials.blinn2} skeleton={nodes.m_head_blinn2_0_2.skeleton} />
        </group>
        <group name="m_teeth_lambert6_0">
          <skinnedMesh name="m_teeth_lambert6_0_1" geometry={nodes.m_teeth_lambert6_0_1.geometry} material={nodes.m_teeth_lambert6_0_1.material} skeleton={nodes.m_teeth_lambert6_0_1.skeleton} />
          <skinnedMesh name="m_teeth_lambert6_0_2" geometry={nodes.m_teeth_lambert6_0_2.geometry} material={nodes.m_teeth_lambert6_0_2.material} skeleton={nodes.m_teeth_lambert6_0_2.skeleton} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/models/Shenron.gltf')