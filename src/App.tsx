import { GameProvider, useGame } from "@/context/GameContext";
import { Toaster } from "@/components/ui/sonner";
import { SetupScreen } from "@/components/screens/SetupScreen";
import { BoardScreen } from "@/components/screens/BoardScreen";
import { QuestionScreen } from "@/components/screens/QuestionScreen";
import { GameOverScreen } from "@/components/screens/GameOverScreen";

function GameScreens() {
  const { state } = useGame();

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
