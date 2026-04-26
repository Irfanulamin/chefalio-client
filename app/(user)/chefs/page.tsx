"use client";

import { useChefs } from "@/hooks/useChef";
import { PaginationSection } from "@/components/common/Pagination";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useRef } from "react";
import { useDebounce } from "use-debounce";

export default function ChefsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const search = searchParams.get("search") ?? "";
  const page = Number(searchParams.get("page") ?? "1");

  const updateParams = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === "") {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });
      if (!("page" in updates)) params.set("page", "1");
      router.replace(`?${params.toString()}`, { scroll: false });
    },
    [searchParams, router],
  );

  const [debouncedSearch] = useDebounce(search, 500);

  const { chefs, isLoading, isFetching } = useChefs({
    search: debouncedSearch,
    page,
    limit: 12,
  });

  const totalPages = chefs?.pagination?.totalPages || 1;
  const currentPage = chefs?.pagination?.page || page;
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <title>Chefalio - Chefs</title>
      <div ref={scrollRef} className="space-y-6 my-3 md:my-6 max-w-7xl mx-auto px-3">
        {/* Header */}
        <div>
          <h2 className="text-5xl font-pinyon-script font-bold text-primary italic capitalize mb-2 tracking-widest">
            Chefs
          </h2>
          <p className="text-muted-foreground max-w-200">
            Meet the talented chefs behind your favourite recipes and cookbooks.
            Click on a chef to explore their creations.
          </p>
        </div>

        {/* Search */}
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <Input
              placeholder="Search chefs…"
              value={search}
              onChange={(e) => updateParams({ search: e.target.value || null })}
              className="pl-9 pr-9 rounded-full"
            />
            {search && (
              <button
                onClick={() => updateParams({ search: null })}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
          {search && (
            <Button
              variant="outline"
              size="sm"
              className="text-muted-foreground hover:text-foreground"
              onClick={() => updateParams({ search: null })}
            >
              Clear
            </Button>
          )}
        </div>

        {/* Count summary */}
        {!isLoading && chefs && (
          <p className="text-sm text-muted-foreground">
            {chefs.pagination.total === 0
              ? "No chefs found"
              : `Showing ${chefs.data.length} of ${chefs.pagination.total} chef${chefs.pagination.total !== 1 ? "s" : ""}`}
          </p>
        )}

        {/* Grid */}
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-3 p-4 rounded-2xl bg-muted/50 animate-pulse"
              >
                <div className="w-20 h-20 rounded-full bg-muted" />
                <div className="h-3 w-3/4 rounded bg-muted" />
                <div className="h-3 w-1/2 rounded bg-muted" />
              </div>
            ))}
          </div>
        ) : chefs?.data.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center min-h-[50vh] gap-3">
            <p className="text-lg font-medium">No chefs found</p>
            <p className="text-sm text-muted-foreground max-w-xs">
              Try a different search term.
            </p>
            {search && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => updateParams({ search: null })}
              >
                Clear search
              </Button>
            )}
          </div>
        ) : (
          <div
            className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 transition-opacity duration-200 ${
              isFetching ? "opacity-50" : "opacity-100"
            }`}
          >
            {chefs?.data.map((chef) => (
              <Link
                key={chef._id}
                href={`/chefs/${chef._id}`}
                className="group flex flex-col items-center gap-3 p-4 rounded-2xl border border-border/40 bg-linear-to-t from-primary/20 via-primary/5 to-transparent hover:border-border hover:-translate-y-1 hover:shadow-md transition-all duration-200"
              >
                {/* Avatar */}
                <div className="relative w-20 h-20 shrink-0">
                  <Image
                    src={chef.profile_url}
                    alt={chef.fullName}
                    fill
                    sizes="80px"
                    loading="lazy"
                    className="rounded-full object-cover ring-2 ring-primary/20 group-hover:ring-primary/60 transition-all duration-300"
                  />
                </div>

                {/* Info */}
                <div className="text-center min-w-0 w-full">
                  <p className="text-sm font-semibold text-foreground leading-snug line-clamp-1">
                    {chef.fullName}
                  </p>
                  <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                    @{chef.username}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}

        <PaginationSection
          totalPages={totalPages}
          currentPage={currentPage}
          setPage={(p) => updateParams({ page: String(p) })}
          scrollTargetRef={scrollRef}
        />
      </div>
    </>
  );
}
