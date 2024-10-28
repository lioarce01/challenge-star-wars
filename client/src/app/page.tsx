'use client';

import { useRef } from 'react';
import Link from 'next/link';

const LandingPage = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div className="relative min-h-screen w-full overflow-hidden text-white">
      <video
        ref={videoRef}
        className="absolute top-0 left-0 w-full min-h-screen object-cover opacity-70 transition-transform  duration-100 -z-10"
        src="/background.mp4"
        autoPlay
        loop
        muted
      ></video>

      <main className="relative z-10 min-h-screen">
        <section className="h-screen flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 animate-fade-in-up">
            STAR WARS
          </h1>
          <p className="text-xl md:text-2xl mb-8 animate-fade-in-delay">
            A long time ago in a galaxy far, far away...
          </p>
          <Link
            href="/characters"
            className="bg-yellow-400 text-black px-8 py-3 rounded-full text-lg font-semibold hover:bg-yellow-300 transition-transform transform duration-300 hover:scale-105 active:scale-95"
          >
            Explore the Galaxy
          </Link>
        </section>
      </main>
    </div>
  );
};

export default LandingPage;
