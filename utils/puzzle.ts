
// Utility functions for the puzzle logic

/**
 * Checks if the current board state is solved.
 * A board is solved if every slot i contains tile i.
 */
export const isSolved = (board: (number | null)[]): boolean => {
  for (let i = 0; i < board.length; i++) {
    if (board[i] !== i) return false;
  }
  return true;
};

/**
 * Shuffles an array (Fisher-Yates).
 */
export const shuffleArray = (array: number[]): number[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

/**
 * Initializes the puzzle state.
 * Board is empty (all nulls).
 * Bank contains all tile IDs (0 to size*size - 1) shuffled.
 */
export const initPuzzle = (size: number): { board: (number | null)[], bank: number[] } => {
  const totalTiles = size * size;
  const board = Array(totalTiles).fill(null);
  const bank = shuffleArray(Array.from({ length: totalTiles }, (_, i) => i));
  
  return { board, bank };
};
