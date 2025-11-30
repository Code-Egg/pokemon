import React from 'react';
import { POKEMON_LIST } from '../constants';
import { Pokemon, GridSize } from '../types';
import { RefreshCw } from 'lucide-react';

interface ControlsProps {
  currentPokemon: Pokemon;
  moves: number;
  onSelectPokemon: (pokemon: Pokemon) => void;
  onReset: () => void;
  gridSize: number;
  onResize: (size: GridSize) => void;
  isSolved: boolean;
}

export const Controls: React.FC<ControlsProps> = ({
  currentPokemon,
  moves,
  onSelectPokemon,
  onReset,
  gridSize,
  onResize,
  isSolved
}) => {
  return (
    <div className="flex flex-col gap-6 w-full max-w-md">
      {/* Top Stats Bar */}
      <div className="flex items-center justify-between bg-slate-800/80 p-4 rounded-2xl border border-slate-700 shadow-lg backdrop-blur">
        <div className="flex flex-col">
          <span className="text-slate-400 text-xs uppercase tracking-wider font-bold">Moves</span>
          <span className="text-2xl font-bold font-mono text-white">{moves}</span>
        </div>
        
        <div className="flex gap-2">
           <button 
            onClick={() => onResize(3)}
            className={`p-2 rounded-lg transition-colors ${gridSize === 3 ? 'bg-blue-500 text-white' : 'bg-slate-700 text-slate-400 hover:bg-slate-600'}`}
            title="3x3 (Easy)"
          >
            <span className="font-bold text-xs">3x3</span>
          </button>
          <button 
            onClick={() => onResize(4)}
            className={`p-2 rounded-lg transition-colors ${gridSize === 4 ? 'bg-blue-500 text-white' : 'bg-slate-700 text-slate-400 hover:bg-slate-600'}`}
            title="4x4 (Normal)"
          >
            <span className="font-bold text-xs">4x4</span>
          </button>
           <button 
            onClick={onReset}
            className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-white transition-colors"
            title="Shuffle Board"
          >
            <RefreshCw size={20} />
          </button>
        </div>
      </div>

      {/* Pokemon Selector */}
      <div className="grid grid-cols-3 gap-3">
        {POKEMON_LIST.map((poke) => (
          <button
            key={poke.id}
            onClick={() => onSelectPokemon(poke)}
            className={`
              relative group flex flex-col items-center p-2 rounded-2xl border-2 transition-all duration-300
              ${currentPokemon.id === poke.id 
                ? `${poke.color} ${poke.accentColor} scale-105 shadow-xl` 
                : 'bg-slate-800 border-transparent hover:bg-slate-700'
              }
            `}
          >
            <div className="w-16 h-16 relative mb-1 z-10">
              <img 
                src={poke.imageUrl} 
                alt={poke.name} 
                className={`w-full h-full object-contain drop-shadow-md transition-transform duration-300 group-hover:scale-110`}
              />
            </div>
            <span className={`text-sm font-bold ${currentPokemon.id === poke.id ? 'text-white' : 'text-slate-400'}`}>
              {poke.name}
            </span>
            
            {/* Active Indicator Background Glow */}
            {currentPokemon.id === poke.id && (
              <div className="absolute inset-0 bg-white/10 rounded-2xl animate-pulse" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};