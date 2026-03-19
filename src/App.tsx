import { GameProvider, useGame } from "@/context/GameContext";
import { Toaster } from "@/components/ui/sonner";
import { SetupScreen } from "@/components/screens/SetupScreen";
import { BoardScreen } from "@/components/screens/BoardScreen";
import { QuestionScreen } from "@/components/screens/QuestionScreen";
import { GameOverScreen } from "@/components/screens/GameOverScreen";

function GameScreens() {
  const { state, mode } = useGame();

  if (mode === "display" && state.phase === "setup") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-6">
          <h1 className="text-6xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Maggie Math Jeopardy
          </h1>
          <p className="text-2xl text-blue-300 animate-pulse">
            Waiting for the game to start...
          </p>
        </div>
      </div>
    );
  }

  switch (state.phase) {
    case "setup":
      return <SetupScreen />;
    case "board":
      return <BoardScreen />;
    case "question":
    case "answer":
      return <QuestionScreen />;
    case "gameOver":
      return <GameOverScreen />;
  }
}

function App() {
  return (
    <GameProvider>
      <div className="min-h-screen bg-gradient-to-b from-blue-950 to-blue-900">
        <GameScreens />
      </div>
      <Toaster />
    </GameProvider>
  );
}

export default App;
