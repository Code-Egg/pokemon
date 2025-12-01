import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Board } from './components/Board';
import { Tray } from './components/Tray';
import { Controls } from './components/Controls';
import { POKEMON_LIST, DEFAULT_GRID_SIZE } from './constants';
import { initPuzzle, isSolved } from './utils/puzzle';
import { Pokemon, PuzzleState, GridSize } from './types';
import { Sparkles, Puzzle } from 'lucide-react';

const App: React.FC = () => {
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon>(POKEMON_LIST[0]);
  const [gridSize, setGridSize] = useState<GridSize>(DEFAULT_GRID_SIZE);
  const [showHint, setShowHint] = useState<boolean>(true);
  
  const [gameState, setGameState] = useState<PuzzleState>({
    gridSize: DEFAULT_GRID_SIZE,
    board: [],
    bank: [],
    isSolved: false,
    isPlaying: false
  });

  const boardRef = useRef<HTMLDivElement>(null);
  const trayRef = useRef<HTMLDivElement>(null);

  // Initialize game on load or pokemon/size change
  const startNewGame = useCallback((size: number = gridSize) => {
    const { board, bank } = initPuzzle(size);
    setGameState({
      gridSize: size,
      board,
      bank,
      isSolved: false,
      isPlaying: true
    });
  }, [gridSize]);

  // Initial load
  useEffect(() => {
    startNewGame(gridSize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDragEnd = (tileId: number, point: { x: number; y: number }) => {
    if (gameState.isSolved) return;

    // Check Board Collision
    if (boardRef.current) {
      const rect = boardRef.current.getBoundingClientRect();
      const relativeX = point.x - rect.left;
      const relativeY = point.y - rect.top;

      // Is it inside the board?
      if (
        point.x >= rect.left && 
        point.x <= rect.right && 
        point.y >= rect.top && 
        point.y <= rect.bottom
      ) {
        // Calculate grid index
        const col = Math.floor((relativeX / rect.width) * gridSize);
        const row = Math.floor((relativeY / rect.height) * gridSize);
        
        if (col >= 0 && col < gridSize && row >= 0 && row < gridSize) {
          const targetIndex = row * gridSize + col;
          moveTileToBoard(tileId, targetIndex);
          return;
        }
      }
    }

    // Check Tray Collision (Optional, or just default to tray if dropped outside board)
    // For "Real Puzzle" feel, let's say if you drop it outside the board, it goes to the tray.
    moveTileToBank(tileId);
  };

  const moveTileToBoard = (tileId: number, targetIndex: number) => {
    setGameState(prev => {
      const newBoard = [...prev.board];
      const newBank = [...prev.bank];

      // 1. Remove tile from wherever it was
      // Check bank
      const bankIndex = newBank.indexOf(tileId);
      if (bankIndex !== -1) {
        newBank.splice(bankIndex, 1);
      }
      // Check board
      const oldBoardIndex = newBoard.indexOf(tileId);
      if (oldBoardIndex !== -1) {
        newBoard[oldBoardIndex] = null;
      }

      // 2. Handle target slot
      const existingTileInSlot = newBoard[targetIndex];
      if (existingTileInSlot !== null && existingTileInSlot !== tileId) {
        // Option: Send existing tile back to bank
        newBank.push(existingTileInSlot);
      }
      
      // 3. Place new tile
      newBoard[targetIndex] = tileId;

      const solved = isSolved(newBoard);

      return {
        ...prev,
        board: newBoard,
        bank: newBank,
        isSolved: solved,
        isPlaying: !solved
      };
    });
  };

  const moveTileToBank = (tileId: number) => {
    setGameState(prev => {
      // If it's already in bank, do nothing
      if (prev.bank.includes(tileId)) return prev;

      const newBoard = [...prev.board];
      const newBank = [...prev.bank];

      // Remove from board
      const oldBoardIndex = newBoard.indexOf(tileId);
      if (oldBoardIndex !== -1) {
        newBoard[oldBoardIndex] = null;
      }

      // Add to bank
      newBank.push(tileId);

      return {
        ...prev,
        board: newBoard,
        bank: newBank,
        isSolved: false
      };
    });
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
    <div className="min-h-screen bg-slate-900 flex flex-col items-center py-6 px-4">
      
      {/* Header */}
      <div className="mb-6 text-center space-y-1">
        <h1 className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 tracking-tight flex items-center justify-center gap-2">
          <Sparkles className="text-yellow-400 w-6 h-6" />
          PokéPuzzle
        </h1>
        <p className="text-slate-400 text-sm font-medium flex items-center justify-center gap-1">
           <Puzzle size={14} />
           Drag pieces to the board to build the image!
        </p>
      </div>

      {/* Main Game Area */}
      <div className="w-full flex flex-col items-center gap-6 animate-fade-in-up flex-grow max-w-lg">
        
        {/* The Board */}
        <Board 
          ref={boardRef}
          state={gameState} 
          imageUrl={selectedPokemon.imageUrl} 
          color={selectedPokemon.color}
          showHint={showHint}
          onTileDrop={handleDragEnd} 
        />

        {/* The Tray (Bank) */}
        <Tray
          ref={trayRef}
          state={gameState}
          imageUrl={selectedPokemon.imageUrl}
          color={selectedPokemon.color}
          onTileDrop={handleDragEnd}
        />

        {/* Controls */}
        <Controls 
          currentPokemon={selectedPokemon}
          onSelectPokemon={handlePokemonSelect}
          onReset={() => startNewGame(gridSize)}
          gridSize={gridSize}
          onResize={handleResize}
          showHint={showHint}
          onToggleHint={() => setShowHint(!showHint)}
        />
      </div>

      <footer className="mt-8 pb-4 text-slate-600 text-xs text-center">
        <p>Drop a piece outside the board to return it to the tray.</p>
      </footer>
    </div>
  );
};

export default App;