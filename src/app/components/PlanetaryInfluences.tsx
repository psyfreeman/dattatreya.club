'use client';

import { useEffect, useState } from 'react';

interface PlanetaryInfluence {
  planet: string;
  house: number;
  strength: number;
  nature: 'benefic' | 'malefic' | 'neutral';
  aspects: string[];
}

const planetSymbols: Record<string, string> = {
  Sun: '☉',
  Moon: '☽',
  Mars: '♂',
  Mercury: '☿',
  Jupiter: '♃',
  Venus: '♀',
  Saturn: '♄',
  Rahu: '☊',
  Ketu: '☋'
};

export default function PlanetaryInfluences() {
  const [influences, setInfluences] = useState<PlanetaryInfluence[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPlanetaryInfluences();
  }, []);

  const fetchPlanetaryInfluences = async () => {
    try {
      const response = await fetch('/api/planetary-influences');
      const data = await response.json();
      setInfluences(data.influences);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch planetary influences');
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
    </div>
  );

  if (error) return (
    <div className="bg-red-50 text-red-600 p-4 rounded-lg">
      {error}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Grid of planet cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {influences.map((influence, index) => (
          <div 
            key={index}
            className={`
              rounded-lg p-4 transition-all duration-300 hover:shadow-lg
              ${influence.nature === 'benefic' ? 'bg-green-50 hover:bg-green-100' : ''}
              ${influence.nature === 'malefic' ? 'bg-red-50 hover:bg-red-100' : ''}
              ${influence.nature === 'neutral' ? 'bg-blue-50 hover:bg-blue-100' : ''}
            `}
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl" title={influence.planet}>
                {planetSymbols[influence.planet]}
              </span>
              <h3 className="text-lg font-semibold">{influence.planet}</h3>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">House</span>
                <span className="font-medium">{influence.house}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-600">Strength</span>
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      influence.nature === 'benefic' ? 'bg-green-500' :
                      influence.nature === 'malefic' ? 'bg-red-500' :
                      'bg-blue-500'
                    }`}
                    style={{ width: `${influence.strength}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <span className="text-gray-600 block mb-1">Aspects</span>
                <div className="flex flex-wrap gap-2">
                  {influence.aspects.map((aspect, i) => (
                    <span 
                      key={i}
                      className="text-xs px-2 py-1 bg-white rounded-full shadow-sm"
                    >
                      {aspect}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="border-t pt-4 mt-6">
        <h4 className="text-sm font-semibold mb-2">Legend:</h4>
        <div className="flex gap-4 text-sm">
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-green-500"></span>
            Benefic
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-red-500"></span>
            Malefic
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-blue-500"></span>
            Neutral
          </span>
        </div>
      </div>
    </div>
  );
}