"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Features", href: "/#features" },
  { label: "About", href: "/#about" },
  { label: "FAQ", href: "/#faq" },
];

export const Footer = () => {
  return (
    <footer className="w-full px-6 py-10 flex justify-center backdrop-blur-sm bg-background/80 supports-backdrop-filter:bg-background/60">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-3xl rounded-2xl border border-black/8 dark:border-white/8 bg-white/60 dark:bg-black/40 backdrop-blur-sm px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-6"
      >
        <Link
          href="/"
          className="text-primary text-2xl font-extrabold tracking-tight cursor-pointer select-none"
        >
          Chefalio
        </Link>
        <nav className="flex items-center gap-x-6">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.07, duration: 0.35 }}
              whileHover={{ y: -1 }}
              className="text-sm font-medium relative group transition-colors hover:text-foreground"
            >
              {link.label}
              <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-primary transition-all duration-300 group-hover:w-full" />
            </motion.a>
          ))}
        </nav>
        <p className="text-xs text-black/35 dark:text-white/35 whitespace-nowrap">
          © {new Date().getFullYear()} Chefalio. All rights reserved.
        </p>
      </motion.div>
    </footer>
  );
};

export default Footer;
