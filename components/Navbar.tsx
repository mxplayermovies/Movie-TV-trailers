import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Menu, X, ChevronRight, Download, ShieldAlert, Film } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  // Prevent background scrolling when mobile menu is active
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }
  }, [isMenuOpen]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Movies', path: '/Movies' },
    { name: 'TV Shows', path: '/tv' },
    { name: 'Sports', path: '/Sports' },
    { name: 'Live TV', path: '/live' },
    { name: 'Hindi Dubbed', path: '/hindi-dubbed' },
    { name: 'Documentary', path: '/Docs' },
    { name: 'Adults', path: '/adult' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && router.pathname !== '/') return false;
    return router.pathname.startsWith(path);
  };

  return (
    <>
      {/* MAIN NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-[9999] bg-black/95 backdrop-blur-xl border-b border-white/10 h-16 md:h-20">
        <div className="container mx-auto px-3 sm:px-4 h-full flex items-center justify-between">
          
          {/* Logo Section */}
          <Link 
            href="/" 
            className="flex items-center gap-1.5 sm:gap-2 group shrink-0 min-w-0 flex-1 md:flex-none" 
            onClick={() => setIsMenuOpen(false)}
          >
            <div className="shrink-0 group-hover:scale-105 transition-transform">
              <img
                src="/android-chrome-512x512.png"
                alt="Logo"
                className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
              />
            </div>

            <div className="flex items-center">
              <span className="text-lg sm:text-xl md:text-2xl font-black tracking-tighter text-white truncate">
                Movie & TV trailers
              </span>
              {/* <span className="text-lg sm:text-xl md:text-2xl font-bold tracking-tighter text-miraj-red ml-2">
                Official
              </span> */}
            </div>
          </Link>

          {/* Desktop Links (Hidden on Mobile) */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              // Adults gets a special red-tinted style on desktop
              if (link.path === '/adult') {
                return (
                  <Link
                    key={link.path}
                    href={link.path}
                    className={`px-4 py-2 rounded-full text-[11px] font-black transition-all uppercase tracking-[0.1em] flex items-center gap-1 ${
                      isActive(link.path)
                        ? 'text-white bg-miraj-red shadow-lg'
                        : 'text-red-400 hover:text-white hover:bg-miraj-red/20'
                    }`}
                  >
                    <ShieldAlert size={12} />
                    {link.name}
                  </Link>
                );
              }
              // Documentary gets a gold-tinted style on desktop
              if (link.path === '/Docs') {
                return (
                  <Link
                    key={link.path}
                    href={link.path}
                    className={`px-4 py-2 rounded-full text-[11px] font-black transition-all uppercase tracking-[0.1em] flex items-center gap-1 ${
                      isActive(link.path)
                        ? 'text-white bg-miraj-red shadow-lg'
                        : 'text-miraj-gold hover:text-white hover:bg-miraj-gold/20'
                    }`}
                  >
                    <Film size={12} />
                    {link.name}
                  </Link>
                );
              }
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`px-4 py-2 rounded-full text-[11px] font-black transition-all uppercase tracking-[0.1em] ${
                    isActive(link.path)
                      ? 'text-white bg-miraj-red shadow-lg'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            
            {/* Download APK Button - Desktop */}
            <a
              href="https://median.co/share/odmellj"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 flex items-center gap-2 px-4 py-2 rounded-full text-[11px] font-black uppercase tracking-[0.1em] transition-all duration-300 bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:shadow-lg hover:shadow-emerald-500/20 hover:scale-[1.02] active:scale-95"
            >
              <Download size={14} />
              Download APK
            </a>
          </div>

          {/* Mobile Controls */}
          <div className="flex items-center gap-1 sm:gap-2 md:gap-3 shrink-0">
            
            {/* Download APK Button - Mobile */}
            <a
              href="https://median.co/share/odmellj"
              target="_blank"
              rel="noopener noreferrer"
              className="lg:hidden flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg sm:rounded-full text-[10px] sm:text-[11px] font-black uppercase tracking-[0.1em] transition-all duration-300 bg-gradient-to-r from-green-500 to-emerald-600 text-white active:scale-95 whitespace-nowrap"
            >
              <Download size={12} className="sm:w-3.5 sm:h-3.5" />
              <span className="hidden xs:inline">APK</span>
            </a>

            {/* Mobile Hamburger Button */}
            <button 
              className="lg:hidden p-2 sm:p-2.5 rounded-lg sm:rounded-xl transition-all duration-300 flex items-center justify-center bg-miraj-red text-white active:scale-90 touch-manipulation min-w-[44px] min-h-[44px] shrink-0" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              type="button"
            >
              {isMenuOpen ? <X size={20} className="sm:w-6 sm:h-6" /> : <Menu size={20} className="sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE BACKDROP */}
      <div 
        className={`fixed inset-0 bg-black/95 backdrop-blur-md z-[9998] transition-opacity duration-300 lg:hidden ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsMenuOpen(false)}
        style={{ top: 0 }}
      />

      {/* MOBILE SIDEBAR */}
      <aside 
        className={`fixed right-0 top-0 h-full w-[90%] max-w-[360px] bg-black border-l border-white/10 z-[9999] lg:hidden transition-transform duration-300 ease-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
        style={{ 
          WebkitOverflowScrolling: 'touch',
          overscrollBehavior: 'contain'
        }}
      >
        
        {/* Close Button */}
        <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10">
          <button 
            onClick={() => setIsMenuOpen(false)}
            className="p-2.5 sm:p-3 bg-white/5 hover:bg-white/10 rounded-full text-white transition-all active:scale-90 touch-manipulation min-w-[44px] min-h-[44px]"
            type="button"
            aria-label="Close menu"
          >
            <X size={22} className="sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Menu Content */}
        <div className="flex flex-col h-full pt-16 sm:pt-20 px-4 sm:px-6 pb-8 sm:pb-12 overflow-y-auto">
          
          {/* Header */}
          <div className="mb-6 sm:mb-8 border-b border-white/10 pb-3 sm:pb-4">
            <div className="flex items-center gap-2">
              <img
                src="/android-chrome-512x512.png"
                alt="Logo"
                className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
              />
              <span className="text-base sm:text-lg font-black tracking-tighter text-white">Movie & TV trailers</span>
            </div>
          </div>
          
          {/* Navigation Links */}
          <div className="flex flex-col gap-2 mb-6 sm:mb-8">
            {navLinks.map((link) => {
              // Adults — special style in mobile sidebar
              if (link.path === '/adults') {
                return (
                  <Link
                    key={link.path}
                    href={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center justify-between p-3 sm:p-4 rounded-xl sm:rounded-2xl font-black text-base sm:text-lg transition-all active:scale-98 touch-manipulation ${
                      isActive(link.path)
                        ? 'bg-miraj-red text-white shadow-xl shadow-miraj-red/20'
                        : 'text-red-400 bg-miraj-red/10 active:bg-miraj-red/20'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <ShieldAlert size={18} />
                      {link.name}
                    </div>
                    <ChevronRight size={18} className={`sm:w-5 sm:h-5 ${isActive(link.path) ? 'text-white' : 'text-red-400/60'}`} />
                  </Link>
                );
              }
              // Documentary — special style in mobile sidebar
              if (link.path === '/documentary') {
                return (
                  <Link
                    key={link.path}
                    href={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center justify-between p-3 sm:p-4 rounded-xl sm:rounded-2xl font-black text-base sm:text-lg transition-all active:scale-98 touch-manipulation ${
                      isActive(link.path)
                        ? 'bg-miraj-red text-white shadow-xl shadow-miraj-red/20'
                        : 'text-miraj-gold bg-miraj-gold/10 active:bg-miraj-gold/20'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Film size={18} />
                      {link.name}
                    </div>
                    <ChevronRight size={18} className={`sm:w-5 sm:h-5 ${isActive(link.path) ? 'text-white' : 'text-miraj-gold/60'}`} />
                  </Link>
                );
              }
              // Default nav links
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center justify-between p-3 sm:p-4 rounded-xl sm:rounded-2xl font-black text-base sm:text-lg transition-all active:scale-98 touch-manipulation ${
                    isActive(link.path)
                      ? 'bg-miraj-red text-white shadow-xl shadow-miraj-red/20'
                      : 'text-gray-400 bg-white/5 active:bg-white/10'
                  }`}
                >
                  {link.name}
                  <ChevronRight size={18} className={`sm:w-5 sm:h-5 ${isActive(link.path) ? 'text-white' : 'text-gray-600'}`} />
                </Link>
              );
            })}
          </div>

          {/* Download APK Link */}
          <div className="mt-auto">
            <a
              href="https://median.co/share/odmellj"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center justify-between p-3 sm:p-4 rounded-xl sm:rounded-2xl font-black text-base sm:text-lg transition-all bg-gradient-to-r from-green-500/20 to-emerald-600/20 border border-green-500/30 text-green-400 active:bg-green-500/10 active:scale-98 touch-manipulation"
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="p-1.5 sm:p-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg">
                  <Download size={18} className="text-white sm:w-5 sm:h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm sm:text-base">Download APK</span>
                  <span className="text-xs text-green-300/70 font-normal">Latest Version</span>
                </div>
              </div>
              <ChevronRight size={18} className="text-green-400/60 sm:w-5 sm:h-5" />
            </a>
          </div>

          {/* Footer */}
          <div className="mt-6 sm:mt-8 text-center">
            <div className="h-px bg-white/5 w-1/2 mx-auto mb-3 sm:mb-4"></div>
            <p className="text-[9px] sm:text-[10px] font-black text-gray-600 uppercase tracking-[0.5em] sm:tracking-[0.6em]">Movie & TV trailers</p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Navbar;