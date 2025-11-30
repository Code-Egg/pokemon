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
    <div className="flex flex-col gap-4 w-full max-w-md pb-8">
      {/* Stats and Controls */}
      <div className="flex flex-col gap-2 bg-slate-800/80 p-3 rounded-2xl border border-slate-700 shadow-lg backdrop-blur">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-slate-400 text-[10px] uppercase tracking-wider font-bold">Moves</span>
            <span className="text-xl font-bold font-mono text-white leading-none">{moves}</span>
          </div>
          <button 
            onClick={onReset}
            className="p-2 bg-slate-700 hover:bg-slate-600 active:bg-slate-500 rounded-xl text-white transition-colors shadow-lg"
            title="Shuffle Board"
          >
            <RefreshCw size={20} />
          </button>
        </div>

        {/* Grid Size Selectors */}
        <div className="grid grid-cols-4 gap-2 mt-1">
           {[3, 4, 5, 8].map((size) => (
             <button 
              key={size}
              onClick={() => onResize(size as GridSize)}
              className={`py-1.5 px-1 rounded-lg transition-all text-center ${
                gridSize === size 
                  ? 'bg-blue-500 text-white shadow-md scale-105 font-bold' 
                  : 'bg-slate-700 text-slate-400 hover:bg-slate-600'
              }`}
            >
              <span className="text-xs">{size}x{size}</span>
            </button>
           ))}
        </div>
      </div>

      {/* Pokemon Selector */}
      <div>
        <h3 className="text-slate-400 text-xs font-bold mb-2 uppercase tracking-wider ml-1">Select Challenge</h3>
        <div className="grid grid-cols-3 gap-2">
          {POKEMON_LIST.map((poke) => (
            <button
              key={poke.id}
              onClick={() => onSelectPokemon(poke)}
              className={`
                relative group flex flex-col items-center p-2 rounded-xl border-2 transition-all duration-300
                ${currentPokemon.id === poke.id 
                  ? `${poke.color} ${poke.accentColor} scale-105 shadow-xl` 
                  : 'bg-slate-800 border-transparent hover:bg-slate-700'
                }
              `}
            >
              <div className="w-12 h-12 sm:w-16 sm:h-16 relative mb-1 z-10">
                <img 
                  src={poke.imageUrl} 
                  alt={poke.name} 
                  className={`w-full h-full object-contain drop-shadow-md transition-transform duration-300 ${
                    currentPokemon.id === poke.id ? 'scale-110' : 'scale-100 group-hover:scale-110'
                  }`}
                />
              </div>
              <span className={`text-xs font-bold uppercase tracking-wider ${
                currentPokemon.id === poke.id ? 'text-white' : 'text-slate-500 group-hover:text-slate-300'
              }`}>
                {poke.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};