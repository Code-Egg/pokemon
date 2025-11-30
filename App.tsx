import React, { useState, useEffect, useCallback } from 'react';
import { Board } from './components/Board';
import { Controls } from './components/Controls';
import { POKEMON_LIST, DEFAULT_GRID_SIZE } from './constants';
import { shufflePuzzle, isSolved, getSolvedState } from './utils/puzzle';
import { Pokemon, PuzzleState, GridSize } from './types';
import { Sparkles } from 'lucide-react';

const App: React.FC = () => {
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon>(POKEMON_LIST[0]);
  const [gridSize, setGridSize] = useState<GridSize>(DEFAULT_GRID_SIZE);
  
  const [gameState, setGameState] = useState<PuzzleState>({
    gridSize: DEFAULT_GRID_SIZE,
    tiles: getSolvedState(DEFAULT_GRID_SIZE),
    isSolved: false,
    moves: 0,
    isPlaying: false
  });

  // Initialize game on load or pokemon/size change
  const startNewGame = useCallback((size: number = gridSize) => {
    const newTiles = shufflePuzzle(size);
    setGameState({
      gridSize: size,
      tiles: newTiles,
      isSolved: false,
      moves: 0,
      isPlaying: true
    });
  }, [gridSize]);

  // Initial load shuffle
  useEffect(() => {
    startNewGame(gridSize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleMove = (newTiles: number[]) => {
    if (gameState.isSolved) return;

    const solved = isSolved(newTiles);
    setGameState(prev => ({
      ...prev,
      tiles: newTiles,
      moves: prev.moves + 1,
      isSolved: solved,
      isPlaying: !solved
    }));
  };

  const handlePokemonSelect = (pokemon: Pokemon) => {
    setSelectedPokemon(pokemon);
    startNewGame(gridSize);
  };

  const handleResize = (size: GridSize) => {
    setGridSize(size);
    startNewGame(size);
  };

  return (
    // Changed container to min-h-screen and standard flow to allow native scrolling
    <div className="min-h-screen bg-slate-900 flex flex-col items-center py-6 px-4">
      
      {/* Header */}
      <div className="mb-6 text-center space-y-1">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 tracking-tight flex items-center justify-center gap-2">
          <Sparkles className="text-yellow-400 w-6 h-6 sm:w-8 sm:h-8" />
          PokéPuzzle
        </h1>
        <p className="text-slate-400 text-sm sm:text-base font-medium">Slide to solve the challenge!</p>
      </div>

      {/* Main Game Area */}
      <div className="w-full flex flex-col items-center gap-6 animate-fade-in-up flex-grow">
        
        <Board 
          state={gameState} 
          imageUrl={selectedPokemon.imageUrl} 
          color={selectedPokemon.color}
          onMove={handleMove} 
        />

        <Controls 
          currentPokemon={selectedPokemon}
          moves={gameState.moves}
          onSelectPokemon={handlePokemonSelect}
          onReset={() => startNewGame(gridSize)}
          gridSize={gridSize}
          onResize={handleResize}
          isSolved={gameState.isSolved}
        />
      </div>

      {/* Footer */}
      <footer className="mt-4 pb-4 text-slate-600 text-xs sm:text-sm text-center">
        <p>Challenge yourself with {gridSize}x{gridSize} grid ({gridSize*gridSize} tiles)!</p>
      </footer>
    </div>
  );
};

export default App;