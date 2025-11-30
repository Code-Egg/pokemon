import React from 'react';
import { Tile } from './Tile';
import { PuzzleState } from '../types';
import { getValidMoveTarget } from '../utils/puzzle';

interface BoardProps {
  state: PuzzleState;
  imageUrl: string;
  color: string;
  onMove: (newTiles: number[]) => void;
}

export const Board: React.FC<BoardProps> = ({ state, imageUrl, color, onMove }) => {
  const { tiles, gridSize, isSolved } = state;

  const handleTileClick = (index: number) => {
    if (isSolved) return;

    // Check if move is valid
    const emptyIndex = getValidMoveTarget(tiles, index, gridSize);
    
    if (emptyIndex !== -1) {
      // Create new array copy
      const newTiles = [...tiles];
      // Swap
      [newTiles[index], newTiles[emptyIndex]] = [newTiles[emptyIndex], newTiles[index]];
      onMove(newTiles);
    }
  };

  return (
    <div 
      className="relative w-full max-w-md aspect-square bg-slate-800/50 p-2 rounded-xl border border-slate-700 shadow-2xl backdrop-blur-sm"
    >
      <div 
        className="grid w-full h-full gap-1"
        style={{ 
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
          gridTemplateRows: `repeat(${gridSize}, 1fr)`
        }}
      >
        {tiles.map((tileId, index) => {
          const isEmpty = tileId === (gridSize * gridSize - 1);
          return (
            <Tile
              key={tileId} // Key by ID to let framer-motion handle the position animation
              id={tileId}
              index={index}
              gridSize={gridSize}
              imageUrl={imageUrl}
              color={color}
              isEmpty={isEmpty}
              isSolved={isSolved}
              onClick={() => handleTileClick(index)}
            />
          );
        })}
      </div>
      
      {isSolved && (
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
          <div className="bg-black/60 absolute inset-0 rounded-xl" />
          <div className="bg-white text-slate-900 px-6 py-4 rounded-2xl shadow-xl transform animate-bounce z-20 text-center">
            <p className="text-2xl font-bold mb-1">Excellent!</p>
            <p className="text-sm text-slate-600">Puzzle Complete</p>
          </div>
        </div>
      )}
    </div>
  );
};