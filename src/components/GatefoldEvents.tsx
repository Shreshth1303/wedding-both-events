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
  Sparkles
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
      
      {/* Gatefold Editorial Section Bar */}
      <div className="bg-[#1A1D20] text-[#F5F2EB] py-4 px-4 sm:px-8 border-b border-[rgba(179,139,89,0.2)]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 bg-[#B38B59] inline-block animate-ping" />
            <span className="uppercase tracking-[0.25em] text-[#B38B59] font-bold">
              The Dual-Event Gatefold // Act I &amp; Act II
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

      {/* Main Dual Gatefold Grid: Side-by-Side Asymmetric Lookbook */}
      <div className="w-full max-w-full grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-[rgba(179,139,89,0.25)]">
        
        {/* ======================================================== */}
        {/* LEFT PILLAR: "THE SOLEMNIZATION" (Nikah, Nashik)         */}
        {/* ======================================================== */}
        <article 
          id="solemnization"
          className="relative p-6 sm:p-10 md:p-14 lg:p-16 bg-[#FAF8F5] text-[#1A1D20] bg-arabesque-pattern flex flex-col justify-between"
        >
          {/* Architectural Registration crosshair */}
          <div className="absolute top-4 left-4 font-mono text-[9px] text-[#B38B59] tracking-widest uppercase">
            FOLIO 02 // ACT I
          </div>
          <div className="absolute top-4 right-4 font-mono text-[9px] text-[#B38B59] tracking-widest uppercase">
            NASHIK, MH
          </div>

          <div>
            {/* Header & Pillar Title */}
            <div className="mb-6 pt-4">
              <span className="inline-block px-2.5 py-1 bg-[#F5F2EB] border border-[#B38B59]/40 text-[#B38B59] font-mono text-[10px] uppercase tracking-[0.25em] mb-3">
                Act I • The Solemnization
              </span>
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#1A1D20] font-light tracking-tight leading-tight">
                The Nikah Ceremony
              </h2>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#B38B59] mt-2 font-medium">
                {EVENTS_DATA.nikah.dateString}
              </p>
            </div>

            {/* Time & Essence Ledger */}
            <div className="p-4 bg-white/80 border border-[rgba(179,139,89,0.25)] mb-8 shadow-xs rounded-xs gatefold-pillar-card">
              <div className="flex items-center gap-3 text-sm font-serif">
                <Clock size={16} className="text-[#B38B59]" />
                <span className="font-medium text-[#1A1D20]">Commencing Promptly: {EVENTS_DATA.nikah.timeString}</span>
              </div>
              <p className="text-xs text-[#1A1D20]/75 mt-1.5 font-serif italic">
                Followed by celebratory Dawat-e-Khaas (Royal Banquet) &amp; traditional family felicitations.
              </p>
            </div>

            {/* Detailed Venue Card with Direct Google Maps & ICS Action */}
            <div className="relative border border-[rgba(179,139,89,0.3)] bg-white/95 p-5 sm:p-6 mb-8 shadow-sm rounded-xs gatefold-pillar-card">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2 text-[#B38B59]">
                  <MapPin size={18} />
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] font-semibold">
                    Venue Folio
                  </span>
                </div>
                <span className="text-[10px] font-mono text-[#B38B59]/80 bg-[#F5F2EB] px-2 py-0.5 rounded border border-[rgba(179,139,89,0.2)]">
                  Target: {EVENTS_DATA.nikah.mapTarget}
                </span>
              </div>

              <h3 className="font-serif text-2xl font-medium text-[#1A1D20] mb-2">
                {EVENTS_DATA.nikah.venueName}
              </h3>

              <div className="space-y-1 font-serif text-sm text-[#1A1D20]/80 mb-5 leading-relaxed">
                {EVENTS_DATA.nikah.addressLines.map((line, idx) => (
                  <p key={idx}>{line}</p>
                ))}
              </div>

              {/* Action Buttons: Direct Maps Navigation + Instant ICS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-3 border-t border-[rgba(179,139,89,0.2)]">
                <a
                  href={EVENTS_DATA.nikah.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#1A1D20] text-[#F5F2EB] font-mono text-[10px] uppercase tracking-[0.16em] rounded-sm hover:bg-[#B38B59] transition-all active:scale-95 shadow-sm"
                >
                  <Navigation size={13} />
                  <span>Navigate in Maps</span>
                </a>

                <button
                  onClick={() => handleExportIcs('nikah')}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 border border-[#B38B59] text-[#1A1D20] bg-white font-mono text-[10px] uppercase tracking-[0.16em] rounded-sm hover:bg-[#F5F2EB] transition-all cursor-pointer active:scale-95"
                >
                  <CalendarIcon size={13} className="text-[#B38B59]" />
                  <span>Add to Calendar (.ics)</span>
                </button>
              </div>
            </div>

            {/* Nikah Ceremonial Schedule */}
            <div className="mb-8">
              <h4 className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#B38B59] mb-4 flex items-center gap-2">
                <span className="w-4 h-[1px] bg-[#B38B59]" />
                <span>Ceremonial Itinerary</span>
              </h4>

              <div className="space-y-3">
                {EVENTS_DATA.nikah.itinerary.map((step, idx) => (
                  <div key={idx} className="flex gap-4 p-3 bg-white/60 border-l-2 border-[#B38B59] transition-all hover:bg-white hover:translate-x-1 shadow-2xs">
                    <span className="font-mono text-xs font-semibold text-[#B38B59] shrink-0 pt-0.5">
                      {step.time}
                    </span>
                    <div>
                      <h5 className="font-serif text-sm font-semibold text-[#1A1D20]">{step.label}</h5>
                      <p className="font-serif text-xs text-[#1A1D20]/75 mt-0.5">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Ceremonial Note */}
          <div className="pt-6 border-t border-[rgba(179,139,89,0.2)] flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-serif">
            <div className="text-xs italic text-[#1A1D20]/75 flex items-center gap-1.5">
              <Sparkles size={13} className="text-[#B38B59] shrink-0 animate-pulse" />
              <span>Sartorial: Traditional silks, sherwanis, or pastel formal attire.</span>
            </div>
            <div className="font-mono text-[10px] uppercase tracking-wider text-[#B38B59]">
              Bagai Banquet • Nashik
            </div>
          </div>
        </article>

        {/* ======================================================== */}
        {/* RIGHT PILLAR: "THE CELEBRATION" (Reception, Thane)       */}
        {/* ======================================================== */}
        <article 
          id="celebration"
          className="relative p-6 sm:p-10 md:p-14 lg:p-16 bg-[#1A1D20] text-[#F5F2EB] bg-arabesque-dark flex flex-col justify-between"
        >
          {/* Architectural Registration crosshair */}
          <div className="absolute top-4 left-4 font-mono text-[9px] text-[#B38B59] tracking-widest uppercase">
            FOLIO 03 // ACT II
          </div>
          <div className="absolute top-4 right-4 font-mono text-[9px] text-[#B38B59] tracking-widest uppercase">
            THANE, MH
          </div>

          <div>
            {/* Header & Pillar Title */}
            <div className="mb-6 pt-4">
              <span className="inline-block px-2.5 py-1 bg-[#24282D] border border-[#B38B59]/40 text-[#CFAB7A] font-mono text-[10px] uppercase tracking-[0.25em] mb-3">
                Act II • The Celebration
              </span>
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#F5F2EB] font-light tracking-tight leading-tight">
                The Grand Reception
              </h2>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#CFAB7A] mt-2 font-medium">
                {EVENTS_DATA.reception.dateString}
              </p>
            </div>

            {/* Time & Essence Ledger */}
            <div className="p-4 bg-[#24282D]/90 border border-[rgba(179,139,89,0.3)] mb-8 shadow-xs rounded-xs gatefold-pillar-card">
              <div className="flex items-center gap-3 text-sm font-serif">
                <Clock size={16} className="text-[#CFAB7A]" />
                <span className="font-medium text-[#F5F2EB]">Evening Gala: {EVENTS_DATA.reception.timeString}</span>
              </div>
              <p className="text-xs text-[#F5F2EB]/70 mt-1.5 font-serif italic">
                A starlit evening of musical tributes, royal hospitality, and culinary excellence.
              </p>
            </div>

            {/* Detailed Venue Card with Direct Google Maps & ICS Action */}
            <div className="relative border border-[rgba(179,139,89,0.35)] bg-[#202428]/95 p-5 sm:p-6 mb-8 shadow-md rounded-xs gatefold-pillar-card">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2 text-[#CFAB7A]">
                  <MapPin size={18} />
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] font-semibold">
                    Venue Folio
                  </span>
                </div>
                <span className="text-[10px] font-mono text-[#CFAB7A]/80 bg-[#141618] px-2 py-0.5 rounded border border-[rgba(179,139,89,0.2)]">
                  Target: {EVENTS_DATA.reception.mapTarget}
                </span>
              </div>

              <h3 className="font-serif text-2xl font-medium text-[#F5F2EB] mb-2">
                {EVENTS_DATA.reception.venueName}
              </h3>

              <div className="space-y-1 font-serif text-sm text-[#F5F2EB]/80 mb-5 leading-relaxed">
                {EVENTS_DATA.reception.addressLines.map((line, idx) => (
                  <p key={idx}>{line}</p>
                ))}
              </div>

              {/* Action Buttons: Direct Maps Navigation + Instant ICS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-3 border-t border-[rgba(179,139,89,0.25)]">
                <a
                  href={EVENTS_DATA.reception.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#B38B59] text-[#1A1D20] font-mono text-[10px] uppercase tracking-[0.16em] font-bold rounded-sm hover:bg-[#CFAB7A] transition-all active:scale-95 shadow-sm"
                >
                  <Navigation size={13} />
                  <span>Navigate in Maps</span>
                </a>

                <button
                  onClick={() => handleExportIcs('reception')}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 border border-[rgba(179,139,89,0.5)] text-[#F5F2EB] bg-[#141618] font-mono text-[10px] uppercase tracking-[0.16em] rounded-sm hover:bg-[#202428] transition-all cursor-pointer active:scale-95"
                >
                  <CalendarIcon size={13} className="text-[#CFAB7A]" />
                  <span>Add to Calendar (.ics)</span>
                </button>
              </div>
            </div>

            {/* Reception Ceremonial Schedule */}
            <div className="mb-8">
              <h4 className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#CFAB7A] mb-4 flex items-center gap-2">
                <span className="w-4 h-[1px] bg-[#CFAB7A]" />
                <span>Evening Order of Events</span>
              </h4>

              <div className="space-y-3">
                {EVENTS_DATA.reception.itinerary.map((step, idx) => (
                  <div key={idx} className="flex gap-4 p-3 bg-[#141618]/80 border-l-2 border-[#B38B59] transition-all hover:bg-[#141618] hover:translate-x-1 shadow-2xs">
                    <span className="font-mono text-xs font-semibold text-[#CFAB7A] shrink-0 pt-0.5">
                      {step.time}
                    </span>
                    <div>
                      <h5 className="font-serif text-sm font-semibold text-[#F5F2EB]">{step.label}</h5>
                      <p className="font-serif text-xs text-[#F5F2EB]/70 mt-0.5">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Ceremonial Note */}
          <div className="pt-6 border-t border-[rgba(179,139,89,0.25)] flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-serif">
            <div className="text-xs italic text-[#F5F2EB]/70 flex items-center gap-1.5">
              <Sparkles size={13} className="text-[#CFAB7A] shrink-0 animate-pulse" />
              <span>Sartorial: Black-Tie, dark velvets, contemporary couture or evening formal.</span>
            </div>
            <div className="font-mono text-[10px] uppercase tracking-wider text-[#CFAB7A]">
              Welcome Lawns • Thane
            </div>
          </div>
        </article>

      </div>
    </section>
  );
};
