import { Cookbook } from "@/hooks/useCookbook";
import Image from "next/image";

export const SummaryCard = ({ cookbook }: { cookbook: Cookbook }) => {
  const isLowStock = cookbook.stockCount <= 5;
  return (
    <div className="flex gap-4 items-start border border-border rounded-xl bg-card p-4 max-w-lg mx-auto">
      {/* Image */}
      <div className="w-28 h-28 rounded-lg overflow-hidden shrink-0">
        {cookbook.cookbook_image ? (
          <Image
            src={cookbook.cookbook_image}
            alt={cookbook.title}
            width={112}
            height={112}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-muted animate-pulse" />
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* Top */}
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <span className="text-[11px] uppercase tracking-wide text-muted-foreground bg-accent px-2 py-0.5 rounded-full font-medium">
              Cookbook
            </span>

            <p className="text-base font-semibold text-foreground leading-snug line-clamp-2 mt-2">
              {cookbook.title.trim()}
            </p>
          </div>

          {/* Stock */}
          <span
            className={`text-xs px-2.5 py-1 rounded-full border shrink-0 ${
              isLowStock
                ? "bg-red-50 text-red-600 border-red-200"
                : "bg-muted/10 text-muted-foreground border-border"
            }`}
          >
            {isLowStock
              ? `Only ${cookbook.stockCount} left`
              : `${cookbook.stockCount} in stock`}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
          {cookbook.description}
        </p>

        {/* Author */}
        <div className="flex items-center gap-2 mt-3">
          {cookbook.authorId.profile_url ? (
            <Image
              src={cookbook.authorId.profile_url}
              alt={cookbook.authorId.fullName}
              width={24}
              height={24}
              className="w-6 h-6 rounded-full object-cover"
            />
          ) : (
            <div className="w-6 h-6 rounded-full bg-blue-50 text-blue-700 text-xs flex items-center justify-center">
              {cookbook.authorId.fullName.charAt(0).toUpperCase()}
            </div>
          )}

          <span className="text-sm text-muted-foreground truncate">
            {cookbook.authorId.fullName} · @{cookbook.authorId.username}
          </span>
        </div>

        {/* Price (important for checkout) */}
        <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Price</span>
          <span className="text-lg font-semibold text-foreground">
            ${cookbook.price.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};
