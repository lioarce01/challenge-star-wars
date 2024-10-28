import { People } from './people';

export interface FilmReference {
  film: { title: string };
}

export interface PilotReference {
  pilot: { name: string };
}

export interface Starship {
  id: string;
  url: string;
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits?: string;
  length?: string;
  max_atmosphering_speed?: string;
  crew?: string;
  passengers?: string;
  cargo_capacity?: string;
  consumables?: string;
  hyperdrive_rating?: string;
  MGLT?: string;
  starship_class: string;
  pilots: People[];
  films: FilmReference[];
}
export interface GetStarshipsArgs {
  offset: number;
  limit: number;
  starship_class?: string;
  manufacturer?: string;
}

export interface GetStarshipsResponse {
  results: Starship[];
  count: number;
}
