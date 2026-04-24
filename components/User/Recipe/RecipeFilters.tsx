import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { TagIcon } from "@phosphor-icons/react";
import { MagnifyingGlassIcon, UserIcon } from "@phosphor-icons/react/dist/ssr";
import { Loader2, XIcon } from "lucide-react";
import { useState } from "react";

type Difficulty = "beginner" | "intermediate" | "advance";

type RecipeFiltersProps = {
  DIFFICULTIES: readonly Difficulty[];
  DIFFICULTY_STYLES: Record<Difficulty, string>;
  POPULAR_TAGS: string[];

  difficulty: Difficulty | "";
  selectedTags: string[];
  author: string;
  search: string;

  toggleTag: (tag: string) => void;
  toggleDifficulty: (d: Difficulty) => void;

  setAuthor: (value: string) => void; // ← plain function now
  setDifficulty: (value: Difficulty | "") => void; // ← plain function now

  clearAllFilters: () => void;
  handleSearchChange: (value: string) => void;

  isFetching: boolean;
  debouncedAuthor: string;
  hasActiveFilters: boolean;
};

export const RecipeFilters = ({
  DIFFICULTIES,
  DIFFICULTY_STYLES,
  POPULAR_TAGS,
  difficulty,
  selectedTags,
  author,
  toggleTag,
  toggleDifficulty,
  setAuthor,
  handleSearchChange,
  isFetching,
  debouncedAuthor,
  hasActiveFilters,
  clearAllFilters,
  setDifficulty,
  search,
}: RecipeFiltersProps) => {
  // tagInput is purely local — no reason to put it in the URL
  const [tagInput, setTagInput] = useState("");

  const handleTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const newTag = tagInput.trim().toLowerCase();
      if (newTag && !selectedTags.includes(newTag)) {
        toggleTag(newTag);
      }
      setTagInput("");
    }
    if (e.key === "Backspace" && tagInput === "") {
      toggleTag(selectedTags[selectedTags.length - 1]);
    }
  };

  return (
    <div className="flex items-center justify-between gap-4 flex-wrap">
      <div className="space-y-3">
        {/* Difficulty row */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-medium text-muted-foreground w-20">
            Difficulty
          </span>
          {DIFFICULTIES.map((d) => (
            <Badge
              key={d}
              variant="outline"
              data-active={difficulty === d}
              onClick={() => toggleDifficulty(d)}
              className={`cursor-pointer capitalize select-none transition-colors ${DIFFICULTY_STYLES[d]} p-4`}
            >
              {d}
            </Badge>
          ))}
        </div>

        {/* Tags row */}
        <div className="flex items-start gap-2 flex-wrap">
          <span className="text-sm font-medium text-muted-foreground w-20 pt-1">
            Tags
          </span>
          <div className="flex flex-wrap gap-2 flex-1">
            {POPULAR_TAGS.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                data-active={selectedTags.includes(tag)}
                onClick={() => toggleTag(tag)}
                className="cursor-pointer capitalize select-none transition-colors
                  data-[active=true]:bg-primary data-[active=true]:text-primary-foreground
                  data-[active=true]:border-primary p-4"
              >
                {tag}
              </Badge>
            ))}

            <div className="flex items-center gap-1 border rounded-full px-2.5 py-0.5 text-xs border-dashed border-muted-foreground/50 focus-within:border-primary transition-colors">
              <TagIcon size={11} className="text-muted-foreground shrink-0" />
              <input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagInputKeyDown}
                placeholder="add tag..."
                className="bg-transparent outline-none w-16 text-sm placeholder:text-muted-foreground/50 focus:w-24 transition-all duration-200"
              />
            </div>
          </div>
        </div>

        {/* Author row */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-muted-foreground w-20">
            Author
          </span>
          <div className="flex items-center gap-1 border rounded-full px-3 py-1 text-xs border-dashed border-muted-foreground/50 focus-within:border-primary transition-colors w-48">
            <UserIcon size={11} className="text-muted-foreground shrink-0" />
            <input
              value={author}
              onChange={(e) => {
                setAuthor(e.target.value);
              }}
              placeholder="search by username..."
              className="bg-transparent outline-none flex-1 text-sm placeholder:text-muted-foreground/50"
            />
            {author && (
              <XIcon
                size={11}
                className="cursor-pointer text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => {
                  setAuthor("");
                }}
              />
            )}
          </div>

          {debouncedAuthor && (
            <span className="text-xs text-muted-foreground">
              showing recipes by{" "}
              <span className="font-medium text-foreground">
                @{debouncedAuthor}
              </span>
            </span>
          )}
        </div>

        {/* Active filter chips + clear all */}
        {hasActiveFilters && (
          <div className="flex items-center gap-2 flex-wrap pt-1">
            <span className="text-xs text-muted-foreground">Active:</span>

            {selectedTags.map((tag) => (
              <Badge key={tag} variant="secondary" className="gap-1 capitalize">
                {tag}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleTag(tag);
                  }}
                  className="ml-1 cursor-pointer hover:text-destructive transition-colors"
                >
                  <XIcon size={12} />
                </button>
              </Badge>
            ))}

            {difficulty && (
              <Badge variant="secondary" className="gap-1 capitalize">
                {difficulty}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setDifficulty("");
                  }}
                  className="ml-1 cursor-pointer hover:text-destructive transition-colors"
                >
                  <XIcon size={12} />
                </button>
              </Badge>
            )}

            {debouncedAuthor && (
              <Badge variant="secondary" className="gap-1">
                @{debouncedAuthor}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setAuthor("");
                  }}
                  className="ml-1 cursor-pointer hover:text-destructive transition-colors"
                >
                  <XIcon size={12} />
                </button>
              </Badge>
            )}

            <Button
              variant="outline"
              size="sm"
              className="h-6 text-xs text-muted-foreground hover:text-foreground"
              onClick={clearAllFilters}
            >
              Clear all
            </Button>
          </div>
        )}
      </div>

      {/* Search */}
      <InputGroup className="max-w-lg h-12 border-2 rounded-full overflow-hidden">
        <InputGroupInput
          placeholder="Search your recipes..."
          value={search}
          onChange={(e) => handleSearchChange(e.target.value)}
        />
        <InputGroupAddon>
          {isFetching ? (
            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
          ) : (
            <MagnifyingGlassIcon weight="bold" size={32} />
          )}
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
};
