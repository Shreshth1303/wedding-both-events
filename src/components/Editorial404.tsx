import React from 'react';
import { WaxSeal } from './WaxSeal';
import { ArrowLeft, Compass } from 'lucide-react';
import { AmbientSoundPrompt } from './AmbientSoundPrompt';

interface Editorial404Props {
  onBackToInvitation: () => void;
  requestedPath?: string;
}

export const Editorial404: React.FC<Editorial404Props> = ({
  onBackToInvitation,
  requestedPath
}) => {
  return (
    <div className="min-h-screen w-full max-w-full overflow-x-clip bg-[#F5F2EB] text-[#1A1D20] flex flex-col justify-between p-4 sm:p-8 bg-arabesque-pattern relative">
      
      {/* Top Ledger Running Header */}
      <header className="w-full border-b border-[rgba(179,139,89,0.3)] pb-4 flex items-center justify-between font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.22em] text-[#B38B59]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-[#B38B59] inline-block" />
          <span>The Wedding Chronicle // Archive Folio Index</span>
        </div>
        <div>
          <span>Error 404 • Page Not Found</span>
        </div>
      </header>

      {/* Main Center Editorial Archive Card */}
      <main className="max-w-2xl mx-auto my-auto w-full py-12">
        <div className="relative bg-white border border-[rgba(179,139,89,0.35)] p-8 sm:p-14 shadow-2xl text-center">
          
          {/* Double Hairline Frame */}
          <div className="absolute inset-2 border border-[rgba(179,139,89,0.18)] pointer-events-none" />

          {/* Corner Crosshairs */}
          <span className="absolute -top-2.5 -left-2.5 font-mono text-xs text-[#B38B59] select-none">+</span>
          <span className="absolute -top-2.5 -right-2.5 font-mono text-xs text-[#B38B59] select-none">+</span>
          <span className="absolute -bottom-2.5 -left-2.5 font-mono text-xs text-[#B38B59] select-none">+</span>
          <span className="absolute -bottom-2.5 -right-2.5 font-mono text-xs text-[#B38B59] select-none">+</span>

          {/* Embossed Wax Seal Badge */}
          <div className="flex justify-center -mt-16 sm:-mt-20 mb-6">
            <WaxSeal size={90} withLabel={false} />
          </div>

          {/* Category Tag */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FAF8F5] border border-[rgba(179,139,89,0.3)] font-mono text-[10px] uppercase tracking-[0.25em] text-[#B38B59] mb-4">
            <Compass size={12} />
            <span>Catalogue Leaf 404 // Out of Register</span>
          </div>

          {/* Title */}
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#1A1D20] font-light tracking-tight mb-3">
            Folio Not Found
          </h1>

          {/* Unresolved path indicator */}
          {requestedPath && requestedPath !== '/404' && (
            <div className="font-mono text-[11px] text-[#B38B59] mb-4 bg-[#FAF8F5] py-1 px-3 inline-block rounded-xs border border-[rgba(179,139,89,0.2)]">
              Unresolved Path: <code className="text-[#1A1D20] font-bold">{requestedPath}</code>
            </div>
          )}

          {/* Editorial Ledger Body */}
          <p className="font-serif italic text-base sm:text-lg text-[#1A1D20]/80 leading-relaxed max-w-lg mx-auto mb-8">
            The page or document reference you requested is not catalogued in the official January 2027 wedding ledger of{' '}
            <strong className="font-normal text-[#1A1D20]">Jassim Hashim &amp; Shifa Anis Khan</strong>.
          </p>

          {/* Return Action */}
          <div className="pt-6 border-t border-[rgba(179,139,89,0.2)] flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onBackToInvitation}
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#1A1D20] text-[#F5F2EB] font-mono text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#B38B59] transition-all cursor-pointer w-full sm:w-auto shadow-md"
            >
              <ArrowLeft size={14} />
              <span>Return to Invitation</span>
            </button>
          </div>

        </div>
      </main>

      {/* Bottom Ledger Footer */}
      <footer className="w-full border-t border-[rgba(179,139,89,0.2)] pt-4 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-[#1A1D20]/60 gap-2">
        <span>© 2027 The Wedding Chronicle. All folios preserved.</span>
        <span>Nashik (15 Jan) • Thane (17 Jan)</span>
      </footer>

      {/* Preserved background music player on 404 page */}
      <AmbientSoundPrompt />
    </div>
  );
};
