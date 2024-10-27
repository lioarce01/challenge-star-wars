'use client';

import AudioPlayer from './AudioPlayer';
import Navigation from './Navigation';

const ClientWrapper = () => {
  return (
    <div className="absolute bottom-0 left-0 w-full z-10">
      <AudioPlayer />
      <Navigation />
    </div>
  );
};

export default ClientWrapper;
