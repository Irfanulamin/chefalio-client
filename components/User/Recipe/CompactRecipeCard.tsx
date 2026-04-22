import {
  useRecipeStats,
  useToggleLove,
  useToggleSave,
} from "@/hooks/useRecipe";
import { SavedRecipe } from "@/types/recipes.type";
import {
  BookmarkSimpleIcon,
  ChefHatIcon,
  EyeIcon,
  ForkKnifeIcon,
  HeartIcon,
  TagIcon,
} from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const difficultyConfig = {
  beginner: {
    label: "Beginner",
    className:
      "bg-blue-50 text-blue-700 ring-1 ring-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:ring-blue-900",
  },
  intermediate: {
    label: "Intermediate",
    className:
      "bg-purple-50 text-purple-700 ring-1 ring-purple-200 dark:bg-purple-950/40 dark:text-purple-300 dark:ring-purple-900",
  },
  advance: {
    label: "Advanced",
    className:
      "bg-orange-50 text-orange-700 ring-1 ring-orange-200 dark:bg-orange-950/40 dark:text-orange-300 dark:ring-orange-900",
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

export const CompactRecipeCard = ({
  recipe,
  button,
}: {
  recipe: SavedRecipe;
  button: "save" | "love";
}) => {
  const { stats } = useRecipeStats(recipe.recipeId?._id);
  const { mutate: toggleSave } = useToggleSave();
  const { mutate: toggleLove } = useToggleLove();

  const handleLoveToggle = () => {
    toggleLove(recipe.recipeId?._id);
  };

  const handleSaveToggle = () => {
    toggleSave(recipe.recipeId?._id);
  };

  const difficulty =
    difficultyConfig[
      recipe.recipeId?.difficulty as keyof typeof difficultyConfig
    ];
  const initials = getInitials(recipe.recipeId?.authorId?.fullName);
  return (
    <article
      key={recipe._id}
      className="group relative flex items-start gap-4 px-5 py-4 bg-white dark:bg-slate-950/50 border border-slate-200/50 dark:border-slate-800/50 rounded-lg hover:border-slate-300/70 dark:hover:border-slate-700/70 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_4px_12px_rgba(0,0,0,0.3)] transition-all duration-200"
    >
      {/* Thumbnail */}
      <div className="shrink-0 w-36 h-36 rounded-lg overflow-hidden bg-linear-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900">
        {recipe.recipeId?.images?.[0] ? (
          <Image
            src={recipe.recipeId.images[0]}
            alt={recipe.recipeId?.title ?? "Recipe image"}
            width={200}
            height={200}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            crossOrigin="anonymous"
            loading="eager"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ChefHatIcon className="w-6 h-6 text-slate-400 dark:text-slate-600" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {/* Title + Badge */}
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50 truncate">
            {recipe.recipeId?.title ?? "Untitled Recipe"}
          </h2>
          {difficulty && (
            <span
              className={`inline-flex items-center text-[11px] font-medium px-2 py-0.5 rounded-md whitespace-nowrap ${difficulty.className}`}
            >
              {difficulty.label}
            </span>
          )}
        </div>

        {/* Author */}
        <div className="flex items-center gap-1.5 mb-2">
          {recipe.recipeId?.authorId?.profile_url ? (
            <Image
              src={recipe.recipeId.authorId.profile_url}
              alt={recipe.recipeId.authorId.fullName}
              width={200}
              height={200}
              className="w-8 h-8 rounded-full object-cover ring-2 ring-primary shadow-sm"
            />
          ) : (
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700/80 text-[10px] font-semibold text-slate-700 dark:text-slate-200 shrink-0">
              {initials}
            </span>
          )}
          <p className="text-sm text-slate-600 dark:text-slate-300 truncate capitalize">
            {recipe.recipeId?.authorId?.fullName ?? "Unknown author"}
          </p>
        </div>
        {/* Description */}
        {recipe.recipeId?.description && (
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-2">
            {recipe.recipeId.description}
          </p>
        )}

        {/* Meta Row */}
        <div className="hidden md:flex items-center gap-3 flex-wrap">
          {recipe.recipeId?.ingredients?.length != null && (
            <span className="inline-flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400">
              <ForkKnifeIcon className="w-5 h-5 text-primary" weight="fill" />
              {recipe.recipeId.ingredients.length} ingredients
            </span>
          )}
          {recipe.recipeId?.tags?.length > 0 && (
            <span className="inline-flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 capitalize">
              <TagIcon className="w-5 h-5 text-blue-500" weight="fill" />
              {recipe.recipeId.tags
                .slice(0, 2)
                .map((tag) => `#${tag}`)
                .join(" ")}
            </span>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="shrink-0 flex items-center gap-2 self-center opacity-100 xl:opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        {button == "love" && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button
                aria-label={
                  stats?.isLoved ? "Unlike this recipe" : "Like this recipe"
                }
                className={`p-1.5 rounded-lg transition-all duration-150 disabled:opacity-50 ${
                  stats?.isLoved
                    ? "bg-red-500/10 text-red-600 dark:bg-red-500/15 dark:text-red-400 hover:bg-red-500/20 dark:hover:bg-red-500/25"
                    : "text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:text-slate-300 dark:hover:bg-slate-800"
                }`}
              >
                <HeartIcon
                  className="w-4.5 h-4.5"
                  weight={stats?.isLoved ? "fill" : "bold"}
                  strokeWidth={2}
                />
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className="font-semibold text-base md:text-lg flex items-center gap-2">
                  Are you absolutely sure?
                  <HeartIcon
                    className="text-red-500 bg-red-500/30 p-2 rounded-full"
                    size={32}
                    weight="fill"
                  />
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone.{" "}
                  {stats?.isLoved ? "Unliking" : "Liking"} this recipe will{" "}
                  {stats?.isLoved
                    ? "remove it from your favourites"
                    : "add it to your favourites"}
                  . Please confirm your choice.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="h-8 px-4">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => handleLoveToggle()}
                  className="text-white h-8 px-4"
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}

        {button == "save" && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button
                aria-label={
                  stats?.isSaved ? "Unsave this recipe" : "Save this recipe"
                }
                className={`p-1.5 rounded-lg transition-all duration-150 disabled:opacity-50 ${
                  stats?.isSaved
                    ? "bg-blue-500/10 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400 hover:bg-blue-500/20 dark:hover:bg-blue-500/25"
                    : "text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:text-slate-300 dark:hover:bg-slate-800"
                }`}
              >
                <BookmarkSimpleIcon
                  className="w-4.5 h-4.5"
                  weight={stats?.isSaved ? "fill" : "bold"}
                />
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className="font-semibold text-base md:text-lg flex items-center gap-2">
                  Are you absolutely sure?
                  <BookmarkSimpleIcon
                    className="text-blue-500 bg-blue-500/30 p-2 rounded-full"
                    size={32}
                    weight="fill"
                  />
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone.{" "}
                  {stats?.isSaved ? "Unsaving" : "Saving"} this recipe will{" "}
                  {stats?.isSaved
                    ? "remove it from your saved recipes"
                    : "add it to your saved recipes"}
                  . Please confirm your choice.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="h-8 px-4 border-none">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => handleSaveToggle()}
                  className="text-white h-8 px-4"
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
        <Link
          href={`/recipes/${recipe.recipeId?._id}`}
          aria-label={
            stats?.isLoved ? "Unlike this recipe" : "Like this recipe"
          }
          className={`p-1.5 rounded-lg transition-all duration-150 disabled:opacity-50 bg-green-500/10 text-primary dark:bg-accent hover:bg-green-500/20 `}
        >
          <EyeIcon className="w-4.5 h-4.5" weight="bold" strokeWidth={2} />
        </Link>
      </div>
    </article>
  );
};
