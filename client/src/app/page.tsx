'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function LandingPage() {
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
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-6xl md:text-8xl font-bold mb-6"
          >
            STAR WARS
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-xl md:text-2xl mb-8"
          >
            A long time ago in a galaxy far, far away...
          </motion.p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-yellow-400 text-black px-8 py-3 rounded-full text-lg font-semibold hover:bg-yellow-300 transition-colors duration-300"
          >
            Explore the Galaxy
          </motion.button>
        </section>
      </main>

      <footer className="bg-black bg-opacity-80 text-center py-6">
        <p>&copy; 2024 Star Wars. All rights reserved.</p>
      </footer>
    </div>
  );
}

function NavItem({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <Link
      href="#"
      className="flex items-center space-x-2 hover:text-yellow-400 transition-colors"
    >
      {icon}
      <span>{text}</span>
    </Link>
  );
}
