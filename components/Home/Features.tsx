"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const features = [
  {
    title: "Recipes From Top Chefs",
    desc: "Discover exclusive recipes shared by professional chefs from around the world. Learn new cooking techniques and elevate your meals with expert guidance.",
    icon: "https://res.cloudinary.com/djgwnvlrb/image/upload/v1776530590/cog_rrkps7.png",
  },
  {
    title: "Advanced Recipe Filters",
    desc: "Quickly find recipes by filtering ingredients, cuisine type, dietary preferences, cooking time, and difficulty level.",
    icon: "https://res.cloudinary.com/djgwnvlrb/image/upload/v1776530590/noodle_ln5vc8.png",
  },
  {
    title: "Cookbook Marketplace",
    desc: "Browse and purchase curated cookbooks created by professional chefs. Explore collections of recipes organized into beautifully structured cookbooks.",
    icon: "https://res.cloudinary.com/djgwnvlrb/image/upload/v1776530590/cylinder_opmyav.png",
  },
  {
    title: "Secure Cookbook Purchases",
    desc: "Order digital cookbooks securely and access them anytime from your personal library.",
    icon: "https://res.cloudinary.com/djgwnvlrb/image/upload/v1776530590/spring_ueztxu.png",
  },
  {
    title: "Chef Recipe Publishing",
    desc: "Chefs can upload and publish their own recipes, share cooking instructions, and showcase their culinary expertise to a global audience.",
    icon: "https://res.cloudinary.com/djgwnvlrb/image/upload/v1776530591/tube_mlirz9.png",
  },
  {
    title: "Chef Cookbook Creation",
    desc: "Create and sell premium cookbooks by organizing multiple recipes into a single curated collection.",
    icon: "https://res.cloudinary.com/djgwnvlrb/image/upload/v1776530591/star_k1pqyi.png",
  },
  {
    title: "Chef Revenue Opportunities",
    desc: "Monetize your culinary knowledge by selling cookbooks and premium recipes directly to food lovers.",
    icon: "https://res.cloudinary.com/djgwnvlrb/image/upload/v1776530590/cog_rrkps7.png",
  },
  {
    title: "Recipe Engagement Insights",
    desc: "Track recipe performance with analytics including views, likes, saves, and purchases.",
    icon: "https://res.cloudinary.com/djgwnvlrb/image/upload/v1776530590/noodle_ln5vc8.png",
  },
  {
    title: "Admin Analytics Dashboard",
    desc: "Admins can monitor platform engagement including recipe popularity, cookbook sales, and overall user activity.",
    icon: "https://res.cloudinary.com/djgwnvlrb/image/upload/v1776530590/cylinder_opmyav.png",
  },
  {
    title: "User Management System",
    desc: "Admins can manage users, chefs, and roles while maintaining a healthy and secure platform environment.",
    icon: "https://res.cloudinary.com/djgwnvlrb/image/upload/v1776530590/spring_ueztxu.png",
  },
  {
    title: "Secure Authentication System",
    desc: "User accounts are protected with encrypted password hashing and secure authentication processes.",
    icon: "https://res.cloudinary.com/djgwnvlrb/image/upload/v1776530591/tube_mlirz9.png",
  },
  {
    title: "JWT-Based Authorization",
    desc: "Chefalio uses JWT tokens to ensure secure session management and protect private routes.",
    icon: "https://res.cloudinary.com/djgwnvlrb/image/upload/v1776530591/star_k1pqyi.png",
  },
  {
    title: "HTTPOnly Cookie Security",
    desc: "Authentication tokens are stored in HTTPOnly cookies to prevent XSS attacks and keep user sessions safe.",
    icon: "https://res.cloudinary.com/djgwnvlrb/image/upload/v1776530590/cog_rrkps7.png",
  },
  {
    title: "Personal Recipe Library",
    desc: "Save your favorite recipes and purchased cookbooks in one place. Easily revisit dishes you love and organize your personal cooking collection.",
    icon: "https://res.cloudinary.com/djgwnvlrb/image/upload/v1776530590/noodle_ln5vc8.png",
  },
  {
    title: "Smart Search",
    desc: "Quickly find recipes, chefs, and cookbooks using a powerful search system designed to deliver the most relevant culinary content instantly.",
    icon: "https://res.cloudinary.com/djgwnvlrb/image/upload/v1776530590/cylinder_opmyav.png",
  },
];

const EASE = [0.16, 1, 0.3, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

const cardAnim = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

export const Features = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, {
    once: true,
    margin: "-100px 0px -100px 0px",
  }); // better scroll trigger

  return (
    <motion.div
      id="features"
      ref={ref}
      className="container mx-auto px-4 py-10 md:py-20"
      initial="hidden"
      animate={inView ? "visible" : "hidden"} // only animate when in view
    >
      <motion.div
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.07 } },
        }}
        className="space-y-2 text-center max-w-140 mx-auto"
      >
        <motion.h2
          variants={fadeUp}
          className="text-5xl md:text-7xl tracking-tighter font-bold bg-linear-to-b from-black to-primary dark:from-white dark:to-primary bg-clip-text text-transparent"
        >
          Discover What Chefalio Can Do
        </motion.h2>

        <motion.p
          variants={fadeUp}
          className="mx-auto mt-6 max-w-xl text-center text-lg text-black/70 dark:text-white/70 leading-relaxed"
        >
          Enjoy a more efficient and delightful cooking experience with
          Chefalio’s innovative features—discover personalized recipes.
        </motion.p>
      </motion.div>

      <motion.div
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.055, delayChildren: 0.25 },
          },
        }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 border border-border mt-10"
      >
        {features.map((feature, i) => (
          <FeatureCard key={i} feature={feature} />
        ))}
      </motion.div>
    </motion.div>
  );
};

function FeatureCard({ feature }: { feature: (typeof features)[0] }) {
  return (
    <motion.div
      variants={cardAnim}
      className="group relative p-6 border-border border-r border-b last:border-r-0 overflow-hidden"
    >
      <div className="w-fit transition-transform duration-300 ease-out group-hover:scale-[1.08] group-hover:-translate-y-0.5">
        <Image src={feature.icon} width={50} height={50} alt="icon" />
      </div>
      <h3 className="text-2xl font-semibold tracking-tight mb-2 mt-4 transition-colors duration-300 group-hover:text-primary">
        {feature.title}
      </h3>
      <div className="relative">
        <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
        <span
          className="
            pointer-events-none absolute inset-0
            bg-linear-to-b from-transparent from-40% to-background
            opacity-100 group-hover:opacity-0
            transition-opacity duration-400 ease-out
          "
        />
      </div>
    </motion.div>
  );
}
