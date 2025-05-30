
import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Horse = {
  id: number;
  name: string;
  color: string;
  speed: number; // 1-10
  stamina: number; // 1-10
  odds: number; // e.g., 3.5 means 3.5:1
  position: number; // position in race (0-100)
  lane: number; // 1-6
};

export type GamePhase = 'title' | 'instructions' | 'lobby' | 'selection' | 'race' | 'results';

type GameContextType = {
  phase: GamePhase;
  setPhase: (phase: GamePhase) => void;
  balance: number;
  setBalance: (balance: number) => void;
  horses: Horse[];
  selectedHorse: Horse | null;
  setSelectedHorse: (horse: Horse | null) => void;
  betAmount: number;
  setBetAmount: (amount: number) => void;
  winner: Horse | null;
  setWinner: (horse: Horse | null) => void;
  raceComplete: boolean;
  setRaceComplete: (complete: boolean) => void;
  resetRace: () => void;
  startRace: () => void;
};

const initialHorses: Horse[] = [
  { id: 1, name: "Thunder Bolt", color: "#FF5733", speed: 9, stamina: 7, odds: 2.5, position: 0, lane: 1 },
  { id: 2, name: "Silver Arrow", color: "#C70039", speed: 8, stamina: 8, odds: 3.2, position: 0, lane: 2 },
  { id: 3, name: "Midnight Star", color: "#900C3F", speed: 7, stamina: 9, odds: 4.0, position: 0, lane: 3 },
  { id: 4, name: "Golden Dash", color: "#FF9A00", speed: 9, stamina: 6, odds: 2.8, position: 0, lane: 4 },
  { id: 5, name: "Royal Flush", color: "#4A235A", speed: 6, stamina: 10, odds: 5.5, position: 0, lane: 5 },
  { id: 6, name: "Wild Wind", color: "#0074D9", speed: 10, stamina: 5, odds: 3.0, position: 0, lane: 6 }
];

export const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [phase, setPhase] = useState<GamePhase>('title');
  const [balance, setBalance] = useState(1000); // Start with $1000
  const [horses, setHorses] = useState<Horse[]>(initialHorses);
  const [selectedHorse, setSelectedHorse] = useState<Horse | null>(null);
  const [betAmount, setBetAmount] = useState(0);
  const [winner, setWinner] = useState<Horse | null>(null);
  const [raceComplete, setRaceComplete] = useState(false);
  const [raceInterval, setRaceInterval] = useState<NodeJS.Timeout | null>(null);

  const resetRace = () => {
    if (raceInterval) clearInterval(raceInterval);
    
    const resetHorses = horses.map(horse => ({
      ...horse,
      position: 0
    }));
    setHorses(resetHorses);
    setSelectedHorse(null);
    setBetAmount(0);
    setWinner(null);
    setRaceComplete(false);
  };

  const startRace = () => {
    if (raceInterval) clearInterval(raceInterval);
    setRaceComplete(false);
    
    const interval = setInterval(() => {
      setHorses(prevHorses => {
        // Race logic
        const updatedHorses = prevHorses.map(horse => {
          // Calculate movement based on speed and some randomness
          const speedFactor = horse.speed / 10;
          const staminaFactor = horse.stamina / 10;
          const randomness = Math.random() * 2 - 1; // -1 to 1
          
          // Position increases more at the beginning, less at the end (simulating stamina)
          let positionDelta = speedFactor * 2;
          
          if (horse.position > 50) {
            positionDelta *= staminaFactor; // Stamina affects second half
          }
          
          // Add randomness
          positionDelta += randomness;
          
          // Ensure minimum progress
          positionDelta = Math.max(0.5, positionDelta);
          
          return {
            ...horse,
            position: Math.min(100, horse.position + positionDelta)
          };
        });
        
        // Check if any horse has finished
        const finishedHorses = updatedHorses.filter(h => h.position >= 100);
        
        if (finishedHorses.length > 0) {
          // Find the winner (first to reach 100)
          const raceWinner = updatedHorses.reduce((prev, current) => 
            (prev.position > current.position) ? prev : current
          );
          
          setWinner(raceWinner);
          setRaceComplete(true);
          
          // Update balance if the player's horse won
          if (selectedHorse && raceWinner.id === selectedHorse.id) {
            setBalance(prev => prev + (betAmount * selectedHorse.odds));
          }
          
          clearInterval(interval);
        }
        
        return updatedHorses;
      });
    }, 100); // Update every 100ms
    
    setRaceInterval(interval);
  };

  return (
    <GameContext.Provider 
      value={{
        phase,
        setPhase,
        balance,
        setBalance,
        horses,
        selectedHorse,
        setSelectedHorse,
        betAmount,
        setBetAmount,
        winner,
        setWinner,
        raceComplete,
        setRaceComplete,
        resetRace,
        startRace
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
