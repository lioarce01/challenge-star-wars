'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Earth } from 'lucide-react';
import { useGetPlanetByIdQuery } from '@/app/redux/api/planet';
import { People } from '@/types/people';
import { FilmReference } from '@/types/planet';

const PlanetDetails = () => {
  const { id } = useParams();
  const { data: planet, error, isLoading } = useGetPlanetByIdQuery(id);

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
        <p className="text-red-500 text-xl">Error loading planet details.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-4 pt-20 sm:p-8 md:p-12 lg:p-20">
      <Link
        href="/planets"
        className="inline-flex items-center text-yellow-400 hover:text-yellow-300 transition-colors duration-300 mb-4 sm:mb-8"
      >
        <ArrowLeft className="mr-2 font-semibold" size={20} />
        <span className="text-sm sm:text-base">Back to Planets</span>
      </Link>

      <div className="max-w-4xl mx-auto bg-gray-800 rounded-lg overflow-hidden shadow-lg">
        <div className="p-4 sm:p-6 md:p-8">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-yellow-400">
              {planet.name}
            </h1>
            <Earth className="text-yellow-500" size={32} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-4 text-yellow-400">
                Planet Information
              </h2>
              <ul className="space-y-2 sm:space-y-3">
                <li className="flex justify-between">
                  <span className="text-gray-400">Rotation Period:</span>
                  <span>{planet.rotation_period}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-400">Orbital Period:</span>
                  <span>{planet.orbital_period}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-400">Diamenter:</span>
                  <span>{planet.diameter} KM</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-400">Climate:</span>
                  <span>{planet.climate}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-400">Gravity:</span>
                  <span>{planet.gravity}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-400">Terrain:</span>
                  <span>{planet.terrain}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-400">Surface Water:</span>
                  <span>{planet.surface_water}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-400">Population:</span>
                  <span>{planet.population}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-400">Climate:</span>
                  <span>{planet.climate}</span>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-4 text-yellow-400">
                Additional Information
              </h2>
              <ul className="space-y-3">
                <div className="flex flex-col sm:flex-row items-start justify-between">
                  <li className="flex flex-col mb-2 sm:mb-0">
                    <span className="text-gray-400 mb-1 sm:mb-2">
                      Residents:
                    </span>
                    <ul className="list-disc list-inside pl-2 sm:pl-4">
                      {planet?.residents.length === 0
                        ? 'No residents'
                        : planet?.residents?.map(
                            (residentObj: People, index: number) => (
                              <li key={index} className="text-xs sm:text-sm">
                                {residentObj.name || 'No residents'}
                              </li>
                            )
                          )}
                    </ul>
                  </li>
                  <li className="flex flex-col mb-2 sm:mb-0">
                    <span className="text-gray-400 mb-1 sm:mb-2">Films:</span>
                    <ul className="list-disc list-inside pl-2 sm:pl-4">
                      {planet?.films.length === 0
                        ? 'No films'
                        : planet?.films?.map(
                            (filmObj: FilmReference, index: number) => (
                              <li key={index} className="text-xs sm:text-sm">
                                {filmObj.film.title || 'No Films'}
                              </li>
                            )
                          )}
                    </ul>
                  </li>
                </div>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanetDetails;
