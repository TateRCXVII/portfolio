"use client";

import { useMemo } from "react";

interface Location {
  city: string;
  lat: number;
  lng: number;
  label: string;
}

interface DotMatrixMapProps {
  locations?: Location[];
  className?: string;
  showPath?: boolean;
  animate?: boolean;
}

// Convert lat/lng to SVG coordinates
function latLngToSvg(lat: number, lng: number): [number, number] {
  const x = ((lng + 180) / 360) * 500;
  const y = ((90 - lat) / 180) * 300;
  return [x, y];
}

// Check if a point falls within simplified continental bounds
function isOnContinent(lat: number, lng: number): boolean {
  // North America
  if (lat >= 25 && lat <= 70 && lng >= -170 && lng <= -50) return true;
  // South America
  if (lat >= -55 && lat <= 15 && lng >= -82 && lng <= -35) return true;
  // Europe
  if (lat >= 35 && lat <= 72 && lng >= -10 && lng <= 40) return true;
  // Africa
  if (lat >= -35 && lat <= 37 && lng >= -18 && lng <= 52) return true;
  // Asia
  if (lat >= 5 && lat <= 75 && lng >= 40 && lng <= 145) return true;
  // Australia
  if (lat >= -45 && lat <= -10 && lng >= 110 && lng <= 155) return true;
  return false;
}

export default function DotMatrixMap({
  locations = [],
  className = "",
  showPath = false,
  animate = false,
}: DotMatrixMapProps) {
  // Generate continent dots
  const dots = useMemo(() => {
    const result: { x: number; y: number; delay: number }[] = [];
    for (let lat = -55; lat <= 75; lat += 4) {
      for (let lng = -170; lng <= 155; lng += 5) {
        if (isOnContinent(lat, lng)) {
          const [x, y] = latLngToSvg(lat, lng);
          const delay = (x / 500) * 1.5; // wave delay based on x position
          result.push({ x, y, delay });
        }
      }
    }
    return result;
  }, []);

  // Build curved path connecting all locations
  const pathD = useMemo(() => {
    if (!showPath || locations.length < 2) return null;
    const points = locations.map((loc) => latLngToSvg(loc.lat, loc.lng));
    let d = `M ${points[0][0]} ${points[0][1]}`;
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const curr = points[i];
      const cpX = (prev[0] + curr[0]) / 2;
      const cpY = Math.min(prev[1], curr[1]) - 20;
      d += ` Q ${cpX} ${cpY} ${curr[0]} ${curr[1]}`;
    }
    return d;
  }, [locations, showPath]);

  // Approximate path length for stroke-dashoffset animation
  const pathLength = 800;

  return (
    <svg
      viewBox="0 0 500 300"
      className={className}
      style={{ width: "100%", height: "100%" }}
      aria-label="World map showing experience locations"
    >
      <defs>
        {/* Pulse animation for location pins */}
        <style>{`
          @keyframes dotWaveIn {
            from { opacity: 0; transform: scale(0); }
            to { opacity: 1; transform: scale(1); }
          }
          @keyframes pulseRing {
            0% { r: 4; opacity: 0.8; }
            100% { r: 10; opacity: 0; }
          }
          @keyframes drawPath {
            from { stroke-dashoffset: ${pathLength}; }
            to { stroke-dashoffset: 0; }
          }
          .location-label {
            transition: font-size 0.2s ease;
          }
          .location-group:hover .location-label {
            font-size: 8px;
          }
        `}</style>
      </defs>

      {/* Continent dots */}
      {dots.map((dot, i) => (
        <circle
          key={i}
          cx={dot.x}
          cy={dot.y}
          r={1.25}
          fill="#444"
          style={
            animate
              ? {
                  animation: `dotWaveIn 0.4s ease forwards`,
                  animationDelay: `${dot.delay}s`,
                  opacity: 0,
                  transformOrigin: `${dot.x}px ${dot.y}px`,
                }
              : { opacity: 1 }
          }
        />
      ))}

      {/* Connection path */}
      {showPath && pathD && (
        <path
          d={pathD}
          fill="none"
          stroke="#22c55e"
          strokeWidth={1}
          strokeOpacity={0.5}
          strokeDasharray={pathLength}
          strokeDashoffset={0}
          style={
            animate
              ? {
                  animation: `drawPath 2s ease forwards`,
                  animationDelay: "1.5s",
                  strokeDashoffset: pathLength,
                }
              : {}
          }
        />
      )}

      {/* Location pins */}
      {locations.map((loc, i) => {
        const [x, y] = latLngToSvg(loc.lat, loc.lng);
        const isLast = i === locations.length - 1;
        const pinColor = isLast ? "#22c55e" : "#eab308";

        return (
          <g key={loc.city} className="location-group" style={{ cursor: "default" }}>
            {/* Pulse ring */}
            <circle cx={x} cy={y} r={4} fill="none" stroke={pinColor} strokeWidth={1}>
              <animate
                attributeName="r"
                from="4"
                to="10"
                dur="2s"
                repeatCount="indefinite"
                begin={`${i * 0.5}s`}
              />
              <animate
                attributeName="opacity"
                from="0.8"
                to="0"
                dur="2s"
                repeatCount="indefinite"
                begin={`${i * 0.5}s`}
              />
            </circle>

            {/* Pin dot */}
            <circle cx={x} cy={y} r={3} fill={pinColor} />

            {/* Label */}
            <text
              x={x + 5}
              y={y - 4}
              fontSize={6}
              fill="#d1d5db"
              fontFamily="monospace"
              className="location-label"
            >
              {loc.city}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
