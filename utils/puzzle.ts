// Utility functions for the sliding puzzle logic

/**
 * Checks if the current board state is solved.
 * A board is solved if tiles are in order: 0, 1, 2, ..., N-1.
 */
export const isSolved = (tiles: number[]): boolean => {
  for (let i = 0; i < tiles.length; i++) {
    if (tiles[i] !== i) return false;
  }
  return true;
};

/**
 * Generates a solved board state [0, 1, ..., size*size - 1].
 */
export const getSolvedState = (size: number): number[] => {
  return Array.from({ length: size * size }, (_, i) => i);
};

/**
 * Checks if a move is valid (tile is adjacent to empty slot).
 * Returns the index of the empty slot if valid, otherwise -1.
 */
export const getValidMoveTarget = (
  tiles: number[],
  tileIndex: number,
  size: number
): number => {
  const emptyIndex = tiles.indexOf(size * size - 1); // Last ID is the empty tile
  
  const row = Math.floor(tileIndex / size);
  const col = tileIndex % size;
  const emptyRow = Math.floor(emptyIndex / size);
  const emptyCol = emptyIndex % size;

  // Check adjacency (up, down, left, right)
  const isAdjacent =
    (Math.abs(row - emptyRow) === 1 && col === emptyCol) ||
    (Math.abs(col - emptyCol) === 1 && row === emptyRow);

  return isAdjacent ? emptyIndex : -1;
};

/**
 * Shuffles the board by performing random valid moves.
 * This ensures the puzzle is always solvable.
 */
export const shufflePuzzle = (size: number, moveCount: number = 100): number[] => {
  const tiles = getSolvedState(size);
  const emptyTileId = size * size - 1;
  let emptyIndex = size * size - 1; // Initially at the end
  let lastEmptyIndex = -1; // Avoid immediate undo moves

  for (let i = 0; i < moveCount; i++) {
    const possibleMoves: number[] = [];
    const row = Math.floor(emptyIndex / size);
    const col = emptyIndex % size;

    // Check all 4 directions
    const directions = [
      { r: -1, c: 0 }, // Up
      { r: 1, c: 0 },  // Down
      { r: 0, c: -1 }, // Left
      { r: 0, c: 1 },  // Right
    ];

    for (const d of directions) {
      const newRow = row + d.r;
      const newCol = col + d.c;

      if (newRow >= 0 && newRow < size && newCol >= 0 && newCol < size) {
        const neighborIndex = newRow * size + newCol;
        if (neighborIndex !== lastEmptyIndex) {
          possibleMoves.push(neighborIndex);
        }
      }
    }

    if (possibleMoves.length > 0) {
      const randomMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
      
      // Swap
      [tiles[emptyIndex], tiles[randomMove]] = [tiles[randomMove], tiles[emptyIndex]];
      
      lastEmptyIndex = emptyIndex;
      emptyIndex = randomMove;
    }
  }

  return tiles;
};