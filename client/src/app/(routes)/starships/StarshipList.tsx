'use client';

import React from 'react';
import Link from 'next/link';
import { Rocket } from 'lucide-react';
import { Starship } from '@/types/starship';
import SkeletonCard from '@/app/components/SkeletonCard';

type StarshipListProps = {
  starships: Starship[];
  isLoading: boolean;
  isFetching: boolean;
  error: Error;
};

const StarshipList: React.FC<StarshipListProps> = ({
  starships,
  isLoading,
  isFetching,
  error,
}) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-6">
    {isLoading || isFetching ? (
      Array.from({ length: 9 }).map((_, index) => <SkeletonCard key={index} />)
    ) : error ? (
      <p className="col-span-full text-center text-red-500 text-xl">
        Error loading starships.
      </p>
    ) : !starships || starships.length === 0 ? (
      <p className="col-span-full text-center text-xl">No starships found.</p>
    ) : (
      starships?.map((starship: Starship) => (
        <Link href={`/starships/${starship.id}`} key={starship.id}>
          <div className="bg-gray-800 bg-opacity-90 rounded-lg overflow-hidden shadow-lg hover:black-yellow-500/20 transition-all duration-300 transform hover:scale-105">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-yellow-400">
                  {starship?.name}
                </h2>
                <Rocket className="text-yellow-500" size={24} />
              </div>
              <div className="space-y-2 text-sm">
                <p className="flex justify-between">
                  <span className="text-gray-400">Model:</span>
                  <span>{starship?.model}</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-gray-400">Crew:</span>
                  <span>{starship?.crew}</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-gray-400">Starship class:</span>
                  <span>{starship?.starship_class}</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-gray-400">Consumables:</span>
                  <span>{starship?.consumables}</span>
                </p>
              </div>
            </div>
          </div>
        </Link>
      ))
    )}
  </div>
);

export default StarshipList;
