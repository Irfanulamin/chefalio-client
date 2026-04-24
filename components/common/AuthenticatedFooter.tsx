"use client";

import Link from "next/link";

interface NavLink {
  label: string;
  href: string;
}

interface FooterProps {
  links?: NavLink[];
  showCopyright?: boolean;
  brandName?: string;
}

export const AuthenticatedFooter = ({ links = [] }: FooterProps) => {
  return (
    <footer className="w-full px-6 py-10 flex justify-center backdrop-blur-sm bg-background/80 supports-backdrop-filter:bg-background/60">
      <div className="w-full max-w-4xl rounded-2xl border border-black/8 dark:border-white/8 bg-white/60 dark:bg-black/40 backdrop-blur-sm px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Brand */}
        <Link
          href="/"
          className="text-primary text-2xl font-extrabold tracking-tight cursor-pointer select-none"
        >
          Chefalio
        </Link>

        {/* Dynamic Links */}
        {links.length > 0 && (
          <nav className="flex items-center gap-x-6">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium relative group transition-colors hover:text-foreground"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-primary transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>
        )}

        <p className="text-xs text-black/35 dark:text-white/35 whitespace-nowrap">
          © {new Date().getFullYear()} Chefalio. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default AuthenticatedFooter;
