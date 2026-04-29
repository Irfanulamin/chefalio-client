import { Recipe } from "@/types/recipes.type";
import { useDrag } from "@use-gesture/react";
import { useSpring, animated } from "@react-spring/web";
import { CheckIcon } from "@phosphor-icons/react/dist/ssr";

function StepCard({
  step,
  instruction,
  done,
  total,
  onToggle,
}: {
  step: number;
  instruction: string;
  done: boolean;
  total: number;
  onToggle: () => void;
}) {
  const [{ x, scale }, api] = useSpring(() => ({ x: 0, scale: 1 }));

  const bind = useDrag(
    ({ active, movement: [mx], velocity: [vx], last }) => {
      api.start({
        x: active ? mx : 0,
        scale: active ? 0.97 : 1,
        immediate: (key) => key === "x" && active,
        config: { tension: 300, friction: 26 },
      });
      if (last && (mx > 60 || vx > 0.5)) {
        onToggle();
        api.start({ x: 0, scale: 1 });
      }
    },
    { axis: "x", filterTaps: true },
  );

  return (
    <animated.div
      {...bind()}
      onClick={onToggle}
      style={{ x, scale, touchAction: "pan-y" }}
      className={`group relative rounded-2xl overflow-hidden select-none cursor-pointer
        transition-all duration-300
        ${
          done
            ? "bg-green-50 dark:bg-green-950/40 border border-green-200 dark:border-green-800/60 shadow-sm shadow-green-100 dark:shadow-green-950/30"
            : `bg-[#eeeae4] dark:bg-black
               border border-[#e2ddd8] dark:border-[#35312c]
               hover:border-[#c8c0b8] dark:hover:border-[#48433d]
               hover:-translate-y-0.5 hover:shadow-md`
        }`}
    >
      {/* Left accent bar */}
      <div
        className={`absolute left-0 top-0 bottom-0 w-0.75 transition-all duration-500
          ${done ? "bg-emerald-400" : "bg-[#d8d0c8] dark:bg-[#3d3830] group-hover:bg-[#b8b0a8] dark:group-hover:bg-[#5a5248]"}`}
      />

      {/* Subtle done shimmer */}
      {done && (
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            background:
              "linear-gradient(105deg, transparent 35%, rgba(34,197,94,0.55) 80%, transparent 85%)",
            backgroundSize: "200% 100%",
            animation: "shimmer 2s ease-in-out infinite",
          }}
        />
      )}

      <div className="pl-5 pr-5 py-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <div
              className={`w-7 h-7 flex items-center justify-center font-black text-base
                transition-all duration-300 border-2 rounded-full
                ${
                  done
                    ? "bg-emerald-500 border-emerald-400 text-white scale-110"
                    : "border-[#e2ddd8] dark:border-[#35312c] text-black dark:text-white group-hover:border-[#c8c0b8] dark:group-hover:border-[#48433d]"
                }`}
            >
              {done ? (
                <CheckIcon weight="bold" size={12} />
              ) : (
                <span className="text-xs">{step}</span>
              )}
            </div>
            <span
              className={`font-bold text-sm uppercase tracking-widest transition-colors duration-300
                ${done ? "text-emerald-500" : "text-[#b0a898] dark:text-[#5a5248] group-hover:text-[#8a8278] dark:group-hover:text-[#7a7268]"}`}
            >
              Step {step}
            </span>
          </div>

          <span
            className={`text-xs font-semibold px-2 py-0.5 rounded-md transition-colors
              ${
                done
                  ? "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300"
                  : "bg-[#f0ece8] dark:bg-[#302d28] text-[#a09890] dark:text-[#5a5248]"
              }`}
          >
            {step}/{total}
          </span>
        </div>

        <p
          className={`text-base leading-relaxed transition-all duration-300
            ${
              done
                ? "line-through text-[#a0a898] dark:text-[#4a5248]"
                : "text-[#3d3830] dark:text-[#c8c0b8]"
            }`}
        >
          {instruction}
        </p>

        <p
          className={`text-xs font-medium mt-3 transition-colors
            ${
              done
                ? "text-emerald-400/70"
                : "text-[#c8c0b8] dark:text-[#3a3630] group-hover:text-[#a0998e] dark:group-hover:text-[#5a5248]"
            }`}
        >
          {done ? "← Tap to undo" : "→ Swipe right or tap to complete"}
        </p>
      </div>
    </animated.div>
  );
}

export function Instructions({
  progress,
  allDone,
  recipe,
  completedSteps,
  toggleStep,
}: {
  progress: number;
  allDone: boolean;
  recipe: Recipe;
  completedSteps: Set<number>;
  toggleStep: (step: number) => void;
}) {
  return (
    <section className="mb-10">
      <div className="flex items-baseline justify-between mb-4">
        <h2 className="text-xl font-black text-black dark:text-white tracking-tight">
          Instructions
        </h2>

        <span
          className={`text-sm font-semibold px-2.5 py-1 rounded-lg border transition-colors
            ${
              allDone
                ? "text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 border-emerald-200 dark:border-emerald-800"
                : "text-black dark:text-white bg-white dark:bg-[#26231f] border-[#e2ddd8] dark:border-[#35312c]"
            }`}
        >
          {completedSteps.size}/{recipe.instructions.length} done
        </span>
      </div>

      {/* Progress bar */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex-1 h-1.5 bg-[#ddd8d2] dark:bg-[#2a2720] rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-700 ease-out
              ${
                allDone
                  ? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]"
                  : "bg-emerald-500"
              }`}
            style={{ width: `${progress}%` }}
          />
        </div>

        <span
          className={`text-sm font-bold tabular-nums w-9 text-right transition-colors
            ${allDone ? "text-emerald-500" : "text-[#a09890] dark:text-[#5a5248]"}`}
        >
          {progress}%
        </span>
      </div>

      {allDone && (
        <div
          className="mb-4 px-4 py-3 rounded-xl
            bg-emerald-50 dark:bg-emerald-950/40
            border border-emerald-200 dark:border-emerald-800/60
            animate-in slide-in-from-bottom-2 fade-in duration-400"
        >
          <p className="text-sm font-bold text-emerald-700 dark:text-emerald-300">
            🎉 All done! Enjoy your meal.
          </p>
        </div>
      )}

      {!allDone && (
        <p className="text-xs text-[#c0b8b0] dark:text-[#3a3630] font-medium mb-4 select-none tracking-wide">
          Swipe right or tap each step to complete
        </p>
      )}

      <div className="flex flex-col gap-2.5">
        {recipe.instructions.map(({ step, instruction, _id }) => (
          <StepCard
            key={_id}
            step={step}
            instruction={instruction}
            done={completedSteps.has(step)}
            total={recipe.instructions.length}
            onToggle={() => toggleStep(step)}
          />
        ))}
      </div>

      {/* Shimmer keyframe injected once */}
      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </section>
  );
}
