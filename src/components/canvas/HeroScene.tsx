"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, MeshWobbleMaterial, PerspectiveCamera, OrbitControls, Environment, ContactShadows, ScrollControls, useScroll } from "@react-three/drei";
import * as THREE from "three";

function FloatingShape({ position, color, speed = 1, distort = 0.4 }: { position: [number, number, number], color: string, speed?: number, distort?: number }) {
  const mesh = useRef<THREE.Mesh>(null);
  const scroll = useScroll();

  useFrame((state) => {
    if (mesh.current) {
        mesh.current.rotation.x = state.clock.getElapsedTime() * 0.2 + scroll.offset * 2;
        mesh.current.rotation.y = state.clock.getElapsedTime() * 0.3 + scroll.offset * 4;
    }
  });
  
  return (
    <Float speed={speed} rotationIntensity={1.5} floatIntensity={2}>
      <mesh position={position} ref={mesh}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial
          color={color}
          speed={speed}
          distort={distort}
          radius={1}
          metalness={0.5}
          roughness={0.1}
        />
      </mesh>
    </Float>
  );
}

function TechGlass() {
  const mesh = useRef<THREE.Mesh>(null);
  const scroll = useScroll();
  
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x = state.pointer.y * 0.2 + scroll.offset * 0.5;
      mesh.current.rotation.y = state.pointer.x * 0.2 + scroll.offset * 1;
      mesh.current.position.y = Math.sin(state.clock.getElapsedTime()) * 0.1 + scroll.offset * 2;
      mesh.current.position.z = scroll.offset * -2;
    }
  });

  return (
    <mesh ref={mesh} position={[0, 0, 0]} scale={[1.2, 2, 0.1]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshPhysicalMaterial
        transparent
        opacity={0.3}
        roughness={0}
        metalness={0.1}
        transmission={1}
        thickness={0.5}
        ior={1.5}
      />
    </mesh>
  );
}

function Scene() {
  const shapes = useMemo(() => [
    { position: [-2, 1.5, -2] as [number, number, number], color: "#0071E3", speed: 2, distort: 0.5 },
    { position: [2, -1, -1] as [number, number, number], color: "#2997FF", speed: 1.5, distort: 0.3 },
    { position: [-1.5, -2, -3] as [number, number, number], color: "#42A5F5", speed: 1, distort: 0.6 },
  ], []);

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
      
      {shapes.map((props, i) => (
        <FloatingShape key={i} {...props} />
      ))}
      
      <TechGlass />
      
      <Environment preset="city" />
      <ContactShadows position={[0, -2.5, 0]} opacity={0.4} scale={10} blur={2.5} far={4} />
      <OrbitControls enableZoom={false} enablePan={false} />
    </>
  );
}

export default function HeroScene() {
  return (
    <div className="w-full h-full min-h-[500px]">
      <Canvas>
        <ScrollControls pages={3} damping={0.2}>
          <Scene />
        </ScrollControls>
      </Canvas>
    </div>
  );
}
