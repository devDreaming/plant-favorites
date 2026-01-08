import type { Plant, PlantDetails } from '../types/plant';
import { isFavorite, addFavorite, removeFavorite } from '../utils/favorites';
import { getPlantDetails } from '../utils/api';
import { useState } from 'react';

interface PlantCardProps {
  plant: Plant;
  onFavoriteChange?: () => void;
}

export default function PlantCard({ plant, onFavoriteChange }: PlantCardProps) {
  const [favorited, setFavorited] = useState(isFavorite(plant.id));
  const [isFlipped, setIsFlipped] = useState(false);
  const [details, setDetails] = useState<PlantDetails | null>(null);
  const [loadingDetails, setLoadingDetails] = useState(false);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (favorited) {
      removeFavorite(plant.id);
    } else {
      addFavorite(plant);
    }
    setFavorited(!favorited);
    onFavoriteChange?.();
  };

  const handleMoreInfo = async () => {
    if (!details && !loadingDetails) {
      setLoadingDetails(true);
      try {
        const data = await getPlantDetails(plant.id);
        setDetails(data);
      } catch (error) {
        console.error('Failed to fetch plant details:', error);
      } finally {
        setLoadingDetails(false);
      }
    }
    setIsFlipped(true);
  };

  const handleFlipBack = () => {
    setIsFlipped(false);
  };

  const imageUrl = plant.default_image?.medium_url || plant.default_image?.regular_url;

  const formatArray = (value: string[] | string | undefined): string => {
    if (!value) return 'Unknown';
    if (Array.isArray(value)) return value.length > 0 ? value.join(', ') : 'Unknown';
    return value;
  };

  const CheckIcon = () => (
    <svg className="w-5 h-5 text-green-600 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );

  const XIcon = () => (
    <svg className="w-5 h-5 text-red-500 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );

  return (
    <div className="h-[380px] perspective-1000">
      <div
        className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* Front of card */}
        <div className="absolute inset-0 backface-hidden">
          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow h-full flex flex-col">
            <div className="h-40 bg-gray-100 flex items-center justify-center overflow-hidden flex-shrink-0">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={plant.common_name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-gray-400 text-center p-4">
                  <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm">No image available</span>
                </div>
              )}
            </div>

            <div className="p-4 flex flex-col flex-grow">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-gray-900 capitalize">
                  {plant.common_name}
                </h3>
                <button
                  onClick={handleFavoriteClick}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
                >
                  <svg
                    className={`w-6 h-6 ${favorited ? 'text-red-500 fill-current' : 'text-gray-400'}`}
                    fill={favorited ? 'currentColor' : 'none'}
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </button>
              </div>

              <p className="text-sm text-gray-500 italic mb-3">
                {plant.scientific_name?.[0] || 'Unknown species'}
              </p>

              <div className="space-y-1 text-sm text-gray-600 flex-grow">
                {plant.cycle && (
                  <p><span className="font-medium">Cycle:</span> {plant.cycle}</p>
                )}
                {plant.watering && (
                  <p><span className="font-medium">Watering:</span> {plant.watering}</p>
                )}
                {plant.sunlight && (
                  <p><span className="font-medium">Sunlight:</span> {formatArray(plant.sunlight)}</p>
                )}
              </div>

              <button
                onClick={handleMoreInfo}
                className="mt-3 w-full py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
              >
                More Info
              </button>
            </div>
          </div>
        </div>

        {/* Back of card */}
        <div className="absolute inset-0 backface-hidden rotate-y-180">
          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 h-full flex flex-col">
            <div className="p-4 flex flex-col h-full">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-semibold text-gray-900 capitalize">
                  {plant.common_name}
                </h3>
                <button
                  onClick={handleFavoriteClick}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
                >
                  <svg
                    className={`w-6 h-6 ${favorited ? 'text-red-500 fill-current' : 'text-gray-400'}`}
                    fill={favorited ? 'currentColor' : 'none'}
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </button>
              </div>

              {loadingDetails ? (
                <div className="flex-grow flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                </div>
              ) : details ? (
                <div className="space-y-2 text-sm text-gray-600 flex-grow overflow-y-auto">
                  <p>
                    <span className="font-medium">Type:</span> {details.type || 'Unknown'}
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="font-medium">Edible:</span>
                    {details.edible_leaf ? <CheckIcon /> : <XIcon />}
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="font-medium">Medicinal:</span>
                    {details.medicinal ? <CheckIcon /> : <XIcon />}
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="font-medium">Indoor:</span>
                    {details.indoor ? <CheckIcon /> : <XIcon />}
                  </p>
                  <p>
                    <span className="font-medium">Soil:</span> {formatArray(details.soil)}
                  </p>
                  <p>
                    <span className="font-medium">Watering:</span> {details.watering || 'Unknown'}
                  </p>
                  <p>
                    <span className="font-medium">Sunlight:</span> {formatArray(details.sunlight)}
                  </p>
                  <p>
                    <span className="font-medium">Pruning months:</span> {formatArray(details.pruning_month) || 'None specified'}
                  </p>
                </div>
              ) : (
                <div className="flex-grow flex items-center justify-center text-gray-500">
                  Failed to load details
                </div>
              )}

              <button
                onClick={handleFlipBack}
                className="mt-3 w-full py-2 px-4 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium"
              >
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
