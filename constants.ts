import { Pokemon } from './types';

export const POKEMON_LIST: Pokemon[] = [
  {
    id: 25,
    name: 'Pikachu',
    imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
    color: 'bg-yellow-400',
    accentColor: 'border-yellow-600',
    type: 'electric'
  },
  {
    id: 810,
    name: 'Grookey',
    imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/810.png',
    color: 'bg-green-500',
    accentColor: 'border-green-700',
    type: 'grass'
  },
  {
    id: 150,
    name: 'Mewtwo',
    imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/150.png',
    color: 'bg-purple-500',
    accentColor: 'border-purple-700',
    type: 'psychic'
  }
];

export const DEFAULT_GRID_SIZE = 4; // 4x4 grid (15-puzzle)