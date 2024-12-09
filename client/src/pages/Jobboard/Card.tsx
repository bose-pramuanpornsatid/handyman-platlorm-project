import React from 'react';

interface CardProps {
  jobName: string;
  companyName: string;
  postDate: string;
  location: string | null;
  workPlace: string | null;
  applicationStatus?: 'Applied' | 'Reject' | 'Accept'; // Optional prop
}

const Card: React.FC<CardProps> = ({ jobName, companyName, postDate, location, workPlace, applicationStatus }) => {
  const workplaceText = workPlace === '1' ? 'Remote' : 'On-Site';

  // Function to get tag styles based on applicationStatus
  const getTagStyles = (status: string) => {
    switch (status) {
      case 'Applied':
        return 'bg-yellow-100 text-yellow-800 border-yellow-400';
      case 'Reject':
        return 'bg-red-100 text-red-800 border-red-400';
      case 'Accept':
        return 'bg-green-100 text-green-800 border-green-400';
      default:
        return '';
    }
  };

  return (
    <div className="p-3 max-w-full bg-white rounded-lg shadow border border-gray-200 hover:bg-gray-100">
      <div className="flex space-x-3">
        <span className="inline-block p-3 text-blue-500 bg-blue-100 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
            />
          </svg>
        </span>
        <div className="flex flex-col space-y-1 items-start">
          <div className="flex flex-wrap items-center space-x-2">
            <h2 className="text-base font-semibold text-gray-700 capitalize">{jobName}</h2>
            {applicationStatus && (
              <span
                className={`text-xs font-medium px-2.5 py-0.5 rounded border ${getTagStyles(applicationStatus)}`}
              >
                {applicationStatus}
              </span>
            )}
          </div>
          <h1 className="text-sm text-gray-700">
            {companyName}
          </h1>
        </div>
      </div>
      <div className="flex space-x-1">
        <p className="mt-2 text-xs text-gray-500 list-disc">{location}</p>
        <p className="mt-2 text-xs text-gray-500 list-disc">  •  {workplaceText}</p>
        <p className="mt-2 text-xs text-gray-500 list-disc">  •  {postDate}</p>
      </div>
    </div>
  );
};

export default Card;