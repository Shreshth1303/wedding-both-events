import React, { useState } from 'react';
import { EVENTS_DATA } from '../data/invitationData';
import { downloadCalendarIcs } from '../utils/calendar';
import { 
  MapPin, 
  Calendar as CalendarIcon, 
  Clock, 
  Navigation, 
  Download, 
  CheckCircle2,
  Sparkles,
  ChevronDown
} from 'lucide-react';

export const GatefoldEvents: React.FC = () => {
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const handleExportIcs = (eventId: 'nikah' | 'reception' | 'both') => {
    if (eventId === 'both') {
      downloadCalendarIcs(
        [EVENTS_DATA.nikah, EVENTS_DATA.reception],
        'Jassim-Shifa-Wedding-Both-Events-2027.ics'
      );
      setDownloadSuccess('Both ceremonies exported to your calendar');
    } else {
      const singleEvent = EVENTS_DATA[eventId];
      downloadCalendarIcs(
        [singleEvent],
        `Jassim-Shifa-${eventId === 'nikah' ? 'Nikah' : 'Reception'}-2027.ics`
      );
      setDownloadSuccess(`${singleEvent.pillarTitle} exported to your calendar`);
    }

    setTimeout(() => {
      setDownloadSuccess(null);
    }, 4500);
  };

  return (
    <section id="gatefold-events" className="relative w-full max-w-full overflow-x-clip border-b border-[rgba(179,139,89,0.2)]">
      
      {/* Editorial Section Bar */}
      <div className="bg-[#1A1D20] text-[#F5F2EB] py-4 px-4 sm:px-8 border-b border-[rgba(179,139,89,0.2)]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 bg-[#B38B59] inline-block animate-ping" />
            <span className="uppercase tracking-[0.25em] text-[#B38B59] font-bold">
              Ceremonial Invitations // Nikah &amp; Reception
            </span>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={() => handleExportIcs('both')}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded bg-[rgba(179,139,89,0.2)] text-[#CFAB7A] hover:bg-[#B38B59] hover:text-[#1A1D20] transition-all border border-[rgba(179,139,89,0.3)] text-[10px] uppercase tracking-wider cursor-pointer shadow-xs active:scale-95"
            >
              <Download size={13} />
              <span>Export Both Ceremonies (.ICS)</span>
            </button>
            <span className="text-[#F5F2EB]/40 hidden sm:inline">|</span>
            <span className="text-[#F5F2EB]/60 text-[10px] uppercase tracking-widest hidden sm:inline">
              Nashik (15 Jan) &amp; Thane (17 Jan)
            </span>
          </div>
        </div>
      </div>

      {/* Toast Notification for Calendar Download */}
      {downloadSuccess && (
        <div className="sticky top-14 z-40 bg-[#B38B59] text-[#1A1D20] px-4 py-2 text-center text-xs font-mono tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all animate-fadeIn">
          <CheckCircle2 size={16} />
          <span>{downloadSuccess}</span>
        </div>
      )}

      {/* Normal Sequential Scroll: Stacked Ceremonial Folios */}
      <div className="w-full max-w-full flex flex-col">
        
        {/* ======================================================== */}
        {/* CEREMONY 01: NIKAH (Nashik) - Normal Scroll Format       */}
        {/* ======================================================== */}
        <article 
          id="nikah"
          className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-8 md:px-12 bg-[#FAF8F5] text-[#1A1D20] bg-arabesque-pattern border-b border-[rgba(179,139,89,0.25)]"
        >
          {/* Section anchor alias */}
          <div id="solemnization" className="absolute -top-20" />

          {/* Architectural Registration crosshair */}
          <div className="max-w-5xl mx-auto flex items-center justify-between font-mono text-[9px] text-[#B38B59] tracking-widest uppercase mb-6 sm:mb-8 border-b border-[rgba(179,139,89,0.2)] pb-2.5">
            <span>FOLIO 01 // NIKAH CEREMONY</span>
            <span>NASHIK, MAHARASHTRA</span>
          </div>

          <div className="max-w-3xl sm:max-w-4xl mx-auto text-center">
            
            {/* Header Badge & Title */}
            <div className="mb-6">
              <span className="inline-block px-3 py-1 bg-[#F5F2EB] border border-[#B38B59]/40 text-[#B38B59] font-mono text-[10px] uppercase tracking-[0.25em] mb-4 shadow-2xs">
                Nikah Ceremony
              </span>
              <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#1A1D20] font-light tracking-tight leading-tight">
                The Nikah Ceremony
              </h2>
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 font-mono text-xs sm:text-sm uppercase tracking-[0.2em] text-[#B38B59] mt-3 font-medium">
                <span>{EVENTS_DATA.nikah.dateString}</span>
                <span className="text-[#B38B59]/40">•</span>
                <span>Nashik, Maharashtra</span>
              </div>
            </div>

            {/* Subtle Gold Ornament Line */}
            <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#B38B59] to-transparent mx-auto my-6" />

            {/* Time & Essence Ledger */}
            <div className="p-4 sm:p-5 bg-white/90 border border-[rgba(179,139,89,0.25)] mb-8 shadow-xs rounded-xs max-w-2xl mx-auto text-center">
              <div className="flex items-center justify-center gap-2.5 text-sm sm:text-base font-serif">
                <Clock size={16} className="text-[#B38B59] shrink-0" />
                <span className="font-medium text-[#1A1D20]">Commencing Promptly: {EVENTS_DATA.nikah.timeString}</span>
              </div>
              <p className="text-xs sm:text-sm text-[#1A1D20]/75 mt-2 font-serif italic max-w-lg mx-auto">
                Followed by celebratory Dawat-e-Khaas (Royal Banquet) &amp; traditional family felicitations.
              </p>
            </div>

            {/* Detailed Venue Card with Direct Google Maps & ICS Action */}
            <div className="relative border border-[rgba(179,139,89,0.3)] bg-white/95 p-6 sm:p-8 mb-8 shadow-sm rounded-xs max-w-2xl mx-auto text-center gatefold-pillar-card">
              <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-[rgba(179,139,89,0.15)]">
                <div className="flex items-center gap-2 text-[#B38B59]">
                  <MapPin size={16} />
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] font-semibold">
                    Venue Folio
                  </span>
                </div>
                <span className="text-[10px] font-mono text-[#B38B59] bg-[#F5F2EB] px-2.5 py-0.5 rounded border border-[rgba(179,139,89,0.25)]">
                  Nashik, MH
                </span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#1A1D20] mb-2">
                {EVENTS_DATA.nikah.venueName}
              </h3>

              <div className="space-y-1 font-serif text-sm text-[#1A1D20]/80 mb-6 leading-relaxed max-w-md mx-auto">
                {EVENTS_DATA.nikah.addressLines.map((line, idx) => (
                  <p key={idx}>{line}</p>
                ))}
              </div>

              {/* Action Buttons: Direct Maps Navigation + Instant ICS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-[rgba(179,139,89,0.2)]">
                <a
                  href={EVENTS_DATA.nikah.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#1A1D20] text-[#F5F2EB] font-mono text-[10px] uppercase tracking-[0.16em] rounded-sm hover:bg-[#B38B59] transition-all active:scale-95 shadow-sm"
                >
                  <Navigation size={13} />
                  <span>Navigate in Maps</span>
                </a>

                <button
                  onClick={() => handleExportIcs('nikah')}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 border border-[#B38B59] text-[#1A1D20] bg-white font-mono text-[10px] uppercase tracking-[0.16em] rounded-sm hover:bg-[#F5F2EB] transition-all cursor-pointer active:scale-95"
                >
                  <CalendarIcon size={13} className="text-[#B38B59]" />
                  <span>Add to Calendar (.ics)</span>
                </button>
              </div>
            </div>

            {/* Bottom Ceremonial Note */}
            <div className="pt-6 border-t border-[rgba(179,139,89,0.2)] flex flex-col sm:flex-row items-center justify-between gap-3 font-serif max-w-2xl mx-auto">
              <div className="text-xs italic text-[#1A1D20]/75 flex items-center justify-center gap-1.5">
                <Sparkles size={13} className="text-[#B38B59] shrink-0 animate-pulse" />
                <span>Sartorial: Traditional silks, sherwanis, or pastel formal attire.</span>
              </div>
              <div className="font-mono text-[10px] uppercase tracking-wider text-[#B38B59]">
                Bagai Banquet • Nashik
              </div>
            </div>

          </div>
        </article>

        {/* Transition Chapter Indicator */}
        <div className="bg-[#15181B] py-3 px-4 border-b border-[rgba(179,139,89,0.25)] flex items-center justify-center gap-3 text-center">
          <div className="w-12 h-[1px] bg-[rgba(179,139,89,0.3)]" />
          <a 
            href="#reception" 
            className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-[#CFAB7A] hover:text-[#FFF0CA] transition-colors"
          >
            <span>Scroll Down to Reception Ceremony</span>
            <ChevronDown size={13} className="animate-bounce" />
          </a>
          <div className="w-12 h-[1px] bg-[rgba(179,139,89,0.3)]" />
        </div>

        {/* ======================================================== */}
        {/* CEREMONY 02: RECEPTION (Thane) - Normal Scroll Format    */}
        {/* ======================================================== */}
        <article 
          id="reception"
          className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-8 md:px-12 bg-[#1A1D20] text-[#F5F2EB] bg-arabesque-dark border-b border-[rgba(179,139,89,0.25)]"
        >
          {/* Section anchor alias */}
          <div id="celebration" className="absolute -top-20" />

          {/* Architectural Registration crosshair */}
          <div className="max-w-5xl mx-auto flex items-center justify-between font-mono text-[9px] text-[#B38B59] tracking-widest uppercase mb-6 sm:mb-8 border-b border-[rgba(179,139,89,0.2)] pb-2.5">
            <span>FOLIO 02 // RECEPTION GALA</span>
            <span>THANE, MAHARASHTRA</span>
          </div>

          <div className="max-w-3xl sm:max-w-4xl mx-auto text-center">
            
            {/* Header Badge & Title */}
            <div className="mb-6">
              <span className="inline-block px-3 py-1 bg-[#24282D] border border-[#B38B59]/40 text-[#CFAB7A] font-mono text-[10px] uppercase tracking-[0.25em] mb-4 shadow-2xs">
                Reception Ceremony
              </span>
              <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#F5F2EB] font-light tracking-tight leading-tight">
                The Grand Reception
              </h2>
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 font-mono text-xs sm:text-sm uppercase tracking-[0.2em] text-[#CFAB7A] mt-3 font-medium">
                <span>{EVENTS_DATA.reception.dateString}</span>
                <span className="text-[#CFAB7A]/40">•</span>
                <span>Thane, Maharashtra</span>
              </div>
            </div>

            {/* Subtle Gold Ornament Line */}
            <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#CFAB7A] to-transparent mx-auto my-6" />

            {/* Time & Essence Ledger */}
            <div className="p-4 sm:p-5 bg-[#24282D]/90 border border-[rgba(179,139,89,0.3)] mb-8 shadow-xs rounded-xs max-w-2xl mx-auto text-center">
              <div className="flex items-center justify-center gap-2.5 text-sm sm:text-base font-serif">
                <Clock size={16} className="text-[#CFAB7A] shrink-0" />
                <span className="font-medium text-[#F5F2EB]">Evening Gala: {EVENTS_DATA.reception.timeString}</span>
              </div>
              <p className="text-xs sm:text-sm text-[#F5F2EB]/70 mt-2 font-serif italic max-w-lg mx-auto">
                A starlit evening of musical tributes, royal hospitality, and culinary excellence.
              </p>
            </div>

            {/* Detailed Venue Card with Direct Google Maps & ICS Action */}
            <div className="relative border border-[rgba(179,139,89,0.35)] bg-[#202428]/95 p-6 sm:p-8 mb-8 shadow-md rounded-xs max-w-2xl mx-auto text-center gatefold-pillar-card">
              <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-[rgba(179,139,89,0.2)]">
                <div className="flex items-center gap-2 text-[#CFAB7A]">
                  <MapPin size={16} />
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] font-semibold">
                    Venue Folio
                  </span>
                </div>
                <span className="text-[10px] font-mono text-[#CFAB7A] bg-[#141618] px-2.5 py-0.5 rounded border border-[rgba(179,139,89,0.25)]">
                  Thane, MH
                </span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#F5F2EB] mb-2">
                {EVENTS_DATA.reception.venueName}
              </h3>

              <div className="space-y-1 font-serif text-sm text-[#F5F2EB]/80 mb-6 leading-relaxed max-w-md mx-auto">
                {EVENTS_DATA.reception.addressLines.map((line, idx) => (
                  <p key={idx}>{line}</p>
                ))}
              </div>

              {/* Action Buttons: Direct Maps Navigation + Instant ICS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-[rgba(179,139,89,0.25)]">
                <a
                  href={EVENTS_DATA.reception.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#B38B59] text-[#1A1D20] font-mono text-[10px] uppercase tracking-[0.16em] font-bold rounded-sm hover:bg-[#CFAB7A] transition-all active:scale-95 shadow-sm"
                >
                  <Navigation size={13} />
                  <span>Navigate in Maps</span>
                </a>

                <button
                  onClick={() => handleExportIcs('reception')}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 border border-[rgba(179,139,89,0.5)] text-[#F5F2EB] bg-[#141618] font-mono text-[10px] uppercase tracking-[0.16em] rounded-sm hover:bg-[#202428] transition-all cursor-pointer active:scale-95"
                >
                  <CalendarIcon size={13} className="text-[#CFAB7A]" />
                  <span>Add to Calendar (.ics)</span>
                </button>
              </div>
            </div>

            {/* Bottom Ceremonial Note */}
            <div className="pt-6 border-t border-[rgba(179,139,89,0.25)] flex flex-col sm:flex-row items-center justify-between gap-3 font-serif max-w-2xl mx-auto">
              <div className="text-xs italic text-[#F5F2EB]/70 flex items-center justify-center gap-1.5">
                <Sparkles size={13} className="text-[#CFAB7A] shrink-0 animate-pulse" />
                <span>Sartorial: Black-Tie, dark velvets, contemporary couture or evening formal.</span>
              </div>
              <div className="font-mono text-[10px] uppercase tracking-wider text-[#CFAB7A]">
                Welcome Lawns • Thane
              </div>
            </div>

          </div>
        </article>

      </div>
    </section>
  );
};
