"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, PerspectiveCamera, Stars } from "@react-three/drei";
import * as THREE from "three";

const ProductCore = () => {
    const meshRef = useRef<THREE.Mesh>(null);
    const wireRef = useRef<THREE.Mesh>(null);
    const innerCoreRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (meshRef.current) {
            meshRef.current.rotation.x = Math.cos(t / 4) / 8;
            meshRef.current.rotation.y = Math.sin(t / 4) / 8;
        }
        if (wireRef.current) {
            wireRef.current.rotation.y = t / 10;
            wireRef.current.rotation.z = Math.sin(t / 2) / 10;
        }
        if (innerCoreRef.current) {
            const s = 1 + Math.sin(t * 2) * 0.05;
            innerCoreRef.current.scale.set(s, s, s);
        }
    });

    return (
        <group>
            {/* Pulsing Inner Core */}
            <Sphere ref={innerCoreRef} args={[0.4, 32, 32]}>
                <meshStandardMaterial
                    color="#f59e0b"
                    emissive="#f59e0b"
                    emissiveIntensity={2}
                />
            </Sphere>

            {/* Main Distorted Sphere */}
            <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
                <Sphere ref={meshRef} args={[1, 128, 128]}>
                    <MeshDistortMaterial
                        color="#ffffff"
                        speed={2}
                        distort={0.4}
                        radius={1}
                        roughness={0.1}
                        metalness={1}
                        transmission={0.8}
                        thickness={1}
                    />
                </Sphere>
            </Float>

            {/* Complex Wireframe Shell */}
            <mesh ref={wireRef}>
                <icosahedronGeometry args={[1.6, 2]} />
                <meshStandardMaterial 
                    color="#8b5cf6" 
                    wireframe 
                    transparent 
                    opacity={0.2} 
                />
            </mesh>

            <Points />
        </group>
    );
};

const MouseLight = () => {
    const lightRef = useRef<THREE.PointLight>(null);
    
    useFrame((state) => {
        if (!lightRef.current) return;
        const targetX = (state.mouse.x * 5);
        const targetY = (state.mouse.y * 5);
        lightRef.current.position.set(targetX, targetY, 2);
    });

    return <pointLight ref={lightRef} intensity={2} color="#00f3ff" distance={10} />;
};

const Points = () => {
    const count = 800;
    const pointsRef = useRef<THREE.Points>(null);

    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3);
        const radius = 6;
        for (let i = 0; i < count; i++) {
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
            pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
            pos[i * 3 + 2] = radius * Math.cos(phi);
        }
        return pos;
    }, []);

    useFrame((state) => {
        if (pointsRef.current) {
            pointsRef.current.rotation.y = state.clock.getElapsedTime() / 30;
            pointsRef.current.rotation.x = state.clock.getElapsedTime() / 50;
        }
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={positions.length / 3}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial size={0.02} color="#8b5cf6" transparent opacity={0.4} sizeAttenuation />
        </points>
    );
};

export function ProductCore3D() {
    return (
        <div className="w-full h-[500px] relative cursor-none group">
            <Canvas dpr={[1, 2]}>
                <PerspectiveCamera makeDefault position={[0, 0, 6]} />
                <ambientLight intensity={0.2} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} color="#f59e0b" />
                <MouseLight />
                <Stars radius={50} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
                <ProductCore />
            </Canvas>
            
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/10 blur-[150px] rounded-full mix-blend-screen" />
            </div>
        </div>
    );
}
