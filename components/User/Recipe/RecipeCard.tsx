import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RecipeStats, useToggleLove, useToggleSave } from "@/hooks/useRecipe";
import { cn } from "@/lib/utils";
import { Recipe } from "@/types/recipes.type";
import {
  BookmarkSimpleIcon,
  HeartIcon,
  ShareFatIcon,
} from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";
import { memo, useCallback } from "react";

// ✅ Moved outside component — no re-creation on every render
const difficultyColors: Record<string, string> = {
  beginner:
    "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-100",
  intermediate:
    "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100",
  advance: "bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-100",
};

// ✅ Wrapped with memo — skips re-render if recipe prop hasn't changed
export const RecipeCard = memo(
  ({
    recipe,
    statsFor,
  }: {
    recipe: Recipe;
    // statsFor comes from useBatchRecipeStats in RecipeGrid — no per-card API call
    statsFor: (id: string) => RecipeStats;
  }) => {
    const stats = statsFor(recipe._id);
    const { mutate: toggleSave } = useToggleSave();
    const { mutate: toggleLove } = useToggleLove();

    // ✅ Stable callbacks — not re-created every render
    const handleLoveToggle = useCallback(
      () => toggleLove(recipe._id),
      [recipe._id, toggleLove],
    );

    const handleSaveToggle = useCallback(
      () => toggleSave(recipe._id),
      [recipe._id, toggleSave],
    );

    const handleShareLinkToClipboard = useCallback(() => {
      const url = `${window.location.origin}/recipes/${recipe._id}`;
      navigator.clipboard.writeText(url);
      if (navigator.share) {
        void navigator
          .share({ title: recipe.title, text: recipe.description, url })
          .catch(() => undefined);
      }
    }, [recipe._id, recipe.title, recipe.description]);

    return (
      <div
        className="group w-full max-w-full overflow-hidden rounded-2xl 
border border-blue-200/40 dark:border-blue-400/20 
bg-linear-to-t from-white/60 via-blue-50/40 to-blue-100/30 
dark:from-black/80 dark:via-blue-900/20 dark:to-black/30
shadow-[0_10px_30px_rgba(59,130,246,0.15)] 
dark:shadow-[0_10px_30px_rgba(59,130,246,0.10)]
transition-all duration-300 
hover:-translate-y-1 
hover:shadow-[0_15px_40px_rgba(59,130,246,0.25)] 
dark:hover:shadow-[0_15px_40px_rgba(59,130,246,0.20)]
flex flex-col cursor-pointer"
      >
        {/* Image */}
        <div className="relative h-52 w-full overflow-hidden">
          <Image
            src={recipe.images[0]}
            alt={recipe.title}
            fill
            loading="lazy"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Difficulty badge — top left */}
          <div className="absolute left-3 top-3">
            <Badge
              className={cn(
                "border-0 text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 shadow-sm",
                difficultyColors[recipe.difficulty],
              )}
            >
              {recipe.difficulty}
            </Badge>
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-col gap-3 p-5 flex-1">
          {/* Author */}
          <Link
            href={`/chefs/${recipe.authorId._id}`}
            className="flex items-center gap-2"
          >
            {recipe.authorId.profile_url ? (
              <Image
                src={recipe.authorId.profile_url}
                alt={recipe.authorId.fullName}
                width={28}
                height={28}
                loading="lazy"
                sizes="28px"
                className="rounded-full w-7 h-7 object-cover ring-1 ring-primary shadow-sm"
              />
            ) : (
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-200 dark:bg-slate-700 text-[10px] font-bold text-slate-700 dark:text-slate-200 ring-2 ring-white dark:ring-slate-900">
                {(recipe.authorId.fullName || "")
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()}
              </div>
            )}

            <p className="text-sm font-semibold tracking-wide text-slate-500 dark:text-slate-400 capitalize">
              {recipe.authorId.fullName}
            </p>
          </Link>

          {/* Title & Description */}
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white leading-snug line-clamp-2 mb-1">
              {recipe.title}
            </h2>
            <p className="text-sm text-slate-400 dark:text-slate-500 leading-relaxed line-clamp-2">
              {recipe.description}
            </p>
          </div>

          {/* Ingredients — minimal bullet list */}
          <ul className="space-y-1.5 mt-0.5">
            {recipe.ingredients.slice(0, 3).map((item, idx) => (
              <li
                key={idx}
                className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400"
              >
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                {item}
              </li>
            ))}
            {recipe.ingredients.length > 3 && (
              <li className="text-xs text-slate-400 dark:text-slate-500 pl-3.5">
                +{recipe.ingredients.length - 3} more
              </li>
            )}
          </ul>

          {/* Divider */}
          <div className="border-t border-slate-100 dark:border-slate-800" />

          {/* Stats + Actions — single row */}
          <div className="flex items-center gap-3 mt-auto">
            {/* Love */}
            <button
              onClick={handleLoveToggle}
              className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 hover:text-rose-500 transition-colors"
            >
              <HeartIcon
                weight={stats?.isLoved ? "fill" : "bold"}
                className={cn(
                  "h-5 w-5 transition-all",
                  stats?.isLoved ? "text-rose-500" : "",
                )}
              />
              <span className="font-medium">
                {recipe.lovedCount.toLocaleString()}
              </span>
            </button>

            {/* Save */}
            <button
              onClick={handleSaveToggle}
              className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <BookmarkSimpleIcon
                weight={stats?.isSaved ? "fill" : "bold"}
                className={cn(
                  "h-5 w-5 transition-all",
                  stats?.isSaved ? "text-slate-900 dark:text-white" : "",
                )}
              />
            </button>

            {/* Share */}
            <button
              onClick={handleShareLinkToClipboard}
              className="flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
            >
              <ShareFatIcon className="h-5 w-5" weight="bold" />
            </button>

            {/* Spacer */}
            <div className="flex-1" />

            {/* View Recipe — primary CTA */}
            <Link href={`/recipes/${recipe._id}`}>
              <Button
                size="sm"
                className="h-9 px-4 rounded-full text-xs font-semibold capitalize"
              >
                View Recipe
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  },
);

RecipeCard.displayName = "RecipeCard";
