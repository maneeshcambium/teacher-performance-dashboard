import React from 'react';
import type { AggregateScore } from '../types';

interface AggregateScoresCardProps {
  aggregateScores: AggregateScore;
}

const AggregateScoresCard: React.FC<AggregateScoresCardProps> = ({ aggregateScores }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-md p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-100 text-sm font-medium">Class Average</p>
            <p className="text-3xl font-bold mt-2">{aggregateScores.classAverage.toFixed(1)}</p>
            <p className="text-blue-100 text-xs mt-1">{aggregateScores.totalStudents} students</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-full p-3">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-md p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-green-100 text-sm font-medium">School Average</p>
            <p className="text-3xl font-bold mt-2">{aggregateScores.schoolAverage.toFixed(1)}</p>
            <p className="text-green-100 text-xs mt-1">All grades</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-full p-3">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg shadow-md p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-amber-100 text-sm font-medium">District Average</p>
            <p className="text-3xl font-bold mt-2">{aggregateScores.districtAverage.toFixed(1)}</p>
            <p className="text-amber-100 text-xs mt-1">All schools</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-full p-3">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AggregateScoresCard;
