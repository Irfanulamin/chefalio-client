"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";

interface AuthLayoutProps {
  imageSrc: string;
  imageAlt: string;
  children: React.ReactNode;
}

export default function AuthLayout({
  imageSrc,
  imageAlt,
  children,
}: AuthLayoutProps) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

  // check if already cached on mount
  useLayoutEffect(() => {
    if (imgRef.current?.complete) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLoaded(true);
    }
  }, []);

  return (
    <div
      className="relative min-h-[90vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-white dark:bg-zinc-950 [--grid-color:rgba(0,0,0,0.12)] dark:[--grid-color:rgba(255,255,255,0.08)]"
      style={{
        backgroundImage: `
          linear-gradient(var(--grid-color) 1px, transparent 1px),
          linear-gradient(90deg, var(--grid-color) 1px, transparent 1px)
        `,
        backgroundSize: "50px 50px",
      }}
    >
      <div className="absolute inset-x-0 top-0 h-32 bg-linear-to-b from-white dark:from-zinc-950 to-transparent pointer-events-none z-10" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-white dark:from-zinc-950 to-transparent pointer-events-none z-10" />

      <div className="relative">
        <div
          className="absolute -inset-1.5 rounded-[20px] blur-xl opacity-70"
          style={{
            background:
              "conic-gradient(from var(--angle2), transparent 35%, rgba(167,209,41,0.55) 48%, rgba(167,209,41,0.85) 50%, rgba(167,209,41,0.55) 52%, transparent 65%)",
            animation: "spin 3s linear infinite",
          }}
        />
        <div
          className="relative p-0.5 rounded-2xl"
          style={{
            background:
              "conic-gradient(from var(--angle), transparent 30%, #A7D129 45%, #EEFABD 50%, #616F39 55%, transparent 70%)",
            animation: "spin 3s linear infinite",
          }}
        >
          <div className="relative flex w-full lg:w-225 max-w-4xl bg-white dark:bg-zinc-950 rounded-[14px] overflow-hidden">
            {/* Image panel */}
            <div className="hidden md:flex md:w-1/2 min-w-70 bg-gray-100 dark:bg-zinc-800 items-center justify-center min-h-100 relative overflow-hidden">
              {!loaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-zinc-700 animate-pulse" />
                </div>
              )}
              <Image
                ref={imgRef}
                src={imageSrc}
                alt={imageAlt}
                fill
                priority
                className={`object-cover object-center transition-opacity duration-500 ${
                  loaded ? "opacity-100" : "opacity-0"
                }`}
                onLoad={() => setLoaded(true)}
                onError={() => setLoaded(true)}
              />
            </div>

            {/* Form panel */}
            <div className="flex w-full md:w-1/2 items-center justify-center px-4 sm:px-6 md:px-8 py-8 sm:py-10 md:py-12 relative">
              <div
                className="absolute inset-x-0 top-0 h-24 rounded-t-[14px] pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse 70% 60% at 50% 0%, rgba(167,209,41,0.12) 0%, transparent 100%)",
                }}
              />
              <div className="w-full max-w-md space-y-6">{children}</div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @property --angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }
        @property --angle2 {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }
        @keyframes spin {
          to { --angle: 360deg; --angle2: 360deg; }
        }
      `}</style>
    </div>
  );
}
