"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Hero3D() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const currentContainer = containerRef.current;
    if (!currentContainer) return;

    // Dimensions
    const width = currentContainer.clientWidth;
    const height = currentContainer.clientHeight || 500;

    // Scene
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x060b1e, 0.015);

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 8.5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    currentContainer.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.4);
    dirLight.position.set(5, 7, 6);
    scene.add(dirLight);

    const pointLightRed = new THREE.PointLight(0xd91a23, 2.5, 50); // Institutional Crimson
    pointLightRed.position.set(-4, -2, 3);
    scene.add(pointLightRed);

    const pointLightGold = new THREE.PointLight(0xf59e0b, 2.5, 50); // Security Amber/Gold
    pointLightGold.position.set(4, 3, 3);
    scene.add(pointLightGold);

    const pointLightBlue = new THREE.PointLight(0x38bdf8, 2, 50); // Security Blue
    pointLightBlue.position.set(0, -4, 2);
    scene.add(pointLightBlue);

    // Main Group to hold the Shield
    const shieldGroup = new THREE.Group();
    scene.add(shieldGroup);

    // Create 3D Shield Shape
    const shieldShape = new THREE.Shape();
    // Start at top center
    shieldShape.moveTo(0, 1.8);
    // Top right shoulder
    shieldShape.bezierCurveTo(0.6, 1.8, 1.3, 1.6, 1.5, 1.2);
    // Right side down towards point
    shieldShape.bezierCurveTo(1.55, 0.4, 1.35, -0.7, 0, -2.1);
    // Left side up from point
    shieldShape.bezierCurveTo(-1.35, -0.7, -1.55, 0.4, -1.5, 1.2);
    // Top left shoulder
    shieldShape.bezierCurveTo(-1.3, 1.6, -0.6, 1.8, 0, 1.8);

    // Extrude Outer Shield
    const extrudeSettings = {
      depth: 0.28,
      bevelEnabled: true,
      bevelSegments: 6,
      steps: 2,
      bevelSize: 0.12,
      bevelThickness: 0.12
    };

    const shieldGeo = new THREE.ExtrudeGeometry(shieldShape, extrudeSettings);
    shieldGeo.center();

    // Metallic Gold/Platinum Outer Rim Material
    const outerRimMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37, // Royal Gold
      metalness: 0.85,
      roughness: 0.2,
    });

    const outerShield = new THREE.Mesh(shieldGeo, outerRimMat);
    shieldGroup.add(outerShield);

    // Inner Shield Shape (Slightly smaller for inset core)
    const innerShieldShape = new THREE.Shape();
    innerShieldShape.moveTo(0, 1.6);
    innerShieldShape.bezierCurveTo(0.5, 1.6, 1.15, 1.42, 1.32, 1.05);
    innerShieldShape.bezierCurveTo(1.36, 0.35, 1.18, -0.6, 0, -1.85);
    innerShieldShape.bezierCurveTo(-1.18, -0.6, -1.36, 0.35, -1.32, 1.05);
    innerShieldShape.bezierCurveTo(-1.15, 1.42, -0.5, 1.6, 0, 1.6);

    const innerExtrudeSettings = {
      depth: 0.15,
      bevelEnabled: true,
      bevelSegments: 4,
      steps: 1,
      bevelSize: 0.05,
      bevelThickness: 0.05
    };

    const innerShieldGeo = new THREE.ExtrudeGeometry(innerShieldShape, innerExtrudeSettings);
    innerShieldGeo.center();

    // CBSJC Navy Blue High-Gloss Core Material
    const innerShieldMat = new THREE.MeshStandardMaterial({
      color: 0x0a194e, // CBSJC Deep Navy
      metalness: 0.45,
      roughness: 0.3,
    });

    const innerShield = new THREE.Mesh(innerShieldGeo, innerShieldMat);
    innerShield.position.z = 0.14;
    shieldGroup.add(innerShield);

    // Institutional Emblem: Red Security Crest Cross / Badge
    const emblemGroup = new THREE.Group();
    emblemGroup.position.z = 0.25;

    // Vertical Red Bar
    const redMat = new THREE.MeshStandardMaterial({
      color: 0xd91a23, // Institutional Red
      metalness: 0.6,
      roughness: 0.25,
    });

    const vBarGeo = new THREE.BoxGeometry(0.38, 1.7, 0.08);
    const vBar = new THREE.Mesh(vBarGeo, redMat);
    vBar.position.y = 0.05;
    emblemGroup.add(vBar);

    // Horizontal Red Bar
    const hBarGeo = new THREE.BoxGeometry(1.4, 0.38, 0.08);
    const hBar = new THREE.Mesh(hBarGeo, redMat);
    hBar.position.y = 0.25;
    emblemGroup.add(hBar);

    // Central Golden Star / Medallion
    const starGeo = new THREE.CylinderGeometry(0.36, 0.36, 0.1, 8);
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xfacc15, // Pure Gold
      metalness: 0.9,
      roughness: 0.15,
    });
    const centerMedallion = new THREE.Mesh(starGeo, goldMat);
    centerMedallion.rotation.x = Math.PI / 2;
    centerMedallion.position.set(0, 0.25, 0.06);
    emblemGroup.add(centerMedallion);

    // Inner Security Lock Icon Symbol inside Medallion
    const lockLoopGeo = new THREE.TorusGeometry(0.12, 0.03, 8, 16, Math.PI);
    const lockLoopMat = new THREE.MeshStandardMaterial({ color: 0x0a194e, metalness: 0.8, roughness: 0.2 });
    const lockLoop = new THREE.Mesh(lockLoopGeo, lockLoopMat);
    lockLoop.position.set(0, 0.32, 0.13);
    emblemGroup.add(lockLoop);

    const lockBodyGeo = new THREE.BoxGeometry(0.2, 0.15, 0.04);
    const lockBody = new THREE.Mesh(lockBodyGeo, lockLoopMat);
    lockBody.position.set(0, 0.23, 0.13);
    emblemGroup.add(lockBody);

    shieldGroup.add(emblemGroup);

    // Orbiting Protection Rings around Shield
    const ringGroup = new THREE.Group();
    shieldGroup.add(ringGroup);

    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.4,
      wireframe: true,
    });
    const ringGeo1 = new THREE.TorusGeometry(2.4, 0.02, 8, 60);
    const orbitRing1 = new THREE.Mesh(ringGeo1, ringMat1);
    orbitRing1.rotation.x = Math.PI / 2.8;
    ringGroup.add(orbitRing1);

    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0xf59e0b,
      transparent: true,
      opacity: 0.35,
      wireframe: true,
    });
    const ringGeo2 = new THREE.TorusGeometry(2.8, 0.015, 8, 60);
    const orbitRing2 = new THREE.Mesh(ringGeo2, ringMat2);
    orbitRing2.rotation.x = -Math.PI / 3.2;
    orbitRing2.rotation.y = Math.PI / 6;
    ringGroup.add(orbitRing2);

    // Floating Ambient Security Particles
    const particleCount = 140;
    const particlesGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const colorNavy = new THREE.Color(0x38bdf8);
    const colorRed = new THREE.Color(0xd91a23);
    const colorGold = new THREE.Color(0xf59e0b);
    const colorEmerald = new THREE.Color(0x10b981);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 9 - 1;

      const mix = Math.random();
      let c = colorNavy;
      if (mix > 0.75) c = colorRed;
      else if (mix > 0.5) c = colorGold;
      else if (mix > 0.25) c = colorEmerald;

      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    particlesGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particlesGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const particlesMat = new THREE.PointsMaterial({
      size: 0.12,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });

    const securityParticles = new THREE.Points(particlesGeo, particlesMat);
    scene.add(securityParticles);

    // Initial Shield Rotation
    shieldGroup.rotation.x = 0.15;
    shieldGroup.rotation.y = -0.3;

    // Mouse interactive targets (Cursor driven)
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", onMouseMove);

    // Scroll interactive targets
    let scrollY = 0;
    const onScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener("scroll", onScroll);

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse interpolation
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      // Scroll factor
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight || 1;
      const scrollPercent = scrollY / maxScroll;

      // Apply 3D Rotation to Shield
      shieldGroup.rotation.y = -0.3 + targetX * 0.5 + scrollPercent * Math.PI * 2;
      shieldGroup.rotation.x = 0.15 - targetY * 0.35 + Math.sin(elapsedTime * 0.8) * 0.05;

      // Gentle floating levitation
      shieldGroup.position.y = Math.sin(elapsedTime * 1.6) * 0.18;

      // Rotate protection rings
      orbitRing1.rotation.z = elapsedTime * 0.35;
      orbitRing2.rotation.z = -elapsedTime * 0.25;

      // Rotate particles
      securityParticles.rotation.y = elapsedTime * 0.025;
      securityParticles.rotation.x = elapsedTime * 0.015;

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      const w = currentContainer.clientWidth;
      const h = currentContainer.clientHeight || 500;

      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);

      if (currentContainer && renderer.domElement) {
        currentContainer.removeChild(renderer.domElement);
      }

      scene.clear();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="h-full w-full select-none"
      style={{ minHeight: "360px", maxHeight: "600px" }}
    />
  );
}
