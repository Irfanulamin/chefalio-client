"use client";

import { useState } from "react";
import { ListIcon, XIcon } from "@phosphor-icons/react";
import { ToggleThemeButton } from "./ToggleThemeButton";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
//import { useAuth } from "@/hooks/axios";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ProfileDropdown } from "./ProfileDropdown";

const navLinks = [
  { label: "Recipes", href: "/recipes" },
  { label: "Cookbooks", href: "/cookbooks" },
  { label: "Chefs", href: "/chefs" },
  { label: "Activity", href: "/activity" },
];

export const UserHeader = () => {
  const [sheetOpen, setSheetOpen] = useState(false);
  const pathname = usePathname();
  //const { user, isLoading, logout } = useAuth();

  return (
    <div className="sticky top-0 z-50 backdrop-blur-sm">
      <div className="py-4 border-b border-border/40 bg-background/80 backdrop-blur-xl supports-backdrop-filter:bg-background/60">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <h2 className="text-primary text-2xl font-extrabold tracking-tight cursor-pointer select-none">
              <Link href="/">Chefalio</Link>
            </h2>

            {/* Desktop */}
            <nav className="hidden lg:flex gap-x-7 gap-y-4 text-muted-foreground items-center">
              <ToggleThemeButton />
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`text-sm font-medium relative group transition-colors hover:text-foreground ${isActive ? "text-foreground" : ""}`}
                  >
                    {link.label}
                    <span
                      className={`absolute -bottom-0.5 left-0 h-px bg-primary transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"}`}
                    />
                  </Link>
                );
              })}
              <ProfileDropdown />
            </nav>

            {/* Mobile */}
            <div className="lg:hidden flex items-center gap-3">
              <ToggleThemeButton />
              <ProfileDropdown />
              <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                <SheetTrigger asChild>
                  <button
                    className="p-1.5 rounded-md hover:bg-accent transition-colors"
                    aria-label="Open menu"
                  >
                    <div>
                      {sheetOpen ? (
                        <span key="close">
                          <XIcon size={26} />
                        </span>
                      ) : (
                        <span key="menu">
                          <ListIcon size={26} />
                        </span>
                      )}
                    </div>
                  </button>
                </SheetTrigger>

                <SheetContent
                  side="left"
                  className="px-0 pb-8 bg-white/85 dark:bg-black/85 backdrop-blur-sm"
                >
                  <SheetHeader className="px-6 pt-6 pb-2">
                    <SheetTitle className="text-2xl font-extrabold tracking-tight text-primary">
                      Chefalio
                    </SheetTitle>
                  </SheetHeader>

                  <nav className="flex flex-col px-6 mt-2 gap-1">
                    {navLinks.map((link) => {
                      const isActive = pathname === link.href;
                      return (
                        <Link
                          key={link.label}
                          href={link.href}
                          onClick={() => setSheetOpen(false)}
                          className={`py-3 text-base font-medium border-b border-border/40 last:border-none transition-colors ${isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                        >
                          {link.label}
                        </Link>
                      );
                    })}
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
