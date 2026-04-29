"use client";

import {
  useChef,
  useChefRecipes,
  useChefCookbooks,
  useRelatedChefs,
} from "@/hooks/useChef";
import { useBatchRecipeStats } from "@/hooks/useRecipe";
import { RecipeCard } from "@/components/User/Recipe/RecipeCard";
import { PaginationSection } from "@/components/common/Pagination";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useRef } from "react";
import { BookOpen, ChefHat, Loader2 } from "lucide-react";
import { GridLoader } from "@/components/ui/GridLoading";

function ChefCookbookCard({
  cookbook,
}: {
  cookbook: import("@/hooks/useCookbook").Cookbook;
}) {
  return (
    <div className="group bg-background border border-border/40 rounded-xl overflow-hidden hover:border-border hover:-translate-y-1 transition-all duration-200">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        <Image
          src={cookbook.cookbook_image}
          alt={cookbook.title}
          fill
          loading="lazy"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <span
          className={cn(
            "absolute top-2.5 left-2.5 text-xs px-2.5 py-1 rounded-full border",
            cookbook.stockCount <= 3
              ? "bg-orange-50 text-orange-700 border-orange-200"
              : "bg-background text-muted-foreground border-border/50",
          )}
        >
          {cookbook.stockCount <= 3
            ? `${cookbook.stockCount} left`
            : `${cookbook.stockCount} in stock`}
        </span>
      </div>

      {/* Body */}
      <div className="p-4">
        <p className="font-medium text-[15px] leading-snug mb-1.5">
          {cookbook.title}
        </p>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {cookbook.description}
        </p>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xl font-medium">
            ${cookbook.price.toFixed(2)}
          </span>
          <span className="text-xs text-muted-foreground flex items-center gap-1.5">
            <span
              className={cn(
                "w-1.5 h-1.5 rounded-full",
                cookbook.stockCount <= 3 ? "bg-orange-500" : "bg-green-600",
              )}
            />
            {cookbook.stockCount <= 3 ? "Almost gone" : "In stock"}
          </span>
        </div>
        <Link href={`/purchase-cookbook/${cookbook._id}`}>
          <Button variant="default" size="sm" className="w-full capitalize">
            Buy now
          </Button>
        </Link>
      </div>
    </div>
  );
}

// ─── Skeleton grid ────────────────────────────────────────────────────────────
function GridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="bg-muted animate-pulse rounded-xl overflow-hidden"
        >
          <div className="aspect-square bg-muted-foreground/10" />
          <div className="p-4 space-y-2">
            <div className="h-3 w-3/4 rounded bg-muted-foreground/10" />
            <div className="h-4 w-full rounded bg-muted-foreground/10" />
            <div className="h-3 w-1/2 rounded bg-muted-foreground/10" />
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function ChefProfilePage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const chefId = params.id;

  const tab = (searchParams.get("tab") ?? "recipes") as "recipes" | "cookbooks";
  const page = Number(searchParams.get("page") ?? "1");

  const updateParams = useCallback(
    (updates: Record<string, string | null>) => {
      const p = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([key, value]) => {
        if (value === null) p.delete(key);
        else p.set(key, value);
      });
      if (!("page" in updates)) p.set("page", "1");
      router.replace(`?${p.toString()}`, { scroll: false });
    },
    [searchParams, router],
  );

  const setTab = (t: "recipes" | "cookbooks") =>
    updateParams({ tab: t, page: "1" });

  // Data
  const { chef, isLoading: isChefLoading } = useChef(chefId);
  const {
    recipes,
    pagination: recipePagination,
    isLoading: isRecipesLoading,
    isFetching: isRecipesFetching,
  } = useChefRecipes(chefId, { page, limit: 12 });

  const {
    cookbooks,
    pagination: cookbookPagination,
    isLoading: isCookbooksLoading,
    isFetching: isCookbooksFetching,
  } = useChefCookbooks(chefId, { page, limit: 12 });

  const { relatedChefs } = useRelatedChefs(chefId);

  // Batch recipe stats (same pattern as RecipeGrid)
  const recipeIds = useMemo(() => recipes?.map((r) => r._id) ?? [], [recipes]);
  const { statsFor } = useBatchRecipeStats(recipeIds);

  const scrollRef = useRef<HTMLDivElement>(null);

  if (isChefLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
        <GridLoader label="Loading chef profile..." />
      </div>
    );
  }

  if (!chef) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <p className="text-lg font-medium">Chef not found</p>
        <Link href="/chefs">
          <Button variant="outline">Back to Chefs</Button>
        </Link>
      </div>
    );
  }

  const totalPages =
    tab === "recipes"
      ? (recipePagination?.totalPages ?? 1)
      : (cookbookPagination?.totalPages ?? 1);

  return (
    <>
      <div
        ref={scrollRef}
        className="space-y-8 my-3 md:my-8 max-w-7xl mx-auto px-3"
      >
        {/* ── Chef Hero ─────────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-6 rounded-2xl border border-border/40 bg-background">
          {/* Avatar */}
          <div className="relative w-28 h-28 shrink-0">
            <Image
              src={chef.profile_url}
              alt={chef.fullName}
              fill
              sizes="112px"
              className="rounded-full object-cover ring-4 ring-primary/20"
            />
          </div>

          {/* Details */}
          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-3xl font-bold text-foreground leading-tight">
              {chef.fullName}
            </h1>
            <p className="text-muted-foreground mt-1">@{chef.username}</p>

            {/* Stats pills */}
            <div className="flex flex-wrap justify-center sm:justify-start gap-3 mt-4">
              <span className="flex items-center gap-1.5 text-sm px-3 py-1 rounded-full border border-border/60 bg-muted/10">
                <ChefHat className="w-4 h-4 text-primary" />
                {recipePagination?.total ? (
                  `${recipePagination.total} `
                ) : (
                  <Loader2 className="text-primary animate-pulse w-4 h-4" />
                )}
                Recipes
              </span>
              <span className="flex items-center gap-1.5 text-sm px-3 py-1 rounded-full border border-border/60 bg-muted/10">
                <BookOpen className="w-4 h-4 text-primary" />
                {cookbookPagination?.total ? (
                  `${cookbookPagination.total} `
                ) : (
                  <Loader2 className="text-primary animate-pulse w-4 h-4" />
                )}
                Cookbooks
              </span>
            </div>
          </div>
        </div>

        {/* ── Tabs ──────────────────────────────────────────────────────── */}
        <div className="flex gap-1 p-1 rounded-xl bg-primary/20 w-fit">
          {(["recipes", "cookbooks"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                "px-5 py-2 rounded-lg text-sm font-medium capitalize transition-all duration-200",
                tab === t
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {t}
            </button>
          ))}
        </div>

        {/* ── Tab Content ───────────────────────────────────────────────── */}
        {tab === "recipes" ? (
          <>
            {isRecipesLoading ? (
              <GridSkeleton />
            ) : recipes?.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center gap-3 min-h-[30vh]">
                <ChefHat className="w-12 h-12 text-muted-foreground/30" />
                <p className="text-sm text-muted-foreground">No recipes yet</p>
              </div>
            ) : (
              <div
                className={cn(
                  "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 transition-opacity duration-200",
                  isRecipesFetching ? "opacity-50" : "opacity-100",
                )}
              >
                {recipes?.map((recipe) => (
                  <RecipeCard
                    key={recipe._id}
                    recipe={recipe}
                    statsFor={statsFor}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <>
            {isCookbooksLoading ? (
              <GridSkeleton />
            ) : cookbooks?.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center gap-3 min-h-[30vh]">
                <BookOpen className="w-12 h-12 text-muted-foreground/30" />
                <p className="text-sm text-muted-foreground">
                  No cookbooks yet
                </p>
              </div>
            ) : (
              <div
                className={cn(
                  "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 transition-opacity duration-200",
                  isCookbooksFetching ? "opacity-50" : "opacity-100",
                )}
              >
                {cookbooks?.map((cookbook) => (
                  <ChefCookbookCard key={cookbook._id} cookbook={cookbook} />
                ))}
              </div>
            )}
          </>
        )}

        {/* Pagination */}
        <PaginationSection
          totalPages={totalPages}
          currentPage={page}
          setPage={(p) => updateParams({ page: String(p) })}
          scrollTargetRef={scrollRef}
        />

        {/* ── Related Chefs ─────────────────────────────────────────────── */}
        {relatedChefs.length > 0 && (
          <div className="space-y-4 pt-6 border-t border-border/40">
            <h2 className="text-lg font-semibold">Other Chefs</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {relatedChefs.map((related) => (
                <Link
                  key={related._id}
                  href={`/chefs/${related._id}`}
                  className="group flex flex-col items-center gap-3 p-4 rounded-2xl border border-border/40 bg-linear-to-t from-primary/20 via-primary/5 to-transparent hover:border-border hover:-translate-y-1 hover:shadow-md transition-all duration-200"
                >
                  <div className="relative w-16 h-16 shrink-0">
                    <Image
                      src={related.profile_url}
                      alt={related.fullName}
                      fill
                      sizes="64px"
                      loading="lazy"
                      className="rounded-full object-cover ring-2 ring-primary/20 group-hover:ring-primary/60 transition-all"
                    />
                  </div>
                  <div className="text-center min-w-0 w-full">
                    <p className="text-sm font-semibold line-clamp-1">
                      {related.fullName}
                    </p>
                    <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                      @{related.username}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
