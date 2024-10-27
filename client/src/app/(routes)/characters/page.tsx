'use client';
import PeopleList from '@/app/components/PeopleList';

export default function CharactersPage() {
  return (
    <div className="min-h-screen text-white pt-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div>
          <PeopleList />
        </div>
      </div>
    </div>
  );
}
