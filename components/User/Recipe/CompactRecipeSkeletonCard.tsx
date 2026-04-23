export const CompactRecipeSkeletonCard = () => {
  return (
    <article className="group relative flex items-start gap-4 px-5 py-4 bg-background border border-border rounded-lg animate-pulse">
      <div className="shrink-0 w-36 h-36 rounded-lg bg-muted" />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-2">
          <div className="h-5 w-40 bg-muted rounded" />
          <div className="h-4 w-14 bg-muted rounded" />
        </div>

        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-full bg-muted" />
          <div className="h-4 w-24 bg-muted rounded" />
        </div>

        <div className="space-y-1 mb-2">
          <div className="h-3 w-full bg-muted rounded" />
          <div className="h-3 w-5/6 bg-muted rounded" />
        </div>

        <div className="hidden md:flex gap-3">
          <div className="h-4 w-28 bg-muted rounded" />
          <div className="h-4 w-20 bg-muted rounded" />
        </div>
      </div>

      <div className="shrink-0 flex items-center gap-2 self-center">
        <div className="w-8 h-8 bg-muted rounded-lg" />
        <div className="w-8 h-8 bg-muted rounded-lg" />
      </div>
    </article>
  );
};
