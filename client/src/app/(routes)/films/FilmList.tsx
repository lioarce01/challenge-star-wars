'use client';

import React from 'react';
import Link from 'next/link';
import { Clapperboard } from 'lucide-react';
import { Film } from '@/types/film';
import SkeletonCard from '@/app/components/SkeletonCard';

type FilmListProps = {
  film: Film[];
  isLoading: boolean;
  isFetching: boolean;
  error: any;
};

const CharacterList: React.FC<FilmListProps> = ({
  film,
  isLoading,
  isFetching,
  error,
}) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-6">
    {isLoading || isFetching ? (
      Array.from({ length: 9 }).map((_, index) => <SkeletonCard key={index} />)
    ) : error ? (
      <p className="col-span-full text-center text-red-500 text-xl">
        Error loading films.
      </p>
    ) : film.length === 0 ? (
      <p className="col-span-full text-center text-xl">No films found.</p>
    ) : (
      film.map((film) => (
        <Link href={`/films/${film.id}`} key={film.id}>
          <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-yellow-500/20 transition-all duration-300 transform hover:scale-105">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-yellow-400">
                  {film.title}
                </h2>
                <Clapperboard className="text-yellow-500" size={24} />
              </div>
              <div className="space-y-2 text-sm">
                <p className="flex justify-between">
                  <span className="text-gray-400">Director:</span>
                  <span>{film.director}</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-gray-400">Producer:</span>
                  <span>{film.producer}</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-gray-400">Release Date:</span>
                  <span>{film.release_date}</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-gray-400">Episode:</span>
                  <span>{film?.episode_id}</span>
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
