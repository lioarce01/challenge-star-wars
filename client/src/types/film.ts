import { People } from './people';
import { Planet } from './planet';
import { Starship } from './starship';

export interface Film {
  id: string;
  url: string;
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  characters: People[];
  planets: Planet[];
  starships: Starship[];
}
