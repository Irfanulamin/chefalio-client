"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PaginationSection } from "@/components/common/Pagination";
import { useCookbooks } from "@/hooks/useCookbook";
import { cn } from "@/lib/utils";
import { Search, User, X } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useRef } from "react";
import { useDebounce } from "use-debounce";
import Link from "next/link";

export default function CookbooksPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const search = searchParams.get("search") ?? "";
  const author = searchParams.get("author") ?? "";
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
  const [debouncedAuthor] = useDebounce(author, 500);

  const { cookbooks, isLoading, isFetching } = useCookbooks({
    search: debouncedSearch,
    page,
    limit: 12,
    author: debouncedAuthor || undefined,
  });

  const handleSearchChange = (value: string) =>
    updateParams({ search: value || null });

  const handleAuthorChange = (value: string) =>
    updateParams({ author: value || null });

  const clearAllFilters = () => updateParams({ search: null, author: null });

  const hasActiveFilters = search.trim() !== "" || author.trim() !== "";
  const totalPages = cookbooks?.pagination?.totalPages || 1;
  const currentPage = cookbooks?.pagination?.page || page;
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <title>Chefalio - Cookbooks</title>
      <div ref={scrollRef} className="space-y-6 my-3 md:my-6 max-w-7xl mx-auto px-3">
        {/* Header */}
        <div>
          <h2 className="text-5xl font-pinyon-script font-bold text-primary italic capitalize mb-2 tracking-widest">
            Cookbooks
          </h2>
          <p className="text-muted-foreground max-w-200">
            Discover cookbooks that inspire your culinary journey. Explore a
            curated collection of recipes, tips, and stories from chefs around
            the world. Happy cooking!
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <Input
              placeholder="Search cookbooks…"
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-9 pr-9 rounded-full"
            />
            {search && (
              <button
                onClick={() => handleSearchChange("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* Author filter */}
          <div className="relative flex-1 max-w-xs">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <Input
              placeholder="Filter by author…"
              value={author}
              onChange={(e) => handleAuthorChange(e.target.value)}
              className="pl-9 pr-9 rounded-full"
            />
            {author && (
              <button
                onClick={() => handleAuthorChange("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* Clear all */}
          {hasActiveFilters && (
            <Button
              variant="outline"
              size="sm"
              className="text-muted-foreground hover:text-foreground"
              onClick={clearAllFilters}
            >
              Clear all
            </Button>
          )}
        </div>

        {/* Results summary */}
        {!isLoading && cookbooks && (
          <p className="text-sm text-muted-foreground">
            {cookbooks.pagination.total === 0
              ? "No cookbooks found"
              : `Showing ${cookbooks.data.length} of ${cookbooks.pagination.total} cookbook${cookbooks.pagination.total !== 1 ? "s" : ""}`}
          </p>
        )}

        {/* Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="bg-background animate-pulse rounded-xl overflow-hidden"
              >
                <div className="aspect-square bg-muted" />
                <div className="p-4 space-y-2">
                  <div className="h-3 w-1/2 rounded bg-muted" />
                  <div className="h-4 w-3/4 rounded bg-muted" />
                  <div className="h-3 w-full rounded bg-muted" />
                  <div className="h-8 w-full rounded bg-muted mt-3" />
                </div>
              </div>
            ))}
          </div>
        ) : cookbooks?.data.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center min-h-[60vh] gap-3">
            <p className="text-lg font-medium">No cookbooks found</p>
            <p className="text-sm text-muted-foreground max-w-xs">
              Try adjusting your search or author filter to find what
              you&apos;re looking for.
            </p>
            {hasActiveFilters && (
              <Button variant="outline" size="sm" onClick={clearAllFilters}>
                Clear all filters
              </Button>
            )}
          </div>
        ) : (
          <div
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 transition-opacity duration-200 py-3 ${
              isFetching ? "opacity-50" : "opacity-100"
            }`}
          >
            {cookbooks?.data.map((cookbook) => (
              <div
                key={cookbook._id}
                className="group bg-background border border-border/40 rounded-xl overflow-hidden hover:border-border hover:-translate-y-1 transition-all duration-200 cursor-pointer flex flex-col"
              >
                {/* Image */}
                <div className="relative aspect-square overflow-hidden bg-muted">
                  <Image
                    src={cookbook.cookbook_image}
                    alt={cookbook.title}
                    fill
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
                <div className="p-4 flex flex-col flex-1">
                  <Link
                    href={`/chefs/${cookbook.authorId._id}`}
                    className="flex items-center gap-2 mb-2.5"
                  >
                    {cookbook.authorId.profile_url ? (
                      <Image
                        src={cookbook.authorId.profile_url}
                        alt={cookbook.authorId.fullName}
                        width={28}
                        height={28}
                        className="rounded-full w-7 h-7 object-cover ring-2 ring-primary shadow-sm"
                      />
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-purple-100 text-purple-800 text-[10px] font-medium flex items-center justify-center shrink-0">
                        {cookbook.authorId.fullName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .slice(0, 2)}
                      </div>
                    )}
                    <span className="text-xs text-muted-foreground">
                      {cookbook.authorId.fullName}
                    </span>
                  </Link>

                  <p className="font-medium text-[15px] leading-snug mb-1.5">
                    {cookbook.title}
                  </p>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                    {cookbook.description}
                  </p>

                  {/* Price + button — always pinned to bottom */}
                  <div className="mt-auto">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xl font-medium">
                        ${cookbook.price.toFixed(2)}
                      </span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                        <span
                          className={cn(
                            "w-1.5 h-1.5 rounded-full",
                            cookbook.stockCount <= 3
                              ? "bg-orange-500"
                              : "bg-green-600",
                          )}
                        />
                        {cookbook.stockCount <= 3 ? "Almost gone" : "In stock"}
                      </span>
                    </div>

                    <Link href={`/purchase-cookbook/${cookbook._id}`}>
                      <Button
                        variant="default"
                        size="sm"
                        className="w-full capitalize"
                      >
                        Buy now
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
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
