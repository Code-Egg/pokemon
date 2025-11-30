import React from 'react';
import { motion } from 'framer-motion';

interface TileProps {
  id: number;
  index: number;
  gridSize: number;
  imageUrl: string;
  isEmpty: boolean;
  onClick: () => void;
  isSolved: boolean;
}

export const Tile: React.FC<TileProps> = ({
  id,
  index,
  gridSize,
  imageUrl,
  isEmpty,
  onClick,
  isSolved,
}) => {
  // If the puzzle is solved, we fill the empty slot (usually the last piece)
  // to complete the image.
  const showTile = !isEmpty || isSolved;

  if (!showTile) {
    return <div className="w-full h-full" />;
  }

  // Calculate the background position based on the tile's ORIGINAL position (id)
  const originalRow = Math.floor(id / gridSize);
  const originalCol = id % gridSize;
  
  const percentage = 100 / (gridSize - 1);
  const bgPosX = originalCol * percentage;
  const bgPosY = originalRow * percentage;

  return (
    <motion.button
      layout
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      onClick={onClick}
      className={`relative w-full h-full overflow-hidden rounded-md shadow-sm border border-white/20 hover:brightness-110 active:scale-95 transition-all ${isEmpty && isSolved ? 'opacity-100' : ''}`}
      style={{
        // If it's the "empty" tile shown at the end, use the last ID
        background: `url(${imageUrl})`,
        backgroundSize: `${gridSize * 100}%`,
        backgroundPosition: `${bgPosX}% ${bgPosY}%`,
        zIndex: isEmpty ? 0 : 1
      }}
      disabled={isSolved && !isEmpty}
    >
        {/* Optional: Number overlay for easier debugging/playing, can be toggled if we added a setting */}
        {/* <span className="absolute top-1 left-1 text-xs font-bold text-white drop-shadow-md bg-black/30 rounded px-1">{id + 1}</span> */}
    </motion.button>
  );
};