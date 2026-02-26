"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function StarField({ count = 1000 }) {
  const points = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        p[i * 3] = (Math.random() - 0.5) * 50;
        p[i * 3 + 1] = (Math.random() - 0.5) * 50;
        p[i * 3 + 2] = (Math.random() - 0.5) * 50;
    }
    return p;
  }, [count]);

  const ref = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (ref.current) {
        ref.current.rotation.x = state.clock.getElapsedTime() * 0.05;
        ref.current.rotation.y = state.clock.getElapsedTime() * 0.02;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={points} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#0071E3"
          size={0.1}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}

function FloatingOrbs() {
    const orbs = useMemo(() => {
        return Array.from({ length: 15 }).map(() => ({
            position: [
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 10
            ] as [number, number, number],
            scale: Math.random() * 0.5 + 0.2,
            color: Math.random() > 0.5 ? "#0071E3" : "#2997FF",
            speed: Math.random() * 0.2 + 0.1
        }));
    }, []);

    return (
        <>
            {orbs.map((orb, i) => (
                <mesh key={i} position={orb.position} scale={orb.scale}>
                    <sphereGeometry args={[1, 32, 32]} />
                    <meshBasicMaterial color={orb.color} transparent opacity={0.1} />
                </mesh>
            ))}
        </>
    );
}

export default function Background3D() {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none opacity-40">
      <Canvas camera={{ position: [0, 0, 10] }}>
        <StarField />
        <FloatingOrbs />
      </Canvas>
    </div>
  );
}
