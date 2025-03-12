import { NextResponse } from 'next/server';

interface PlanetaryInfluence {
  planet: string;
  house: number;
  strength: number;
  nature: 'benefic' | 'malefic' | 'neutral';
  aspects: string[];
}

const planets = [
  'Sun', 'Moon', 'Mars', 'Mercury', 
  'Jupiter', 'Venus', 'Saturn', 
  'Rahu', 'Ketu'
] as const;

const planetNatures: Record<typeof planets[number], PlanetaryInfluence['nature']> = {
  Sun: 'neutral',
  Moon: 'benefic',
  Mars: 'malefic',
  Mercury: 'neutral',
  Jupiter: 'benefic',
  Venus: 'benefic',
  Saturn: 'malefic',
  Rahu: 'malefic',
  Ketu: 'malefic'
};

export async function GET() {
  try {
    const influences: PlanetaryInfluence[] = planets.map((planet) => {
      const house = Math.floor(Math.random() * 12) + 1;
      return {
        planet,
        house,
        strength: Math.round((Math.random() * 100) * 100) / 100,
        nature: planetNatures[planet],
        aspects: calculateAspects(house)
      };
    });

    return NextResponse.json({ influences });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to calculate planetary influences' },
      { status: 500 }
    );
  }
}

function calculateAspects(housePosition: number): string[] {
  const aspects: string[] = [];
  
  // 7th house aspect (opposition)
  aspects.push(`${((housePosition + 6) % 12) || 12}th house`);
  
  // Trines (120 degrees)
  aspects.push(`${((housePosition + 4) % 12) || 12}th house`);
  aspects.push(`${((housePosition + 8) % 12) || 12}th house`);
  
  return aspects;
}