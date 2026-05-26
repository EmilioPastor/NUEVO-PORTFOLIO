import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const RUST = "#D4460F";
const INK = "#111111";

function PointerTracker({ onPointer }: { onPointer: (x: number, y: number) => void }) {
  const { size } = useThree();
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -((e.clientY / window.innerHeight) * 2 - 1);
      onPointer(x, y);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [size.width, size.height]);
  return null;
}

function Crystal({ pointer }: { pointer: { x: number; y: number } }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const wireRef = useRef<THREE.LineSegments>(null!);
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((_, delta) => {
    if (!meshRef.current || !wireRef.current || !groupRef.current) return;
    const m = meshRef.current;
    m.rotation.y += delta * 0.18;
    m.rotation.x = THREE.MathUtils.lerp(m.rotation.x, pointer.y * 0.45, 0.06);
    wireRef.current.rotation.copy(m.rotation);
    const targetTilt = pointer.x * 0.3;
    groupRef.current.rotation.z = THREE.MathUtils.lerp(
      groupRef.current.rotation.z,
      targetTilt * 0.2,
      0.05,
    );
    groupRef.current.position.y = Math.sin(performance.now() / 1800) * 0.04;
  });

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef} castShadow>
        <icosahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color={RUST}
          metalness={0.55}
          roughness={0.32}
          flatShading
          envMapIntensity={0.6}
        />
      </mesh>
      <lineSegments ref={wireRef}>
        <edgesGeometry args={[new THREE.IcosahedronGeometry(1.008, 0)]} />
        <lineBasicMaterial color={INK} transparent opacity={0.55} />
      </lineSegments>
    </group>
  );
}

function GroundShadow() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.05, 0]} receiveShadow>
      <circleGeometry args={[2.2, 64]} />
      <meshBasicMaterial color={INK} transparent opacity={0.06} />
    </mesh>
  );
}

export default function HeroSculptureInner() {
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [0, 0.15, 3.4], fov: 32 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
      style={{ background: "transparent" }}
    >
      <PointerTracker
        onPointer={(x, y) => setPointer({ x, y })}
      />
      <ambientLight intensity={0.55} color="#fdf8ee" />
      <directionalLight
        position={[3.5, 4, 3]}
        intensity={0.9}
        color="#ffffff"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <pointLight position={[-3, -1.5, -2]} intensity={0.65} color={RUST} />
      <pointLight position={[2, -2, 2]} intensity={0.25} color="#7bafe0" />
      <Crystal pointer={pointer} />
      <GroundShadow />
    </Canvas>
  );
}
