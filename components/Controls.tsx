import React from 'react';
import { POKEMON_LIST } from '../constants';
import { Pokemon, GridSize } from '../types';
import { RefreshCw, Grid3x3, Grid, Box, Eye, EyeOff } from 'lucide-react';

interface ControlsProps {
  currentPokemon: Pokemon;
  onSelectPokemon: (pokemon: Pokemon) => void;
  onReset: () => void;
  gridSize: number;
  onResize: (size: GridSize) => void;
  showHint: boolean;
  onToggleHint: () => void;
}

export const Controls: React.FC<ControlsProps> = ({
  currentPokemon,
  onSelectPokemon,
  onReset,
  gridSize,
  onResize,
  showHint,
  onToggleHint
}) => {
  return (
    <div className="flex flex-col gap-4 w-full max-w-md pb-8">
      {/* Grid Size & Reset */}
      <div className="bg-slate-800/80 p-3 rounded-2xl border border-slate-700 shadow-lg backdrop-blur">
        <div className="flex items-center justify-between mb-3">
          <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Difficulty</span>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={onToggleHint}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                showHint ? 'bg-indigo-600 text-white hover:bg-indigo-500' : 'bg-slate-700 text-slate-400 hover:bg-slate-600'
              }`}
            >
              {showHint ? <Eye size={14} /> : <EyeOff size={14} />}
              {showHint ? 'Hint On' : 'Hint Off'}
            </button>
            <button 
              onClick={onReset}
              className="flex items-center gap-1 px-3 py-1.5 bg-slate-700 hover:bg-slate-600 rounded-lg text-xs font-bold text-white transition-colors"
            >
              <RefreshCw size={14} />
              Reset
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-4 gap-2">
           {[
             { size: 3, label: '9 Pcs', icon: Grid3x3 }, 
             { size: 4, label: '16 Pcs', icon: Grid }, 
             { size: 5, label: '25 Pcs', icon: Box },
             { size: 8, label: '64 Pcs', icon: Box },
           ].map((opt) => (
             <button 
              key={opt.size}
              onClick={() => onResize(opt.size as GridSize)}
              className={`py-2 px-1 rounded-lg transition-all text-center flex flex-col items-center justify-center gap-1 ${
                gridSize === opt.size 
                  ? 'bg-blue-600 text-white shadow-md ring-2 ring-blue-400/50' 
                  : 'bg-slate-700 text-slate-400 hover:bg-slate-600'
              }`}
            >
              <opt.icon size={16} />
              <span className="text-[10px] font-bold">{opt.label}</span>
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
              <span className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider ${
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