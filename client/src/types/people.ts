import { Film } from './film';
import { Planet } from './planet';
import { Starship } from './starship';

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
  starships: Starship[];
  films: Film[];
}
