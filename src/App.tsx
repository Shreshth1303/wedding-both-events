import { useState, useEffect, useCallback } from 'react';
import { MicroHeader } from './components/MicroHeader';
import { SplitHero } from './components/SplitHero';
import { GatefoldEvents } from './components/GatefoldEvents';
import { ConciergeFootnote } from './components/ConciergeFootnote';
import { Editorial404 } from './components/Editorial404';
import { GoldDustBackground } from './components/GoldDustBackground';
import { AmbientSoundPrompt } from './components/AmbientSoundPrompt';

/**
 * Determines whether the given URL path corresponds to an unresolved / 404 route.
 * In this single-page wedding chronicle, valid root routes are '/' and '/index.html'.
 * All other paths trigger the custom Editorial 404 fallback page.
 */
function is404Route(pathname: string): boolean {
  if (!pathname) return false;
  const normalized = pathname.trim().replace(/\/+$/, '') || '/';
  return normalized !== '/' && normalized !== '/index.html';
}

export function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname;
    }
    return '/';
  });

  // Handle browser back/forward history navigation smoothly
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = useCallback((path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const scrollToEvents = useCallback(() => {
    if (is404Route(currentPath)) {
      navigateTo('/');
      setTimeout(() => {
        const el = document.getElementById('gatefold-events');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }
    const el = document.getElementById('gatefold-events');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, [currentPath, navigateTo]);

  // If visitor navigated to a nonexistent route, render the custom 404 Editorial Archive Folio
  if (is404Route(currentPath)) {
    return (
      <Editorial404 
        onBackToInvitation={() => navigateTo('/')} 
        requestedPath={currentPath}
      />
    );
  }

  // Legitimate Visitor Route (Home Invitation Folio)
  return (
    <div className="relative w-full max-w-full overflow-x-clip min-h-screen bg-[#F5F2EB] text-[#1A1D20] font-sans">
      {/* Dynamic 60fps Floating Gold Dust Particle Field */}
      <GoldDustBackground />

      {/* 1. Persistent Micro-Header with Live Dual Countdown Clocks */}
      <MicroHeader />

      <main className="relative z-10 w-full max-w-full overflow-x-clip">
        {/* 2. The Split Hero: Asymmetric Desktop Grid with Scripture & Family Proclamation */}
        <SplitHero onScrollToEvents={scrollToEvents} />

        {/* 3. The Dual-Event Gatefold: Nikah (Nashik) & Reception (Thane) */}
        <GatefoldEvents />
      </main>

      {/* 4. Destination Advisory & 2027 Colophon */}
      <ConciergeFootnote />

      {/* 5. Melodious Background Music Controller */}
      <AmbientSoundPrompt />
    </div>
  );
}

export default App;
