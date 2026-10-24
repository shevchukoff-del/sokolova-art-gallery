"use client";

import { Canvas, ThreeEvent, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Html, RoundedBox, useTexture } from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import type { ArtworkData } from "@/lib/types";
import { assetPath } from "@/lib/assetPath";

type GallerySceneProps = {
  artworks: ArtworkData[];
  entered: boolean;
  selectedId: string | null;
  reducedMotion: boolean;
  onSelect: (id: string | null) => void;
};

type Placement = {
  position: [number, number, number];
  rotation: [number, number, number];
  side: "left" | "right";
};

const placements: Placement[] = [
  { position: [-5.22, 2.25, 8.3], rotation: [0, Math.PI / 2, 0], side: "left" },
  { position: [5.22, 2.2, 4.5], rotation: [0, -Math.PI / 2, 0], side: "right" },
  { position: [-5.22, 2.25, 0.2], rotation: [0, Math.PI / 2, 0], side: "left" },
  { position: [5.22, 2.32, -4.2], rotation: [0, -Math.PI / 2, 0], side: "right" },
  { position: [-5.22, 2.25, -8.5], rotation: [0, Math.PI / 2, 0], side: "left" },
  { position: [5.22, 2.2, -12.8], rotation: [0, -Math.PI / 2, 0], side: "right" },
  { position: [-5.22, 2.25, -17], rotation: [0, Math.PI / 2, 0], side: "left" },
  { position: [5.22, 2.2, -21], rotation: [0, -Math.PI / 2, 0], side: "right" },
];

function useScrollProgress() {
  const progress = useRef(0);
  useEffect(() => {
    const update = () => {
      const max = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      progress.current = THREE.MathUtils.clamp(window.scrollY / max, 0, 1);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return progress;
}

function CameraController({ entered, selectedId, artworks, reducedMotion }: Omit<GallerySceneProps, "onSelect">) {
  const { camera } = useThree();
  const progress = useScrollProgress();
  const focus = useMemo(() => {
    if (!selectedId) return null;
    const index = artworks.findIndex((artwork) => artwork.id === selectedId);
    if (index < 0) return null;
    const placement = placements[index];
    const sideOffset = placement.side === "left" ? 3.15 : -3.15;
    return {
      position: new THREE.Vector3(sideOffset, 2.25, placement.position[2] + 0.15),
      target: new THREE.Vector3(placement.position[0], placement.position[1], placement.position[2]),
    };
  }, [artworks, selectedId]);
  const targetLook = useRef(new THREE.Vector3(0, 1.9, 2));

  useFrame((state, delta) => {
    const introDrift = entered || reducedMotion ? 0 : Math.sin(state.clock.elapsedTime * 0.22) * 0.08;
    const z = 14 - progress.current * 36 + introDrift;
    const routeX = Math.sin(progress.current * Math.PI * 2.2) * 0.42;
    const routeY = 1.8 + Math.sin(progress.current * Math.PI) * 0.08;
    const routePosition = new THREE.Vector3(routeX, routeY, z);
    const routeLook = new THREE.Vector3(routeX * 0.35, 1.86, z - 5.5);
    const desiredPosition = focus?.position ?? routePosition;
    const desiredLook = focus?.target ?? routeLook;
    const speed = reducedMotion ? 18 : focus ? 4.6 : 2.3;

    camera.position.lerp(desiredPosition, 1 - Math.exp(-speed * delta));
    targetLook.current.lerp(desiredLook, 1 - Math.exp(-speed * delta));
    camera.lookAt(targetLook.current);
  });
  return null;
}

function makePlaceholderTexture(artwork: ArtworkData) {
  const canvas = document.createElement("canvas");
  canvas.width = 720;
  canvas.height = 900;
  const context = canvas.getContext("2d");
  if (!context) return new THREE.CanvasTexture(canvas);

  const gradient = context.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, artwork.palette[0]);
  gradient.addColorStop(0.42, artwork.palette[1]);
  gradient.addColorStop(0.73, artwork.palette[2]);
  gradient.addColorStop(1, artwork.palette[3]);
  context.fillStyle = gradient;
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.globalAlpha = 0.72;
  for (let index = 0; index < 14; index += 1) {
    const x = ((index * 173) % 720) - 80;
    const y = ((index * 257) % 900) - 80;
    const radius = 90 + ((index * 47) % 190);
    context.beginPath();
    context.ellipse(x, y, radius, radius * (0.45 + (index % 3) * 0.18), index * 0.43, 0, Math.PI * 2);
    context.fillStyle = artwork.palette[index % artwork.palette.length];
    context.fill();
  }
  context.globalAlpha = 1;
  context.fillStyle = "rgba(245,242,235,.88)";
  context.fillRect(38, 794, 220, 58);
  context.fillStyle = "#25231f";
  context.font = "500 20px Arial";
  context.letterSpacing = "2px";
  context.fillText("IMAGE SLOT", 60, 830);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}

function ArtworkImage({ url, width, height }: { url: string; width: number; height: number }) {
  const texture = useTexture(assetPath(url));
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return (
    <mesh position={[0, 0, 0.052]}>
      <planeGeometry args={[width, height]} />
      <meshStandardMaterial map={texture} roughness={0.82} />
    </mesh>
  );
}

function Artwork({ artwork, placement, selected, onSelect }: { artwork: ArtworkData; placement: Placement; selected: boolean; onSelect: () => void }) {
  const [hovered, setHovered] = useState(false);
  const texture = useMemo(() => makePlaceholderTexture(artwork), [artwork]);
  const group = useRef<THREE.Group>(null);
  const aspect = artwork.widthCm / artwork.heightCm;
  const height = 1.65;
  const width = height * aspect;

  useEffect(() => () => texture.dispose(), [texture]);
  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "auto";
    return () => { document.body.style.cursor = "auto"; };
  }, [hovered]);

  useFrame((_, delta) => {
    if (!group.current) return;
    const scale = selected ? 1.035 : hovered ? 1.018 : 1;
    group.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 1 - Math.exp(-8 * delta));
  });

  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    onSelect();
  };

  return (
    <group ref={group} position={placement.position} rotation={placement.rotation}>
      <RoundedBox args={[width + 0.11, height + 0.11, 0.085]} radius={0.018} smoothness={4} castShadow>
        <meshStandardMaterial color="#d9d0c1" roughness={0.55} metalness={0.03} />
      </RoundedBox>
      <group
        onClick={handleClick}
        onPointerOver={(event) => { event.stopPropagation(); setHovered(true); }}
        onPointerOut={() => setHovered(false)}
      >
        {artwork.image ? (
          <ArtworkImage url={artwork.image} width={width} height={height} />
        ) : (
          <mesh position={[0, 0, 0.052]}>
            <planeGeometry args={[width, height]} />
            <meshStandardMaterial map={texture} roughness={0.82} />
          </mesh>
        )}
      </group>
      {(hovered || selected) && (
        <Html position={[0, -height / 2 - 0.28, 0.1]} center distanceFactor={6} transform sprite>
          <button className="artwork-tooltip" onClick={onSelect}>
            <small>{artwork.titleEn}</small>
            <strong>{artwork.title}</strong>
          </button>
        </Html>
      )}
      <mesh position={[0, -height / 2 - 0.18, 0.035]}>
        <planeGeometry args={[0.35, 0.13]} />
        <meshStandardMaterial color="#eeeae1" roughness={0.9} />
      </mesh>
    </group>
  );
}

function Architecture() {
  const ribs = Array.from({ length: 10 }, (_, index) => 12 - index * 4.2);
  return (
    <group>
      <mesh position={[0, -0.08, -4]} receiveShadow>
        <boxGeometry args={[11, 0.16, 42]} />
        <meshStandardMaterial color="#d8c6ab" roughness={0.72} />
      </mesh>
      <mesh position={[-5.45, 2.6, -4]} receiveShadow>
        <boxGeometry args={[0.5, 5.2, 42]} />
        <meshStandardMaterial color="#f5f2eb" roughness={0.96} />
      </mesh>
      <mesh position={[5.45, 2.6, -4]} receiveShadow>
        <boxGeometry args={[0.5, 5.2, 42]} />
        <meshStandardMaterial color="#f5f2eb" roughness={0.96} />
      </mesh>
      <mesh position={[0, 5.18, -4]}>
        <boxGeometry args={[11, 0.18, 42]} />
        <meshStandardMaterial color="#ede9df" roughness={1} />
      </mesh>
      <mesh position={[0, 2.5, -25.05]} receiveShadow>
        <boxGeometry args={[11, 5, 0.2]} />
        <meshStandardMaterial color="#eeeae1" roughness={1} />
      </mesh>
      {ribs.map((z, index) => (
        <group key={z} position={[0, 0, z]}>
          <mesh position={[0, 4.95, 0]} castShadow>
            <boxGeometry args={[11, 0.26, 0.22]} />
            <meshStandardMaterial color="#e1dcd1" roughness={0.9} />
          </mesh>
          {index % 2 === 0 && (
            <mesh position={[0, 5.04, -0.55]}>
              <boxGeometry args={[4.2, 0.04, 1.1]} />
              <meshStandardMaterial color="#fffdf5" emissive="#fff9e9" emissiveIntensity={1.8} />
            </mesh>
          )}
        </group>
      ))}
      <mesh position={[0, 1.55, -24.9]}>
        <planeGeometry args={[3.2, 1.45]} />
        <meshStandardMaterial color="#c6b795" roughness={0.85} />
      </mesh>
      <ContactShadows position={[0, 0.03, -4]} opacity={0.2} scale={32} blur={2.8} far={7} />
    </group>
  );
}

function GalleryWorld({ artworks, entered, selectedId, reducedMotion, onSelect }: GallerySceneProps) {
  return (
    <>
      <color attach="background" args={["#eeeae2"]} />
      <fog attach="fog" args={["#eeeae2", 13, 48]} />
      <ambientLight intensity={1.35} color="#fff6e8" />
      <directionalLight position={[1.5, 8, 8]} intensity={2.4} color="#fff7e6" castShadow shadow-mapSize={[1024, 1024]} />
      <directionalLight position={[-5, 4, -12]} intensity={1.1} color="#d9e5e2" />
      <Architecture />
      {artworks.map((artwork, index) => (
        <Artwork
          key={artwork.id}
          artwork={artwork}
          placement={placements[index]}
          selected={selectedId === artwork.id}
          onSelect={() => onSelect(artwork.id)}
        />
      ))}
      <CameraController entered={entered} selectedId={selectedId} artworks={artworks} reducedMotion={reducedMotion} />
    </>
  );
}

export default function GalleryScene(props: GallerySceneProps) {
  return (
    <div className="canvas-shell" aria-label="Interactive three-dimensional art gallery">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 1.8, 14], fov: 56, near: 0.1, far: 80 }}
        shadows
        gl={{ antialias: true, powerPreference: "high-performance", alpha: false }}
        onPointerMissed={() => props.onSelect(null)}
      >
        <Suspense fallback={null}><GalleryWorld {...props} /></Suspense>
      </Canvas>
    </div>
  );
}
