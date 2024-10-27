import React from 'react';
import Link from 'next/link';
import { People } from '@/types/people';
import { User } from 'lucide-react';

type CharacterListProps = {
  characters: People[];
  isLoading: boolean;
  isFetching: boolean;
  error: any;
};

const CharacterList: React.FC<CharacterListProps> = ({
  characters,
  isLoading,
  isFetching,
  error,
}) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
    {isLoading || isFetching ? (
      <div className="col-span-full flex justify-center items-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-yellow-400"></div>
      </div>
    ) : error ? (
      <p className="col-span-full text-center text-red-500 text-xl">
        Error loading people.
      </p>
    ) : characters.length === 0 ? (
      <p className="col-span-full text-center text-xl">No characters found.</p>
    ) : (
      characters.map((character) => (
        <Link href={`/characters/${character.id}`} key={character.id}>
          <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-yellow-500/20 transition-all duration-300 transform hover:scale-105">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-yellow-400">
                  {character.name}
                </h2>
                <User className="text-yellow-500" size={24} />
              </div>
              <div className="space-y-2 text-sm">
                <p className="flex justify-between">
                  <span className="text-gray-400">Gender:</span>
                  <span>{character.gender}</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-gray-400">Hair Color:</span>
                  <span>{character.hair_color}</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-gray-400">Skin color:</span>
                  <span>{character.skin_color}</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-gray-400">Homeworld:</span>
                  <span>{character?.homeworld?.name}</span>
                </p>
              </div>
            </div>
          </div>
        </Link>
      ))
    )}
  </div>
);

export default CharacterList;
