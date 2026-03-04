import type { BarGraphData } from "@/types/question";
import { cn } from "@/lib/utils";

interface Props {
  data: BarGraphData;
}

export function BarGraphQuestion({ data }: Props) {
  const maxValue = Math.max(...data.bars.map((b) => b.value));

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <h3 className="text-base font-bold text-center mb-4">{data.title}</h3>

      <div className="flex items-end gap-3 border-l-2 border-b-2 border-gray-300 pl-2 pb-1" style={{ height: 180 }}>
        {data.bars.map((bar) => (
          <div key={bar.label} className="flex flex-col items-center gap-1 flex-1">
            <span className="text-sm font-semibold">{bar.value}</span>
            <div
              className={cn("w-full rounded-t-md min-w-[30px]", bar.color)}
              style={{ height: `${(bar.value / maxValue) * 140}px` }}
            />
            <span className="text-xs text-center mt-1 leading-tight">{bar.label}</span>
          </div>
        ))}
      </div>

      <p className="text-xs text-muted-foreground text-center mt-2">{data.yAxisLabel}</p>
    </div>
  );
}
