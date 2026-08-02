import { useEffect, useRef, useState } from "react";
import { AnimatedText } from "./ui/AnimatedText";

export default function Dobra8WavingFlag() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [textureLoaded, setTextureLoaded] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);

  // Interaction coordinates and impulse strength
  const pointerRef = useRef({ x: -1000, y: -1000, strength: 0, targetStrength: 0 });

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Grid resolution
    const isMobile = window.innerWidth < 640;
    const COLS = isMobile ? 18 : 22;
    const ROWS = isMobile ? 12 : 14;

    // Offscreen Canvas for generating the flag cloth texture image
    const textureCanvas = document.createElement("canvas");
    const TEX_WIDTH = 1200;
    const TEX_HEIGHT = 700;
    textureCanvas.width = TEX_WIDTH;
    textureCanvas.height = TEX_HEIGHT;
    const texCtx = textureCanvas.getContext("2d");

    // Pre-render Flag Design onto offscreen canvas texture
    if (texCtx) {
      // 1. Dark Clean Premium Canvas
      const bgGrad = texCtx.createLinearGradient(0, 0, TEX_WIDTH, TEX_HEIGHT);
      bgGrad.addColorStop(0, "#080b06");
      bgGrad.addColorStop(0.5, "#000000");
      bgGrad.addColorStop(1, "#080b06");
      texCtx.fillStyle = bgGrad;
      texCtx.fillRect(0, 0, TEX_WIDTH, TEX_HEIGHT);

      // 2. Subtle Green Glow Center Beam
      const beamGrad = texCtx.createRadialGradient(
        TEX_WIDTH / 2, TEX_HEIGHT / 2, 50,
        TEX_WIDTH / 2, TEX_HEIGHT / 2, 480
      );
      beamGrad.addColorStop(0, "rgba(65, 242, 10, 0.12)");
      beamGrad.addColorStop(0.5, "rgba(65, 242, 10, 0.03)");
      beamGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
      texCtx.fillStyle = beamGrad;
      texCtx.fillRect(0, 0, TEX_WIDTH, TEX_HEIGHT);

      // 3. Draw Dominus White Logo in Center
      const logoImg = new Image();
      logoImg.src = "https://dominus.site/image/logo-extensa-branca.webp";
      
      const renderLogoAndText = () => {
        const logoWidth = 580;
        const logoHeight = (logoImg.height / logoImg.width) * logoWidth || 160;
        const logoX = (TEX_WIDTH - logoWidth) / 2;
        const logoY = (TEX_HEIGHT - logoHeight) / 2 - 15;

        texCtx.save();
        texCtx.shadowColor = "rgba(65, 242, 10, 0.4)";
        texCtx.shadowBlur = 18;
        texCtx.drawImage(logoImg, logoX, logoY, logoWidth, logoHeight);
        texCtx.restore();

        // White Subtitle slogan in Space Grotesk directly below logo: "VENDER, CRESCER E DOMINAR"
        texCtx.fillStyle = "#FFFFFF";
        texCtx.font = "700 22px 'Space Grotesk', sans-serif";
        texCtx.textAlign = "center";
        texCtx.letterSpacing = "8px";
        texCtx.shadowColor = "rgba(0, 0, 0, 0.8)";
        texCtx.shadowBlur = 10;
        texCtx.fillText("VENDER, CRESCER E DOMINAR", TEX_WIDTH / 2, logoY + logoHeight + 42);

        setTextureLoaded(true);
      };

      logoImg.onload = () => {
        if (typeof document !== "undefined" && document.fonts && document.fonts.ready) {
          document.fonts.ready.then(renderLogoAndText).catch(renderLogoAndText);
        } else {
          renderLogoAndText();
        }
      };
    }

    // Grid vertices structure
    interface Vertex {
      baseX: number;
      baseY: number;
      x: number;
      y: number;
      u: number;
      v: number;
      pin: number;
    }

    let width = 0;
    let height = 0;
    let grid: Vertex[][] = [];
    let POLE_WIDTH = 5;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.25);
      
      width = rect.width;
      POLE_WIDTH = width < 640 ? 3 : 5;
      
      height = Math.min(rect.width * 0.55, 720);
      if (width < 640) {
        height = Math.min(rect.width * 0.65, 420);
      }

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);

      // Build grid mesh
      const flagMarginLeft = POLE_WIDTH + 18;
      const flagMarginTop = 25;
      const flagWidth = width - flagMarginLeft - 20;
      const flagHeight = height - flagMarginTop * 2;

      grid = [];
      for (let r = 0; r <= ROWS; r++) {
        const rowArr: Vertex[] = [];
        const v = r / ROWS;
        const baseY = flagMarginTop + v * flagHeight;

        for (let c = 0; c <= COLS; c++) {
          const u = c / COLS;
          const baseX = flagMarginLeft + u * flagWidth;
          const pin = Math.pow(u, 1.2);

          rowArr.push({
            baseX,
            baseY,
            x: baseX,
            y: baseY,
            u: u * TEX_WIDTH,
            v: v * TEX_HEIGHT,
            pin,
          });
        }
        grid.push(rowArr);
      }
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    resize();

    // Helper to draw textured triangle on 2D Canvas
    const drawTexturedTriangle = (
      p0: { x: number; y: number },
      p1: { x: number; y: number },
      p2: { x: number; y: number },
      t0: { u: number; v: number },
      t1: { u: number; v: number },
      t2: { u: number; v: number },
      lightFactor: number
    ) => {
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(p0.x, p0.y);
      ctx.lineTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.closePath();
      ctx.clip();

      const delta = t0.u * (t1.v - t2.v) - t1.u * (t0.v - t2.v) + t2.u * (t0.v - t1.v);
      if (Math.abs(delta) > 0.0001) {
        const a = (p0.x * (t1.v - t2.v) - p1.x * (t0.v - t2.v) + p2.x * (t0.v - t1.v)) / delta;
        const b = (t0.u * (p1.x - p2.x) - t1.u * (p0.x - p2.x) + t2.u * (p0.x - p1.x)) / delta;
        const c = p0.x - a * t0.u - b * t0.v;

        const d = (p0.y * (t1.v - t2.v) - p1.y * (t0.v - t2.v) + p2.y * (t0.v - t1.v)) / delta;
        const e = (t0.u * (p1.y - p2.y) - t1.u * (p0.y - p2.y) + t2.u * (p0.y - p1.y)) / delta;
        const f = p0.y - d * t0.u - e * t0.v;

        ctx.transform(a, d, b, e, c, f);
        ctx.drawImage(textureCanvas, 0, 0);
      }

      ctx.restore();

      if (Math.abs(lightFactor) > 0.01) {
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(p0.x, p0.y);
        ctx.lineTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.closePath();
        
        if (lightFactor > 0) {
          ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(0.28, lightFactor * 0.35)})`;
        } else {
          ctx.fillStyle = `rgba(0, 0, 0, ${Math.min(0.48, -lightFactor * 0.5)})`;
        }
        ctx.fill();
        ctx.restore();
      }
    };

    // Animation loop control via Intersection Observer (Pauses when offscreen)
    let animId: number | null = null;
    let isVisible = false;
    let startTime = performance.now();

    const render = (now: number) => {
      if (!isVisible) return;

      const time = (now - startTime) * 0.001;
      ctx.clearRect(0, 0, width, height);

      const ptr = pointerRef.current;
      ptr.strength += (ptr.targetStrength - ptr.strength) * 0.08;

      // 1. UPDATE GRID VERTICES (Rich organic wave math)
      for (let r = 0; r <= ROWS; r++) {
        for (let c = 0; c <= COLS; c++) {
          const pt = grid[r][c];
          const pin = pt.pin;

          const primaryWave = Math.sin(c * 0.22 - time * 3.6) * 20 * pin;
          const secondaryWave = Math.sin(c * 0.14 + r * 0.18 - time * 2.5) * 10 * pin;
          const tertiaryWave = Math.cos(r * 0.28 - time * 3.5) * 5 * pin;
          const horizWave = Math.cos(c * 0.16 - time * 2.8) * 7 * pin;

          let interactOffset = 0;
          if (ptr.strength > 0.001) {
            const dx = pt.baseX - ptr.x;
            const dy = pt.baseY - ptr.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const radius = 180;

            if (dist < radius) {
              const normDist = dist / radius;
              const ripple = Math.sin(normDist * Math.PI * 3.0 - time * 8) * (1 - normDist);
              interactOffset = ripple * 32 * pin * ptr.strength;
            }
          }

          pt.x = pt.baseX + horizWave;
          pt.y = pt.baseY + primaryWave + secondaryWave + tertiaryWave + interactOffset;
        }
      }

      // 2. DRAW MESH TRIANGLES
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const p00 = grid[r][c];
          const p10 = grid[r][c + 1];
          const p11 = grid[r + 1][c + 1];
          const p01 = grid[r + 1][c];

          const dy = p10.y - p00.y;
          const dx = p10.x - p00.x;
          const slope = dx !== 0 ? dy / dx : 0;
          const lightFactor = slope * 1.1;

          drawTexturedTriangle(
            { x: p00.x, y: p00.y },
            { x: p10.x, y: p10.y },
            { x: p01.x, y: p01.y },
            { u: p00.u, v: p00.v },
            { u: p10.u, v: p10.v },
            { u: p01.u, v: p01.v },
            lightFactor
          );

          drawTexturedTriangle(
            { x: p10.x, y: p10.y },
            { x: p11.x, y: p11.y },
            { x: p01.x, y: p01.y },
            { u: p10.u, v: p10.v },
            { u: p11.u, v: p11.v },
            { u: p01.u, v: p01.v },
            lightFactor
          );
        }
      }

      // 3. DRAW SUBTLE GREEN BORDER ALONG TOP AND BOTTOM EDGES OF FLAG
      ctx.save();
      ctx.strokeStyle = "rgba(65, 242, 10, 0.6)";
      ctx.lineWidth = 1.5;
      ctx.shadowColor = "rgba(65, 242, 10, 0.4)";
      ctx.shadowBlur = 5;

      // Top Edge
      ctx.beginPath();
      for (let c = 0; c <= COLS; c++) {
        const pt = grid[0][c];
        if (c === 0) ctx.moveTo(pt.x, pt.y);
        else ctx.lineTo(pt.x, pt.y);
      }
      ctx.stroke();

      // Bottom Edge
      ctx.beginPath();
      for (let c = 0; c <= COLS; c++) {
        const pt = grid[ROWS][c];
        if (c === 0) ctx.moveTo(pt.x, pt.y);
        else ctx.lineTo(pt.x, pt.y);
      }
      ctx.stroke();
      ctx.restore();

      // 4. DRAW SLEEK METALLIC FLAGPOLE ON LEFT
      const poleX = POLE_WIDTH + 3;
      const poleTop = 15;
      const poleBottom = height - 15;

      const poleGrad = ctx.createLinearGradient(poleX - POLE_WIDTH, 0, poleX, 0);
      poleGrad.addColorStop(0, "#111111");
      poleGrad.addColorStop(0.3, "#E5E5E5");
      poleGrad.addColorStop(0.6, "#FFFFFF");
      poleGrad.addColorStop(0.8, "#888888");
      poleGrad.addColorStop(1, "#111111");

      ctx.fillStyle = poleGrad;
      ctx.beginPath();
      if (typeof ctx.roundRect === "function") {
        ctx.roundRect(poleX - POLE_WIDTH, poleTop, POLE_WIDTH, poleBottom - poleTop, 2);
      } else {
        ctx.rect(poleX - POLE_WIDTH, poleTop, POLE_WIDTH, poleBottom - poleTop);
      }
      ctx.fill();

      // Glowing Green LED Cap on top of pole
      ctx.save();
      ctx.fillStyle = "#41F20A";
      ctx.shadowColor = "#41F20A";
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.arc(poleX - POLE_WIDTH / 2, poleTop - 2, Math.max(3.5, POLE_WIDTH), 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Silver mounting rings
      ctx.fillStyle = "#BBBBBB";
      const topRingY = grid[0][0].y;
      const bottomRingY = grid[ROWS][0].y;

      ctx.beginPath();
      ctx.arc(poleX - POLE_WIDTH / 2, topRingY, Math.max(2, POLE_WIDTH / 2), 0, Math.PI * 2);
      ctx.arc(poleX - POLE_WIDTH / 2, bottomRingY, Math.max(2, POLE_WIDTH / 2), 0, Math.PI * 2);
      ctx.fill();

      animId = requestAnimationFrame(render);
    };

    // IntersectionObserver to start/stop loop when visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
          if (isVisible) {
            if (!animId) {
              animId = requestAnimationFrame(render);
            }
          } else {
            if (animId) {
              cancelAnimationFrame(animId);
              animId = null;
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (animId) cancelAnimationFrame(animId);
      observer.disconnect();
      resizeObserver.disconnect();
    };
  }, []);

  const handlePointerMove = (clientX: number, clientY: number) => {
    if (typeof window !== "undefined" && window.innerWidth < 768) return;
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    pointerRef.current.x = x;
    pointerRef.current.y = y;
    pointerRef.current.targetStrength = 1.0;
    setIsInteracting(true);
  };

  const handlePointerLeave = () => {
    if (typeof window !== "undefined" && window.innerWidth < 768) return;
    pointerRef.current.targetStrength = 0;
    setIsInteracting(false);
  };

  return (
    <section 
      ref={sectionRef as any}
      className="relative w-full bg-black py-16 sm:py-24 px-4 border-t border-zinc-900/80 overflow-hidden" 
      id="bandeira-interativa"
    >
      {/* Background ambient green glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] max-w-[750px] h-[350px] bg-[#41F20A]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-full mx-auto space-y-8 sm:space-y-10 relative z-10 px-2 sm:px-6">
        
        {/* Section Header with Glowing Interactive Highlight Text */}
        <div className="text-center space-y-4 max-w-4xl mx-auto">
          <AnimatedText
            as="h2"
            text="O movimento não para"
            highlights={["não para"]}
            className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white font-heading"
          />
          
          <AnimatedText
            as="p"
            text="Não hasteamos bandeira por vaidade. Hasteamos para dizer que este terreno é nosso."
            highlights={["terreno é nosso"]}
            className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed max-w-4xl mx-auto font-sans font-medium"
            initialDelayMs={150}
          />
        </div>

        {/* Waving Flag Canvas Stage */}
        <div 
          ref={containerRef}
          className="relative w-full max-w-7xl mx-auto flex justify-center items-center cursor-grab active:cursor-grabbing select-none my-2 sm:my-4 touch-pan-y"
          onMouseMove={(e) => handlePointerMove(e.clientX, e.clientY)}
          onMouseLeave={handlePointerLeave}
        >
          <canvas 
            ref={canvasRef} 
            className="block w-full max-w-full drop-shadow-[0_25px_50px_rgba(0,0,0,0.95)]"
          />
        </div>

      </div>
    </section>
  );
}
