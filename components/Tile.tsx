import React from 'react';
import { motion } from 'framer-motion';

interface TileProps {
  id: number;
  gridSize: number;
  imageUrl: string;
  color: string;
  isSolved: boolean;
  isInBank?: boolean;
  onDragEnd: (id: number, point: { x: number; y: number }) => void;
}

export const Tile: React.FC<TileProps> = ({
  id,
  gridSize,
  imageUrl,
  color,
  isSolved,
  isInBank = false,
  onDragEnd,
}) => {
  // Calculate the background position based on the tile's ORIGINAL position (id)
  const originalRow = Math.floor(id / gridSize);
  const originalCol = id % gridSize;
  
  const percentage = 100 / (gridSize - 1);
  const bgPosX = originalCol * percentage;
  const bgPosY = originalRow * percentage;

  return (
    <motion.div
      layoutId={`tile-${gridSize}-${id}`}
      className={`relative rounded-md shadow-[0_2px_4px_rgba(0,0,0,0.3)] border border-white/20 touch-none overflow-hidden ${color} ${isInBank ? 'w-16 h-16 sm:w-20 sm:h-20 shrink-0' : 'w-full h-full'}`}
      drag={!isSolved}
      dragMomentum={false}
      dragElastic={0.1}
      whileDrag={{ scale: 1.1, zIndex: 100, cursor: 'grabbing', opacity: 0.9 }}
      whileHover={{ scale: isSolved ? 1 : 1.05, zIndex: 10 }}
      onDragEnd={(_, info) => onDragEnd(id, info.point)}
      style={{
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: `${gridSize * 100}%`, 
        backgroundPosition: `${bgPosX}% ${bgPosY}%`,
        backgroundRepeat: 'no-repeat',
        zIndex: 1
      }}
    >
       {!isSolved && <div className="absolute inset-0 bg-white/0 hover:bg-white/10 transition-colors pointer-events-none" />}
    </motion.div>
  );
};