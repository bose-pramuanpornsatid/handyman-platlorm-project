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
          viewBox="0 0 24 24"
          fill="currentColor"
          className="absolute -top-2 transform translate-x-[-50%] w-8 h-8 text-orange-500"
          style={{ left: `calc(${progressWidth}% + 6px)` }} // Adjusted left position
        >
          <path
            fillRule="evenodd"
            d="M12.963 2.286a.75.75 0 0 0-1.071-.136 9.742 9.742 0 0 0-3.539 6.176 7.547 7.547 0 0 1-1.705-1.715.75.75 0 0 0-1.152-.082A9 9 0 1 0 15.68 4.534a7.46 7.46 0 0 1-2.717-2.248ZM15.75 14.25a3.75 3.75 0 1 1-7.313-1.172c.628.465 1.35.81 2.133 1a5.99 5.99 0 0 1 1.925-3.546 3.75 3.75 0 0 1 3.255 3.718Z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
});

Streak.displayName = 'Streak';

export default Streak;