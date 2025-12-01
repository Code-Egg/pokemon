import React, { forwardRef } from 'react';
import { Tile } from './Tile';
import { PuzzleState } from '../types';

interface TrayProps {
  state: PuzzleState;
  imageUrl: string;
  color: string;
  onTileDrop: (tileId: number, point: { x: number; y: number }) => void;
}

export const Tray = forwardRef<HTMLDivElement, TrayProps>(({ state, imageUrl, color, onTileDrop }, ref) => {
  const { bank, gridSize, isSolved } = state;

  if (isSolved) return null;

  return (
    <div 
      ref={ref}
      className="w-full max-w-md bg-slate-800/50 rounded-xl border border-slate-700 p-4 min-h-[100px] flex flex-wrap gap-2 justify-center items-center transition-all"
    >
      {bank.length === 0 ? (
        <div className="text-slate-500 text-sm font-medium italic">
          All pieces placed! Check the board.
        </div>
      ) : (
        bank.map((tileId) => (
          <Tile
            key={`${gridSize}-${tileId}`}
            id={tileId}
            gridSize={gridSize}
            imageUrl={imageUrl}
            color={color}
            isSolved={isSolved}
            isInBank={true}
            onDragEnd={onTileDrop}
          />
        ))
      )}
    </div>
  );
});

Tray.displayName = "Tray";