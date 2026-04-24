"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const MoonIcon = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="#EEFABD" />
  </svg>
);

const SunIcon = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="4" fill="#111a05" />
    <g stroke="#111a05" strokeWidth="2.2" strokeLinecap="round">
      <line x1="12" y1="2" x2="12" y2="4" />
      <line x1="12" y1="20" x2="12" y2="22" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="2" y1="12" x2="4" y2="12" />
      <line x1="20" y1="12" x2="22" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </g>
  </svg>
);

export const ToggleThemeButton = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = !mounted ? true : theme !== "light";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      role="switch"
      aria-checked={isDark}
      aria-label="Toggle theme"
      style={{
        position: "relative",
        width: 52,
        height: 28,
        borderRadius: 14,
        border: `1px solid ${isDark ? "#a7d129" : "#2a3a0a"}`,
        background: isDark ? "#1a2e05" : "#111a05",
        boxShadow: isDark
          ? "0 0 0 3px rgba(167,209,41,0.2), inset 0 1px 0 rgba(167,209,41,0.1)"
          : "none",
        cursor: "pointer",
        padding: 0,
        transition:
          "background 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease",
      }}
    >
      <span
        style={{
          position: "absolute",
          top: 4,
          left: 4,
          width: 20,
          height: 20,
          borderRadius: "50%",
          background: isDark
            ? "linear-gradient(135deg, #c8f047, #a7d129)"
            : "#1e2a08",
          border: `1px solid ${isDark ? "#b8e030" : "#3a4a10"}`,
          boxShadow: isDark ? "0 2px 10px rgba(167,209,41,0.5)" : "none",
          transform: isDark ? "translateX(24px)" : "translateX(0)",
          transition:
            "transform 0.38s cubic-bezier(0.34,1.42,0.64,1), background 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            position: "absolute",
            display: "flex",
            opacity: isDark ? 0 : 1,
            transform: isDark
              ? "scale(0.6) rotate(30deg)"
              : "scale(1) rotate(0deg)",
            transition: "opacity 0.2s ease, transform 0.2s ease",
          }}
        >
          <MoonIcon />
        </span>
        <span
          style={{
            position: "absolute",
            display: "flex",
            opacity: isDark ? 1 : 0,
            transform: isDark
              ? "scale(1) rotate(0deg)"
              : "scale(0.6) rotate(-30deg)",
            transition: "opacity 0.2s ease, transform 0.2s ease",
          }}
        >
          <SunIcon />
        </span>
      </span>
    </button>
  );
};
