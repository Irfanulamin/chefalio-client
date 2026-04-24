"use client";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import {
  motion,
  useMotionValue,
  useAnimationFrame,
  cubicBezier,
} from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export const Banner = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const floatY = useMotionValue(0);
  const floatRotate = useMotionValue(0);

  useAnimationFrame((t) => {
    floatY.set(Math.sin(t / 1600) * 14);
    floatRotate.set(Math.sin(t / 2400) * 2.5);
  });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const slideUp = {
    hidden: { y: 40, opacity: 0, filter: "blur(6px)" },
    visible: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: { duration: 0.7, ease: cubicBezier(0.22, 1, 0.36, 1) },
    },
  };

  const slideLeft = {
    hidden: { x: -60, opacity: 0, filter: "blur(8px)" },
    visible: {
      x: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: { duration: 0.75, ease: cubicBezier(0.22, 1, 0.36, 1) },
    },
  };

  return (
    <motion.section
      id="banner"
      ref={sectionRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
      className="relative pt-2 md:pt-8 pb-10 md:pb-20 bg-[radial-gradient(ellipse_200%_100%_at_bottom_left,#E6F3B8,#fff_66%)] dark:bg-[radial-gradient(ellipse_200%_100%_at_bottom_left,#C8E17A,#000_66%)] overflow-hidden h-[calc(100dvh-120px)] flex items-center"
    >
      <motion.div
        className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-primary/10 blur-3xl pointer-events-none"
        animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.65, 0.4] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-10 right-10 w-64 h-64 rounded-full bg-primary/5 blur-2xl pointer-events-none"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5,
        }}
      />

      <div className="container mx-auto px-4">
        <div className="md:flex items-center">
          <motion.div
            className="md:w-280"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={slideUp} className="mb-4">
              <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-primary bg-primary/10 px-3 py-1.5 rounded-full border border-primary/20">
                <motion.span
                  className="w-1.5 h-1.5 rounded-full bg-primary"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                New recipes every day
              </span>
            </motion.div>

            <motion.h1
              variants={slideLeft}
              className="text-xl md:text-2xl lg:text-3xl xl:text-5xl font-bold tracking-tighter bg-linear-to-b dark:from-white from-black to-primary bg-clip-text text-transparent"
            >
              PRECISION IN EVERY RECIPE. CONFIDENCE IN EVERY DISH.
            </motion.h1>

            <motion.p
              variants={slideUp}
              className="text-base lg:text-xl text-muted-foreground dark:text-white/80 tracking-tight mt-6"
            >
              Join our community of food lovers and explore a world of delicious
              recipes. Whether you&apos;re a seasoned chef or just starting out,
              Chefalio has something for everyone! Discover new flavors, share
              your own creations, and connect with fellow food enthusiasts. From
              quick weeknight meals to gourmet feasts, your next favorite recipe
              is just a click away!
            </motion.p>

            <motion.div
              variants={slideUp}
              className="mt-6 flex items-center gap-4"
            >
              <Button className="group" size="lg">
                Get Started
                <motion.span
                  className="inline-flex"
                  animate={{ x: [0, 3, 0] }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <ArrowRightIcon size={18} />
                </motion.span>
              </Button>
            </motion.div>
            <motion.div
              variants={slideUp}
              className="mt-8 flex items-center gap-3"
            >
              <div className="flex -space-x-2">
                {[
                  "https://res.cloudinary.com/djgwnvlrb/image/upload/v1776520734/profile_pictures/dinswstuu3n8kywxcyik.jpg",
                  "https://res.cloudinary.com/djgwnvlrb/image/upload/v1775778681/profile_pictures/nhsmxspcuf66rmg5xlsv.jpg",
                  "https://res.cloudinary.com/djgwnvlrb/image/upload/v1775778506/profile_pictures/xkc4ykbvoxgjlqbobyxa.jpg",
                  "https://res.cloudinary.com/djgwnvlrb/image/upload/v1775778337/profile_pictures/wbdbvjrzxwuee9p2vt7x.jpg",
                ].map((src, i) => (
                  <motion.div
                    key={i}
                    className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + i * 0.08, duration: 0.4 }}
                  >
                    <Image
                      src={src}
                      alt="Chef"
                      width={40}
                      height={40}
                      className="w-10 h-10 object-cover grayscale rounded-full"
                    />
                  </motion.div>
                ))}
              </div>
              <motion.p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">100+</span>{" "}
                chefs already cooking
              </motion.p>
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.85, filter: "blur(12px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{
              duration: 0.9,
              delay: 0.45,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            Hi
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};
