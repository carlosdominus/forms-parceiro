import { liquidMetalFragmentShader, ShaderMount } from "@paper-design/shaders";
import { Sparkles } from "lucide-react";
import type React from "react";
import { useEffect, useMemo, useRef, useState } from "react";

export interface LiquidMetalButtonProps {
  label?: string;
  onClick?: (e?: React.MouseEvent) => void;
  href?: string;
  type?: "button" | "submit" | "reset";
  viewMode?: "text" | "icon";
  icon?: React.ReactNode;
  className?: string;
  target?: string;
  rel?: string;
  width?: number;
}

export function LiquidMetalButton({
  label = "Get Started",
  onClick,
  href,
  type = "submit",
  viewMode = "text",
  icon,
  className = "",
  target,
  rel,
  width: customWidth,
}: LiquidMetalButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [ripples, setRipples] = useState<
    Array<{ x: number; y: number; id: number }>
  >([]);
  const shaderRef = useRef<HTMLDivElement>(null);
  const shaderMount = useRef<any>(null);
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const rippleId = useRef(0);

  const calculatedWidth = useMemo(() => {
    if (customWidth) return customWidth;
    if (viewMode === "icon") return 48;
    const estimated = label.length * 9.5 + 56;
    return Math.max(160, Math.min(480, Math.round(estimated)));
  }, [customWidth, viewMode, label]);

  const dimensions = useMemo(() => {
    if (viewMode === "icon") {
      return {
        width: 48,
        height: 48,
        innerWidth: 44,
        innerHeight: 44,
        shaderWidth: 48,
        shaderHeight: 48,
      };
    } else {
      return {
        width: calculatedWidth,
        height: 48,
        innerWidth: calculatedWidth - 4,
        innerHeight: 44,
        shaderWidth: calculatedWidth,
        shaderHeight: 48,
      };
    }
  }, [viewMode, calculatedWidth]);

  useEffect(() => {
    const styleId = "shader-canvas-style-exploded";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.textContent = `
        .shader-container-exploded canvas {
          width: 100% !important;
          height: 100% !important;
          display: block !important;
          position: absolute !important;
          top: 0 !important;
          left: 0 !important;
          border-radius: 100px !important;
        }
        @keyframes ripple-animation {
          0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 0.6;
          }
          100% {
            transform: translate(-50%, -50%) scale(4);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }

    const loadShader = async () => {
      try {
        if (shaderRef.current) {
          if (shaderMount.current?.destroy) {
            shaderMount.current.destroy();
            shaderMount.current = null;
          }

          shaderRef.current.innerHTML = "";

          const mount = new ShaderMount(
            shaderRef.current,
            liquidMetalFragmentShader,
            {
              u_repetition: 4,
              u_softness: 0.5,
              u_shiftRed: 0.25,
              u_shiftBlue: 0.35,
              u_distortion: 0.05,
              u_contour: 0,
              u_angle: 45,
              u_scale: 6,
              u_shape: 0,
              u_offsetX: 0.1,
              u_offsetY: -0.1,
            },
            undefined,
            0.6
          );
          shaderMount.current = mount;
        }
      } catch (error) {
        console.error("Failed to load liquid metal shader:", error);
      }
    };

    const timer = setTimeout(() => {
      loadShader();
    }, 30);

    return () => {
      clearTimeout(timer);
      if (shaderMount.current?.destroy) {
        shaderMount.current.destroy();
        shaderMount.current = null;
      }
    };
  }, [dimensions.shaderWidth, dimensions.shaderHeight, label]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    shaderMount.current?.setSpeed?.(1.2);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsPressed(false);
    shaderMount.current?.setSpeed?.(0.6);
  };

  const handleClick = (e: React.MouseEvent<any>) => {
    if (shaderMount.current?.setSpeed) {
      shaderMount.current.setSpeed(2.4);
      setTimeout(() => {
        if (isHovered) {
          shaderMount.current?.setSpeed?.(1.2);
        } else {
          shaderMount.current?.setSpeed?.(0.6);
        }
      }, 300);
    }

    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const ripple = { x, y, id: rippleId.current++ };

      setRipples((prev) => [...prev, ripple]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== ripple.id));
      }, 600);
    }

    onClick?.(e);
  };

  const Element = href ? "a" : "button";

  return (
    <div className={`relative inline-flex justify-center max-w-full select-none ${className}`}>
      <div
        style={{
          position: "relative",
          width: `${dimensions.width}px`,
          maxWidth: "100%",
          height: `${dimensions.height}px`,
          transition: "width 0.4s ease, height 0.4s ease",
        }}
      >
        {/* Outer Liquid Metal Shader Canvas Background (Z-index 10) */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            maxWidth: "100%",
            height: `${dimensions.height}px`,
            zIndex: 10,
            borderRadius: "100px",
            boxShadow: isPressed
              ? "0px 0px 0px 1px rgba(65, 242, 10, 0.5), 0px 1px 2px 0px rgba(0, 0, 0, 0.3)"
              : isHovered
              ? "0px 0px 0px 1px rgba(65, 242, 10, 0.6), 0px 12px 20px 0px rgba(65, 242, 10, 0.25)"
              : "0px 0px 0px 1px rgba(255, 255, 255, 0.15), 0px 9px 12px 0px rgba(0, 0, 0, 0.4)",
            transition: "box-shadow 0.3s ease, transform 0.2s ease",
            transform: isPressed ? "scale(0.97)" : "scale(1)",
          }}
        >
          <div
            ref={shaderRef}
            className="shader-container-exploded"
            style={{
              borderRadius: "100px",
              overflow: "hidden",
              position: "relative",
              width: "100%",
              maxWidth: "100%",
              height: `${dimensions.shaderHeight}px`,
            }}
          />
        </div>

        {/* Inner Dark Capsule Backing (Z-index 20) */}
        <div
          style={{
            position: "absolute",
            top: "2px",
            left: "2px",
            right: "2px",
            bottom: "2px",
            borderRadius: "100px",
            background: isHovered
              ? "linear-gradient(180deg, #182a12 0%, #060e03 100%)"
              : "linear-gradient(180deg, #1a1a1a 0%, #050505 100%)",
            border: "1px solid rgba(65, 242, 10, 0.35)",
            boxShadow: isHovered ? "0 0 15px rgba(65, 242, 10, 0.3)" : "none",
            zIndex: 20,
            pointerEvents: "none",
            transition: "background 0.3s ease, border-color 0.3s ease",
          }}
        />

        {/* Interactive Button / Anchor with Label & Icon directly inside (Z-index 30) */}
        <Element
          ref={buttonRef as any}
          type={Element === "button" ? type : undefined}
          href={href}
          target={target}
          rel={rel}
          onClick={handleClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseDown={() => setIsPressed(true)}
          onMouseUp={() => setIsPressed(false)}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            maxWidth: "100%",
            height: `${dimensions.height}px`,
            background: "transparent",
            border: "none",
            cursor: "pointer",
            outline: "none",
            zIndex: 30,
            overflow: "hidden",
            borderRadius: "100px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            textDecoration: "none",
            transform: isPressed ? "scale(0.97)" : "scale(1)",
            transition: "transform 0.2s ease",
          }}
          aria-label={label}
        >
          {/* Label / Icon Content inside button */}
          {viewMode === "icon" && (
            icon || <Sparkles size={18} className="text-[#41F20A] drop-shadow-[0_1px_4px_rgba(65,242,10,0.6)]" />
          )}
          {viewMode === "text" && (
            <>
              <span
                style={{
                  fontSize: "12px",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: isHovered ? "#FFFFFF" : "#41F20A",
                  fontWeight: 800,
                  textShadow: "0px 2px 4px rgba(0, 0, 0, 0.95), 0px 0px 10px rgba(65, 242, 10, 0.4)",
                  transition: "color 0.3s ease",
                  whiteSpace: "nowrap",
                  zIndex: 35,
                }}
              >
                {label}
              </span>
              {icon}
            </>
          )}

          {/* Ripple effect */}
          {ripples.map((ripple) => (
            <span
              key={ripple.id}
              style={{
                position: "absolute",
                left: `${ripple.x}px`,
                top: `${ripple.y}px`,
                width: "20px",
                height: "20px",
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(65, 242, 10, 0.7) 0%, rgba(65, 242, 10, 0) 70%)",
                pointerEvents: "none",
                animation: "ripple-animation 0.6s ease-out",
              }}
            />
          ))}
        </Element>
      </div>
    </div>
  );
}
