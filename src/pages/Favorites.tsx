import { useState, useEffect } from 'react';
import type { Plant } from '../types/plant';
import { getFavorites } from '../utils/favorites';
import PlantCard from '../components/PlantCard';

export default function Favorites() {
  const [favorites, setFavorites] = useState<Plant[]>([]);

  const loadFavorites = () => {
    setFavorites(getFavorites());
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Your Favorite Plants ({favorites.length})
      </h2>

      {favorites.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
          <p className="text-lg">No favorites yet</p>
          <p className="text-sm mt-2">Search for plants and click the heart icon to add them here</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favorites.map((plant) => (
            <PlantCard
              key={plant.id}
              plant={plant}
              onFavoriteChange={loadFavorites}
            />
          ))}
        </div>
      )}
    </div>
  );
}
