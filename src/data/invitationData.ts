import type { EventDetails, ConciergeContact } from '../types';

export const COUPLE_DATA = {
  groom: {
    firstName: "Jassim",
    fullName: "Jassim Hashim",
    parents: "Mr. Muhamed Hashim & Mrs. Mumtaz Muhamed Hashim",
    title: "S/o Mr. Muhamed Hashim & Mrs. Mumtaz Muhamed Hashim"
  },
  bride: {
    firstName: "Shifa",
    fullName: "Shifa Anis Khan",
    parents: "Mr. Anis Asgar Khan & Mrs. Shabana Anis Khan",
    title: "D/o Mr. Anis Asgar Khan & Mrs. Shabana Anis Khan"
  },
  scripture: {
    arabic: "وَخَلَقْنَاكُمْ أَزْوَاجًا",
    translation: "And We created you in pairs",
    reference: "Surah An-Naba [78:8]"
  },
  year: 2027
};

export const EVENTS_DATA: Record<'nikah' | 'reception', EventDetails> = {
  nikah: {
    id: 'nikah',
    pillarTitle: "The Solemnization",
    ceremonyType: "Nikah Ceremony & Dawat-e-Khaas",
    dateString: "Friday, 15th January 2027",
    isoDate: "2027-01-15T11:30:00+05:30",
    timeString: "11:30 AM IST Onwards",
    venueName: "Bagai Banquet",
    addressLines: [
      "Ashoka Marg",
      "Near Ashoka Universal School, Kalpataru Nagar",
      "Nashik, Maharashtra 422006"
    ],
    city: "Nashik",
    state: "Maharashtra",
    mapTarget: "Bagai Banquet Ashoka Marg Nashik",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Bagai+Banquet+Ashoka+Marg+Nashik",
    dressCode: "Haute Traditional & Modest Couture (Ivory, Sandstone, Soft Gold, Sage)",
    itinerary: [
      {
        time: "11:30 AM",
        label: "Baraat Arrival & Welcome",
        description: "Arrival of the groom's procession with traditional ceremonial welcome"
      },
      {
        time: "12:15 PM",
        label: "The Nikah Solemnization",
        description: "Ijab-o-Qubool ceremony, recitation of Khutbah, and congregational Dua"
      },
      {
        time: "01:15 PM",
        label: "Dawat-e-Khaas (Royal Banquet)",
        description: "Authentic celebratory feast featuring heritage Mughlai culinary courses"
      },
      {
        time: "03:30 PM",
        label: "Rukhsati & Blessings",
        description: "Heartfelt farewell prayers and departure of the newlyweds"
      }
    ]
  },
  reception: {
    id: 'reception',
    pillarTitle: "The Celebration",
    ceremonyType: "Walima / Grand Evening Reception",
    dateString: "Sunday, 17th January 2027",
    isoDate: "2027-01-17T19:30:00+05:30",
    timeString: "07:30 PM IST Onwards",
    venueName: "Welcome Lawns and Banquet",
    addressLines: [
      "Ghodbunder Road",
      "Opposite Suraj Water Park, Waghbil Naka",
      "Thane West, Maharashtra 400615"
    ],
    city: "Thane",
    state: "Maharashtra",
    mapTarget: "Welcome lawns and Banquet Ghodbunder Road Thane",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Welcome+lawns+and+Banquet+Ghodbunder+Road+Thane",
    dressCode: "Evening Black-Tie & Contemporary Couture (Charcoal Slate, Emerald, Burnished Bronze)",
    itinerary: [
      {
        time: "07:30 PM",
        label: "Red Carpet & Guest Reception",
        description: "Welcome mocktails, live instrumental string quartet, and guest reception"
      },
      {
        time: "08:30 PM",
        label: "Grand Entrance of the Couple",
        description: "Unveiling of Jassim & Shifa followed by family felicitation & cake cutting"
      },
      {
        time: "09:15 PM",
        label: "Grand Gala Dinner",
        description: "Lavish multi-cuisine banquet, artisanal carving stations, and signature desserts"
      },
      {
        time: "11:00 PM",
        label: "Toast & Evening Serenade",
        description: "Musical tributes, memories, and closing felicitations"
      }
    ]
  }
};

export const CONCIERGE_CONTACTS: ConciergeContact[] = [
  {
    role: "Groom's Family Liaison",
    name: "Tariq Hashim",
    phone: "+91 98201 44521",
    email: "tariq.hashim@theweddingchronicle2027.com",
    notes: "Nashik & Thane logistics, Baraat coordination, accommodation"
  },
  {
    role: "Bride's Family Liaison",
    name: "Farhan Anis Khan",
    phone: "+91 98332 77890",
    email: "farhan.khan@theweddingchronicle2027.com",
    notes: "Guest welcome, Nashik reception coordination, dietary queries"
  },
  {
    role: "Guest Concierge & Hospitality Desk",
    name: "Amina Shaikh & Associates",
    phone: "+91 97690 12345",
    email: "concierge@theweddingchronicle2027.com",
    notes: "Intercity airport transfers (BOM to Thane / Nashik) & hotel bookings"
  },
  {
    role: "Venue Logistics (Nashik Desk)",
    name: "Bagai Banquet Hospitality Team",
    phone: "+91 253 250 8899",
    email: "events@bagaibanquet.com",
    notes: "Valet parking assistance & venue accessibility on 15 Jan 2027"
  },
  {
    role: "Venue Logistics (Thane Desk)",
    name: "Welcome Lawns Hospitality Desk",
    phone: "+91 22 2597 4400",
    email: "banquets@welcomelawns.com",
    notes: "Valet parking assistance & gate security on 17 Jan 2027"
  }
];

export const SARTORIAL_PALETTE = [
  { name: "Sandstone Cream", hex: "#F5F2EB", role: "Primary Canvas & Silk Base" },
  { name: "Polished Bronze", hex: "#B38B59", role: "Zari, Metallics & Brocade" },
  { name: "Charcoal Slate", hex: "#1A1D20", role: "Evening Formal Velvet & Tuxedo" },
  { name: "Imperial Gold", hex: "#D4AF37", role: "Jeweled Accents & Embellishment" },
  { name: "Raw Olive / Sage", hex: "#5E6D5B", role: "Complementary Daywear Accent" }
];
