import type { CategoryId } from "@/types/question";
import { ALL_CATEGORIES } from "@/types/question";

interface Props {
  categoryId: CategoryId;
}

export function CategoryHeader({ categoryId }: Props) {
  const meta = ALL_CATEGORIES.find((c) => c.id === categoryId);
  if (!meta) return null;

  return (
    <div className="bg-blue-700 rounded-lg p-2 text-center min-h-[80px] flex flex-col items-center justify-center">
      <span className="text-xl">{meta.icon}</span>
      <span className="text-white font-bold text-xs sm:text-sm leading-tight mt-1">
        {meta.displayName}
      </span>
    </div>
  );
}
