import React, { memo } from 'react';
import styles from './index.module.css';

interface LeaderboardEntry {
  school_id: string;
  school_name: string;
  total_score: number;
  student_names: string;
}

interface LeaderboardProps {
  leaderboard: LeaderboardEntry[];
}

const Leaderboard: React.FC<LeaderboardProps> = memo(({ leaderboard }) => {
  return (
    <div className="flex flex-col items-start">
      {/* Title Section */}
      <div className="flex items-center mb-4">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6 text-gray-900">
        <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clip-rule="evenodd" />
      </svg>
        <h1 className="text-lg font-bold text-gray-900">Leaderboard</h1>
      </div>

      {/* Description Section */}
      <h2 className="text-sm text-gray-900 mb-4">Top 5 Schools along with Top Student by Total Score</h2>

      {/* List Section */}
      <ol className="w-full">
        {leaderboard.map((entry, index) => (
          <li
            key={entry.school_id}
            className="flex items-center py-3 px-4 m-2 space-x-4 border border-gray-200 shadow cursor-pointer rounded-lg transition-all hover:bg-gray-100"
          >
            {/* Ranking Circle */}
            <div className="flex-shrink-0">
              <div className="w-8 h-8 flex items-center justify-center bg-indigo-600 text-white rounded-full text-sm font-black">
                {index + 1}
              </div>
            </div>
            {/* School Info */}
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-black">{entry.school_name}</h3>
                <p className="text-indigo-600 font-bold text-base">Score: {entry.total_score}</p>
              </div>
              <p className="text-sm text-gray-700 mt-1 text-left">Top Student: {entry.student_names}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
});

Leaderboard.displayName = 'Leaderboard';

export default Leaderboard;
