import Image from "next/image";
import PlanetaryInfluences from './components/PlanetaryInfluences';
import LearnForm from './components/LearnForm';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-indigo-900 mb-2">Vedic Astrology Calculator</h1>
          <p className="text-lg text-indigo-600">Discover Your Cosmic Blueprint</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column - Form */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Enter Your Details</h2>
              <LearnForm />
            </div>
          </div>

          {/* Right Column - Planetary Influences */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Planetary Influences</h2>
              <PlanetaryInfluences />
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-gray-600">
          <p className="text-sm">HARE KRISHNA DATTATREYA-CLUB</p>
          <div className="flex justify-center gap-4 mt-4">
            <a href="#" className="text-indigo-600 hover:text-indigo-800 transition-colors">
              About
            </a>
            <a href="#" className="text-indigo-600 hover:text-indigo-800 transition-colors">
              Contact
            </a>
            <a href="#" className="text-indigo-600 hover:text-indigo-800 transition-colors">
              Learn More
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}
