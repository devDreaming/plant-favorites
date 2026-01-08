import type { Plant, PlantSearchResponse, PlantDetails } from '../types/plant';

const API_KEY = import.meta.env.VITE_PERENUAL_API_KEY;
const BASE_URL = 'https://perenual.com/api';

export async function searchPlants(query: string): Promise<PlantSearchResponse> {
  const response = await fetch(
    `${BASE_URL}/species-list?key=${API_KEY}&q=${encodeURIComponent(query)}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch plants');
  }

  return response.json();
}

export async function getPlantDetails(id: number): Promise<PlantDetails> {
  const response = await fetch(
    `${BASE_URL}/v2/species/details/${id}?key=${API_KEY}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch plant details');
  }

  return response.json();
}

export async function getRandomPlant(): Promise<Plant> {
  // Get a random page from the species list (API has ~10000+ plants)
  const randomPage = Math.floor(Math.random() * 100) + 1;
  const response = await fetch(
    `${BASE_URL}/species-list?key=${API_KEY}&page=${randomPage}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch random plant');
  }

  const data: PlantSearchResponse = await response.json();

  if (data.data.length === 0) {
    throw new Error('No plants found');
  }

  // Pick a random plant from the page results
  const randomIndex = Math.floor(Math.random() * data.data.length);
  return data.data[randomIndex];
}
