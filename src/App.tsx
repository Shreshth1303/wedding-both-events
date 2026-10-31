import { useState, useEffect } from 'react';
import { MicroHeader } from './components/MicroHeader';
import { SplitHero } from './components/SplitHero';
import { GatefoldEvents } from './components/GatefoldEvents';
import { ConciergeFootnote } from './components/ConciergeFootnote';
import { Editorial404 } from './components/Editorial404';
import { GoldDustBackground } from './components/GoldDustBackground';

export function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      if (path === '/404' || window.location.search.includes('page=404')) {
        return '/404';
      }
    }
    return '/';
  });

  // Handle browser navigation history
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path === '/404' || window.location.search.includes('page=404')) {
        setCurrentPath('/404');
      } else {
        setCurrentPath('/');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (path: string) => {
    if (path === '/404') {
      window.history.pushState({}, '', '/404');
      setCurrentPath('/404');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.history.pushState({}, '', '/');
      setCurrentPath('/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const scrollToEvents = () => {
    if (currentPath === '/404') {
      navigateTo('/');
      setTimeout(() => {
        const el = document.getElementById('gatefold-events');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }
    const el = document.getElementById('gatefold-events');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // If in 404 route, render the dedicated editorial 404 archive folio
  if (currentPath === '/404') {
    return <Editorial404 onBackToInvitation={() => navigateTo('/')} />;
  }

  return (
    <div className="relative w-full max-w-full overflow-x-clip min-h-screen bg-[#F5F2EB] text-[#1A1D20] font-sans">
      {/* Dynamic 60fps Floating Gold Dust Particle Field (visible on mobile & desktop) */}
      <GoldDustBackground />

      {/* 1. Persistent Micro-Header with Live Dual Countdown Clocks */}
      <MicroHeader 
        onNavigateTo404={() => navigateTo('/404')} 
      />

      <main className="relative z-10 w-full max-w-full overflow-x-clip">
        {/* 2. The Split Hero: Asymmetric Desktop Grid with Scripture & Family Proclamation */}
        <SplitHero 
          onScrollToEvents={scrollToEvents} 
        />

        {/* 3. The Dual-Event Gatefold: Nikah (Nashik) & Reception (Thane) */}
        <GatefoldEvents />
      </main>

      {/* 4. Destination Advisory & 2027 Colophon */}
      <ConciergeFootnote 
        onNavigateTo404={() => navigateTo('/404')} 
      />
    </div>
  );
}

export default App;
