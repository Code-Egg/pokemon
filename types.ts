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
  tiles: number[]; // Array containing tile IDs. The value (gridSize*gridSize - 1) is the empty slot.
  isSolved: boolean;
  moves: number;
  isPlaying: boolean;
}

export type GridSize = 3 | 4 | 5;