import React, { useEffect, useRef, useState } from "react";
import { Sparkles, RefreshCw } from "lucide-react";

interface Vector2D {
  x: number;
  y: number;
}

class Particle {
  pos: Vector2D = { x: 0, y: 0 };
  vel: Vector2D = { x: 0, y: 0 };
  acc: Vector2D = { x: 0, y: 0 };
  target: Vector2D = { x: 0, y: 0 };

  closeEnoughTarget = 60;
  maxSpeed = 9.0;
  maxForce = 0.45;
  particleSize = 1.5;
  isKilled = false;

  startColor = { r: 65, g: 242, b: 10 };
  targetColor = { r: 255, g: 255, b: 255 };
  currentColor = { r: 65, g: 242, b: 10 };
  colorWeight = 0;
  colorBlendRate = 0.02;

  constructor(startX: number, startY: number) {
    this.pos = { x: startX, y: startY };
  }

  move(mouseX: number, mouseY: number) {
    // 1. Target Attraction Physics
    const towardsTarget = {
      x: this.target.x - this.pos.x,
      y: this.target.y - this.pos.y,
    };

    const distance = Math.sqrt(
      towardsTarget.x * towardsTarget.x + towardsTarget.y * towardsTarget.y
    );
    let proximityMult = 1.0;

    if (distance < this.closeEnoughTarget) {
      proximityMult = distance / this.closeEnoughTarget;
    }

    if (distance > 0) {
      towardsTarget.x = (towardsTarget.x / distance) * this.maxSpeed * proximityMult;
      towardsTarget.y = (towardsTarget.y / distance) * this.maxSpeed * proximityMult;
    }

    const steer = {
      x: towardsTarget.x - this.vel.x,
      y: towardsTarget.y - this.vel.y,
    };

    const steerMagnitude = Math.sqrt(steer.x * steer.x + steer.y * steer.y);
    if (steerMagnitude > this.maxForce) {
      steer.x = (steer.x / steerMagnitude) * this.maxForce;
      steer.y = (steer.y / steerMagnitude) * this.maxForce;
    }

    this.acc.x += steer.x;
    this.acc.y += steer.y;

    // 2. Interactive Mouse Repulsion Physics
    const dx = this.pos.x - mouseX;
    const dy = this.pos.y - mouseY;
    const distToMouse = Math.sqrt(dx * dx + dy * dy);
    
    if (distToMouse < 90) {
      const forceMult = (90 - distToMouse) / 90;
      const angle = Math.atan2(dy, dx);
      // Inject strong outward burst acceleration
      this.acc.x += Math.cos(angle) * forceMult * 12.0;
      this.acc.y += Math.sin(angle) * forceMult * 12.0;
    }

    // Apply motion
    this.vel.x += this.acc.x;
    this.vel.y += this.acc.y;
    // Apply friction to slow down and settle nicely
    this.vel.x *= 0.88;
    this.vel.y *= 0.88;
    
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;

    // Reset forces
    this.acc.x = 0;
    this.acc.y = 0;
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.colorWeight < 1.0) {
      this.colorWeight = Math.min(this.colorWeight + this.colorBlendRate, 1.0);
    }

    this.currentColor.r = Math.round(
      this.startColor.r + (this.targetColor.r - this.startColor.r) * this.colorWeight
    );
    this.currentColor.g = Math.round(
      this.startColor.g + (this.targetColor.g - this.startColor.g) * this.colorWeight
    );
    this.currentColor.b = Math.round(
      this.startColor.b + (this.targetColor.b - this.startColor.b) * this.colorWeight
    );

    ctx.fillStyle = `rgb(${this.currentColor.r}, ${this.currentColor.g}, ${this.currentColor.b})`;
    ctx.fillRect(this.pos.x, this.pos.y, this.particleSize, this.particleSize);
  }

  kill(magX: number, magY: number) {
    this.target.x = magX;
    this.target.y = magY;
    this.targetColor = { r: 10, g: 30, b: 20 };
    this.colorWeight = 0;
    this.isKilled = true;
  }
}

const SVG_PATH_DOMINUS = "M 24.32 146.98 C23.11,146.50 21.65,145.22 21.07,144.12 C20.36,142.81 20.00,128.44 20.00,101.85 L 20.00 61.56 L 14.22 67.28 C7.77,73.66 4.26,74.63 1.56,70.78 C0.32,69.01 0.00,65.51 -0.00,53.52 L -0.00 38.48 L 19.00 19.50 L 38.00 0.52 L 54.00 16.50 L 70.00 32.48 L 86.00 16.50 L 102.00 0.52 L 121.00 19.50 L 140.00 38.48 L 140.00 54.09 C140.00,67.93 139.79,69.88 138.17,71.35 C134.88,74.33 131.92,73.36 125.78,67.28 L 120.00 61.56 L 120.00 102.71 L 120.00 143.85 L 117.37 145.93 C115.92,147.07 114.03,148.00 113.17,148.00 C112.31,148.00 102.35,138.78 91.04,127.51 L 70.47 107.03 L 50.48 126.92 C39.49,137.86 29.60,147.04 28.50,147.33 C27.40,147.62 25.52,147.46 24.32,146.98 ZM 54.25 108.61 L 64.00 99.56 L 64.00 70.55 L 64.00 41.53 L 51.77 29.26 C45.04,22.52 39.07,17.00 38.50,17.00 C37.94,17.00 31.49,22.99 24.18,30.32 L 10.88 43.64 L 11.19 49.06 L 11.50 54.47 L 21.16 45.73 C26.48,40.93 31.09,37.00 31.41,37.00 C31.74,37.00 32.00,57.75 32.00,83.11 L 32.00 129.22 L 38.25 123.44 C41.69,120.26 48.89,113.59 54.25,108.61 ZM 109.24 83.12 L 109.50 37.24 L 119.00 45.66 L 128.50 54.09 L 128.81 48.86 L 129.12 43.63 L 115.56 30.07 L 102.01 16.52 L 89.00 29.50 L 76.00 42.47 L 76.04 70.99 L 76.08 99.50 L 91.79 114.19 C100.43,122.27 107.83,128.90 108.24,128.94 C108.65,128.97 109.10,108.35 109.24,83.12 ZM 291.27 108.99 C282.03,107.07 276.70,102.76 274.14,95.10 C273.46,93.08 273.00,84.70 273.00,74.48 C273.00,55.13 273.94,50.72 279.23,45.27 C285.32,38.98 288.20,38.50 320.00,38.50 C345.10,38.50 349.06,38.72 353.19,40.31 C358.94,42.53 364.47,48.44 366.16,54.19 C367.87,60.01 367.82,88.97 366.09,95.00 C364.54,100.38 359.10,105.94 353.45,107.93 C348.79,109.57 298.22,110.43 291.27,108.99 ZM 342.84 93.59 C347.54,91.15 348.50,87.95 348.50,74.60 C348.50,54.12 346.96,52.67 324.59,52.16 C303.99,51.68 299.45,52.35 295.30,56.50 L 292.00 59.80 L 292.00 73.35 C292.00,95.12 291.77,94.94 319.80,94.97 C335.39,94.99 340.73,94.67 342.84,93.59 ZM 666.67 107.61 C660.06,105.78 656.94,103.28 654.00,97.45 C651.55,92.60 651.49,91.95 651.18,66.25 L 650.85 40.00 L 660.43 40.00 L 670.00 40.00 L 670.00 63.45 C670.00,78.86 670.39,87.76 671.14,89.40 C673.22,93.97 677.35,95.00 693.50,95.00 C704.49,95.00 708.99,94.62 711.36,93.50 C717.29,90.68 717.47,89.85 717.81,63.25 L 718.13 39.00 L 720.92 39.00 C722.45,39.00 726.47,39.29 729.85,39.64 L 736.00 40.28 L 736.00 64.46 C736.00,90.78 735.19,96.24 730.48,101.84 C725.52,107.73 722.04,108.41 695.50,108.69 C677.87,108.88 670.22,108.59 666.67,107.61 ZM 762.15 107.47 C759.20,106.66 755.48,105.05 753.87,103.91 C750.17,101.27 747.00,95.11 747.00,90.54 L 747.00 87.00 L 755.98 87.00 C764.63,87.00 764.98,87.09 765.57,89.41 C765.90,90.73 767.29,92.87 768.67,94.16 C771.10,96.44 771.61,96.50 790.05,96.50 C808.38,96.50 809.01,96.43 811.22,94.22 C812.91,92.54 813.50,90.79 813.50,87.51 C813.50,79.64 813.35,79.59 786.22,78.86 C750.20,77.89 748.01,76.74 748.00,58.90 C748.00,50.59 748.30,48.84 750.26,45.90 C754.76,39.15 757.50,38.54 785.16,38.16 C811.47,37.80 818.92,38.58 823.46,42.15 C826.83,44.80 828.79,48.72 829.18,53.57 L 829.50 57.50 L 820.32 57.79 C811.17,58.07 811.14,58.06 809.82,55.32 C807.62,50.73 804.86,50.03 788.90,50.01 C773.70,50.00 768.64,50.93 766.98,54.04 C765.36,57.06 765.86,61.86 768.00,64.00 C769.85,65.85 771.35,66.00 788.25,66.02 C825.98,66.06 831.50,68.89 831.50,88.18 C831.50,99.62 830.27,102.05 822.45,106.00 C817.61,108.45 816.96,108.50 792.50,108.73 C772.91,108.91 766.34,108.64 762.15,107.47 ZM 173.24 73.75 L 173.50 39.50 L 209.00 39.50 C244.00,39.50 244.57,39.54 249.63,41.82 C260.95,46.94 263.00,51.93 263.00,74.26 C263.00,92.21 262.10,96.69 257.53,101.53 C251.91,107.50 248.09,108.00 208.31,108.00 L 172.97 108.00 L 173.24 73.75 ZM 239.65 91.07 C244.12,88.34 245.30,83.87 244.83,71.29 C244.45,60.91 244.40,60.75 241.20,57.89 L 237.97 55.00 L 214.98 55.00 L 192.00 55.00 L 192.00 74.00 L 192.00 93.00 L 214.25 93.00 C234.42,92.99 236.79,92.81 239.65,91.07 ZM 380.24 73.75 L 380.50 39.50 L 396.50 39.50 L 412.50 39.50 L 415.11 44.50 C416.55,47.25 422.12,57.99 427.49,68.37 L 437.24 87.24 L 449.68 63.12 L 462.12 39.00 L 478.06 39.00 L 494.00 39.00 L 494.00 73.50 L 494.00 108.00 L 485.52 108.00 L 477.03 108.00 L 476.77 79.87 L 476.50 51.73 L 460.63 79.87 L 444.75 108.00 L 437.13 107.98 L 429.50 107.95 L 413.50 79.49 L 397.50 51.02 L 397.23 79.51 L 396.97 108.00 L 388.47 108.00 L 379.97 108.00 L 380.24 73.75 ZM 510.00 73.46 L 510.00 38.92 L 518.75 39.21 L 527.50 39.50 L 527.76 73.75 L 528.03 108.00 L 519.01 108.00 L 510.00 108.00 L 510.00 73.46 ZM 544.24 73.75 L 544.50 39.50 L 559.66 39.22 L 574.81 38.95 L 597.16 67.22 L 619.50 95.49 L 619.77 67.21 L 620.03 38.92 L 628.27 39.21 L 636.50 39.50 L 636.76 73.75 L 637.03 108.00 L 621.19 108.00 L 605.35 108.00 L 584.07 80.99 C572.36,66.14 562.38,53.74 561.89,53.43 C561.38,53.12 561.00,64.55 561.00,80.44 L 561.00 108.00 L 552.49 108.00 L 543.97 108.00 L 544.24 73.75 ZM 46.00 69.50 L 46.00 40.61 L 49.50 44.00 L 53.00 47.39 L 53.00 69.50 L 53.00 91.61 L 49.50 95.00 L 46.00 98.39 L 46.00 69.50 ZM 90.69 95.20 L 88.00 92.39 L 88.00 69.38 L 88.00 46.37 L 91.00 43.50 L 94.00 40.63 L 94.00 69.31 C94.00,85.09 93.86,98.00 93.69,98.00 C93.51,98.00 92.16,96.74 90.69,95.20 Z";

export default function Dobra7LogoAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);
  const hasTriggeredRef = useRef(false);

  // Keep mouse tracking reactive
  const mouseRef = useRef({ x: -2000, y: -2000 });
  const [isPlaying, setIsPlaying] = useState(false);

  // Initialize and assemble particles
  const nextLogoLayout = (canvas: HTMLCanvasElement) => {
    // Width and height details (centered with extra large scale factor)
    const scale = 1.30;
    const logotypeWidth = 832 * scale;
    const logotypeHeight = 148 * scale;
    const offsetX = (canvas.width - logotypeWidth) / 2;
    // Position offset y to center properly
    const offsetY = (canvas.height - logotypeHeight) / 2;

    // Create offscreen canvas to sample pixels
    const offCanvas = document.createElement("canvas");
    offCanvas.width = canvas.width;
    offCanvas.height = canvas.height;
    const offCtx = offCanvas.getContext("2d");
    if (!offCtx) return;

    // Draw Dominus SVG Path on offscreen canvas
    offCtx.save();
    offCtx.translate(offsetX, offsetY);
    offCtx.scale(scale, scale);
    offCtx.fillStyle = "white";
    
    // We use Path2D to render vector SVG inside HTML5 Canvas cleanly
    const path = new Path2D(SVG_PATH_DOMINUS);
    offCtx.fill(path);
    offCtx.restore();

    // Scan the pixel coordinates
    const imageData = offCtx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;

    const currentParticles = particlesRef.current;
    let particleIdx = 0;

    // Increase coordinate density for sharp assembly
    const pixelSteps = 3; 
    const coordsIndices: number[] = [];

    for (let i = 0; i < pixels.length; i += pixelSteps * 4) {
      coordsIndices.push(i);
    }

    // Shuffle layout pixels to create fluid, floating assemble entry
    for (let i = coordsIndices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [coordsIndices[i], coordsIndices[j]] = [coordsIndices[j], coordsIndices[i]];
    }

    // Process scanned active white shapes
    for (const pIndex of coordsIndices) {
      const alpha = pixels[pIndex + 3];

      if (alpha > 40) {
        const x = (pIndex / 4) % canvas.width;
        const y = Math.floor(pIndex / 4 / canvas.width);

        let particle: Particle;

        // If particle already exists, reuse it to prevent garbage collection spikes
        if (particleIdx < currentParticles.length) {
          particle = currentParticles[particleIdx];
          particle.isKilled = false;
          particleIdx++;
        } else {
          // Spawn particle distributed widely in space
          const spawnAngle = Math.random() * Math.PI * 2;
          const spawnRadius = canvas.width * 0.4 + Math.random() * 200;
          const spawnX = canvas.width / 2 + Math.cos(spawnAngle) * spawnRadius;
          const spawnY = canvas.height / 2 + Math.sin(spawnAngle) * spawnRadius;

          particle = new Particle(spawnX, spawnY);
          
          // Tune physical properties for elegant gather motion
          particle.maxSpeed = Math.random() * 5 + 4;
          particle.maxForce = particle.maxSpeed * 0.04;
          particle.colorBlendRate = Math.random() * 0.015 + 0.005;

          currentParticles.push(particle);
          particleIdx++;
        }

        // Set target coordinate
        particle.target.x = x;
        particle.target.y = y;

        // Visual Luxury Blend Design: Glow-Green (#41F20A) on left, pure-white on right
        const xFactor = (x - offsetX) / logotypeWidth;
        particle.startColor = { r: 15, g: 60, b: 5 }; // initial deep dark tactical green
        
        // Define color gradient target (Dominus Signature Brand)
        particle.targetColor = {
          r: Math.round(65 + (255 - 65) * xFactor),
          g: Math.round(242 + (255 - 242) * xFactor),
          b: Math.round(10 + (255 - 10) * xFactor),
        };
        particle.colorWeight = 0;
      }
    }

    // Terminate/fade spare particles if any
    for (let i = particleIdx; i < currentParticles.length; i++) {
      currentParticles[i].kill(canvas.width / 2, canvas.height / 2);
    }

    setIsPlaying(true);
  };

  const disperseParticles = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    particlesRef.current.forEach((p) => {
      // Disperse outward in a wave
      const angle = Math.random() * Math.PI * 2;
      const burstMag = Math.random() * 25 + 15;
      p.vel.x = Math.cos(angle) * burstMag;
      p.vel.y = Math.sin(angle) * burstMag;
      p.colorWeight = 0;
    });
  };

  // Main high-performance frame render loop
  const animate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Apply high-end velocity blur decay
    ctx.fillStyle = "rgba(0,0,0,0.18)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const particles = particlesRef.current;
    const mouse = mouseRef.current;

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.move(mouse.x, mouse.y);
      p.draw(ctx);

      // Clean dead out of bounds particles
      if (p.isKilled && p.pos.y > canvas.height) {
        particles.splice(i, 1);
      }
    }

    animationRef.current = requestAnimationFrame(animate);
  };

  // Setup intersection observer to catch when section enters the user's focus viewport
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasTriggeredRef.current) {
            hasTriggeredRef.current = true;
            
            const canvas = canvasRef.current;
            if (canvas) {
              nextLogoLayout(canvas);
            }
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, []);

  // Window canvas setup
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = 1200;
    canvas.height = 360;

    animate();

    // Mouse Movement Listeners
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;

      // Track relative scaled mouse coordinates on interactive Canvas layout
      mouseRef.current.x = (e.clientX - rect.left) * scaleX;
      mouseRef.current.y = (e.clientY - rect.top) * scaleY;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = -2000;
      mouseRef.current.y = -2000;
    };

    // Add mobile touch-interaction so tablet and mobile users get the same feeling
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        mouseRef.current.x = (touch.clientX - rect.left) * scaleX;
        mouseRef.current.y = (touch.clientY - rect.top) * scaleY;
      }
    };

    const handleTouchEnd = () => {
      mouseRef.current.x = -2000;
      mouseRef.current.y = -2000;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    canvas.addEventListener("touchmove", handleTouchMove, { passive: true });
    canvas.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      canvas.removeEventListener("touchmove", handleTouchMove);
      canvas.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative text-white py-14 md:py-24 border-t border-zinc-900 overflow-hidden select-none"
      id="assinatura-dominus"
    >
      {/* Absolute layout backdrop glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-emerald-950/15 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 relative z-10 text-center space-y-8">
        
        {/* Subtle high-concept badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#41F20A]/10 border border-[#41F20A]/20 text-[#41F20A] text-[10px] md:text-xs font-bold tracking-widest rounded-full font-sans">
          <Sparkles size={11} className="animate-spin-slow" />
          Estrutura de grupo integrada
        </div>

        <div className="space-y-3 max-w-2xl mx-auto">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight leading-tight text-white">
            Nossa assinatura de escala
          </h2>
          <p className="font-sans text-xs text-zinc-400 max-w-lg mx-auto leading-relaxed">
            Passe o cursor sobre o nosso emblema para desestruturar as partículas de capital e vê-las retornar instantaneamente ao vetor de faturamento.
          </p>
        </div>

        {/* High performance Canvas viewport (without container styling, logo sits cleanly in open space, and is now much larger) */}
        <div className="relative flex justify-center items-center max-w-6xl mx-auto overflow-hidden group">
          
          <canvas
            ref={canvasRef}
            className="w-full h-auto cursor-crosshair block bg-transparent animate-fade-in"
            style={{ maxWidth: "100%", height: "auto" }}
          />

          {/* Interactive Scatter Trigger overlay */}
          <div className="absolute bottom-4 right-4 z-20">
            <button
              onClick={disperseParticles}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900/90 hover:bg-zinc-800 text-[10px] font-sans font-black tracking-wider uppercase border border-white/10 hover:border-white/20 text-zinc-300 rounded-full transition active:scale-95 cursor-pointer backdrop-blur"
            >
              <RefreshCw size={11} />
              Re-dispersar Partículas
            </button>
          </div>

          {/* Ambient Corner status rails (Anti-AI slop but sleek human decoration) */}
          <div className="absolute top-4 left-6 hidden sm:block text-[9px] text-zinc-500 font-mono tracking-widest uppercase">
            Dominus Group Incorporated
          </div>
          <div className="absolute top-4 right-6 hidden sm:block text-[9px] text-[#41F20A] font-mono tracking-widest font-semibold flex items-center gap-1 uppercase">
            <span className="w-1.5 h-1.5 bg-[#41F20A] rounded-full inline-block animate-ping" />
            Vetor Ativo
          </div>
        </div>

        <p className="text-[10px] font-mono text-zinc-500 tracking-wide">
          CONSTRUIDO EM MATRIZ DE DEPLOY DE ALTA ENTROPALIA PARA O GRUPO DOMINUS
        </p>

      </div>
    </div>
  );
}
