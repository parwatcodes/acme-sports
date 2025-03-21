'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Menu, X, Search } from 'lucide-react';
import { usePathname, useParams } from 'next/navigation';

import ACMELogo from '@/public/images/acme-logo.jpg';
import { Leagues, RoutesForLeague } from '@/src/app/utils/constant';
import LeaguePlaceholderIcon from '@/public/images/placeholder-icon.jpg';
import NFLLogo from '@/public/images/National_Football_League_logo.svg.png';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const currentPath = usePathname();
  const params = useParams();

  const basePath = `/${currentPath.split('/')[1]}`;
  const isActiveLink = (path: string) => currentPath.includes(path.toLowerCase());

  const leagueIcon = basePath.slice(1) === 'nfl' ? NFLLogo : LeaguePlaceholderIcon;

  return (
    <header className=" bg-[#2b2c2d] to-indigo-700 text-white shadow-lg sticky top-0">
      <div className="container mx-auto flex items-center justify-between py-1">
        <Link href="/" className="text-2xl text-green-400 font-bold tracking-wide">
          <Image className="w-full h-20 object-cover" src={ACMELogo} alt='acme-logo' />
        </Link>

        <nav id="global-nav" className="hidden md:flex gap-8 relative">
          {[...Leagues, "More Sports..."].map((item) => (
            <div
              key={item}
              className="relative"
            >
              <Link key={item} href={`/${item.toLowerCase()}`} className={`hover:text-gray-300 text-xl transition ${isActiveLink(item) ? "text-green-400 font-bold" : ""
                }`}>
                {item}
              </Link>

            </div>
          ))}
        </nav>
        <div className="relative invisible hidden md:block">
          <input
            type="text"
            placeholder="Search Sports, Teams, Players..."
            className="bg-white border border-black text-black rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />
          <Search className="absolute right-2 top-1/2 transform -translate-y-1/2 text-black" size={15} />
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <nav className="md:hidden bg-purple-700 px-6 py-4 space-y-2">
          {['NFL', 'NHL', 'NBA', 'MLB', 'Soccer'].map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase()}`}
              className={`block text-white hover:bg-purple-800 px-3 py-2 rounded-md ${isActiveLink(item) ? "bg-purple-800" : ""
                }`}
              onClick={() => setMenuOpen(false)}
            >
              {item}
            </Link>
          ))}
        </nav>
      )}

      <nav id='global-nav-secondary' className="bg-white w-full text-black shadow-md py-1">
        <div className="container mx-auto flex justify-center gap-6">
          <div className='flex justify-center items-center gap-3'>
            <Image src={leagueIcon} alt="NFL Logo" width={30} priority />
            <span className='font-bold text-black'>{basePath.slice(1).toLocaleUpperCase()}</span>
          </div>
          {RoutesForLeague.map((route) => (
            <Link
              key={route.name}
              href={`${basePath}${route.link.toLowerCase().replace(/\s+/g, '-')}`}
              className={`px-4 py-2 transition ${isActiveLink(route.link) ? 'bg-gray-500 text-white' : 'hover:bg-gray-500 hover:text-white'
                }`}
            >
              {route.name}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
