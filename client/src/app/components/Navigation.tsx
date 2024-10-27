'use client';

import { Earth, Menu, Rocket, Users, Clapperboard } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import NavItem from './NavItem';

const Navigation = () => {
  return (
    <nav className="fixed top-0 left-0 w-full p-4 flex justify-between items-center z-20 bg-black bg-opacity-50">
      <Link href="/" className="text-2xl font-bold">
        STAR WARS
      </Link>
      <div className="hidden md:flex space-x-6">
        <NavItem
          icon={<Users size={20} />}
          text="Characters"
          href="/characters"
        />
        <NavItem icon={<Earth size={20} />} text="Planets" href="/planets" />
        <NavItem
          icon={<Rocket size={20} />}
          text="Starships"
          href="/starships"
        />
        <NavItem icon={<Clapperboard size={20} />} text="Films" href="/films" />
      </div>
      <button className="md:hidden">
        <Menu size={24} />
      </button>
    </nav>
  );
};

export default Navigation;
