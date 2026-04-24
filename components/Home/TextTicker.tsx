"use client";

import { motion } from "framer-motion";

export const TextTicker = () => {
  const text =
    "Discover Amazing Recipes • Cook Like a Pro • Share Your Culinary Creations • Explore Premium Cookbooks • Join the Chefalio Community • Master the Art of Cooking • Fresh Ideas for Every Kitchen • ";

  return (
    <section className="py-10 overflow-hidden">
      <div className="relative">
        <div className="absolute left-0 top-0 h-full w-24 z-10 pointer-events-none bg-linear-to-r from-white dark:from-gray-950 to-transparent" />
        <div className="absolute right-0 top-0 h-full w-24 z-10 pointer-events-none bg-linear-to-l from-white dark:from-gray-950 to-transparent" />

        <div className="flex overflow-hidden">
          <motion.div
            className="flex gap-8 flex-none font-medium tracking-wide text-3xl text-black dark:text-white"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 40,
              ease: "linear",
              repeat: Infinity,
            }}
          >
            {text.repeat(4)}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
