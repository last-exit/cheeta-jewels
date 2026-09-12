/**
 * EYEWEAR 3D MODEL — Awwwards-Tier Photorealistic WebGL & Three.js Engine
 * Crafted with custom PBR physical materials, dual-rail double barrel bridge,
 * sculpted cheetah temple hinges, Fresnel glass coating, and smooth spring physics.
 */
import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface Eyewear3DModelProps {
  lensType: "ruby" | "obsidian" | "amber" | "emerald";
  frameType?: "gold" | "gunmetal" | "bronze";
  className?: string;
  autoRotate?: boolean;
}

export default function Eyewear3DModel({
  lensType = "ruby",
  frameType = "gold",
  className = "w-full h-full",
  autoRotate = true,
}: Eyewear3DModelProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const lensMaterialsRef = useRef<THREE.MeshPhysicalMaterial[]>([]);
  const frameMaterialsRef = useRef<THREE.MeshStandardMaterial[]>([]);
  const accentMaterialsRef = useRef<THREE.MeshStandardMaterial[]>([]);
  const modelGroupRef = useRef<THREE.Group | null>(null);
  const isDraggingRef = useRef(false);
  const prevMousePosRef = useRef({ x: 0, y: 0 });
  const targetRotationRef = useRef({ x: 0, y: 0 });
  const currentRotationRef = useRef({ x: 0, y: 0 });

  // Map lens color & physical properties for genuine luxury sunglasses lenses
  const getLensProps = (type: string) => {
    switch (type) {
      case "ruby":
        return {
          color: 0x4a050e,
          transmission: 0.68,
          opacity: 0.88,
          roughness: 0.05,
          ior: 1.62,
          reflectivity: 0.95,
          attenuationColor: 0x8a0e1c,
          attenuationDistance: 0.6,
        };
      case "obsidian":
        return {
          color: 0x08090a,
          transmission: 0.3,
          opacity: 0.95,
          roughness: 0.04,
          ior: 1.58,
          reflectivity: 0.98,
          attenuationColor: 0x020204,
          attenuationDistance: 0.4,
        };
      case "amber":
        return {
          color: 0x6e380a,
          transmission: 0.72,
          opacity: 0.86,
          roughness: 0.06,
          ior: 1.58,
          reflectivity: 0.92,
          attenuationColor: 0xb86314,
          attenuationDistance: 0.7,
        };
      case "emerald":
        return {
          color: 0x06281c,
          transmission: 0.65,
          opacity: 0.88,
          roughness: 0.05,
          ior: 1.62,
          reflectivity: 0.95,
          attenuationColor: 0x0f5c43,
          attenuationDistance: 0.6,
        };
      default:
        return {
          color: 0x4a050e,
          transmission: 0.68,
          opacity: 0.88,
          roughness: 0.05,
          ior: 1.62,
          reflectivity: 0.95,
          attenuationColor: 0x8a0e1c,
          attenuationDistance: 0.6,
        };
    }
  };

  // Map frame types to solid gold / gunmetal / bronze PBR materials
  const getFrameProps = (type: string) => {
    switch (type) {
      case "gunmetal":
        return { color: 0x1a1c20, metalness: 0.96, roughness: 0.24 };
      case "bronze":
        return { color: 0x7a5b3a, metalness: 0.92, roughness: 0.32 };
      case "gold":
      default:
        return { color: 0xd4af37, metalness: 0.98, roughness: 0.15 };
    }
  };

  // Update lens materials dynamically
  useEffect(() => {
    const props = getLensProps(lensType);
    lensMaterialsRef.current.forEach((mat) => {
      mat.color.setHex(props.color);
      mat.transmission = props.transmission;
      mat.opacity = props.opacity;
      mat.roughness = props.roughness;
      mat.ior = props.ior;
      mat.needsUpdate = true;
    });
  }, [lensType]);

  // Update frame materials dynamically
  useEffect(() => {
    const props = getFrameProps(frameType);
    frameMaterialsRef.current.forEach((mat) => {
      mat.color.setHex(props.color);
      mat.metalness = props.metalness;
      mat.roughness = props.roughness;
      mat.needsUpdate = true;
    });
  }, [frameType]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 700;
    const height = container.clientHeight || 500;

    // 1. Scene Setup
    const scene = new THREE.Scene();

    // 2. Camera Setup (Luxury medium telephoto lens perspective)
    const camera = new THREE.PerspectiveCamera(32, width / height, 0.1, 100);
    camera.position.set(0, 0.1, 4.6);

    // 3. Renderer with ACES Tone Mapping & Subpixel Antialiasing
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.4;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // 4. Studio Environment Lighting
    const ambientLight = new THREE.AmbientLight(0xfff8ee, 1.1);
    scene.add(ambientLight);

    // Key Light: High-angle warm spotlight creating gold bevel highlights
    const keyLight = new THREE.DirectionalLight(0xfffaed, 3.8);
    keyLight.position.set(3.5, 4.5, 4.0);
    scene.add(keyLight);

    // Rim Light 1: Golden silhouette rim
    const rimLight1 = new THREE.DirectionalLight(0xd4af37, 3.0);
    rimLight1.position.set(-4.0, 2.5, -3.0);
    scene.add(rimLight1);

    // Rim Light 2: Crisp white fill reflection
    const rimLight2 = new THREE.DirectionalLight(0xffffff, 2.2);
    rimLight2.position.set(0, -3.5, 3.0);
    scene.add(rimLight2);

    // Top Studio Softbox
    const softbox = new THREE.PointLight(0xffffff, 2.0, 12);
    softbox.position.set(0, 3.0, 1.8);
    scene.add(softbox);

    // Atmospheric Warm Floor Glow
    const floorGlow = new THREE.PointLight(0x8a0e1c, 1.4, 8);
    floorGlow.position.set(0, -2.5, -1.0);
    scene.add(floorGlow);

    // 5. High-Precision PBR Materials
    const frameConfig = getFrameProps(frameType);
    const goldMaterial = new THREE.MeshStandardMaterial({
      color: frameConfig.color,
      metalness: frameConfig.metalness,
      roughness: frameConfig.roughness,
    });
    frameMaterialsRef.current = [goldMaterial];

    // Polished Accent Material (for screws, bridge pillars, and cheetah hinges)
    const accentMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.98,
      roughness: 0.1,
    });
    accentMaterialsRef.current = [accentMaterial];

    // Optical Mineral Glass with Fresnel Clearcoat
    const lensConfig = getLensProps(lensType);
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: lensConfig.color,
      metalness: 0.05,
      roughness: lensConfig.roughness,
      transmission: lensConfig.transmission,
      transparent: true,
      opacity: lensConfig.opacity,
      reflectivity: lensConfig.reflectivity,
      clearcoat: 1.0,
      clearcoatRoughness: 0.03,
      ior: lensConfig.ior,
      side: THREE.DoubleSide,
    });
    lensMaterialsRef.current = [glassMaterial];

    const emeraldPivotMaterial = new THREE.MeshStandardMaterial({
      color: 0x0f5c43,
      roughness: 0.1,
      metalness: 0.3,
    });

    // 6. Construct High-Jewelry Double Barrel Eyewear Model
    const eyewearGroup = new THREE.Group();
    modelGroupRef.current = eyewearGroup;

    const lensRadius = 0.56;
    const lensSpacing = 0.74;
    const rimWireRadius = 0.03;

    // Dual Circular Rims with Outer Stepped Chamfer
    const outerRimGeo = new THREE.TorusGeometry(lensRadius, rimWireRadius, 24, 72);
    const innerBevelGeo = new THREE.TorusGeometry(lensRadius - 0.015, rimWireRadius * 0.6, 16, 64);

    // Left Frame Assembly
    const leftRim = new THREE.Mesh(outerRimGeo, goldMaterial);
    leftRim.position.x = -lensSpacing;
    const leftInnerBevel = new THREE.Mesh(innerBevelGeo, goldMaterial);
    leftInnerBevel.position.set(-lensSpacing, 0, 0.01);
    eyewearGroup.add(leftRim);
    eyewearGroup.add(leftInnerBevel);

    // Right Frame Assembly
    const rightRim = new THREE.Mesh(outerRimGeo, goldMaterial);
    rightRim.position.x = lensSpacing;
    const rightInnerBevel = new THREE.Mesh(innerBevelGeo, goldMaterial);
    rightInnerBevel.position.set(lensSpacing, 0, 0.01);
    eyewearGroup.add(rightRim);
    eyewearGroup.add(rightInnerBevel);

    // Curved Mineral Lenses (Slight convex curvature for realistic glint)
    const lensGeo = new THREE.CylinderGeometry(lensRadius - 0.008, lensRadius - 0.008, 0.024, 64);
    lensGeo.rotateX(Math.PI / 2);

    const leftLens = new THREE.Mesh(lensGeo, glassMaterial);
    leftLens.position.x = -lensSpacing;
    eyewearGroup.add(leftLens);

    const rightLens = new THREE.Mesh(lensGeo, glassMaterial);
    rightLens.position.x = lensSpacing;
    eyewearGroup.add(rightLens);

    // Double Barrel Brow Bridge Architecture
    // Top Arch Rail
    const topBridgeCurve = new THREE.CubicBezierCurve3(
      new THREE.Vector3(-lensSpacing + lensRadius - 0.015, 0.26, 0.02),
      new THREE.Vector3(-0.2, 0.34, 0.12),
      new THREE.Vector3(0.2, 0.34, 0.12),
      new THREE.Vector3(lensSpacing - lensRadius + 0.015, 0.26, 0.02)
    );
    const topBridgeMesh = new THREE.Mesh(new THREE.TubeGeometry(topBridgeCurve, 36, 0.025, 16, false), goldMaterial);
    eyewearGroup.add(topBridgeMesh);

    // Bottom Nose Bridge Rail
    const bottomBridgeCurve = new THREE.CubicBezierCurve3(
      new THREE.Vector3(-lensSpacing + lensRadius - 0.015, 0.08, 0.02),
      new THREE.Vector3(-0.16, 0.12, 0.09),
      new THREE.Vector3(0.16, 0.12, 0.09),
      new THREE.Vector3(lensSpacing - lensRadius + 0.015, 0.08, 0.02)
    );
    const bottomBridgeMesh = new THREE.Mesh(new THREE.TubeGeometry(bottomBridgeCurve, 36, 0.022, 16, false), goldMaterial);
    eyewearGroup.add(bottomBridgeMesh);

    // Precision Vertical Reinforcement Columns
    const columnGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.18, 16);
    const colLeft = new THREE.Mesh(columnGeo, goldMaterial);
    colLeft.position.set(-0.13, 0.2, 0.08);
    eyewearGroup.add(colLeft);

    const colRight = new THREE.Mesh(columnGeo, goldMaterial);
    colRight.position.set(0.13, 0.2, 0.08);
    eyewearGroup.add(colRight);

    // Nose Pads (Solid Gold teardrop pads)
    const padGeo = new THREE.SphereGeometry(0.035, 16, 16);
    padGeo.scale(0.6, 1.2, 0.4);
    const leftPad = new THREE.Mesh(padGeo, goldMaterial);
    leftPad.position.set(-0.18, 0.02, -0.06);
    leftPad.rotation.z = -0.3;
    eyewearGroup.add(leftPad);

    const rightPad = new THREE.Mesh(padGeo, goldMaterial);
    rightPad.position.set(0.18, 0.02, -0.06);
    rightPad.rotation.z = 0.3;
    eyewearGroup.add(rightPad);

    // Sleek Sculptural Temple Arms
    const templeRadius = 0.02;
    const leftTempleCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-lensSpacing - lensRadius - 0.02, 0.1, 0),
      new THREE.Vector3(-lensSpacing - lensRadius - 0.06, 0.1, -0.3),
      new THREE.Vector3(-lensSpacing - lensRadius - 0.05, 0.08, -1.0),
      new THREE.Vector3(-lensSpacing - lensRadius - 0.02, -0.04, -1.7),
      new THREE.Vector3(-lensSpacing - lensRadius + 0.02, -0.18, -1.9),
    ]);
    const leftTemple = new THREE.Mesh(new THREE.TubeGeometry(leftTempleCurve, 48, templeRadius, 16, false), goldMaterial);
    eyewearGroup.add(leftTemple);

    const rightTempleCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(lensSpacing + lensRadius + 0.02, 0.1, 0),
      new THREE.Vector3(lensSpacing + lensRadius + 0.06, 0.1, -0.3),
      new THREE.Vector3(lensSpacing + lensRadius + 0.05, 0.08, -1.0),
      new THREE.Vector3(lensSpacing + lensRadius + 0.02, -0.04, -1.7),
      new THREE.Vector3(lensSpacing + lensRadius - 0.02, -0.18, -1.9),
    ]);
    const rightTemple = new THREE.Mesh(new THREE.TubeGeometry(rightTempleCurve, 48, templeRadius, 16, false), goldMaterial);
    eyewearGroup.add(rightTemple);

    // Cheetah Head / Micro-Hinge Hardware
    const hingeBlockGeo = new THREE.BoxGeometry(0.06, 0.06, 0.08);
    const h1 = new THREE.Mesh(hingeBlockGeo, goldMaterial);
    h1.position.set(-lensSpacing - lensRadius - 0.03, 0.1, 0);
    eyewearGroup.add(h1);

    const h2 = new THREE.Mesh(hingeBlockGeo, goldMaterial);
    h2.position.set(lensSpacing + lensRadius + 0.03, 0.1, 0);
    eyewearGroup.add(h2);

    // Faceted Gemstone Pivot Studs
    const gemGeo = new THREE.OctahedronGeometry(0.035, 1);
    const g1 = new THREE.Mesh(gemGeo, emeraldPivotMaterial);
    g1.position.set(-lensSpacing - lensRadius - 0.045, 0.1, 0.045);
    eyewearGroup.add(g1);

    const g2 = new THREE.Mesh(gemGeo, emeraldPivotMaterial);
    g2.position.set(lensSpacing + lensRadius + 0.045, 0.1, 0.045);
    eyewearGroup.add(g2);

    scene.add(eyewearGroup);

    // 7. Tactile 3D Orbit Interaction with Momentum Physics
    const onMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      prevMousePosRef.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      const deltaX = e.clientX - prevMousePosRef.current.x;
      const deltaY = e.clientY - prevMousePosRef.current.y;

      targetRotationRef.current.y += deltaX * 0.007;
      targetRotationRef.current.x += deltaY * 0.007;
      targetRotationRef.current.x = Math.max(-0.45, Math.min(0.45, targetRotationRef.current.x));

      prevMousePosRef.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDraggingRef.current = false;
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDraggingRef.current = true;
        prevMousePosRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDraggingRef.current || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - prevMousePosRef.current.x;
      const deltaY = e.touches[0].clientY - prevMousePosRef.current.y;

      targetRotationRef.current.y += deltaX * 0.007;
      targetRotationRef.current.x += deltaY * 0.007;
      targetRotationRef.current.x = Math.max(-0.45, Math.min(0.45, targetRotationRef.current.x));

      prevMousePosRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const onTouchEnd = () => {
      isDraggingRef.current = false;
    };

    const domElem = renderer.domElement;
    domElem.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    domElem.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);

    // 8. Continuous Render Loop with Spring Interpolation (Emil Kowalski Philosophy)
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      if (modelGroupRef.current) {
        // Idle gentle floating sine wave
        modelGroupRef.current.position.y = Math.sin(elapsedTime * 1.5) * 0.04;

        if (!isDraggingRef.current && autoRotate) {
          targetRotationRef.current.y += 0.0035;
          targetRotationRef.current.x *= 0.985;
        }

        // Spring lerp rotation for natural inertia
        currentRotationRef.current.y += (targetRotationRef.current.y - currentRotationRef.current.y) * 0.08;
        currentRotationRef.current.x += (targetRotationRef.current.x - currentRotationRef.current.x) * 0.08;

        modelGroupRef.current.rotation.y = currentRotationRef.current.y;
        modelGroupRef.current.rotation.x = currentRotationRef.current.x;
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      domElem.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      domElem.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={`relative cursor-grab active:cursor-grabbing ${className}`}
    />
  );
}
