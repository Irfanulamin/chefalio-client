export const RecipeSingleSkeleton = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col lg:flex-row gap-8 items-stretch animate-pulse bg-background">
      {/* ── LEFT COLUMN ── */}
      <div className="lg:flex-1 flex flex-col w-full lg:w-120 gap-5">
        {/* Image carousel placeholder */}
        <div className="w-full aspect-4/3 rounded-2xl bg-muted" />

        {/* Title block */}
        <div className="space-y-2">
          <div className="h-9 w-3/4 bg-muted rounded-lg" />
          <div className="h-4 w-full bg-muted rounded" />
          <div className="h-4 w-5/6 bg-muted rounded" />
        </div>

        {/* Author card */}
        <div className="flex items-center gap-4 rounded-2xl border border-border p-4">
          <div className="w-11 h-11 rounded-xl bg-muted shrink-0" />
          <div className="flex-1 space-y-1.5">
            <div className="h-4 w-32 bg-muted rounded" />
            <div className="h-3 w-48 bg-muted rounded" />
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-7 w-16 bg-muted rounded-lg" />
          ))}
        </div>
      </div>

      {/* ── RIGHT COLUMN ── */}
      <div className="w-full lg:flex-1 flex flex-col lg:pl-6 lg:border-l lg:border-border gap-8">
        {/* Ingredients */}
        <section className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="h-6 w-28 bg-muted rounded" />
            <div className="h-6 w-16 bg-muted rounded-lg" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-12 rounded-xl bg-muted" />
            ))}
          </div>
        </section>

        {/* Instructions */}
        <section className="space-y-3">
          <div className="h-6 w-32 bg-muted rounded" />
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-16 rounded-xl bg-muted" />
          ))}
        </section>
      </div>
    </div>
  );
};
