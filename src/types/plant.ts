export interface Plant {
  id: number;
  common_name: string;
  scientific_name: string[];
  other_name: string[];
  cycle: string;
  watering: string;
  sunlight: string[];
  default_image: {
    license: number;
    license_name: string;
    license_url: string;
    original_url: string;
    regular_url: string;
    medium_url: string;
    small_url: string;
    thumbnail: string;
  } | null;
}

export interface PlantSearchResponse {
  data: Plant[];
  to: number;
  per_page: number;
  current_page: number;
  from: number;
  last_page: number;
  total: number;
}

export interface PlantDetails {
  id: number;
  common_name: string;
  scientific_name: string[];
  type: string;
  edible_leaf: boolean;
  medicinal: boolean;
  indoor: boolean;
  soil: string[];
  watering: string;
  sunlight: string[];
  pruning_month: string[];
}
