import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import type { EventSelection } from '../types';
import { EVENTS_DATA } from '../data/invitationData';
import { WaxSeal } from './WaxSeal';
import { downloadCalendarIcs } from '../utils/calendar';
import { ambientAudio } from '../utils/audio';
import { 
  Check, 
  Send, 
  Calendar, 
  Printer, 
  RefreshCw, 
  ShieldCheck, 
  AlertCircle 
} from 'lucide-react';

interface RsvpConsoleProps {
  initialSelection?: EventSelection;
}

export const RsvpConsole: React.FC<RsvpConsoleProps> = ({
  initialSelection = 'both'
}) => {
  const [eventSelection, setEventSelection] = useState<EventSelection>(initialSelection);
  const [attendance, setAttendance] = useState<'attending' | 'declining'>('attending');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [adultsCount, setAdultsCount] = useState<number>(2);
  const [childrenCount, setChildrenCount] = useState<number>(0);
  const [dietaryPreference, setDietaryPreference] = useState('Royal Mughlai & Dum Biryani (Halal)');
  const [specialNotes, setSpecialNotes] = useState('');

  // Validation & Submission States
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [folioPassNumber, setFolioPassNumber] = useState('');

  const triggerGoldConfetti = () => {
    // Elegant gold and bronze confetti burst
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#B38B59', '#F5F2EB', '#8C6534', '#E1BF86'],
        disableForReducedMotion: true
      });
    } catch {
      // Fallback gracefully
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!fullName.trim()) {
      newErrors.fullName = 'Full Name is required for the guest register.';
    }
    if (!email.trim()) {
      newErrors.email = 'Email is required to dispatch the digital pass.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please provide a valid email format.';
    }
    if (!phone.trim()) {
      newErrors.phone = 'Phone number is required for hospitality coordination.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate editorial ledger recording
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      const generatedPass = `FOLIO-${Math.floor(100000 + Math.random() * 900000)}`;
      setFolioPassNumber(generatedPass);
      triggerGoldConfetti();
      ambientAudio.playGentleChime([523.25, 659.25, 783.99, 1046.50, 1318.51]);
    }, 700);
  };

  const handleDownloadSelectedCalendar = () => {
    if (eventSelection === 'both') {
      downloadCalendarIcs([EVENTS_DATA.nikah, EVENTS_DATA.reception], 'Jassim-Shifa-Wedding-Both-Events-2027.ics');
    } else {
      const ev = EVENTS_DATA[eventSelection];
      downloadCalendarIcs([ev], `Jassim-Shifa-${eventSelection === 'nikah' ? 'Nikah' : 'Reception'}-2027.ics`);
    }
  };

  const handleResetForm = () => {
    setIsSubmitted(false);
  };

  return (
    <section id="rsvp-console" className="w-full max-w-full overflow-x-clip bg-[#F5F2EB] text-[#1A1D20] py-16 sm:py-24 px-4 sm:px-8 border-b border-[rgba(179,139,89,0.2)]">
      <div className="max-w-4xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-[#B38B59] mb-2.5">
            <span className="w-6 h-[1px] bg-[#B38B59]" />
            <span>Interactive RSVP Protocol</span>
            <span className="w-6 h-[1px] bg-[#B38B59]" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#1A1D20]">
            The Two-Tier RSVP Console
          </h2>
          <p className="font-serif italic text-sm sm:text-base text-[#1A1D20]/75 max-w-xl mx-auto mt-2">
            Kindly confirm your gracious presence by 20th December 2026 to ensure our families prepare the finest hospitality for you.
          </p>
        </div>

        {/* ======================================================== */}
        {/* STATE A: INTERACTIVE RSVP FORM CONSOLE                   */}
        {/* ======================================================== */}
        {!isSubmitted ? (
          <div className="bg-white border border-[rgba(179,139,89,0.3)] shadow-[0_12px_40px_-8px_rgba(179,139,89,0.15)] relative p-6 sm:p-10 md:p-12">
            
            {/* Subtle Inset Frame */}
            <div className="absolute inset-1.5 border border-[rgba(179,139,89,0.15)] pointer-events-none" />

            {/* Segmented Control Header: [Both Events] | [Nikah Only] | [Reception Only] */}
            <div className="mb-8">
              <label className="block font-mono text-[10px] uppercase tracking-[0.2em] text-[#B38B59] mb-3 text-center sm:text-left">
                Select Your Attendance Folio
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-1.5 bg-[#FAF8F5] border border-[rgba(179,139,89,0.25)] rounded-sm">
                <button
                  type="button"
                  onClick={() => setEventSelection('both')}
                  className={`py-3 px-3 text-center font-mono text-xs uppercase tracking-wider transition-all cursor-pointer rounded-xs ${
                    eventSelection === 'both'
                      ? 'bg-[#1A1D20] text-[#F5F2EB] font-bold shadow-sm'
                      : 'text-[#1A1D20]/70 hover:text-[#1A1D20] hover:bg-[#F5F2EB]'
                  }`}
                >
                  <span className="block text-[11px]">Both Events</span>
                  <span className="block text-[9px] text-[#B38B59] mt-0.5">Nashik &amp; Thane</span>
                </button>

                <button
                  type="button"
                  onClick={() => setEventSelection('nikah')}
                  className={`py-3 px-3 text-center font-mono text-xs uppercase tracking-wider transition-all cursor-pointer rounded-xs ${
                    eventSelection === 'nikah'
                      ? 'bg-[#1A1D20] text-[#F5F2EB] font-bold shadow-sm'
                      : 'text-[#1A1D20]/70 hover:text-[#1A1D20] hover:bg-[#F5F2EB]'
                  }`}
                >
                  <span className="block text-[11px]">Nikah Only</span>
                  <span className="block text-[9px] text-[#B38B59] mt-0.5">15 Jan • Nashik</span>
                </button>

                <button
                  type="button"
                  onClick={() => setEventSelection('reception')}
                  className={`py-3 px-3 text-center font-mono text-xs uppercase tracking-wider transition-all cursor-pointer rounded-xs ${
                    eventSelection === 'reception'
                      ? 'bg-[#1A1D20] text-[#F5F2EB] font-bold shadow-sm'
                      : 'text-[#1A1D20]/70 hover:text-[#1A1D20] hover:bg-[#F5F2EB]'
                  }`}
                >
                  <span className="block text-[11px]">Reception Only</span>
                  <span className="block text-[9px] text-[#B38B59] mt-0.5">17 Jan • Thane</span>
                </button>
              </div>

              {/* Dynamic Contextual Helper Banner */}
              <div className="mt-3 text-xs font-serif italic text-[#1A1D20]/80 bg-[#FAF8F5] p-3 border-l-2 border-[#B38B59] flex items-center justify-between">
                <span>
                  {eventSelection === 'both' && "Confirming for the complete celebratory journey: Nikah (Nashik) & Reception (Thane)."}
                  {eventSelection === 'nikah' && "Confirming for the Nikah ceremony at Bagai Banquet, Nashik on Friday, 15th January 2027."}
                  {eventSelection === 'reception' && "Confirming for the Grand Reception at Welcome Lawns, Thane on Sunday, 17th January 2027."}
                </span>
                <span className="font-mono text-[9px] text-[#B38B59] uppercase tracking-wider shrink-0 ml-2">
                  Act {eventSelection === 'both' ? 'I & II' : eventSelection === 'nikah' ? 'I' : 'II'}
                </span>
              </div>
            </div>

            {/* The Main RSVP Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Attendance Toggle */}
              <div>
                <label className="block font-mono text-[10px] uppercase tracking-[0.2em] text-[#B38B59] mb-2">
                  Attendance Proclamation
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setAttendance('attending')}
                    className={`py-2.5 px-4 rounded-xs border text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all ${
                      attendance === 'attending'
                        ? 'border-[#B38B59] bg-[#B38B59]/15 text-[#1A1D20] font-bold'
                        : 'border-stone-200 text-stone-500 hover:border-stone-300'
                    }`}
                  >
                    <Check size={14} className={attendance === 'attending' ? 'text-[#B38B59]' : 'opacity-0'} />
                    <span>Joyfully Accept</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setAttendance('declining')}
                    className={`py-2.5 px-4 rounded-xs border text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all ${
                      attendance === 'declining'
                        ? 'border-stone-700 bg-stone-100 text-stone-800 font-bold'
                        : 'border-stone-200 text-stone-500 hover:border-stone-300'
                    }`}
                  >
                    <span>Regretfully Decline</span>
                  </button>
                </div>
              </div>

              {/* Guest Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-[0.2em] text-[#B38B59] mb-1.5">
                    Primary Guest Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Dr. Zeeshan &amp; Family"
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[rgba(179,139,89,0.3)] text-sm font-serif text-[#1A1D20] focus:outline-hidden focus:border-[#B38B59] transition-colors"
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-xs text-red-600 font-serif flex items-center gap-1">
                      <AlertCircle size={12} /> {errors.fullName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-[0.2em] text-[#B38B59] mb-1.5">
                    Contact Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="guest@domain.com"
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[rgba(179,139,89,0.3)] text-sm font-serif text-[#1A1D20] focus:outline-hidden focus:border-[#B38B59] transition-colors"
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-600 font-serif flex items-center gap-1">
                      <AlertCircle size={12} /> {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-[0.2em] text-[#B38B59] mb-1.5">
                    Mobile Phone / WhatsApp <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[rgba(179,139,89,0.3)] text-sm font-serif text-[#1A1D20] focus:outline-hidden focus:border-[#B38B59] transition-colors"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-xs text-red-600 font-serif flex items-center gap-1">
                      <AlertCircle size={12} /> {errors.phone}
                    </p>
                  )}
                </div>

                {/* Dynamic Guest Counts (Only if Attending) */}
                {attendance === 'attending' && (
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-mono text-[10px] uppercase tracking-[0.2em] text-[#B38B59] mb-1.5">
                        Adults Count
                      </label>
                      <select
                        value={adultsCount}
                        onChange={(e) => setAdultsCount(Number(e.target.value))}
                        className="w-full px-3 py-2.5 bg-[#FAF8F5] border border-[rgba(179,139,89,0.3)] text-xs font-mono text-[#1A1D20] focus:outline-hidden focus:border-[#B38B59]"
                      >
                        {[1, 2, 3, 4, 5, 6, 8, 10].map((num) => (
                          <option key={num} value={num}>
                            {num} {num === 1 ? 'Adult' : 'Adults'}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block font-mono text-[10px] uppercase tracking-[0.2em] text-[#B38B59] mb-1.5">
                        Children (Under 10)
                      </label>
                      <select
                        value={childrenCount}
                        onChange={(e) => setChildrenCount(Number(e.target.value))}
                        className="w-full px-3 py-2.5 bg-[#FAF8F5] border border-[rgba(179,139,89,0.3)] text-xs font-mono text-[#1A1D20] focus:outline-hidden focus:border-[#B38B59]"
                      >
                        {[0, 1, 2, 3, 4, 5].map((num) => (
                          <option key={num} value={num}>
                            {num} {num === 1 ? 'Child' : 'Children'}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}
              </div>

              {/* Dietary Preferences (If Attending) */}
              {attendance === 'attending' && (
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-[0.2em] text-[#B38B59] mb-1.5">
                    Culinary Preference
                  </label>
                  <select
                    value={dietaryPreference}
                    onChange={(e) => setDietaryPreference(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[rgba(179,139,89,0.3)] text-sm font-serif text-[#1A1D20] focus:outline-hidden focus:border-[#B38B59]"
                  >
                    <option value="Royal Mughlai & Dum Biryani (Halal)">Royal Mughlai &amp; Dum Biryani (Halal Gourmet)</option>
                    <option value="Vegetarian Gourmet (Paneer & Dal Makhani)">Vegetarian Gourmet</option>
                    <option value="Jain Gourmet (No root vegetables)">Jain Gourmet (Special Preparation)</option>
                    <option value="Nut-Free / Gluten-Conscious">Nut-Free / Gluten-Conscious</option>
                  </select>
                </div>
              )}

              {/* Personal Blessing Note */}
              <div>
                <label className="block font-mono text-[10px] uppercase tracking-[0.2em] text-[#B38B59] mb-1.5">
                  Supplications &amp; Warm Wishes for Jassim &amp; Shifa
                </label>
                <textarea
                  rows={3}
                  value={specialNotes}
                  onChange={(e) => setSpecialNotes(e.target.value)}
                  placeholder="Share a heartfelt prayer or special message for the bride and groom..."
                  className="w-full px-3.5 py-2 bg-[#FAF8F5] border border-[rgba(179,139,89,0.3)] text-sm font-serif text-[#1A1D20] focus:outline-hidden focus:border-[#B38B59] resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4 border-t border-[rgba(179,139,89,0.2)] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs font-serif text-[#1A1D20]/60">
                  <ShieldCheck size={16} className="text-[#B38B59]" />
                  <span>Responses recorded in the official family chronicle ledger.</span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3 bg-[#1A1D20] text-[#F5F2EB] font-mono text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#B38B59] transition-all cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw size={14} className="animate-spin" />
                      <span>Transcribing to Ledger...</span>
                    </>
                  ) : (
                    <>
                      <span>Transmit RSVP</span>
                      <Send size={14} />
                    </>
                  )}
                </button>
              </div>

            </form>

          </div>
        ) : (
          /* ======================================================== */
          /* STATE B: ANIMATED INLINE WAX-SEALED GRATITUDE CARD       */
          /* ======================================================== */
          <div className="bg-white border-2 border-[#B38B59] shadow-2xl p-6 sm:p-10 md:p-12 relative animate-fadeIn transition-all">
            
            {/* Double Fine Ornamental Borders */}
            <div className="absolute inset-2 border border-[rgba(179,139,89,0.3)] pointer-events-none" />
            <div className="absolute inset-3 border border-[rgba(179,139,89,0.15)] pointer-events-none" />

            {/* Embossed Wax Seal Badge Stamp at Top */}
            <div className="flex justify-center -mt-14 sm:-mt-16 mb-4">
              <WaxSeal size={96} withLabel={false} />
            </div>

            {/* Gratitude Proclamation */}
            <div className="text-center max-w-xl mx-auto space-y-3">
              <div className="inline-block px-3 py-1 bg-[#FAF8F5] border border-[#B38B59]/40 font-mono text-[10px] uppercase tracking-[0.25em] text-[#B38B59]">
                Proclamation Recorded // {folioPassNumber}
              </div>

              <h3 className="font-serif text-3xl sm:text-4xl text-[#1A1D20] font-light">
                {attendance === 'attending' 
                  ? 'With Sincerest Gratitude & Joy' 
                  : 'Grateful for Your Kind Wishes'}
              </h3>

              <p className="font-serif italic text-base sm:text-lg text-[#1A1D20]/80 leading-relaxed">
                Dear <strong className="font-medium text-[#1A1D20]">{fullName}</strong>, 
                {attendance === 'attending' ? (
                  <>
                    {' '}we are deeply honored that you will celebrate the marriage of{' '}
                    <span className="text-[#B38B59] font-medium">Jassim &amp; Shifa</span>. Your confirmation has been inscribed into our official guest chronicle.
                  </>
                ) : (
                  <>
                    {' '}thank you warmly for your heartfelt prayers. Though we will miss your presence, your blessings accompany Jassim &amp; Shifa on this sacred journey.
                  </>
                )}
              </p>
            </div>

            {/* Confirmed Itinerary Pass */}
            {attendance === 'attending' && (
              <div className="my-8 bg-[#FAF8F5] border border-[rgba(179,139,89,0.3)] p-5 sm:p-6 text-left">
                <div className="flex items-center justify-between border-b border-[rgba(179,139,89,0.2)] pb-3 mb-4">
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#B38B59]">
                    Official Digital Invitation Pass
                  </div>
                  <div className="font-mono text-xs font-semibold text-[#1A1D20]">
                    Total Party: {adultsCount + childrenCount} ({adultsCount} Adults{childrenCount > 0 ? `, ${childrenCount} Children` : ''})
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(eventSelection === 'both' || eventSelection === 'nikah') && (
                    <div className="p-3 bg-white border border-[rgba(179,139,89,0.2)]">
                      <span className="font-mono text-[9px] uppercase tracking-wider text-[#B38B59] block">
                        Event I • Nikah Solemnization
                      </span>
                      <h4 className="font-serif text-lg font-medium text-[#1A1D20]">Bagai Banquet</h4>
                      <p className="font-serif text-xs text-[#1A1D20]/75">Friday, 15th January 2027 • 11:30 AM</p>
                      <p className="font-mono text-[10px] text-[#B38B59] mt-1">Ashoka Marg, Nashik</p>
                    </div>
                  )}

                  {(eventSelection === 'both' || eventSelection === 'reception') && (
                    <div className="p-3 bg-white border border-[rgba(179,139,89,0.2)]">
                      <span className="font-mono text-[9px] uppercase tracking-wider text-[#B38B59] block">
                        Event II • Grand Reception
                      </span>
                      <h4 className="font-serif text-lg font-medium text-[#1A1D20]">Welcome Lawns &amp; Banquet</h4>
                      <p className="font-serif text-xs text-[#1A1D20]/75">Sunday, 17th January 2027 • 07:30 PM</p>
                      <p className="font-mono text-[10px] text-[#B38B59] mt-1">Ghodbunder Road, Thane</p>
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-[rgba(179,139,89,0.15)] flex items-center justify-between text-xs font-serif text-[#1A1D20]/70">
                  <span>Culinary note: {dietaryPreference}</span>
                  <span className="font-mono text-[9px] text-[#B38B59]">{email}</span>
                </div>
              </div>
            )}

            {/* Gratitude Action Toolbar */}
            <div className="pt-6 border-t border-[rgba(179,139,89,0.2)] flex flex-wrap items-center justify-center gap-3">
              {attendance === 'attending' && (
                <button
                  onClick={handleDownloadSelectedCalendar}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1A1D20] text-[#F5F2EB] font-mono text-[11px] uppercase tracking-[0.16em] hover:bg-[#B38B59] transition-colors cursor-pointer"
                >
                  <Calendar size={14} />
                  <span>Download .ICS Calendar Event</span>
                </button>
              )}

              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#B38B59] text-[#1A1D20] font-mono text-[11px] uppercase tracking-[0.16em] hover:bg-[#FAF8F5] transition-colors cursor-pointer"
              >
                <Printer size={14} />
                <span>Print Keepsake Pass</span>
              </button>

              <button
                onClick={handleResetForm}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 text-stone-500 font-mono text-[10px] uppercase tracking-wider hover:text-stone-800 transition-colors cursor-pointer"
              >
                <RefreshCw size={12} />
                <span>Adjust Response</span>
              </button>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
