export type EventSelection = 'both' | 'nikah' | 'reception';

export interface EventDetails {
  id: 'nikah' | 'reception';
  pillarTitle: string;
  ceremonyType: string;
  dateString: string;
  isoDate: string; // ISO date for countdown and calendar
  timeString: string;
  venueName: string;
  addressLines: string[];
  city: string;
  state: string;
  mapTarget: string;
  googleMapsUrl: string;
  dressCode: string;
  itinerary: {
    time: string;
    label: string;
    description: string;
  }[];
}

export interface RsvpFormData {
  eventSelection: EventSelection;
  attendance: 'attending' | 'declining';
  fullName: string;
  email: string;
  phone: string;
  guestCount: number;
  dietaryPreference: string;
  specialNotes: string;
}

export interface ConciergeContact {
  role: string;
  name: string;
  phone: string;
  email: string;
  notes: string;
}

