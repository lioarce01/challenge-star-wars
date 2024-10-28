import { Planet } from './planet';

export interface FilmReference {
  film: { title: string };
}

export interface StarshipReference {
  starship: { name: string };
}

export interface People {
  id: string;
  url: string;
  name: string;
  height?: string;
  mass?: string;
  hair_color?: string;
  skin_color?: string;
  eye_color?: string;
  birth_year?: string;
  gender?: string;
  homeworld?: Planet | null;
  homeworldId?: string | null;
  films: FilmReference[];
  starships: StarshipReference[];
}

export interface GetPeoplesArgs {
  offset: number;
  limit: number;
  gender?: string;
  hair_color?: string;
  skin_color?: string;
}

export interface GetPeoplesResponse {
  results: People[];
  count: number;
}
