'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';

const events = [
  {
    id: 1,
    title: 'Weekend Party',
    date: '2024-03-23',
    time: '22:00',
    description: 'Join us this weekend for an unforgettable night of music and dance.',
    dj: 'DJ Mystic',
    image: '/events/weekend-party.jpg',
    fullDescription: `
      Get ready for an incredible night at Dattatreya Club! Our Weekend Party features the amazing DJ Mystic,
      who will take you on a journey through the best electronic music.

      What to expect:
      - Progressive House & Trance
      - State-of-the-art sound system
      - Amazing light show
      - Special drinks menu
      - VIP areas available

      Doors open at 22:00
      Music until 6:00

      Early bird tickets available now!
    `
  },
  {
    id: 2,
    title: 'Live DJ Set',
    date: '2024-03-30',
    time: '21:00',
    description: 'Experience the best electronic music with our resident DJ.',
    dj: 'DJ Cosmos',
    image: '/events/dj-set.jpg',
    fullDescription: `
      DJ Cosmos returns to Dattatreya Club for another mind-blowing set! Known for his unique blend
      of deep house and techno, DJ Cosmos will create an unforgettable atmosphere.

      The night includes:
      - 6-hour DJ set
      - Special guest performances
      - Interactive visuals
      - Premium sound experience
      - Exclusive merchandise

      Limited tickets available!
    `
  },
  {
    id: 3,
    title: 'Trance Night',
    date: '2024-04-06',
    time: '22:00',
    description: 'A night dedicated to the best of trance music.',
    dj: 'DJ Shiva',
    image: '/events/trance-night.jpg',
    fullDescription: `
      Immerse yourself in the transcendent sounds of trance music with DJ Shiva. This special night
      is dedicated to pure trance, featuring both classic tracks and modern productions.

      Event highlights:
      - Pure trance music
      - Laser show
      - Fog effects
      - Outdoor chill area
      - Special guest DJs

      Early arrival recommended!
    `
  }
];

export default function EventPage() {
  const params = useParams();
  const event = events.find(e => e.id === Number(params.id));

  if (!event) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-teal-400">Event Not Found</h1>
          <Link href="/events" className="mt-4 inline-block text-teal-400/70 hover:text-teal-300 transition-colors">
            Back to Events
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black relative flex flex-col items-center">
      {/* Background */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-teal-950/20"></div>
        <div className="absolute inset-0 flex flex-col justify-between py-20 opacity-10">
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className="w-full h-px bg-teal-400"></div>
          ))}
        </div>
      </div>

      {/* Header with Navigation */}
      <nav className="w-full relative z-10 border-b border-teal-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-teal-400 tracking-wider hover:text-teal-300 transition-colors">
              Dattatreya Club
            </Link>
            <div className="flex gap-8">
              <Link href="/events" className="text-teal-400 hover:text-teal-300 transition-colors">
                Events
              </Link>
              <Link href="/gallery" className="text-teal-400/70 hover:text-teal-300 transition-colors">
                Gallery
              </Link>
              <Link href="/about" className="text-teal-400/70 hover:text-teal-300 transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-teal-400/70 hover:text-teal-300 transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="max-w-3xl mx-auto">
          <Link href="/events" className="text-teal-400/70 hover:text-teal-300 transition-colors">
            ← Back to Events
          </Link>
          
          <div className="mt-8 space-y-8">
            <div className="relative aspect-[2/1] rounded-xl bg-black/50 border border-teal-500/10 overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl font-bold text-teal-400">{event.time}</div>
                  <div className="mt-2 text-xl text-teal-400/70">{event.date}</div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h1 className="text-4xl font-bold text-teal-400">{event.title}</h1>
              <div className="flex items-center gap-4">
                <div className="px-4 py-2 rounded-full bg-black/50 border border-teal-500/10">
                  <span className="text-teal-400/70">DJ: {event.dj}</span>
                </div>
                <div className="px-4 py-2 rounded-full bg-black/50 border border-teal-500/10">
                  <span className="text-teal-400/70">{event.time}</span>
                </div>
              </div>
              <div className="prose prose-invert prose-teal">
                <p className="text-teal-400/70 whitespace-pre-line">{event.fullDescription}</p>
              </div>
              <button className="w-full py-4 rounded-xl bg-teal-500 hover:bg-teal-400 transition-colors text-black font-semibold">
                Book Tickets
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full relative z-10 border-t border-teal-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <p className="text-teal-400/50">&copy; 2024 Dattatreya Club. All rights reserved.</p>
            <div className="flex gap-4">
              <Link href="/privacy" className="text-teal-400/50 hover:text-teal-300 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-teal-400/50 hover:text-teal-300 transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
} 