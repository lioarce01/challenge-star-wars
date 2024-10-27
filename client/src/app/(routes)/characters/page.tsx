'use client';
import PeopleList from '@/app/components/PeopleList';

export default function CharactersPage() {
  return (
    <div className="min-h-screen text-white pt-20">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Star Wars Characters
        </h1>
        <div>
          <PeopleList />
        </div>
      </div>
    </div>
  );
}
