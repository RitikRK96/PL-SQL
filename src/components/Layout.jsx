import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

export default function Layout() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const location = useLocation();

  // Scroll to top on route change, or to hash
  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const el = document.getElementById(location.hash.slice(1));
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Sidebar />
      <Header />
      <main id="main" className="ml-[270px] pt-20 px-10 pb-20">
        <div className="max-w-[1100px] mx-auto">
          <Outlet />
        </div>
      </main>

      {/* Scroll to top button */}
      <button
        id="scrolltop"
        style={{ display: showScrollTop ? 'flex' : 'none' }}
        className="fixed bottom-8 right-8 bg-accent text-black border-none rounded-full w-10 h-10 text-lg cursor-pointer items-center justify-center z-99 transition-opacity duration-200 hover:bg-[#ffc030]"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        ↑
      </button>
    </>
  );
}
