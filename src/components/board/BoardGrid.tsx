import { useGame } from "@/context/GameContext";
import { POINT_VALUES } from "@/types/game";
import { CategoryHeader } from "./CategoryHeader";
import { BoardCell } from "./BoardCell";

export function BoardGrid() {
  const { state, dispatch, mode } = useGame();

  return (
    <div className="grid grid-cols-6 gap-1.5 bg-blue-950 p-3 rounded-xl shadow-2xl max-w-5xl mx-auto">
      {state.categories.map((catId) => (
        <CategoryHeader key={catId} categoryId={catId} />
      ))}

      {POINT_VALUES.map((_, rowIdx) =>
        state.categories.map((_, colIdx) => {
          const cell = state.board[colIdx][rowIdx];
          return (
            <BoardCell
              key={`${colIdx}-${rowIdx}`}
              cell={cell}
              onClick={
                mode === "host"
                  ? () =>
                      dispatch({
                        type: "SELECT_CELL",
                        colIndex: colIdx,
                        rowIndex: rowIdx,
                      })
                  : undefined
              }
            />
          );
        })
      )}
    </div>
  );
}
