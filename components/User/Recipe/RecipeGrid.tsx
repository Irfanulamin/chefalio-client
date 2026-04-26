import { Recipe } from "@/types/recipes.type";
import { RecipeCard } from "./RecipeCard";
import { useBatchRecipeStats } from "@/hooks/useRecipe";
import { MagnifyingGlassIcon } from "@phosphor-icons/react/dist/ssr";
import { useMemo } from "react";

export const RecipeGrid = ({
  isFetching,
  data,
}: {
  isFetching: boolean;
  data: Recipe[] | undefined;
}) => {
  // One request for the whole page instead of N individual requests
  const recipeIds = useMemo(() => data?.map((r) => r._id) ?? [], [data]);
  const { statsFor } = useBatchRecipeStats(recipeIds);

  return (
    <div className="flex justify-center">
      <div
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 transition-opacity duration-200 py-3 ${
          isFetching ? "opacity-50" : "opacity-100"
        }`}
      >
        {data?.map((recipe: Recipe) => (
          <RecipeCard key={recipe._id} recipe={recipe} statsFor={statsFor} />
        ))}

        {!isFetching && data?.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center py-16 text-muted-foreground">
            <MagnifyingGlassIcon size={48} className="mb-3 opacity-30" />
            <p className="text-sm">No recipes found</p>
          </div>
        )}
      </div>
    </div>
  );
};
