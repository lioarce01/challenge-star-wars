export interface CharacterReference {
  person: { name: string };
}

export interface PlanetReference {
  planet: { name: string };
}

export interface StarshipReference {
  starship: { name: string };
}

export interface Film {
  id: string;
  url: string;
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  characters: CharacterReference[];
  planets: PlanetReference[];
  starships: StarshipReference[];
}

export interface GetFilmsArgs {
  offset: number;
  limit: number;
  producer?: string;
  director?: string;
}

export interface GetFilmsResponse {
  results: Film[];
  count: number;
}
