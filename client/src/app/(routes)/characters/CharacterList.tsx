'use client';

import React from 'react';
import Link from 'next/link';
import { People } from '@/types/people';
import { User } from 'lucide-react';
import SkeletonCard from '@/app/components/SkeletonCard';

type CharacterListProps = {
  characters: People[];
  isLoading: boolean;
  isFetching: boolean;
  error: Error;
};

const CharacterList: React.FC<CharacterListProps> = ({
  characters,
  isLoading,
  isFetching,
  error,
}) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-6">
    {isLoading || isFetching ? (
      Array.from({ length: 9 }).map((_, index) => <SkeletonCard key={index} />)
    ) : error ? (
      <p className="col-span-full text-center text-red-500 text-xl">
        Error loading characters.
      </p>
    ) : characters.length === 0 ? (
      <p className="col-span-full text-center text-xl">No characters found.</p>
    ) : (
      characters.map((character: People) => (
        <Link href={`/characters/${character.id}`} key={character.id}>
          <div className="bg-gray-800 bg-opacity-90 rounded-lg overflow-hidden shadow-lg hover:shadow-black-500/20 transition-all duration-300 transform hover:scale-105">
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
