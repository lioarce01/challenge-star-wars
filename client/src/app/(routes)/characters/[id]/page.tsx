'use client';

import { useParams } from 'next/navigation';
import { useGetPeopleByIdQuery } from '../../../redux/api/people';
import Link from 'next/link';
import { ArrowLeft, User } from 'lucide-react';
import { FilmReference, StarshipReference } from '@/types/people';

const CharacterDetails = () => {
  const { id } = useParams();
  const { data: character, error, isLoading } = useGetPeopleByIdQuery(id);

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
        <p className="text-red-500 text-xl">Error loading character details.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-4 pt-20 sm:p-8 md:p-12 lg:p-20">
      <Link
        href="/characters"
        className="inline-flex items-center text-yellow-400 hover:text-yellow-300 transition-colors duration-300 mb-4 sm:mb-8"
      >
        <ArrowLeft className="mr-2 font-semibold" size={20} />
        <span className="text-sm sm:text-base">Back to Characters</span>
      </Link>

      <div className="max-w-4xl mx-auto bg-gray-800 rounded-lg overflow-hidden shadow-lg">
        <div className="p-4 sm:p-6 md:p-8">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-yellow-400">
              {character.name}
            </h1>
            <User className="text-yellow-500" size={32} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-4 text-yellow-400">
                Personal Information
              </h2>
              <ul className="space-y-2 sm:space-y-3">
                <li className="flex justify-between">
                  <span className="text-gray-400">Birth Year:</span>
                  <span>{character.birth_year}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-400">Gender:</span>
                  <span>{character.gender}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-400">Height:</span>
                  <span>{character.height} cm</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-400">Mass:</span>
                  <span>{character.mass} kg</span>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-4 text-yellow-400">
                Physical Attributes
              </h2>
              <ul className="space-y-2 sm:space-y-3">
                <li className="flex justify-between">
                  <span className="text-gray-400">Eye Color:</span>
                  <span>{character.eye_color}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-400">Hair Color:</span>
                  <span>{character.hair_color}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-400">Skin Color:</span>
                  <span>{character.skin_color}</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-4 sm:mt-6 md:mt-8">
            <h2 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-4 text-yellow-400">
              Additional Information
            </h2>
            <ul className="space-y-3">
              <div className="flex flex-col sm:flex-row items-start justify-between">
                <li className="flex flex-col mb-2 sm:mb-0">
                  <span className="text-gray-400">Homeworld:</span>
                  <span>{character?.homeworld.name}</span>
                </li>
                <li className="flex flex-col mb-2 sm:mb-0">
                  <span className="text-gray-400 mb-1 sm:mb-2">Films:</span>
                  <ul className="list-disc list-inside pl-2 sm:pl-4">
                    {character?.films.length === 0
                      ? 'No films'
                      : character?.films?.map(
                          (filmObj: FilmReference, index: number) => (
                            <li key={index} className="text-xs sm:text-sm">
                              {filmObj.film.title || 'No Films'}
                            </li>
                          )
                        )}
                  </ul>
                </li>
                <li className="flex flex-col">
                  <span className="text-gray-400 mb-1 sm:mb-2">Starships:</span>
                  <ul className="list-disc list-inside pl-2 sm:pl-4">
                    {character?.starships.length === 0
                      ? 'No starships'
                      : character?.starships?.map(
                          (starshipObj: StarshipReference, index: number) => (
                            <li key={index} className="text-xs sm:text-sm">
                              {starshipObj.starship.name}
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
  );
};

export default CharacterDetails;
