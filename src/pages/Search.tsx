import { useState } from 'react';
import type { Plant } from '../types/plant';
import { searchPlants } from '../utils/api';
import PlantCard from '../components/PlantCard';

export default function Search() {
  const [query, setQuery] = useState('');
  const [plants, setPlants] = useState<Plant[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      const response = await searchPlants(query);
      setPlants(response.data);
    } catch (err) {
      setError('Failed to search plants. Please try again.');
      setPlants([]);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setQuery('');
    setPlants([]);
    setHasSearched(false);
    setError(null);
  };

  return (
    <div>
      <form onSubmit={handleSearch} className="mb-4">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for a plant (e.g., rose, fern, cactus)..."
              className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 disabled:bg-green-400 transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>

      {hasSearched && (
        <div className="flex gap-2 mb-8">
          <button
            type="button"
            onClick={handleClear}
            className="px-4 py-2 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-colors flex items-center gap-2 text-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Clear Results
          </button>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      {loading && (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
        </div>
      )}

      {!loading && hasSearched && plants.length === 0 && !error && (
        <div className="text-center py-12 text-gray-500">
          <p className="text-lg">No plants found for "{query}"</p>
          <p className="text-sm mt-2">Try a different search term</p>
        </div>
      )}

      {!loading && plants.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {plants.map((plant) => (
            <PlantCard key={plant.id} plant={plant} />
          ))}
        </div>
      )}

      {!hasSearched && (
        <div className="text-center py-12 text-gray-500">
          <img
            src="/plant-outline.svg"
            alt="Plant illustration"
            className="w-48 h-48 mx-auto mb-4 opacity-50"
          />
        </div>
      )}
    </div>
  );
}
