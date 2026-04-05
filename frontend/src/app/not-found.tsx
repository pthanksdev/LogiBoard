"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Home } from "lucide-react";
import * as THREE from "three";

export default function NotFoundPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Particle field — drifting "lost" stars
    const particleCount = 2000;
    const positions = new Float32Array(particleCount * 3);
    const velocities: number[] = [];
    const sizes = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 60;
      velocities.push(
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.01
      );
      sizes[i] = Math.random() * 2 + 0.5;
    }

    const particleGeom = new THREE.BufferGeometry();
    particleGeom.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeom.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    const particleMat = new THREE.PointsMaterial({
      color: new THREE.Color(0x4f6ef7),
      size: 0.25,
      transparent: true,
      opacity: 0.7,
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(particleGeom, particleMat);
    scene.add(particles);

    // Floating torus rings — representing broken routes
    const rings: THREE.Mesh[] = [];
    const ringColors = [0x2563eb, 0x4f46e5, 0x7c3aed, 0x6366f1];
    for (let i = 0; i < 4; i++) {
      const torusGeom = new THREE.TorusGeometry(
        3 + i * 2,
        0.08 + i * 0.04,
        16,
        100
      );
      const torusMat = new THREE.MeshBasicMaterial({
        color: ringColors[i % ringColors.length],
        transparent: true,
        opacity: 0.15 + i * 0.05,
        wireframe: false,
      });
      const torus = new THREE.Mesh(torusGeom, torusMat);
      torus.rotation.x = Math.random() * Math.PI;
      torus.rotation.y = Math.random() * Math.PI;
      torus.position.set(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 8,
        -5 - i * 3
      );
      scene.add(torus);
      rings.push(torus);
    }

    // Central wireframe sphere — the "void"
    const sphereGeom = new THREE.IcosahedronGeometry(5, 2);
    const sphereMat = new THREE.MeshBasicMaterial({
      color: 0x2563eb,
      wireframe: true,
      transparent: true,
      opacity: 0.08,
    });
    const sphere = new THREE.Mesh(sphereGeom, sphereMat);
    scene.add(sphere);

    // Mouse tracking
    const mouse = { x: 0, y: 0 };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    // Animation loop
    let frameId: number;
    let t = 0;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      t += 0.005;

      // Drift particles
      const pos = particleGeom.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        pos[i * 3] += velocities[i * 3];
        pos[i * 3 + 1] += velocities[i * 3 + 1];
        pos[i * 3 + 2] += velocities[i * 3 + 2];
        // Wrap around
        if (Math.abs(pos[i * 3]) > 50) pos[i * 3] *= -0.98;
        if (Math.abs(pos[i * 3 + 1]) > 50) pos[i * 3 + 1] *= -0.98;
        if (Math.abs(pos[i * 3 + 2]) > 30) pos[i * 3 + 2] *= -0.98;
      }
      particleGeom.attributes.position.needsUpdate = true;

      // Spin rings slowly
      rings.forEach((ring, i) => {
        ring.rotation.x += 0.003 * (i % 2 === 0 ? 1 : -1);
        ring.rotation.y += 0.002 * (i % 2 === 0 ? -1 : 1);
        ring.position.y = Math.sin(t + i) * 1.5;
      });

      // Breathe the sphere
      sphere.rotation.y += 0.002;
      sphere.rotation.x += 0.001;
      sphere.scale.setScalar(1 + Math.sin(t * 2) * 0.04);

      // Camera responds to mouse movement
      camera.position.x += (mouse.x * 5 - camera.position.x) * 0.04;
      camera.position.y += (mouse.y * 3 - camera.position.y) * 0.04;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      sphereGeom.dispose();
      sphereMat.dispose();
      particleGeom.dispose();
      particleMat.dispose();
    };
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-[#020617] overflow-hidden flex items-center justify-center">
      {/* Three.js canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* Gradient overlay for readability */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-[#020617]/80 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 text-center px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Giant 404 */}
          <h1 className="text-[180px] md:text-[260px] font-black leading-none tracking-tighter select-none"
            style={{
              background: "linear-gradient(135deg, #1e3a8a 0%, #2563eb 40%, #4f46e5 70%, #7c3aed 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              filter: "drop-shadow(0 0 60px rgba(37,99,235,0.4))",
            }}
          >
            404
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="space-y-4 -mt-4"
        >
          <h2 className="text-2xl md:text-4xl font-black text-white tracking-tight">
            Lost in the void.
          </h2>
          <p className="text-gray-400 font-medium text-base md:text-lg max-w-md mx-auto leading-relaxed">
            The route you&apos;re looking for doesn&apos;t exist. It may have been delivered, cancelled, or never dispatched.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
        >
          <Link href="/">
            <button className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-base transition-all shadow-lg shadow-blue-500/30 hover:scale-105 active:scale-95">
              <Home className="w-5 h-5" />
              Back to Home
            </button>
          </Link>
          <Link href="/dashboard">
            <button className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold text-base transition-all hover:bg-white/10 hover:scale-105 active:scale-95">
              <ArrowLeft className="w-5 h-5" />
              Go to Dashboard
            </button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
