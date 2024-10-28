'use client';

import React from 'react';
import Link from 'next/link';
import { Earth } from 'lucide-react';
import { Planet } from '@/types/planet';
import SkeletonCard from '@/app/components/SkeletonCard';

type PlanetListProps = {
  planets: Planet[];
  isLoading: boolean;
  isFetching: boolean;
  error: Error;
};

const PlanetList: React.FC<PlanetListProps> = ({
  planets,
  isLoading,
  isFetching,
  error,
}) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-6">
    {isLoading || isFetching ? (
      Array.from({ length: 9 }).map((_, index) => <SkeletonCard key={index} />)
    ) : error ? (
      <p className="col-span-full text-center text-red-500 text-xl">
        Error loading planets.
      </p>
    ) : !planets || planets.length === 0 ? (
      <p className="col-span-full text-center text-xl">No planets found.</p>
    ) : (
      planets.map((planet: Planet) => (
        <Link href={`/planets/${planet.id}`} key={planet.id}>
          <div className="bg-gray-800 bg-opacity-90 rounded-lg overflow-hidden shadow-lg hover:shadow-black-500/20 transition-all duration-300 transform hover:scale-105">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-yellow-400">
                  {planet.name}
                </h2>
                <Earth className="text-yellow-500" size={24} />
              </div>
              <div className="space-y-2 text-sm">
                <p className="flex justify-between">
                  <span className="text-gray-400">Climate:</span>
                  <span>{planet.climate}</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-gray-400">Terrain:</span>
                  <span>{planet.terrain}</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-gray-400">Gravity:</span>
                  <span>{planet.gravity}</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-gray-400">Diameter:</span>
                  <span>{planet?.diameter} KM</span>
                </p>
              </div>
            </div>
          </div>
        </Link>
      ))
    )}
  </div>
);

export default PlanetList;
