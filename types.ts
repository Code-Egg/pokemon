
export interface Pokemon {
  id: number;
  name: string;
  imageUrl: string;
  color: string;
  accentColor: string;
  type: 'electric' | 'grass' | 'psychic';
}

export interface PuzzleState {
  gridSize: number;
  board: (number | null)[]; // Array of tile IDs placed on the board. null means empty slot.
  bank: number[]; // Array of tile IDs currently in the bank/tray.
  isSolved: boolean;
  isPlaying: boolean;
}

export type GridSize = 3 | 4 | 5 | 8;
