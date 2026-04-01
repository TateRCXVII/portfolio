"use client";

import { useState, useRef, useEffect, useCallback } from "react";

// Floating image placeholder data
const floatingImages = [
  { x: -30, y: -20, z: 100, size: 120 },
  { x: 60, y: 30, z: 200, size: 100 },
  { x: -50, y: 50, z: 150, size: 90 },
  { x: 40, y: -40, z: 250, size: 110 },
  { x: -60, y: 10, z: 300, size: 80 },
  { x: 20, y: 60, z: 180, size: 95 },
];

// Gradient palettes for the image placeholders
const gradients = [
  "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
  "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
  "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
];

// Frame scales for the concentric 3D room effect
const frameScales = [0.95, 0.8, 0.65, 0.5, 0.35];

// TypewriterText component
function TypewriterText({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed("");
    setDone(false);
    let index = 0;
    const interval = setInterval(() => {
      index++;
      setDisplayed(text.slice(0, index));
      if (index >= text.length) {
        clearInterval(interval);
        setDone(true);
      }
    }, 35);
    return () => clearInterval(interval);
  }, [text]);

  // Blink cursor after typing is done
  useEffect(() => {
    if (!done) return;
    const blink = setInterval(() => {
      setCursorVisible((v) => !v);
    }, 530);
    return () => clearInterval(blink);
  }, [done]);

  return (
    <span>
      {displayed}
      <span
        style={{
          opacity: cursorVisible ? 1 : 0,
          borderRight: "2px solid rgba(255,255,255,0.8)",
          marginLeft: "2px",
          transition: "opacity 0.1s",
        }}
      >
        &nbsp;
      </span>
    </span>
  );
}

export default function WorkShowcaseCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  const [hoveredImage, setHoveredImage] = useState<number | null>(null);
  const [showResponse, setShowResponse] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    // Normalize to [-1, 1]
    setMouse({
      x: (e.clientX - cx) / (rect.width / 2),
      y: (e.clientY - cy) / (rect.height / 2),
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setMouse({ x: 0, y: 0 });
    setHovering(false);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setHovering(true);
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        width: "100%",
        height: "100%",
        minHeight: "280px",
        borderRadius: "16px",
        background: "linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 50%, #16213e 100%)",
        border: "1px solid rgba(255,255,255,0.08)",
        overflow: "hidden",
        position: "relative",
        cursor: "default",
        perspective: "1000px",
      }}
    >
      {/* 3D Room frames */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transformStyle: "preserve-3d",
          pointerEvents: "none",
        }}
      >
        {frameScales.map((scale, i) => {
          const depth = i * 20;
          const rotateX = mouse.y * -4 * (1 - i * 0.15);
          const rotateY = mouse.x * 4 * (1 - i * 0.15);
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                width: `${scale * 90}%`,
                height: `${scale * 85}%`,
                border: `1px solid rgba(255,255,255,${0.04 + i * 0.02})`,
                borderRadius: `${8 + i * 2}px`,
                transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${depth}px)`,
                transformStyle: "preserve-3d",
                transition: "transform 0.1s ease-out",
                boxShadow: `inset 0 0 ${20 + i * 10}px rgba(100, 100, 255, ${0.02 + i * 0.01})`,
                background: `rgba(255,255,255,${0.005 * (i + 1)})`,
              }}
            />
          );
        })}
      </div>

      {/* Floating image placeholders */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
        }}
      >
        {floatingImages.map((img, i) => {
          const depthFactor = img.z / 300;
          const parallaxX = mouse.x * depthFactor * (hovering ? 30 : 18);
          const parallaxY = mouse.y * depthFactor * (hovering ? 30 : 18);
          const bobAmount = 0;
          const isHovered = hoveredImage === i;

          return (
            <div
              key={i}
              onMouseEnter={() => setHoveredImage(i)}
              onMouseLeave={() => setHoveredImage(null)}
              style={{
                position: "absolute",
                width: `${img.size}px`,
                height: `${img.size * 0.65}px`,
                left: `calc(50% + ${img.x}px + ${parallaxX}px)`,
                top: `calc(50% + ${img.y}px + ${parallaxY + bobAmount}px)`,
                transform: `translate(-50%, -50%) scale(${isHovered ? 1.12 : 1})`,
                background: gradients[i],
                borderRadius: "8px",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                boxShadow: isHovered
                  ? `0 0 24px rgba(150, 150, 255, 0.6), 0 8px 24px rgba(0,0,0,0.4)`
                  : `0 4px 16px rgba(0,0,0,0.3)`,
                pointerEvents: "auto",
                cursor: "pointer",
                opacity: 0.85,
              }}
            />
          );
        })}
      </div>

      {/* Center content: "Who are you?" button and typewriter response */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "16px",
          zIndex: 10,
          pointerEvents: "none",
        }}
      >
        <button
          onClick={() => setShowResponse(true)}
          style={{
            pointerEvents: "auto",
            background: "white",
            color: "#0f0f1a",
            border: "none",
            borderRadius: "9999px",
            padding: "10px 24px",
            fontSize: "14px",
            fontWeight: 600,
            cursor: "pointer",
            boxShadow: "0 4px 20px rgba(255,255,255,0.15)",
            transition: "transform 0.15s ease, box-shadow 0.15s ease",
            letterSpacing: "0.01em",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.05)";
            (e.currentTarget as HTMLButtonElement).style.boxShadow =
              "0 6px 28px rgba(255,255,255,0.25)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
            (e.currentTarget as HTMLButtonElement).style.boxShadow =
              "0 4px 20px rgba(255,255,255,0.15)";
          }}
        >
          Who are you?
        </button>

        {showResponse && (
          <div
            style={{
              pointerEvents: "none",
              background: "rgba(255,255,255,0.07)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: "12px",
              padding: "10px 18px",
              fontSize: "13px",
              color: "rgba(255,255,255,0.9)",
              fontFamily: "monospace",
              maxWidth: "240px",
              textAlign: "center",
              lineHeight: 1.5,
            }}
          >
            <TypewriterText text="I build things for the web." />
          </div>
        )}
      </div>

      {/* Subtle label */}
      <div
        style={{
          position: "absolute",
          bottom: "14px",
          left: "18px",
          fontSize: "11px",
          color: "rgba(255,255,255,0.25)",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          zIndex: 10,
          pointerEvents: "none",
        }}
      >
        Work Showcase
      </div>
    </div>
  );
}
