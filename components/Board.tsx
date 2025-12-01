import React, { forwardRef } from 'react';
import { Tile } from './Tile';
import { PuzzleState } from '../types';

interface BoardProps {
  state: PuzzleState;
  imageUrl: string;
  color: string;
  showHint: boolean;
  onTileDrop: (tileId: number, point: { x: number; y: number }) => void;
}

export const Board = forwardRef<HTMLDivElement, BoardProps>(({ state, imageUrl, color, showHint, onTileDrop }, ref) => {
  const { board, gridSize, isSolved } = state;

  return (
    <div className="relative w-full max-w-md aspect-square p-2 rounded-xl border border-slate-700 shadow-2xl backdrop-blur-sm transition-all">
      
      {/* Ghost Image Background */}
      <div 
        className={`absolute inset-2 rounded-lg pointer-events-none filter grayscale transition-opacity duration-500 ${showHint ? 'opacity-20' : 'opacity-0'}`}
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />

      {/* Grid */}
      <div 
        key={gridSize}
        ref={ref}
        className="grid w-full h-full gap-1 relative z-10"
        style={{ 
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
          gridTemplateRows: `repeat(${gridSize}, 1fr)`
        }}
      >
        {board.map((tileId, index) => {
          return (
            <div 
              key={index}
              className="w-full h-full relative rounded-md border border-white/5 bg-slate-800/30"
            >
              {tileId !== null && (
                <Tile
                  id={tileId}
                  gridSize={gridSize}
                  imageUrl={imageUrl}
                  color={color}
                  isSolved={isSolved}
                  onDragEnd={onTileDrop}
                />
              )}
            </div>
          );
        })}
      </div>
      
      {isSolved && (
        <div className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none animate-in fade-in duration-700">
          <div className="bg-black/40 absolute inset-0 rounded-xl backdrop-blur-[2px]" />
          <div className="bg-white text-slate-900 px-8 py-6 rounded-3xl shadow-2xl transform animate-bounce z-50 text-center border-4 border-yellow-400">
            <p className="text-4xl font-black mb-2 text-yellow-500 drop-shadow-sm">GREAT JOB!</p>
            <p className="text-base font-bold text-slate-600">Puzzle Solved!</p>
          </div>
        </div>
      )}
    </div>
  );
});

Board.displayName = "Board";