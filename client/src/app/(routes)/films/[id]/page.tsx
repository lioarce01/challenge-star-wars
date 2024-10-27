'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Clapperboard } from 'lucide-react';
import { useGetFilmByIdQuery } from '@/app/redux/api/film';

const FilmDetail = () => {
  const { id } = useParams();
  const { data: film, error, isLoading } = useGetFilmByIdQuery(id);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black">
        <p className="text-red-500 text-xl">Error loading film details.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-4 pt-20 sm:p-8 md:p-12 lg:p-20">
      <Link
        href="/films"
        className="inline-flex items-center text-yellow-400 hover:text-yellow-300 transition-colors duration-300 mb-4 sm:mb-8"
      >
        <ArrowLeft className="mr-2 font-semibold" size={20} />
        <span className="text-sm sm:text-base">Back to Films</span>
      </Link>

      <div className="max-w-4xl mx-auto bg-gray-800 rounded-lg overflow-hidden shadow-lg">
        <div className="p-4 sm:p-6 md:p-8">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-yellow-400">
              {film.title}
            </h1>
            <Clapperboard className="text-yellow-500" size={32} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-4 text-yellow-400">
                Film Information
              </h2>
              <ul className="space-y-2 sm:space-y-3">
                <li className="flex justify-between">
                  <span className="text-gray-400">Release Date:</span>
                  <span>{film.release_date}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-400">Episode:</span>
                  <span>{film.episode_id}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-400">Director:</span>
                  <span>{film.director}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-400">Producer:</span>
                  <span>{film.producer}</span>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-4 text-yellow-400">
                Opening Crawl
              </h2>
              <p>{film.opening_crawl}</p>
            </div>
          </div>

          <div className="mt-4 sm:mt-6 md:mt-8">
            <h2 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-4 text-yellow-400">
              Additional Information
            </h2>
            <ul className="space-y-3">
              <div className="flex flex-col sm:flex-row items-start justify-between">
                <li className="flex flex-col mb-2 sm:mb-0">
                  <span className="text-gray-400 mb-1 sm:mb-2">
                    Characters:
                  </span>
                  <ul className="list-disc list-inside pl-2 sm:pl-4">
                    {film?.characters.length === 0
                      ? 'No characters'
                      : film?.characters?.map((char: any, index: number) => (
                          <li key={index} className="text-xs sm:text-sm">
                            {char.person.name}
                          </li>
                        ))}
                  </ul>
                </li>
                <li className="flex flex-col mb-2 sm:mb-0">
                  <span className="text-gray-400 mb-1 sm:mb-2">Planets:</span>
                  <ul className="list-disc list-inside pl-2 sm:pl-4">
                    {film?.planets.length === 0
                      ? 'No planets'
                      : film?.planets?.map((planet: any, index: number) => (
                          <li key={index} className="text-xs sm:text-sm">
                            {planet.planet.name
                              ? planet.planet.name
                              : 'No Planets'}
                          </li>
                        ))}
                  </ul>
                </li>
                <li className="flex flex-col">
                  <span className="text-gray-400 mb-1 sm:mb-2">Starships:</span>
                  <ul className="list-disc list-inside pl-2 sm:pl-4">
                    {film?.starships.length === 0
                      ? 'No starships'
                      : film?.starships?.map((starship: any, index: number) => (
                          <li key={index} className="text-xs sm:text-sm">
                            {starship.starship
                              ? starship.starship.name
                              : 'No Starships'}
                          </li>
                        ))}
                  </ul>
                </li>
              </div>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilmDetail;
