import React from 'react';
import { COUPLE_DATA } from '../data/invitationData';
import { ArrowUp, FileText, MapPin } from 'lucide-react';

interface ConciergeFootnoteProps {
  onNavigateTo404?: () => void;
}

export const ConciergeFootnote: React.FC<ConciergeFootnoteProps> = ({
  onNavigateTo404
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="concierge" className="w-full max-w-full overflow-x-clip bg-[#121416] text-[#F5F2EB] pt-14 pb-12 px-4 sm:px-8 border-t border-[rgba(179,139,89,0.3)]">
      <div className="max-w-7xl mx-auto">
        
        {/* Footnote Upper Banner */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-6 border-b border-[rgba(179,139,89,0.2)]">
          <div>
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-[#CFAB7A] mb-2">
              <span className="w-2 h-2 bg-[#B38B59] inline-block" />
              <span>Folio 04 // Venue Logistics &amp; Travel Advisory</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#F5F2EB] font-light">
              Guest Route &amp; Destination Guide
            </h2>
          </div>
          <p className="font-serif italic text-xs sm:text-sm text-[#F5F2EB]/70 max-w-md">
            Guidance for travel between Mumbai, Thane, and Nashik for the celebrations of Jassim &amp; Shifa.
          </p>
        </div>

        {/* Intercity Travel Advisory Ledger */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 font-serif text-xs">
          <div className="bg-[#1A1D20]/70 p-6 border border-[rgba(179,139,89,0.25)] rounded-xs">
            <div className="flex items-center gap-2 text-[#CFAB7A] font-mono text-[10px] uppercase tracking-wider mb-2 font-semibold">
              <MapPin size={14} className="text-[#B38B59]" />
              <span>Nashik Destination Advisory (15 Jan 2027)</span>
            </div>
            <h3 className="font-serif text-lg font-medium text-[#F5F2EB] mb-2">
              Bagai Banquet, Ashoka Marg
            </h3>
            <p className="text-[#F5F2EB]/75 leading-relaxed">
              Situated on Ashoka Marg near Ashoka Universal School in Kalpataru Nagar. Dedicated valet parking is available on-site. Guests traveling from Mumbai CSIA (BOM) are advised to budget approximately 3.5 to 4 hours of journey time via NH160 or Samruddhi Mahamarg.
            </p>
          </div>

          <div className="bg-[#1A1D20]/70 p-6 border border-[rgba(179,139,89,0.25)] rounded-xs">
            <div className="flex items-center gap-2 text-[#CFAB7A] font-mono text-[10px] uppercase tracking-wider mb-2 font-semibold">
              <MapPin size={14} className="text-[#B38B59]" />
              <span>Thane Destination Advisory (17 Jan 2027)</span>
            </div>
            <h3 className="font-serif text-lg font-medium text-[#F5F2EB] mb-2">
              Welcome Lawns and Banquet, Ghodbunder Road
            </h3>
            <p className="text-[#F5F2EB]/75 leading-relaxed">
              Conveniently located along Ghodbunder Road opposite Suraj Water Park in Waghbil Naka, Thane West. Multi-lane valet services and secure guest drop-off zones will be operational throughout the evening gala.
            </p>
          </div>
        </div>

        {/* Editorial Colophon & Bottom Metadata */}
        <div className="pt-8 border-t border-[rgba(179,139,89,0.2)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#F5F2EB]/60">
          
          <div className="flex items-center gap-2">
            <span className="text-[#B38B59]">© {COUPLE_DATA.year}</span>
            <span>The Wedding Chronicle. Jassim Hashim &amp; Shifa Anis Khan.</span>
          </div>

          <div className="flex items-center gap-4 text-[10px] uppercase tracking-widest">
            {onNavigateTo404 && (
              <button
                onClick={onNavigateTo404}
                className="hover:text-[#CFAB7A] transition-colors cursor-pointer flex items-center gap-1 text-[#B38B59]"
              >
                <FileText size={11} />
                <span>Editorial 404 Folio</span>
              </button>
            )}

            <button
              onClick={scrollToTop}
              className="hover:text-[#CFAB7A] transition-colors cursor-pointer flex items-center gap-1"
            >
              <ArrowUp size={12} />
              <span>Top of Folio</span>
            </button>
          </div>

        </div>

      </div>
    </footer>
  );
};
