
import React from 'react';
import { GameProvider, useGame } from "@/context/GameContext";
import TitlePage from "@/components/TitlePage";
import InstructionsPage from "@/components/InstructionsPage";
import LobbyPage from "@/components/LobbyPage";
import HorseSelectionPage from "@/components/HorseSelectionPage";
import RacePage from "@/components/RacePage";
import ResultsPage from "@/components/ResultsPage";
import BettingPage from "@/components/BettingPage";
const GameContent = () => {
  const { phase } = useGame();

  switch (phase) {
    case 'title':
      return <TitlePage />;
    case 'instructions':
      return <InstructionsPage />;
    case 'lobby':
      return <LobbyPage />;
    case 'selection':
      return <HorseSelectionPage />;
      case 'betting':
      return <BettingPage />;
    case 'race':
      return <RacePage />;
    case 'results':
      return <ResultsPage />;
    default:
      return <TitlePage />;
  }
};

const Index = () => {
  return (
    <GameProvider>
      <GameContent />
    </GameProvider>
  );
};

export default Index;
