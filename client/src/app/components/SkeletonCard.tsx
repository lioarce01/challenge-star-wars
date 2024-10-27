'use client';

const SkeletonCard = () => (
  <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg p-9 animate-pulse">
    <div className="flex items-center justify-between mb-4">
      <div className="h-6 w-32 bg-gray-700 rounded"></div>
      <div className="h-6 w-6 bg-gray-700 rounded-full"></div>
    </div>
    <div className="space-y-2">
      <div className="flex justify-between">
        <span className="h-4 w-16 bg-gray-700 rounded"></span>
        <span className="h-4 w-24 bg-gray-700 rounded"></span>
      </div>
      <div className="flex justify-between">
        <span className="h-4 w-16 bg-gray-700 rounded"></span>
        <span className="h-4 w-20 bg-gray-700 rounded"></span>
      </div>
      <div className="flex justify-between">
        <span className="h-4 w-16 bg-gray-700 rounded"></span>
        <span className="h-4 w-28 bg-gray-700 rounded"></span>
      </div>
      <div className="flex justify-between">
        <span className="h-4 w-16 bg-gray-700 rounded"></span>
        <span className="h-4 w-24 bg-gray-700 rounded"></span>
      </div>
    </div>
  </div>
);

export default SkeletonCard;
