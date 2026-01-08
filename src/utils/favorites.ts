import type { Plant } from '../types/plant';

const FAVORITES_KEY = 'plant-favorites';

export function getFavorites(): Plant[] {
  const stored = localStorage.getItem(FAVORITES_KEY);
  if (!stored) return [];
  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
}

export function addFavorite(plant: Plant): void {
  const favorites = getFavorites();
  if (!favorites.some(f => f.id === plant.id)) {
    favorites.push(plant);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }
}

export function removeFavorite(plantId: number): void {
  const favorites = getFavorites();
  const filtered = favorites.filter(f => f.id !== plantId);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(filtered));
}

export function isFavorite(plantId: number): boolean {
  const favorites = getFavorites();
  return favorites.some(f => f.id === plantId);
}
