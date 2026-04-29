"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Thumbs, FreeMode } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
// @ts-ignore
import "swiper/css";
// @ts-ignore
import "swiper/css/pagination";
// @ts-ignore
import "swiper/css/thumbs";
// @ts-ignore
import "swiper/css/free-mode";
import { useState } from "react";

const DIFF: Record<string, { label: string; dot: string; pill: string }> = {
  beginner: {
    label: "Beginner",
    dot: "bg-emerald-400",
    pill: "text-emerald-800 dark:text-emerald-200 bg-emerald-100/80 dark:bg-emerald-900/60 ring-emerald-300 dark:ring-emerald-700",
  },
  easy: {
    label: "Easy",
    dot: "bg-sky-400",
    pill: "text-sky-800 dark:text-sky-200 bg-sky-100/80 dark:bg-sky-900/60 ring-sky-300 dark:ring-sky-700",
  },
  medium: {
    label: "Medium",
    dot: "bg-amber-400",
    pill: "text-amber-800 dark:text-amber-200 bg-amber-100/80 dark:bg-amber-900/60 ring-amber-300 dark:ring-amber-700",
  },
  advance: {
    label: "Advanced",
    dot: "bg-rose-400",
    pill: "text-rose-800 dark:text-rose-200 bg-rose-100/80 dark:bg-rose-900/60 ring-rose-300 dark:ring-rose-700",
  },
};

export function ImageCarousel({
  images,
  title,
  difficulty,
}: {
  images: string[];
  title: string;
  difficulty: string;
}) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const diff = DIFF[difficulty] ?? DIFF.advance;

  return (
    <div className="mb-10">
      <div
        className="relative bg-[#eeeae4] dark:bg-[#1a1714] rounded-3xl p-3
          shadow-sm border border-[#e2ddd8] dark:border-[#35312c]
          transition-shadow duration-300 hover:shadow-lg dark:hover:shadow-black/40"
      >
        {/* Main image */}
        <div className="relative rounded-2xl overflow-hidden w-full aspect-square mb-3">
          <Swiper
            modules={[Pagination, Thumbs]}
            onSlideChange={(s) => setActiveIndex(s.activeIndex)}
            pagination={{
              clickable: true,
              bulletClass:
                "swiper-pagination-bullet !bg-white/50 !w-1.5 !h-1.5 !rounded-full !transition-all !duration-300",
              bulletActiveClass:
                "swiper-pagination-bullet-active !bg-white !w-5 !h-1.5 !rounded-full",
            }}
            thumbs={{ swiper: thumbsSwiper }}
            className="w-full h-full"
          >
            {images.map((img, i) => (
              <SwiperSlide key={i}>
                <div className="relative w-full h-full">
                  <Image
                    src={img}
                    alt={`${title} photo ${i + 1}`}
                    fill
                    className="object-cover transition-transform duration-700 scale-100 hover:scale-[1.02]"
                    priority={i === 0}
                  />
                  {/* Rich multi-stop gradient for depth */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/40 via-black/5 to-transparent pointer-events-none" />
                  {/* Subtle vignette */}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-40"
                    style={{
                      background:
                        "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.35) 100%)",
                    }}
                  />
                </div>
              </SwiperSlide>
            ))}

            {/* Difficulty badge */}
            <span
              className={`absolute top-3 left-3 z-10 text-[11px] font-bold px-3 py-1.5
                rounded-xl ring-1 backdrop-blur-md flex items-center gap-1.5
                shadow-sm ${diff.pill}`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${diff.dot} animate-pulse`}
              />
              {diff.label}
            </span>

            {/* Image counter */}
            {images.length > 1 && (
              <span
                className="absolute top-3 right-3 z-10 text-[11px] font-bold
                  px-2.5 py-1 rounded-xl
                  bg-black/30 text-white backdrop-blur-md"
              >
                {activeIndex + 1} / {images.length}
              </span>
            )}
          </Swiper>
        </div>

        {/* Thumbnail strip */}
        {images.length > 1 && (
          <Swiper
            modules={[FreeMode, Thumbs]}
            onSwiper={setThumbsSwiper}
            freeMode
            watchSlidesProgress
            slidesPerView="auto"
            spaceBetween={8}
          >
            {images.map((img, i) => (
              <SwiperSlide
                key={i}
                style={{ width: 64, height: 64, flexShrink: 0 }}
              >
                <div
                  className={`w-full h-full rounded-xl overflow-hidden cursor-pointer
                    transition-all duration-200 ring-2
                    ${
                      activeIndex === i
                        ? "opacity-100 ring-[#1a1714] dark:ring-[#f0ede8] scale-[1.04]"
                        : "opacity-50 ring-transparent hover:opacity-70 hover:scale-[1.02]"
                    }`}
                >
                  <Image
                    src={img}
                    alt=""
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
}
