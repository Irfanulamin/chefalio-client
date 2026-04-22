import {
  BookOpenIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  HashStraightIcon,
  MapPinIcon,
} from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";

export interface BillingAddress {
  name?: string;
  address?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
}

export interface Purchase {
  _id: string;
  cookbookId: string;
  buyerId: string;
  cookbookTitle: string;
  chefId: string;
  cookbookImage?: string;
  price: number;
  stripeSessionId?: string;
  paymentStatus: "paid" | "pending" | "failed";
  billingAddress?: BillingAddress;
  receiptEmail?: string;
  createdAt: string;
  updatedAt?: string;
}

const statusConfig = {
  pending: {
    label: "Pending",
    className:
      "bg-amber-50 text-amber-700 ring-1 ring-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:ring-amber-900",
  },
  paid: {
    label: "Paid",
    className:
      "bg-green-50 text-green-700 ring-1 ring-green-200 dark:bg-green-950/40 dark:text-green-300 dark:ring-green-900",
  },
  failed: {
    label: "Failed",
    className:
      "bg-red-50 text-red-700 ring-1 ring-red-200 dark:bg-red-950/40 dark:text-red-300 dark:ring-red-900",
  },
  refunded: {
    label: "Refunded",
    className:
      "bg-purple-50 text-purple-700 ring-1 ring-purple-200 dark:bg-purple-950/40 dark:text-purple-300 dark:ring-purple-900",
  },
  shipped: {
    label: "Shipped",
    className:
      "bg-blue-50 text-blue-700 ring-1 ring-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:ring-blue-900",
  },
  delivered: {
    label: "Delivered",
    className:
      "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:ring-emerald-900",
  },
} as const;

function getInitials(name?: string): string {
  if (!name) return "?";
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}

function getRelativeTime(iso: string): string {
  const now = new Date();
  const past = new Date(iso);
  const diff = now.getTime() - past.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (years > 0) return `${years} year${years > 1 ? "s" : ""} ago`;
  if (months > 0) return `${months} month${months > 1 ? "s" : ""} ago`;
  if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
  if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

export const CompactPurchaseCardSkeleton = () => {
  return (
    <div className="flex items-start gap-4 px-5 py-4 bg-background border border-slate-200/50 dark:border-slate-800/50 rounded-lg animate-pulse">
      {/* Thumbnail skeleton */}
      <div className="shrink-0 w-36 h-36 rounded bg-muted" />

      {/* Content skeleton */}
      <div className="flex-1 min-w-0 space-y-3">
        {/* Title + badge */}
        <div className="flex items-center gap-2">
          <div className="h-5 w-48 rounded bg-muted" />
          <div className="h-4 w-12 rounded bg-muted" />
        </div>

        {/* Author */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-muted shrink-0" />
          <div className="h-4 w-32 rounded bg-muted" />
        </div>

        {/* Description */}
        <div className="space-y-1.5">
          <div className="h-3 w-full rounded bg-muted" />
          <div className="h-3 w-3/4 rounded bg-muted" />
        </div>

        {/* Meta row */}
        <div className="hidden md:flex items-center gap-4">
          <div className="h-4 w-16 rounded bg-muted" />
          <div className="h-4 w-24 rounded bg-muted" />
          <div className="h-4 w-20 rounded bg-muted" />
          <div className="h-4 w-20 rounded bg-muted" />
        </div>

        <div className="h-4 w-16 rounded bg-muted" />
      </div>
    </div>
  );
};

// ─── Card ─────────────────────────────────────────────────────────────────────

export const CompactPurchaseCard = ({ purchase }: { purchase: Purchase }) => {
  const status =
    statusConfig[purchase.paymentStatus as keyof typeof statusConfig];
  const initials = getInitials(purchase.billingAddress?.name);
  const location = [
    purchase.billingAddress?.city,
    purchase.billingAddress?.country,
  ]
    .filter(Boolean)
    .join(", ");
  const shortId = purchase._id.slice(-8).toUpperCase();

  return (
    <article className="group relative flex items-start gap-4 px-5 py-4 bg-white dark:bg-slate-950/50 border border-slate-200/50 dark:border-slate-800/50 rounded-lg hover:border-slate-300/70 dark:hover:border-slate-700/70 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_4px_12px_rgba(0,0,0,0.3)] transition-all duration-200">
      {/* Thumbnail */}
      <div className="shrink-0 w-36 h-36 rounded-lg overflow-hidden bg-linear-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900">
        {purchase.cookbookImage ? (
          <Image
            src={purchase.cookbookImage}
            alt={purchase.cookbookTitle ?? "Cookbook image"}
            width={200}
            height={200}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            crossOrigin="anonymous"
            loading="eager"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <BookOpenIcon className="w-6 h-6 text-slate-400 dark:text-slate-600" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {/* Title + Status badge */}
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50 truncate">
            {purchase.cookbookTitle ?? "Untitled Cookbook"}
          </h2>
          {status && (
            <span
              className={`inline-flex items-center text-[11px] font-medium px-2 py-0.5 rounded-md whitespace-nowrap ${status.className}`}
            >
              {status.label}
            </span>
          )}
        </div>

        {/* Buyer */}
        <div className="flex items-center gap-1.5 mb-2">
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700/80 text-[10px] font-semibold text-slate-700 dark:text-slate-200 shrink-0">
            {initials}
          </span>
          <p className="text-sm text-slate-600 dark:text-slate-300 truncate capitalize">
            {purchase.billingAddress?.name ?? "Unknown buyer"}
          </p>
        </div>

        {/* Receipt email + location */}
        {(purchase.receiptEmail || location) && (
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-2">
            {[purchase.receiptEmail, location].filter(Boolean).join(" · ")}
          </p>
        )}

        {/* Meta row */}
        <div className="flex items-center gap-3 flex-wrap">
          <span className="inline-flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400">
            <CurrencyDollarIcon className="w-5 h-5 text-primary" />
            {formatPrice(purchase.price)}
          </span>
          <span className="inline-flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
            <HashStraightIcon className="w-5 h-5 text-blue-500" />
            {shortId}
          </span>
          <span className="inline-flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
            <CalendarIcon className="w-5 h-5 text-amber-500" />
            {formatDate(purchase.createdAt)}
          </span>
          {location && (
            <span className="inline-flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
              <MapPinIcon className="w-5 h-5 text-rose-400" />
              {location}
            </span>
          )}
          <span className="inline-flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
            <CalendarIcon className="w-5 h-5 text-orange-500" />
            {getRelativeTime(purchase.createdAt)}
          </span>
        </div>
      </div>
    </article>
  );
};
