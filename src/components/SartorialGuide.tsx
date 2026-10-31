import React from 'react';
import { SARTORIAL_PALETTE } from '../data/invitationData';
import { Check } from 'lucide-react';

export const SartorialGuide: React.FC = () => {
  return (
    <section id="sartorial" className="w-full max-w-full overflow-x-clip bg-[#FAF8F5] text-[#1A1D20] py-14 sm:py-20 px-4 sm:px-8 border-b border-[rgba(179,139,89,0.2)]">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12 border-b border-[rgba(179,139,89,0.2)] pb-6">
          <div>
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-[#B38B59] mb-2">
              <span className="w-2 h-2 bg-[#B38B59] inline-block" />
              <span>Folio 04 // Sartorial Ledger</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#1A1D20]">
              The High-Fashion Couture Guide
            </h2>
          </div>
          <p className="font-serif italic text-sm sm:text-base text-[#1A1D20]/75 max-w-md">
            Harmonizing with the architectural tones of Sandstone Cream, Charcoal Slate, and Polished Bronze.
          </p>
        </div>

        {/* Editorial Palette Swatches */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-12">
          {SARTORIAL_PALETTE.map((swatch, idx) => (
            <div 
              key={idx} 
              className="p-3 bg-white border border-[rgba(179,139,89,0.2)] rounded-xs shadow-xs flex flex-col justify-between h-36 sm:h-40"
            >
              <div 
                className="w-full h-16 sm:h-20 rounded-xs border border-black/10 shadow-inner flex items-end justify-end p-1.5"
                style={{ backgroundColor: swatch.hex }}
              >
                <span className={`font-mono text-[8px] uppercase tracking-wider px-1.5 py-0.5 rounded ${
                  swatch.hex === '#1A1D20' ? 'text-white bg-black/40' : 'text-black bg-white/70'
                }`}>
                  {swatch.hex}
                </span>
              </div>
              <div className="mt-2">
                <h4 className="font-serif text-xs sm:text-sm font-semibold text-[#1A1D20] truncate">
                  {swatch.name}
                </h4>
                <p className="font-mono text-[9px] text-[#B38B59] uppercase tracking-wider truncate">
                  {swatch.role}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Ceremony-Specific Attire Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          
          {/* Nikah Attire Guidance */}
          <div className="p-6 bg-white/80 border border-[rgba(179,139,89,0.25)] relative">
            <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#B38B59] mb-1">
              Ceremony I • Nashik Daytime
            </div>
            <h3 className="font-serif text-2xl font-medium text-[#1A1D20] mb-3">
              Traditional &amp; Modest Couture
            </h3>
            <p className="font-serif text-xs text-[#1A1D20]/75 mb-4 leading-relaxed">
              For the daytime Nikah ceremony at Bagai Banquet, we encourage refined classical elegance:
            </p>
            <ul className="space-y-2 text-xs font-serif text-[#1A1D20]/85">
              <li className="flex items-start gap-2">
                <Check size={14} className="text-[#B38B59] shrink-0 mt-0.5" />
                <span>Sherwanis, Bandhgalas, Kurta-Pajamas in sandstone, ivory, champagne or soft pastels.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check size={14} className="text-[#B38B59] shrink-0 mt-0.5" />
                <span>Anarkalis, Ghararas, Shararas and Sarees with delicate zardozi or chikankari embroidery.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check size={14} className="text-[#B38B59] shrink-0 mt-0.5" />
                <span>Comfortable footwear suitable for the banquet and prayer hall carpeted sections.</span>
              </li>
            </ul>
          </div>

          {/* Reception Attire Guidance */}
          <div className="p-6 bg-[#1A1D20] text-[#F5F2EB] border border-[rgba(179,139,89,0.3)] relative">
            <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#CFAB7A] mb-1">
              Ceremony II • Thane Evening Gala
            </div>
            <h3 className="font-serif text-2xl font-medium text-[#F5F2EB] mb-3">
              Black-Tie &amp; Evening Opulence
            </h3>
            <p className="font-serif text-xs text-[#F5F2EB]/70 mb-4 leading-relaxed">
              For the starlit Walima reception at Welcome Lawns, celebrate with evening splendor:
            </p>
            <ul className="space-y-2 text-xs font-serif text-[#F5F2EB]/85">
              <li className="flex items-start gap-2">
                <Check size={14} className="text-[#CFAB7A] shrink-0 mt-0.5" />
                <span>Black-Tie tuxedos, dark velvet dinner jackets, or royal Indo-Western Bandhgalas in charcoal slate, deep emerald, or onyx.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check size={14} className="text-[#CFAB7A] shrink-0 mt-0.5" />
                <span>Gala evening gowns, haute couture lehengas with rich metallic bronze and crystal accents.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check size={14} className="text-[#CFAB7A] shrink-0 mt-0.5" />
                <span>Evening wraps or stoles for open-lawn starlit breezes.</span>
              </li>
            </ul>
          </div>

        </div>

      </div>
    </section>
  );
};
