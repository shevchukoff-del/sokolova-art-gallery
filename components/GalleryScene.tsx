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
  focus: [number, number, number];
  side: "left" | "right" | "front" | "partition";
  frame: "oak" | "white" | "shadow";
};

const placements: Placement[] = [
  { position: [6.06, 2.48, 7.9], rotation: [0, -Math.PI / 2, 0], focus: [3.42, 2.36, 8.05], side: "right", frame: "oak" },
  { position: [-6.06, 2.38, 3.2], rotation: [0, Math.PI / 2, 0], focus: [-3.5, 2.3, 3.35], side: "left", frame: "white" },
  { position: [6.06, 2.4, -0.45], rotation: [0, -Math.PI / 2, 0], focus: [3.5, 2.3, -0.3], side: "right", frame: "shadow" },
  { position: [-6.06, 2.55, -5.8], rotation: [0, Math.PI / 2, 0], focus: [-3.5, 2.42, -5.65], side: "left", frame: "oak" },
  { position: [-1.02, 2.5, -1.75], rotation: [0, Math.PI / 2, 0], focus: [2.2, 2.35, -1.6], side: "partition", frame: "shadow" },
  { position: [-6.06, 2.38, -13.9], rotation: [0, Math.PI / 2, 0], focus: [-3.55, 2.3, -13.75], side: "left", frame: "white" },
  { position: [6.06, 2.38, -17.8], rotation: [0, -Math.PI / 2, 0], focus: [3.55, 2.3, -17.65], side: "right", frame: "oak" },
  { position: [-6.06, 2.38, -21.7], rotation: [0, Math.PI / 2, 0], focus: [-3.55, 2.3, -21.55], side: "left", frame: "shadow" },
  { position: [0, 2.75, -27.02], rotation: [0, 0, 0], focus: [0, 2.35, -23.45], side: "front", frame: "oak" },
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
    return {
      position: new THREE.Vector3(...placement.focus),
      target: new THREE.Vector3(...placement.position),
    };
  }, [artworks, selectedId]);
  const targetLook = useRef(new THREE.Vector3(4.05, 2.42, 7.45));

  useFrame((state, delta) => {
    const progressValue = progress.current;
    const introDrift = entered || reducedMotion ? 0 : Math.sin(state.clock.elapsedTime * 0.2) * 0.055;
    const z = 14.5 - progressValue * 38.2 + introDrift;
    const partitionPass = THREE.MathUtils.smoothstep(z, -8, 7);
    const entryOffset = THREE.MathUtils.lerp(1.25, 0.15, Math.min(progressValue * 3.8, 1));
    const routeX = entryOffset + partitionPass * 0.55 + Math.sin(progressValue * Math.PI * 2.2) * 0.46;
    const routeY = 2.05 + Math.sin(progressValue * Math.PI) * 0.09;
    const lookX = THREE.MathUtils.lerp(4.05, routeX * 0.18, Math.min(progressValue * 5, 1));
    const lookZ = THREE.MathUtils.lerp(7.45, z - 6.4, Math.min(progressValue * 5, 1));
    const routePosition = new THREE.Vector3(routeX, routeY, z);
    const routeLook = new THREE.Vector3(lookX, 2.25, lookZ);
    const desiredPosition = focus?.position ?? routePosition;
    const desiredLook = focus?.target ?? routeLook;
    const speed = reducedMotion ? 18 : focus ? 4.5 : 2.15;

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
  context.fillStyle = "rgba(245,242,235,.9)";
  context.fillRect(34, 798, 230, 58);
  context.fillStyle = "#25231f";
  context.font = "500 20px Arial";
  context.letterSpacing = "2px";
  context.fillText("IMAGE SLOT", 58, 834);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  return texture;
}

function makePlasterTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 384;
  canvas.height = 384;
  const context = canvas.getContext("2d");
  if (!context) return new THREE.CanvasTexture(canvas);
  context.fillStyle = "#eeeae1";
  context.fillRect(0, 0, canvas.width, canvas.height);
  for (let index = 0; index < 9000; index += 1) {
    const value = 220 + Math.floor(Math.random() * 24);
    context.fillStyle = `rgba(${value},${value - 2},${value - 8},${0.02 + Math.random() * 0.035})`;
    const size = Math.random() * 1.6 + 0.35;
    context.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, size, size);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(5, 14);
  texture.anisotropy = 4;
  return texture;
}

function makeOakTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 1024;
  const context = canvas.getContext("2d");
  if (!context) return new THREE.CanvasTexture(canvas);
  context.fillStyle = "#bda47f";
  context.fillRect(0, 0, canvas.width, canvas.height);
  const boardHeight = 116;
  for (let row = 0; row < 10; row += 1) {
    const y = row * boardHeight;
    const warm = 158 + (row % 4) * 7;
    context.fillStyle = `rgb(${warm + 31},${warm + 12},${warm - 16})`;
    context.fillRect(0, y, canvas.width, boardHeight - 2);
    context.fillStyle = "rgba(78,57,35,.17)";
    context.fillRect(0, y + boardHeight - 2, canvas.width, 2);
    const offset = row % 2 ? 330 : 0;
    for (let seam = offset; seam < canvas.width; seam += 510) context.fillRect(seam, y, 2, boardHeight);
    for (let line = 0; line < 18; line += 1) {
      context.beginPath();
      context.strokeStyle = `rgba(94,63,34,${0.025 + (line % 4) * 0.009})`;
      context.lineWidth = 0.7;
      const grainY = y + 8 + line * 5.5;
      context.moveTo(0, grainY);
      for (let x = 0; x <= canvas.width; x += 48) context.lineTo(x, grainY + Math.sin(x * 0.025 + row) * 2.2);
      context.stroke();
    }
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2.5, 11);
  texture.anisotropy = 8;
  return texture;
}

function ArtworkImage({ url, width, height }: { url: string; width: number; height: number }) {
  const texture = useTexture(assetPath(url));
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  return (
    <mesh position={[0, 0, 0.052]}>
      <planeGeometry args={[width, height]} />
      <meshStandardMaterial map={texture} roughness={0.78} toneMapped={false} />
    </mesh>
  );
}

function Artwork({ artwork, placement, selected, onSelect }: { artwork: ArtworkData; placement: Placement; selected: boolean; onSelect: () => void }) {
  const [hovered, setHovered] = useState(false);
  const texture = useMemo(() => makePlaceholderTexture(artwork), [artwork]);
  const group = useRef<THREE.Group>(null);
  const maxDimension = Math.max(artwork.widthCm, artwork.heightCm);
  const scale = maxDimension > 135 ? 0.0175 : 0.0185;
  const width = artwork.widthCm * scale;
  const height = artwork.heightCm * scale;
  const frameColor = placement.frame === "oak" ? "#8f7556" : placement.frame === "white" ? "#e8e3da" : "#34322d";
  const frameMargin = placement.frame === "shadow" ? 0.035 : 0.075;

  useEffect(() => () => texture.dispose(), [texture]);
  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "auto";
    return () => { document.body.style.cursor = "auto"; };
  }, [hovered]);

  useFrame((_, delta) => {
    if (!group.current) return;
    const targetScale = selected ? 1.025 : hovered ? 1.012 : 1;
    group.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 1 - Math.exp(-8 * delta));
  });

  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    onSelect();
  };

  return (
    <group ref={group} position={placement.position} rotation={placement.rotation}>
      <RoundedBox args={[width + frameMargin * 2, height + frameMargin * 2, 0.075]} radius={0.012} smoothness={3} castShadow>
        <meshStandardMaterial color={frameColor} roughness={placement.frame === "oak" ? 0.58 : 0.76} metalness={0.01} />
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
            <meshStandardMaterial map={texture} roughness={0.78} toneMapped={false} />
          </mesh>
        )}
      </group>
      {(hovered || selected) && (
        <Html position={[0, -height / 2 - 0.26, 0.1]} center distanceFactor={6} transform sprite>
          <button className="artwork-tooltip" onClick={onSelect}>
            <small>{artwork.titleEn}</small>
            <strong>{artwork.title}</strong>
          </button>
        </Html>
      )}
      <mesh position={[0, -height / 2 - 0.16, 0.04]}>
        <planeGeometry args={[0.38, 0.115]} />
        <meshStandardMaterial color="#e7e2d9" roughness={0.92} />
      </mesh>
    </group>
  );
}

function Skylight({ z, length }: { z: number; length: number }) {
  return (
    <group position={[0, 6.08, z]}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4.35, length]} />
        <meshPhysicalMaterial color="#dfe8e5" roughness={0.28} transmission={0.08} emissive="#f9f7ed" emissiveIntensity={0.55} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[-2.29, -0.14, 0]}>
        <boxGeometry args={[0.2, 0.28, length + 0.3]} />
        <meshStandardMaterial color="#e4dfd5" roughness={0.88} />
      </mesh>
      <mesh position={[2.29, -0.14, 0]}>
        <boxGeometry args={[0.2, 0.28, length + 0.3]} />
        <meshStandardMaterial color="#e4dfd5" roughness={0.88} />
      </mesh>
      <mesh position={[0, -0.14, length / 2 + 0.1]}>
        <boxGeometry args={[4.78, 0.28, 0.2]} />
        <meshStandardMaterial color="#e4dfd5" roughness={0.88} />
      </mesh>
      <mesh position={[0, -0.14, -length / 2 - 0.1]}>
        <boxGeometry args={[4.78, 0.28, 0.2]} />
        <meshStandardMaterial color="#e4dfd5" roughness={0.88} />
      </mesh>
      <pointLight position={[0, -0.72, 0]} intensity={5.1} distance={10.5} decay={2} color="#fff9ee" />
    </group>
  );
}

function Architecture() {
  const plaster = useMemo(() => makePlasterTexture(), []);
  const oak = useMemo(() => makeOakTexture(), []);

  useEffect(() => () => {
    plaster.dispose();
    oak.dispose();
  }, [oak, plaster]);

  return (
    <group>
      <mesh position={[0, -0.09, -4.5]} receiveShadow>
        <boxGeometry args={[12.8, 0.18, 46]} />
        <meshStandardMaterial map={oak} bumpMap={oak} bumpScale={0.032} color="#eadac4" roughness={0.62} metalness={0.01} />
      </mesh>

      <mesh position={[-6.28, 3.05, -4.5]} receiveShadow>
        <boxGeometry args={[0.38, 6.1, 46]} />
        <meshStandardMaterial map={plaster} bumpMap={plaster} bumpScale={0.018} color="#f1eee6" roughness={0.92} />
      </mesh>
      <mesh position={[6.28, 3.05, -4.5]} receiveShadow>
        <boxGeometry args={[0.38, 6.1, 46]} />
        <meshStandardMaterial map={plaster} bumpMap={plaster} bumpScale={0.018} color="#f1eee6" roughness={0.92} />
      </mesh>

      <mesh position={[-4.55, 6.14, -4.5]}>
        <boxGeometry args={[3.3, 0.18, 46]} />
        <meshStandardMaterial color="#e8e3d9" roughness={0.92} />
      </mesh>
      <mesh position={[4.55, 6.14, -4.5]}>
        <boxGeometry args={[3.3, 0.18, 46]} />
        <meshStandardMaterial color="#e8e3d9" roughness={0.92} />
      </mesh>
      <mesh position={[0, 6.14, 13.1]}>
        <boxGeometry args={[5.8, 0.18, 3.2]} />
        <meshStandardMaterial color="#e8e3d9" roughness={0.92} />
      </mesh>
      <mesh position={[0, 6.14, -24.2]}>
        <boxGeometry args={[5.8, 0.18, 6.1]} />
        <meshStandardMaterial color="#e8e3d9" roughness={0.92} />
      </mesh>

      <Skylight z={8.5} length={4.2} />
      <Skylight z={2.75} length={3.9} />
      <Skylight z={-2.55} length={3.65} />
      <Skylight z={-16.9} length={6.8} />

      <mesh position={[-6.04, 0.16, -4.5]}>
        <boxGeometry args={[0.12, 0.22, 46]} />
        <meshStandardMaterial color="#9f927e" roughness={0.74} />
      </mesh>
      <mesh position={[6.04, 0.16, -4.5]}>
        <boxGeometry args={[0.12, 0.22, 46]} />
        <meshStandardMaterial color="#9f927e" roughness={0.74} />
      </mesh>

      <mesh position={[-4.72, 6.015, -4.5]}>
        <boxGeometry args={[0.035, 0.035, 43]} />
        <meshStandardMaterial color="#4c4943" roughness={0.58} metalness={0.18} />
      </mesh>
      <mesh position={[4.72, 6.015, -4.5]}>
        <boxGeometry args={[0.035, 0.035, 43]} />
        <meshStandardMaterial color="#4c4943" roughness={0.58} metalness={0.18} />
      </mesh>

      <group position={[-1.5, 0, 0.05]}>
        <mesh position={[0, 2.72, -2.7]} receiveShadow>
          <boxGeometry args={[0.92, 5.44, 10.65]} />
          <meshStandardMaterial map={plaster} bumpMap={plaster} bumpScale={0.014} color="#eee9df" roughness={0.92} />
        </mesh>
        <mesh position={[0, 2.72, 2.62]} receiveShadow>
          <cylinderGeometry args={[0.46, 0.46, 5.44, 40]} />
          <meshStandardMaterial map={plaster} bumpMap={plaster} bumpScale={0.014} color="#eee9df" roughness={0.92} />
        </mesh>
        <mesh position={[0, 0.13, -2.7]}>
          <boxGeometry args={[0.98, 0.22, 10.68]} />
          <meshStandardMaterial color="#a89983" roughness={0.78} />
        </mesh>
        <mesh position={[0, 0.13, 2.64]}>
          <cylinderGeometry args={[0.49, 0.49, 0.22, 40]} />
          <meshStandardMaterial color="#a89983" roughness={0.78} />
        </mesh>
      </group>

      <mesh position={[0, 3.05, -27.45]} receiveShadow>
        <boxGeometry args={[12.8, 6.1, 0.38]} />
        <meshStandardMaterial color="#e7e0d3" roughness={0.94} />
      </mesh>
      <mesh position={[0, 2.75, -27.21]}>
        <planeGeometry args={[3.55, 4.45]} />
        <meshStandardMaterial color="#9c8d78" roughness={0.92} />
      </mesh>
      <mesh position={[0, 2.75, -27.1]}>
        <planeGeometry args={[2.85, 3.75]} />
        <meshStandardMaterial color="#6f685c" roughness={0.95} />
      </mesh>
      <RoundedBox args={[1.45, 1.08, 1.45]} radius={0.035} smoothness={4} position={[0, 0.54, -24.9]} castShadow receiveShadow>
        <meshStandardMaterial color="#d6cec0" roughness={0.86} />
      </RoundedBox>
      <mesh position={[0, 1.38, -24.9]} castShadow>
        <icosahedronGeometry args={[0.54, 2]} />
        <meshStandardMaterial color="#7e887f" roughness={0.62} metalness={0.04} />
      </mesh>

      <group position={[-3.7, 0, 0.6]}>
        <RoundedBox args={[2.65, 0.34, 0.82]} radius={0.13} smoothness={5} position={[0, 0.48, 0]} castShadow receiveShadow>
          <meshStandardMaterial color="#a59175" roughness={0.76} />
        </RoundedBox>
        <mesh position={[-1.08, 0.23, 0]} castShadow>
          <boxGeometry args={[0.12, 0.46, 0.7]} />
          <meshStandardMaterial color="#393630" roughness={0.48} metalness={0.15} />
        </mesh>
        <mesh position={[1.08, 0.23, 0]} castShadow>
          <boxGeometry args={[0.12, 0.46, 0.7]} />
          <meshStandardMaterial color="#393630" roughness={0.48} metalness={0.15} />
        </mesh>
      </group>

      <mesh position={[-6.065, 2.8, -1.1]}>
        <planeGeometry args={[0.02, 3.6]} />
        <meshStandardMaterial color="#d7d0c4" roughness={0.9} />
      </mesh>
      <mesh position={[6.065, 2.8, -14.8]}>
        <planeGeometry args={[0.02, 3.8]} />
        <meshStandardMaterial color="#d7d0c4" roughness={0.9} />
      </mesh>

      <ContactShadows position={[0, 0.025, -4.5]} opacity={0.18} scale={35} blur={3.4} far={5.5} color="#716756" />
    </group>
  );
}

function ArtworkLighting() {
  return (
    <group>
      {placements.map((placement, index) => {
        const [x, , z] = placement.position;
        const lightX = placement.side === "left" ? -4.65 : placement.side === "right" ? 4.65 : placement.side === "partition" ? 1.35 : x;
        const lightZ = placement.side === "front" ? z + 1.4 : z;
        return <pointLight key={index} position={[lightX, 4.45, lightZ]} intensity={3.65} distance={5.4} decay={2} color="#fff2dc" />;
      })}
    </group>
  );
}

function GalleryWorld({ artworks, entered, selectedId, reducedMotion, onSelect }: GallerySceneProps) {
  const { gl } = useThree();

  useEffect(() => {
    gl.toneMapping = THREE.ACESFilmicToneMapping;
    gl.toneMappingExposure = 0.98;
    gl.outputColorSpace = THREE.SRGBColorSpace;
  }, [gl]);

  return (
    <>
      <color attach="background" args={["#d9ddd8"]} />
      <fog attach="fog" args={["#e5e2da", 22, 58]} />
      <hemisphereLight args={["#eef5f2", "#8f806d", 1.2]} />
      <ambientLight intensity={0.38} color="#fff4e6" />
      <directionalLight
        position={[-4, 11, 8]}
        intensity={1.7}
        color="#fff7e8"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.00012}
        shadow-camera-left={-13}
        shadow-camera-right={13}
        shadow-camera-top={10}
        shadow-camera-bottom={-4}
        shadow-camera-near={1}
        shadow-camera-far={42}
      />
      <directionalLight position={[7, 5, -18]} intensity={0.48} color="#dce7e4" />
      <Architecture />
      <ArtworkLighting />
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
        camera={{ position: [1.25, 2.05, 14.5], fov: 49, near: 0.1, far: 90 }}
        shadows={{ type: THREE.PCFSoftShadowMap }}
        gl={{ antialias: true, powerPreference: "high-performance", alpha: false }}
        onPointerMissed={() => props.onSelect(null)}
      >
        <Suspense fallback={null}><GalleryWorld {...props} /></Suspense>
      </Canvas>
    </div>
  );
}
