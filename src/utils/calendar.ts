import type { EventDetails } from '../types';

export function downloadCalendarIcs(events: EventDetails[], filename: string = 'wedding-invitation.ics') {
  const pad = (n: number) => (n < 10 ? '0' + n : '' + n);

  const formatUtcDate = (d: Date) => {
    return (
      d.getUTCFullYear() +
      pad(d.getUTCMonth() + 1) +
      pad(d.getUTCDate()) +
      'T' +
      pad(d.getUTCHours()) +
      pad(d.getUTCMinutes()) +
      pad(d.getUTCSeconds()) +
      'Z'
    );
  };

  const now = new Date();
  const dtStamp = formatUtcDate(now);

  const vEvents = events.map((event, idx) => {
    const startDate = new Date(event.isoDate);
    // Nikah runs ~5 hours, Reception runs ~4.5 hours
    const durationHours = event.id === 'nikah' ? 5 : 4.5;
    const endDate = new Date(startDate.getTime() + durationHours * 60 * 60 * 1000);

    const uid = `wedding-2027-${event.id}-${idx}@theweddingchronicle.com`;
    const summary = `${event.pillarTitle}: Jassim Hashim & Shifa Anis Khan (${event.ceremonyType})`;
    const location = `${event.venueName}, ${event.addressLines.join(', ')}`;
    const description = `You are cordially invited to celebrate the union of Jassim Hashim & Shifa Anis Khan.\\n\\nEvent: ${event.pillarTitle} (${event.ceremonyType})\\nDate: ${event.dateString}\\nTime: ${event.timeString}\\nVenue: ${location}\\n\\nGoogle Maps Navigation: ${event.googleMapsUrl}\\n\\nDress Code: ${event.dressCode}\\n\\nWith warmest regards,\\nThe Hashim & Khan Families.`;

    return [
      'BEGIN:VEVENT',
      `UID:${uid}`,
      `DTSTAMP:${dtStamp}`,
      `DTSTART:${formatUtcDate(startDate)}`,
      `DTEND:${formatUtcDate(endDate)}`,
      `SUMMARY:${summary}`,
      `DESCRIPTION:${description}`,
      `LOCATION:${location}`,
      'STATUS:CONFIRMED',
      'BEGIN:VALARM',
      'TRIGGER:-P1D',
      'ACTION:DISPLAY',
      `DESCRIPTION:Reminder: ${summary} tomorrow`,
      'END:VALARM',
      'END:VEVENT'
    ].join('\r\n');
  });

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//The Wedding Chronicle//Jassim & Shifa 2027//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    ...vEvents,
    'END:VCALENDAR'
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
}
