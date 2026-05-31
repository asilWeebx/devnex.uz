"use client";
import { useTheme } from "../context/ThemeContext";

interface Props {
  height?: number;
  /** override color (e.g. always-white in dark footer) */
  forceColor?: string;
}

export default function DevnexLogo({ height = 24, forceColor }: Props) {
  const { isDark } = useTheme();
  const color = forceColor ?? (isDark ? "#FFFFFF" : "#0A0C10");

  // Triangle geometry — inverted ▽ replacing the "V"
  const sw   = Math.max(2.2, height * 0.138);   // stroke width
  const triW = height * 0.78;                    // triangle width
  const triH = height * 0.72;                    // triangle height
  const pad  = sw / 2;

  // Points: top-left, top-right, bottom-center (pointing down)
  const pts = [
    `${pad},${pad}`,
    `${triW - pad},${pad}`,
    `${triW / 2},${triH - pad}`,
  ].join(" ");

  const svgW   = triW + sw;
  const svgH   = height;
  const vShift = (height - triH) / 2;  // vertically center the triangle in the cap-height box

  const letterStyle: React.CSSProperties = {
    fontFamily  : "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    fontWeight  : 900,
    fontSize    : height,
    lineHeight  : 1,
    letterSpacing: "0.05em",
    color,
    textTransform: "uppercase",
    userSelect  : "none",
  };

  return (
    <div style={{ display:"flex", alignItems:"center", gap: height * 0.04 }}>
      <span style={letterStyle}>DE</span>

      {/* Inverted hollow triangle — replaces the V */}
      <svg
        width={svgW}
        height={svgH}
        viewBox={`0 0 ${svgW} ${svgH}`}
        overflow="visible"
        style={{ display:"block", flexShrink: 0 }}
      >
        <g transform={`translate(${sw / 2}, ${vShift})`}>
          <polygon
            points={pts}
            fill="none"
            stroke={color}
            strokeWidth={sw}
            strokeLinejoin="miter"
            strokeMiterlimit={10}
          />
        </g>
      </svg>

      <span style={letterStyle}>NEX</span>
    </div>
  );
}
