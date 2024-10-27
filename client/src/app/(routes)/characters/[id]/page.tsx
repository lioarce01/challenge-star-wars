'use client';

import { useParams } from 'next/navigation';
import { useGetPeopleByIdQuery } from '../../../redux/api/people';
import Link from 'next/link';
import { ArrowLeft, User } from 'lucide-react';
import { Starship } from '@/types/starship';
import { Film } from '@/types/film';

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
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-20">
      <Link
        href="/characters"
        className="inline-flex items-center text-yellow-400 hover:text-yellow-300 transition-colors duration-300 mb-8"
      >
        <ArrowLeft className="mr-2 font-semibold" size={20} />
        Back to Characters
      </Link>

      <div className="max-w-4xl mx-auto bg-gray-800 rounded-lg overflow-hidden shadow-lg">
        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-4xl font-bold text-yellow-400">
              {character.name}
            </h1>
            <User className="text-yellow-500" size={40} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-yellow-400">
                Personal Information
              </h2>
              <ul className="space-y-3">
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
              <h2 className="text-2xl font-semibold mb-4 text-yellow-400">
                Physical Attributes
              </h2>
              <ul className="space-y-3">
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

          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4 text-yellow-400">
              Additional Information
            </h2>
            <ul className="space-y-3">
              <li className="flex justify-between">
                <span className="text-gray-400">Homeworld:</span>
                <span>{character?.homeworld.name}</span>
              </li>
              <li className="flex flex-col">
                <span className="text-gray-400 mb-2">Films:</span>
                <ul className="list-disc list-inside pl-4">
                  {character?.films?.map((film: any, index: number) => (
                    <li key={index} className="text-sm">
                      {film.film.title ? film.film.title : 'No Films'}
                    </li>
                  ))}
                </ul>
              </li>
              <li className="flex flex-col">
                <span className="text-gray-400 mb-2">Starships:</span>
                <ul className="list-disc list-inside pl-4">
                  {character?.starships?.map((starship: any, index: number) => (
                    <li key={index} className="text-sm">
                      {starship.starship
                        ? starship.starship.name
                        : 'No Starships'}
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterDetails;
