import React, { useState } from 'react';
import Link from 'next/link';
import { useTheme } from '../context/ThemeContext';
import { Moon, Sun, Menu, X, Download } from 'lucide-react';

export default function Header({ minimal }: { minimal?: boolean }) {
  const { isDarkMode, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  // Minimal header for watch pages
  if (minimal) {
    return (
      <header className="bg-black/90 text-white py-3 px-4 sticky top-0 z-50">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-xl md:text-2xl font-bold">MediaStream</Link>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Toggle Theme"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </header>
    );
  }

  return (
    <header className="bg-white dark:bg-[#1e293b] shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="text-xl md:text-2xl font-bold text-blue-600 dark:text-blue-400">
            Movie & TV trailers
          </Link>

          {/* Desktop Navigation (hidden on mobile) */}
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link href="/movies" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Movies</Link>
            <Link href="/tv" className="hover:text-blue-600 dark:hover:text-blue-400 transition">TV Shows</Link>
            <Link href="/sports" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Sports</Link>
            <Link href="/live" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Live TV</Link>
            <Link href="/adult" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Adult</Link>
            <Link href="/hindi-dubbed" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Hindi Dubbed</Link>
            <Link href="/documentary" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Documentary</Link>
          </nav>

          {/* Right side buttons – always visible */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 transition-colors text-slate-600 dark:text-slate-300"
              aria-label="Toggle Theme"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Get App Link – hidden on smallest screens, visible on sm+ */}
            <a
              href="https://median.co/share/bnlpkdo"
              target="_blank"
              rel="noopener noreferrer"
              download
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 dark:bg-white/5 text-slate-900 dark:text-white text-sm font-bold hover:bg-slate-200 dark:hover:bg-white/10 transition-all border border-slate-200 dark:border-white/10"
            >
              <Download size={16} />
              <span className="hidden lg:inline">Get App</span>
            </a>

            {/* Mobile Menu Toggle – visible only on mobile */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu – slides down when open */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            mobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <nav className="py-4 flex flex-col space-y-4 border-t border-slate-200 dark:border-slate-700">
            <Link
              href="/movies"
              className="px-2 py-2 text-base font-medium hover:text-blue-600 dark:hover:text-blue-400 transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              Movies
            </Link>
            <Link
              href="/tv"
              className="px-2 py-2 text-base font-medium hover:text-blue-600 dark:hover:text-blue-400 transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              TV Shows
            </Link>
            <Link
              href="/sports"
              className="px-2 py-2 text-base font-medium hover:text-blue-600 dark:hover:text-blue-400 transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              Sports
            </Link>
            <Link
              href="/live"
              className="px-2 py-2 text-base font-medium hover:text-blue-600 dark:hover:text-blue-400 transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              Live TV
            </Link>
            <Link
              href="/adult"
              className="px-2 py-2 text-base font-medium hover:text-blue-600 dark:hover:text-blue-400 transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              Adult
            </Link>
            <Link
              href="/hindi-dubbed"
              className="px-2 py-2 text-base font-medium hover:text-blue-600 dark:hover:text-blue-400 transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              Hindi Dubbed
            </Link>
            <Link
              href="/documentary"
              className="px-2 py-2 text-base font-medium hover:text-blue-600 dark:hover:text-blue-400 transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              Documentary
            </Link>

            {/* Get App link for mobile (since it's hidden on sm in the top bar) */}
            <a
              href="https://median.co/share/bnlpkdo"
              target="_blank"
              rel="noopener noreferrer"
              download
              className="sm:hidden flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 dark:bg-white/5 text-slate-900 dark:text-white text-sm font-bold hover:bg-slate-200 dark:hover:bg-white/10 transition-all border border-slate-200 dark:border-white/10 w-fit"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Download size={16} />
              <span>Get App</span>
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}