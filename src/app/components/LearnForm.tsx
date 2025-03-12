'use client';

import { useState } from 'react';

interface FormData {
  birthDate: string;
  birthTime: string;
  location: string;
}

export default function LearnForm() {
  const [formData, setFormData] = useState<FormData>({
    birthDate: '',
    birthTime: '',
    location: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // TODO: Add API call to calculate planetary positions
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700 mb-1">
          Birth Date
        </label>
        <input
          type="date"
          id="birthDate"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={formData.birthDate}
          onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
          required
        />
      </div>

      <div>
        <label htmlFor="birthTime" className="block text-sm font-medium text-gray-700 mb-1">
          Birth Time
        </label>
        <input
          type="time"
          id="birthTime"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={formData.birthTime}
          onChange={(e) => setFormData({ ...formData, birthTime: e.target.value })}
          required
        />
      </div>

      <div>
        <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
          Birth Place
        </label>
        <input
          type="text"
          id="location"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          placeholder="City, Country"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mt-6"
      >
        Calculate Chart
      </button>

      <p className="text-xs text-gray-500 text-center mt-2">
        Enter your birth details to discover your astrological blueprint
      </p>
    </form>
  );
}