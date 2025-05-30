
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
