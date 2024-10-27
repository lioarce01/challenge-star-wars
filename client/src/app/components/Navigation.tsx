'use client';

import { Earth, Menu, Rocket, Users, Clapperboard, X } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';
import NavItem from './NavItem';

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full p-4 flex justify-between items-center z-20 bg-black md:bg-opacity-50">
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
      <button
        className="md:hidden"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-black md:hidden flex flex-col space-y-2 p-4">
          <NavItem
            icon={<Users size={20} />}
            text="Characters"
            href="/characters"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <NavItem
            icon={<Earth size={20} />}
            text="Planets"
            href="/planets"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <NavItem
            icon={<Rocket size={20} />}
            text="Starships"
            href="/starships"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <NavItem
            icon={<Clapperboard size={20} />}
            text="Films"
            href="/films"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        </div>
      )}
    </nav>
  );
};

export default Navigation;
