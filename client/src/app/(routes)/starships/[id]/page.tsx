'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Rocket, User } from 'lucide-react';
import { useGetStarshipByIdQuery } from '@/app/redux/api/starship';

const CharacterDetails = () => {
  const { id } = useParams();
  const { data: starship, error, isLoading } = useGetStarshipByIdQuery(id);

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
        <p className="text-red-500 text-xl">Error loading starship details.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-4 pt-20 sm:p-8 md:p-12 lg:p-20">
      <Link
        href="/starships"
        className="inline-flex items-center text-yellow-400 hover:text-yellow-300 transition-colors duration-300 mb-4 sm:mb-8"
      >
        <ArrowLeft className="mr-2 font-semibold" size={20} />
        <span className="text-sm sm:text-base">Back to Starships</span>
      </Link>

      <div className="max-w-4xl mx-auto bg-gray-800 rounded-lg overflow-hidden shadow-lg">
        <div className="p-4 sm:p-6 md:p-8">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-yellow-400">
              {starship.name}
            </h1>
            <Rocket className="text-yellow-500" size={32} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-4 text-yellow-400">
                Starship Information
              </h2>
              <ul className="space-y-2 sm:space-y-3">
                <li className="flex justify-between">
                  <span className="text-gray-400">Model:</span>
                  <span>{starship.model}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-400">Manufacturer:</span>
                  <span>{starship.manufacturer}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-400">Cost:</span>
                  <span>{starship.cost_in_credits}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-400">Length:</span>
                  <span>{starship.length} mts</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-400">Consumables:</span>
                  <span>{starship.consumables}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-400">Starship class:</span>
                  <span>{starship.starship_class}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-400">Max atmosphering speed:</span>
                  <span>{starship.max_atmosphering_speed}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-400">Crew:</span>
                  <span>{starship.crew}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-400">Passengers:</span>
                  <span>{starship.passengers}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-400">Cargo capacity:</span>
                  <span>{starship.cargo_capacity}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-400">Hyperdrive Rating:</span>
                  <span>{starship.hyperdrive_rating}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-400">MGLT:</span>
                  <span>{starship.MGLT}</span>
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
                    <span className="text-gray-400 mb-1 sm:mb-2">Pilots:</span>
                    <ul className="list-disc list-inside pl-2 sm:pl-4">
                      {starship?.pilots.length === 0
                        ? 'No pilots'
                        : starship?.pilots?.map((pilot: any, index: number) => (
                            <li key={index} className="text-xs sm:text-sm">
                              {pilot.pilot.name}
                            </li>
                          ))}
                    </ul>
                  </li>
                  <li className="flex flex-col mb-2 sm:mb-0">
                    <span className="text-gray-400 mb-1 sm:mb-2">Films:</span>
                    <ul className="list-disc list-inside pl-2 sm:pl-4">
                      {starship.films.length === 0
                        ? 'No films'
                        : starship?.films?.map((film: any, index: number) => (
                            <li key={index} className="text-xs sm:text-sm">
                              {film.film.title ? film.film.title : 'No Films'}
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
    </div>
  );
};

export default CharacterDetails;
