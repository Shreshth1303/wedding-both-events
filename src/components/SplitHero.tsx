import React, { useState, useEffect } from 'react';
import { ArabicCalligraphy } from './ArabicCalligraphy';
import { WaxSeal } from './WaxSeal';
import { COUPLE_DATA, EVENTS_DATA } from '../data/invitationData';
import { ArrowDown, Sparkles } from 'lucide-react';

interface SplitHeroProps {
  onScrollToEvents: () => void;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(targetIso: string): TimeLeft {
  const target = new Date(targetIso).getTime();
  const now = new Date().getTime();
  const diff = target - now;

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds };
}

export const SplitHero: React.FC<SplitHeroProps> = ({
  onScrollToEvents
}) => {
  const [nikahTime, setNikahTime] = useState<TimeLeft>(() => calculateTimeLeft(EVENTS_DATA.nikah.isoDate));
  const [receptionTime, setReceptionTime] = useState<TimeLeft>(() => calculateTimeLeft(EVENTS_DATA.reception.isoDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setNikahTime(calculateTimeLeft(EVENTS_DATA.nikah.isoDate));
      setReceptionTime(calculateTimeLeft(EVENTS_DATA.reception.isoDate));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const pad = (n: number) => (n < 10 ? '0' + n : n);

  return (
    <section id="hero" className="relative w-full max-w-full overflow-x-clip bg-[#F5F2EB] text-[#1A1D20] border-b border-[rgba(179,139,89,0.2)]">
      {/* Editorial Folio Running Top Bar */}
      <div className="w-full border-b border-[rgba(179,139,89,0.2)] px-4 sm:px-8 py-2.5 flex items-center justify-between text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.22em] text-[#B38B59]/90 bg-[#FAF8F5]/80">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-[#B38B59] inline-block animate-ping" />
          <span>Folio N° 01 / Haute Couture Ledger</span>
        </div>
        <div className="hidden md:flex items-center gap-4 text-[#1A1D20]/60">
          <span>Nikah: 15.01.2027</span>
          <span>•</span>
          <span>Reception: 17.01.2027</span>
          <span>•</span>
          <span>Maharashtra, India</span>
        </div>
        <div className="text-right">
          <span>Private Circulation</span>
        </div>
      </div>

      {/* Main Split Grid (Asymmetric Desktop Layout) */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 min-h-[calc(100vh-4rem)]">
        
        {/* LEFT PANE (Desktop Col 1-7): Giant Typographic Lockup & Scripture Calligraphy */}
        <div className="lg:col-span-7 p-6 sm:p-10 md:p-14 lg:p-16 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[rgba(179,139,89,0.2)] bg-arabesque-pattern relative">
          
          {/* Subtle Corner Registration Crosshair & Rotating Arabesque Star */}
          <div className="absolute top-4 left-4 font-mono text-[10px] text-[#B38B59]/40 select-none flex items-center gap-1.5">
            <span className="inline-block animate-slow-orbit text-xs text-[#B38B59]/60">✦</span>
            <span>+ 01 / FOLIO</span>
          </div>
          <div className="absolute top-4 right-4 font-mono text-[10px] text-[#B38B59]/40 select-none">
            EDITION 2027 +
          </div>

          {/* Upper: Scripture & Calligraphy */}
          <div className="mt-4 sm:mt-6 transition-all">
            <ArabicCalligraphy className="mb-6 sm:mb-8" />
          </div>

          {/* Center: Giant Typographic Lockup with Shimmer Animation */}
          <div className="my-6 sm:my-10">
            <div className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[#B38B59] mb-3 flex items-center gap-2">
              <span className="w-8 h-[1px] bg-[#B38B59]" />
              <span>In Honor of The Union</span>
            </div>

            <h1 className="font-serif tracking-tight leading-[0.92] text-[#1A1D20] select-none">
              <span className="block text-5xl sm:text-7xl md:text-8xl lg:text-[6.5rem] font-light editorial-gold-shimmer">
                JASSIM
              </span>
              <span className="flex items-baseline gap-3 my-1">
                <span className="font-serif italic text-4xl sm:text-6xl md:text-7xl lg:text-7.5xl text-[#B38B59] font-light">
                  &amp;
                </span>
                <span className="text-5xl sm:text-7xl md:text-8xl lg:text-[6.5rem] font-normal tracking-tight editorial-gold-shimmer">
                  SHIFA
                </span>
              </span>
            </h1>

            <p className="mt-5 sm:mt-7 font-serif text-base sm:text-lg lg:text-xl text-[#1A1D20]/75 max-w-xl leading-relaxed italic">
              Two families unite, two cities welcome an auspicious chapter. An editorial journey spanning the sacred Nikah in Nashik and the grand Reception in Thane.
            </p>

            {/* Mobile & Desktop Live Countdown Showcase Card */}
            <div className="mt-8 p-4 sm:p-5 bg-white/80 border border-[rgba(179,139,89,0.3)] shadow-xs rounded-xs relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-radial from-[#B38B59]/10 to-transparent pointer-events-none -mr-8 -mt-8" />
              
              <div className="flex items-center justify-between mb-3 border-b border-[rgba(179,139,89,0.2)] pb-2 font-mono text-[10px] uppercase tracking-wider text-[#B38B59]">
                <div className="flex items-center gap-1.5">
                  <Sparkles size={12} className="animate-spin text-[#B38B59]" style={{ animationDuration: '8s' }} />
                  <span className="font-semibold">Live Ceremonial Countdown</span>
                </div>
                <span className="text-[#1A1D20]/60">Nashik &amp; Thane 2027</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                {/* Nikah Countdown Block */}
                <div className="bg-[#FAF8F5] p-3 border border-[rgba(179,139,89,0.2)] rounded-xs">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-[#B38B59] font-bold">
                      Nikah
                    </span>
                    <span className="font-mono text-[9px] text-[#1A1D20]/50">15 Jan 2027</span>
                  </div>
                  <div className="flex items-baseline gap-1.5 font-mono text-sm sm:text-base font-semibold text-[#1A1D20]">
                    <span className="bg-[#1A1D20] text-white px-1.5 py-0.5 rounded-xs text-xs sm:text-sm">{nikahTime.days}d</span>
                    <span className="bg-[#1A1D20] text-white px-1.5 py-0.5 rounded-xs text-xs sm:text-sm">{pad(nikahTime.hours)}h</span>
                    <span className="bg-[#1A1D20] text-white px-1.5 py-0.5 rounded-xs text-xs sm:text-sm">{pad(nikahTime.minutes)}m</span>
                    <span className="bg-[#B38B59] text-white px-1.5 py-0.5 rounded-xs text-xs sm:text-sm">{pad(nikahTime.seconds)}s</span>
                  </div>
                </div>

                {/* Reception Countdown Block */}
                <div className="bg-[#FAF8F5] p-3 border border-[rgba(179,139,89,0.2)] rounded-xs">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-[#B38B59] font-bold">
                      Reception
                    </span>
                    <span className="font-mono text-[9px] text-[#1A1D20]/50">17 Jan 2027</span>
                  </div>
                  <div className="flex items-baseline gap-1.5 font-mono text-sm sm:text-base font-semibold text-[#1A1D20]">
                    <span className="bg-[#1A1D20] text-white px-1.5 py-0.5 rounded-xs text-xs sm:text-sm">{receptionTime.days}d</span>
                    <span className="bg-[#1A1D20] text-white px-1.5 py-0.5 rounded-xs text-xs sm:text-sm">{pad(receptionTime.hours)}h</span>
                    <span className="bg-[#1A1D20] text-white px-1.5 py-0.5 rounded-xs text-xs sm:text-sm">{pad(receptionTime.minutes)}m</span>
                    <span className="bg-emerald-600 text-white px-1.5 py-0.5 rounded-xs text-xs sm:text-sm">{pad(receptionTime.seconds)}s</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Lower: Editorial Action Group & Micro Markers */}
          <div className="pt-6 border-t border-[rgba(179,139,89,0.2)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={onScrollToEvents}
                className="group inline-flex items-center gap-2.5 px-6 py-3 bg-[#1A1D20] text-[#F5F2EB] font-mono text-[11px] uppercase tracking-[0.18em] rounded-sm hover:bg-[#B38B59] transition-all cursor-pointer shadow-md active:scale-95"
              >
                <span>Explore Gatefold Folios</span>
                <ArrowDown size={14} className="group-hover:translate-y-1 transition-transform" />
              </button>
            </div>

            <div className="font-mono text-[10px] text-[#B38B59] flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full border border-[#B38B59] animate-pulse" />
              <span>Nashik // Thane • Jan 2027</span>
            </div>
          </div>
        </div>

        {/* RIGHT PANE (Desktop Col 8-12): Formal Family Invite Card with Embossed Wax Seal */}
        <div className="lg:col-span-5 p-6 sm:p-10 md:p-12 lg:p-14 bg-[#FAF8F5] flex flex-col justify-center relative">
          
          {/* Architectural Formal Card Outer Frame */}
          <div className="relative border border-[rgba(179,139,89,0.35)] p-6 sm:p-8 md:p-10 bg-white/70 shadow-[0_8px_30px_-4px_rgba(179,139,89,0.18)] transition-all">
            
            {/* Double Hairline Inner Inset */}
            <div className="absolute inset-1.5 border border-[rgba(179,139,89,0.15)] pointer-events-none" />

            {/* Corner Crosshair Accents */}
            <span className="absolute -top-2.5 -left-2.5 font-mono text-[12px] text-[#B38B59]">+</span>
            <span className="absolute -top-2.5 -right-2.5 font-mono text-[12px] text-[#B38B59]">+</span>
            <span className="absolute -bottom-2.5 -left-2.5 font-mono text-[12px] text-[#B38B59]">+</span>
            <span className="absolute -bottom-2.5 -right-2.5 font-mono text-[12px] text-[#B38B59]">+</span>

            {/* Embossed Gold Wax Seal with Breathing Aura Animation */}
            <div className="flex justify-center -mt-12 sm:-mt-14 mb-4">
              <div className="rounded-full animate-aura-breathe">
                <WaxSeal size={84} withLabel={false} />
              </div>
            </div>

            {/* Formal Proclamation Header */}
            <div className="text-center mb-6">
              <p className="font-arabic text-xl sm:text-2xl text-[#1A1D20]/90 mb-1 select-none">
                بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
              </p>
              <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#B38B59]">
                In the Name of Allah, the Most Beneficent, the Most Merciful
              </p>
            </div>

            {/* Formal Invitation Text Honoring Both Sets of Parents */}
            <div className="text-center space-y-4">
              <p className="font-serif italic text-sm text-[#1A1D20]/80 leading-relaxed">
                With joyful hearts and humble prayers, we solicit the honor of your presence and warm supplications at the wedding ceremonies of our children
              </p>

              {/* Groom's Lineage */}
              <div className="py-2.5 border-y border-[rgba(179,139,89,0.15)] bg-white/40">
                <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#1A1D20] tracking-wide">
                  {COUPLE_DATA.groom.fullName}
                </h3>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#B38B59] mt-0.5">
                  {COUPLE_DATA.groom.title}
                </p>
              </div>

              <div className="font-serif italic text-lg text-[#B38B59] my-1 font-light">
                &amp;
              </div>

              {/* Bride's Lineage */}
              <div className="py-2.5 border-y border-[rgba(179,139,89,0.15)] bg-white/40">
                <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#1A1D20] tracking-wide">
                  {COUPLE_DATA.bride.fullName}
                </h3>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#B38B59] mt-0.5">
                  {COUPLE_DATA.bride.title}
                </p>
              </div>

              {/* Formal Family Blessing Note */}
              <p className="font-serif text-xs text-[#1A1D20]/75 leading-relaxed pt-2">
                Cordially invited by both sets of parents alongside the extended Hashim and Khan families to share in the joy of these two monumental gatherings.
              </p>

              {/* Quick Dual Event Folio Pill */}
              <div className="pt-4 grid grid-cols-2 gap-2 text-left font-mono text-[9px] border-t border-[rgba(179,139,89,0.2)]">
                <div className="bg-[#F5F2EB] p-2.5 rounded-sm border border-[rgba(179,139,89,0.2)] hover:border-[#B38B59] transition-colors">
                  <span className="text-[#B38B59] block font-bold uppercase">I. Nikah</span>
                  <span className="text-[#1A1D20] font-semibold">15 Jan 2027</span>
                  <span className="text-[#1A1D20]/60 block">Nashik</span>
                </div>
                <div className="bg-[#F5F2EB] p-2.5 rounded-sm border border-[rgba(179,139,89,0.2)] hover:border-[#B38B59] transition-colors">
                  <span className="text-[#B38B59] block font-bold uppercase">II. Reception</span>
                  <span className="text-[#1A1D20] font-semibold">17 Jan 2027</span>
                  <span className="text-[#1A1D20]/60 block">Thane</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
