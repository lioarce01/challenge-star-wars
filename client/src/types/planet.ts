import { Film } from './film';
import { People } from './people';

export interface FilmReference {
  film: { title: string };
}

export interface Planet {
  id: string;
  url: string;
  name: string;
  rotation_period?: string;
  orbital_period?: string;
  diameter?: string;
  climate?: string;
  gravity?: string;
  terrain?: string;
  surface_water?: string;
  population?: string;
  residents: People[];
  films: FilmReference[];
}

export interface GetPlanetsArgs {
  offset: number;
  limit: number;
  climate?: string;
  terrain?: string;
}

export interface getPlanetsResponse {
  results: Planet[];
  count: number;
}
