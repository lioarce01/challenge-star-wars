import { Film } from './film';
import { People } from './people';

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
  films: Film[];
}
