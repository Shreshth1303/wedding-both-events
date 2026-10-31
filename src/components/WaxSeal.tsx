import React from 'react';
import { ambientAudio } from '../utils/audio';

interface WaxSealProps {
  size?: number;
  className?: string;
  withLabel?: boolean;
}

export const WaxSeal: React.FC<WaxSealProps> = ({
  size = 88,
  className = '',
  withLabel = false
}) => {
  const handleClick = () => {
    ambientAudio.playSealStampSound();
  };

  return (
    <div 
      onClick={handleClick}
      title="Official Hashim & Khan Monogram Wax Seal"
      className={`relative inline-flex flex-col items-center justify-center cursor-pointer group select-none transition-transform duration-500 hover:scale-105 active:scale-95 ${className}`}
    >
      <div 
        style={{ width: `${size}px`, height: `${size}px` }}
        className="relative rounded-full wax-seal-shadow transition-shadow duration-300 group-hover:shadow-[0_14px_32px_-4px_rgba(179,139,89,0.45)]"
      >
        <svg 
          viewBox="0 0 100 100" 
          width={size} 
          height={size}
          className="w-full h-full filter drop-shadow-md"
        >
          <defs>
            <radialGradient id="waxBase" cx="40%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#E1BF86" />
              <stop offset="35%" stopColor="#B38B59" />
              <stop offset="75%" stopColor="#8C6534" />
              <stop offset="100%" stopColor="#5E4320" />
            </radialGradient>
            
            <radialGradient id="waxInner" cx="45%" cy="40%" r="55%">
              <stop offset="0%" stopColor="#D7B377" />
              <stop offset="60%" stopColor="#A57D48" />
              <stop offset="100%" stopColor="#6F4D24" />
            </radialGradient>

            <linearGradient id="embossHighlight" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF2D6" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#C59E68" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#4B3314" stopOpacity="0.8" />
            </linearGradient>

            <filter id="waxTexture" x="0%" y="0%" width="100%" height="100%">
              <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves={3} result="noise" />
              <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.08 0" in="noise" result="coloredNoise" />
              <feComposite operator="in" in2="SourceGraphic" />
            </filter>
          </defs>

          {/* Organic Hand-poured Wax Outer Ring */}
          <path 
            d="M 50,3 
               C 62,2 73,7 82,16 
               C 92,26 97,38 96,52 
               C 95,66 89,78 79,87 
               C 69,96 55,98 42,96 
               C 28,94 17,87 9,76 
               C 2,64 1,51 4,37 
               C 7,24 16,13 28,7 
               C 38,2 45,3 50,3 Z" 
            fill="url(#waxBase)" 
          />

          {/* Inner Recessed Impression Disc */}
          <circle cx="50" cy="50" r="39" fill="url(#waxInner)" stroke="#533716" strokeWidth="0.8" opacity="0.95" />
          
          {/* Delicate Beaded / Dotted Seal Border */}
          <circle cx="50" cy="50" r="36" fill="none" stroke="#FDE8B5" strokeWidth="0.8" strokeDasharray="2 3" opacity="0.75" />
          <circle cx="50" cy="50" r="34" fill="none" stroke="#5C3B14" strokeWidth="0.5" opacity="0.6" />

          {/* Editorial Circular Text around the seal */}
          <path id="sealTextPath" d="M 50,18 A 32,32 0 1,1 49.9,18" fill="none" />
          <text fontSize="4.2" letterSpacing="2.5" fill="#FFE8BF" opacity={0.8} className="font-mono uppercase">
            <textPath href="#sealTextPath" startOffset="50%" textAnchor="middle">
              JASSIM &amp; SHIFA • JAN 2027 • NIKAH &amp; WALIMA
            </textPath>
          </text>

          {/* Central Intertwined Monogram: J & S */}
          {/* Monogram J */}
          <path 
            d="M 43 32 L 43 56 C 43 64, 35 67, 30 62 C 28 60, 29 57, 32 55 C 34 53, 37 56, 37 58 C 37 60, 40 61, 41 57 L 41 35 L 34 35 L 34 32 Z" 
            fill="url(#embossHighlight)" 
            filter="drop-shadow(0 1px 1px rgba(0,0,0,0.4))"
          />
          
          {/* Monogram S Intertwined */}
          <path 
            d="M 64 38 C 62 34, 58 32, 52 33 C 47 35, 45 39, 47 43 C 48 46, 53 48, 57 51 C 63 54, 64 59, 61 64 C 57 68, 50 69, 44 65 C 42 63, 42 60, 44 59 C 46 57, 49 59, 51 61 C 54 63, 58 63, 60 60 C 62 57, 60 54, 55 51 C 50 48, 44 45, 43 40 C 42 34, 47 29, 54 28 C 60 27, 65 30, 67 35 Z" 
            fill="url(#embossHighlight)" 
            opacity={0.95}
            filter="drop-shadow(0 1px 1px rgba(0,0,0,0.4))"
          />

          {/* Micro Arabesque Star Center Accent */}
          <polygon points="50,23 51,25 53,26 51,27 50,29 49,27 47,26 49,25" fill="#FFE8B5" opacity={0.9} />
          <polygon points="50,71 51,73 53,74 51,75 50,77 49,75 47,74 49,73" fill="#FFE8B5" opacity={0.9} />
        </svg>
      </div>

      {withLabel && (
        <span className="mt-2 text-[10px] uppercase font-mono tracking-[0.25em] text-[#B38B59] opacity-80 group-hover:opacity-100 transition-opacity">
          Family Seal
        </span>
      )}
    </div>
  );
};
