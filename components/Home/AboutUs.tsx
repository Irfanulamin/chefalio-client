"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView, cubicBezier } from "framer-motion";

function StatCard({
  number,
  label,
  delay,
}: {
  number: string;
  label: string;
  delay: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.88, y: 20 }}
      animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: cubicBezier(0.22, 1, 0.36, 1), delay }}
      whileHover={{ y: -10, transition: { duration: 0.25 } }}
      className="relative flex flex-col items-center justify-center rounded-2xl border border-black/10 bg-black/5 dark:border-white/10 dark:bg-white/5 backdrop-blur-sm px-8 py-6 text-center overflow-hidden group"
    >
      <span className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-linear-to-br from-primary/10 to-amber-400/5 pointer-events-none" />
      <span className="text-4xl font-bold tracking-tight text-black dark:text-white">
        {number}
      </span>
      <span className="mt-1 text-sm text-black/50 dark:text-white/50 font-medium uppercase tracking-widest">
        {label}
      </span>
    </motion.div>
  );
}

export const AboutUs = () => {
  const missionRef = useRef(null);
  const valuesRef = useRef(null);
  const passionRef = useRef(null);

  const missionInView = useInView(missionRef, { once: true, margin: "-100px" });
  const valuesInView = useInView(valuesRef, { once: true, margin: "-100px" });
  const passionInView = useInView(passionRef, { once: true, margin: "-100px" });

  const STATS = [
    { number: "120+", label: "Recipes shared" },
    { number: "40+", label: "Countries" },
    { number: "20+", label: "Pro chefs" },
    { number: "4.8★", label: "App rating" },
  ];

  const VALUES = [
    {
      icon: "◆",
      title: "Accessibility first",
      body: "Cooking should never feel intimidating. We design every feature so beginners and professionals alike feel right at home.",
    },
    {
      icon: "◈",
      title: "Community-driven",
      body: "Our platform grows with its users. Every review, tip, and remix makes the whole network smarter and more inspiring.",
    },
    {
      icon: "✦",
      title: "Radical transparency",
      body: "Ingredient sourcing, nutritional data, chef credentials — we surface the information that lets you cook with confidence.",
    },
  ];

  return (
    <div id="about" className="w-full overflow-hidden">
      <section
        className="relative mx-auto max-w-6xl px-6 pt-14 md:pt-28 pb-12 md:pb-24"
        ref={passionRef}
      >
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={passionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.05]"
        >
          Where passion
          <br />
          <span className="text-primary">meets the plate</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={passionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mx-auto mt-6 max-w-xl text-center text-lg text-black/70 dark:text-white/70 leading-relaxed"
        >
          Chefalio connects millions of food lovers with world-class chefs —
          making extraordinary cooking accessible to everyone, everywhere.
        </motion.p>
      </section>

      <section className="relative mx-auto max-w-5xl px-6 pb-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map((s, i) => (
            <StatCard key={s.label} {...s} delay={i * 0.08} />
          ))}
        </div>
      </section>

      <section
        ref={missionRef}
        className="relative mx-auto max-w-6xl px-6 pb-32"
      >
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={missionInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-95 hidden md:block"
          >
            <div className="absolute top-12 left-12 right-0 bottom-0 rounded-3xl border border-black/5 dark:border-white/5 bg-black/2 dark:bg-white/2 rotate-6" />
            <div className="absolute top-6 left-6 right-0 bottom-0 rounded-3xl border border-black/8 dark:border-white/8 bg-black/3 dark:bg-white/3 rotate-3" />

            <div className="absolute inset-0 rounded-3xl border border-black/10 dark:border-white/10 bg-linear-to-br from-black/6 dark:from-white/6 to-black/2 dark:to-white/2 p-8 flex flex-col justify-between">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary text-xs">
                  ✦
                </div>
                <span className="text-black/40 dark:text-white/40 text-sm font-medium">
                  Chefalio · Mission
                </span>
              </div>

              <div>
                <p className="text-2xl font-semibold leading-snug text-black/90 dark:text-white/90">
                  &quot;We believe the best meals begin with{" "}
                  <span className="text-primary">curiosity</span> and end with{" "}
                  <span className="text-primary">connection</span>.&quot;
                </p>

                <div className="mt-6 flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full overflow-hidden bg-primary/20">
                    <Image
                      src="https://res.cloudinary.com/djgwnvlrb/image/upload/v1776530583/about-us_mrtdt2.png"
                      width={36}
                      height={36}
                      alt="founder"
                      className="object-cover"
                    />
                  </div>

                  <div>
                    <p className="text-sm font-medium text-black dark:text-white/80">
                      Sofia Anderson
                    </p>
                    <p className="text-xs text-black/40 dark:text-white/40">
                      Co-founder & Head Chef
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={missionInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">
              Our mission
            </span>

            <h2 className="mt-3 text-4xl md:text-5xl font-bold leading-tighter tracking-tight">
              Revolutionising how the world{" "}
              <span className="text-primary">discovers food</span>
            </h2>

            <p className="mt-5 text-base text-black/50 dark:text-white/50 leading-relaxed">
              At Chefalio, we&apos;re passionate about bridging the gap between
              professional kitchens and home cooks. Our platform pairs
              intelligent discovery with a vibrant global community — so whether
              you&apos;re perfecting a ramen broth or planning a weeknight
              dinner, inspiration is always one tap away.
            </p>

            <p className="mt-4 text-base text-black/50 dark:text-white/50 leading-relaxed">
              Every feature we build starts with a single question: does this
              make cooking more joyful? If the answer is yes, we ship it.
            </p>
          </motion.div>
        </div>
      </section>

      <section
        ref={valuesRef}
        className="relative mx-auto max-w-6xl px-6 pb-32"
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={valuesInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            What drives us
          </span>
          <h2 className="mt-3 text-4xl font-bold">Our core values</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {VALUES.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 32 }}
              animate={valuesInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
                delay: i * 0.1,
              }}
              whileHover={{ y: -10, transition: { duration: 0.25 } }}
              className="group relative rounded-2xl border border-black/8 dark:border-white/8 bg-black/3 dark:bg-white/3 p-7 cursor-default overflow-hidden"
            >
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-linear-to-br from-primary/8 to-transparent pointer-events-none" />

              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 text-primary text-lg">
                {v.icon}
              </div>

              <h3 className="text-lg font-semibold text-black dark:text-white">
                {v.title}
              </h3>

              <p className="mt-2 text-sm text-black/50 dark:text-white/50 leading-relaxed">
                {v.body}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};
