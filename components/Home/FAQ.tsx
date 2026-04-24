"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { XIcon } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";

const QnA = [
  {
    question: "How quickly can I start cooking with ChefAlio?",
    answer:
      "You can start exploring recipes in under 5 minutes! Just sign up, set your taste preferences, and our onboarding wizard guides you to recipes and meal plans tailored to you. No credit card needed for the free tier.",
  },
  {
    question: "Are my personal recipes and preferences private?",
    answer:
      "Absolutely. We use AES-256 encryption at rest and TLS 1.3 in transit. Your saved recipes, ingredients, and taste preferences are stored securely and never shared with third parties.",
  },
  {
    question: "Can I integrate ChefAlio with my existing kitchen apps?",
    answer:
      "Yes! ChefAlio works with popular tools like Notion for recipe notes, Google Calendar for meal planning, and even grocery apps. Our open API and webhooks let you connect your favorite cooking tools.",
  },
  {
    question: "Do you offer premium or custom meal plans?",
    answer:
      "Yes. Our premium plans include exclusive recipes, personalized meal plans, shopping lists, and priority chef support. Contact our team and we’ll tailor a plan around your cooking style and goals.",
  },
  {
    question: "How does the 14-day free trial work?",
    answer:
      "Get full access to all ChefAlio premium features for 14 days, no credit card required. At the end, choose a plan that fits your cooking style — or continue using our free tier with no pressure and no surprise charges.",
  },
];

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section
      id="faq"
      className="min-h-screen flex items-center justify-center px-6 py-12 md:py-24 overflow-hidden"
    >
      <div className="w-full max-w-300">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 text-center"
        >
          <h2 className="text-5xl md:text-7xl font-bold text-primary leading-[1.15] tracking-tight mb-4">
            Questions, <br />
            <em className="not-italic text-black dark:text-white">
              Answered honestly.
            </em>
          </h2>

          <p className="text-base text-black/90 dark:text-white/90 font-light leading-relaxed max-w-md mx-auto">
            Everything you need to know before you commit. Still have questions?
            Contact our support team — we&apos;re here to help!
          </p>
        </motion.div>
        <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-24">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:sticky lg:top-24 shrink-0 flex justify-center lg:justify-start"
          >
            <Image
              src="https://res.cloudinary.com/djgwnvlrb/image/upload/v1776530583/about-us_mrtdt2.png"
              alt="FAQ illustration"
              width={260}
              height={260}
              className="object-contain w-50 lg:w-65 h-auto rounded-2xl"
            />
          </motion.div>
          <div className="flex flex-col gap-2.5 flex-1">
            {QnA.map((qa, i) => {
              const isOpen = openIndex === i;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    delay: i * 0.07,
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={`rounded-2xl border transition-colors duration-300 cursor-pointer overflow-hidden
                  ${
                    isOpen
                      ? "border-black/10 bg-black/4 dark:border-white/10 dark:bg-white/4"
                      : "border-black/6 bg-black/2 dark:border-white/6 dark:bg-white/2 hover:dark:border-white/10 hover:dark:bg-white/[0.035]"
                  }`}
                  onClick={() => toggle(i)}
                >
                  <button
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 rounded-2xl"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <span
                        className={`shrink-0 text-[11px] font-semibold tabular-nums transition-colors duration-300 ${isOpen ? "text-black/50 dark:text-white/50" : "text-black/20 dark:text-white/20"}`}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={`text-[15px] font-medium leading-snug transition-colors duration-200 ${isOpen ? "text-black dark:text-white" : "text-black/65 dark:text-white/65"}`}
                      >
                        {qa.question}
                      </span>
                    </div>

                    <motion.div
                      animate={{ rotate: isOpen ? 0 : 45 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center border transition-all duration-300
                      ${isOpen ? "border-black/20 bg-black/8 dark:border-white/20 dark:bg-white/8" : "border-black/10 dark:border-white/10"}`}
                    >
                      <XIcon
                        size={12}
                        weight="bold"
                        className={`transition-colors duration-300 ${isOpen ? "text-black/50 dark:text-white/50" : "text-black/20 dark:text-white/20"}`}
                      />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="body"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          duration: 0.36,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-5 flex flex-col gap-4">
                          <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{
                              duration: 0.38,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                            className="h-px bg-linear-to-r from-primary to-transparent origin-left"
                          />
                          <div className="flex gap-3.5">
                            <div className="w-0.5 self-stretch rounded-full bg-linear-to-b from-primary to-transparent shrink-0" />
                            <p className="text-[14px] text-black/90 dark:text-white/90 leading-[1.75] font-light">
                              {qa.answer}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
