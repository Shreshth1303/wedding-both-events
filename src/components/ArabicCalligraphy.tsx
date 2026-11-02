import React from 'react';

interface ArabicCalligraphyProps {
  className?: string;
  showSubcaption?: boolean;
}

export const ArabicCalligraphy: React.FC<ArabicCalligraphyProps> = ({
  className = '',
  showSubcaption = true
}) => {
  return (
    <div className={`flex flex-col items-center text-center ${className}`}>
      {/* Decorative Symmetrical Top Hairline & Folio Mark */}
      <div className="flex items-center justify-center gap-3 w-full max-w-md mb-3 opacity-70">
        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[rgba(179,139,89,0.4)]" />
        <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#B38B59] whitespace-nowrap">
          Sacred Inscription &bull; LXXVIII : VIII
        </span>
        <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[rgba(179,139,89,0.4)]" />
      </div>

      {/* Scripture Vector Enclosure & Arabic Typography */}
      <div className="relative py-2 px-1">
        {/* Subtle background glow */}
        <div className="absolute inset-0 bg-radial from-[rgba(179,139,89,0.06)] to-transparent blur-md -z-10" />

        <div className="flex items-baseline justify-center gap-3">
          {/* Opening Ornamental Arabic Parenthesis */}
          <span className="text-xl md:text-2xl font-serif text-[#B38B59] opacity-50 select-none">
            ۝
          </span>

          <p 
            lang="ar" 
            dir="rtl" 
            className="font-arabic text-3xl sm:text-4xl md:text-5xl lg:text-5.5xl text-[#1A1D20] leading-[1.6] tracking-wide select-none"
            style={{
              textShadow: '0 1px 2px rgba(179, 139, 89, 0.15)'
            }}
          >
            وَخَلَقْنَاكُمْ أَزْوَاجًا
          </p>

          {/* Closing Ornamental Arabic Parenthesis */}
          <span className="text-xl md:text-2xl font-serif text-[#B38B59] opacity-50 select-none">
            ۝
          </span>
        </div>
      </div>

      {/* English Subcaption & Quranic Reference */}
      {showSubcaption && (
        <div className="mt-2.5 flex items-center justify-center gap-2.5 flex-wrap text-center">
          <p className="font-serif italic text-base sm:text-lg text-[#1A1D20]/80 tracking-wide font-normal">
            &ldquo;And We created you in pairs&rdquo;
          </p>
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#B38B59]/50" />
          <span className="font-mono text-[10px] sm:text-xs tracking-[0.18em] uppercase text-[#B38B59] font-medium">
            Surah An-Naba [78:8]
          </span>
        </div>
      )}
    </div>
  );
};
