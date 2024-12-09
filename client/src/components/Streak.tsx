import React, { memo } from 'react';

interface StreakProps {
  streak: number;
}

const Streak: React.FC<StreakProps> = memo(({ streak }) => {
  const maxStreak = 50;
  const progressWidth = (streak / maxStreak) * 100;

  return (
    <div className="flex flex-col items-center space-y-2">
      {/* Number indicators evenly spaced */}
      <div className="w-full flex justify-between text-xs font-medium text-gray-700">
        {Array.from({ length: 6 }, (_, index) => (
          <span key={index} className="w-0 text-center">
            {index * 10}
          </span>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="relative w-full bg-gray-200 rounded-full h-3">
        <div
          className="bg-indigo-600 h-3 rounded-full"
          style={{ width: `${progressWidth}%` }}
        ></div>

        {/* Fire icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="absolute -top-2 transform translate-x-[calc(100%-24px)] w-6 h-6 text-gray-700"
          style={{ left: `${progressWidth}%` }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z"
          />
        </svg>
      </div>
    </div>
  );
});

Streak.displayName = 'Streak';

export default Streak;