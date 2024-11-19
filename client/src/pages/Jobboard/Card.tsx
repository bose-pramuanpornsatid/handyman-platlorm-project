import React from 'react';

interface CardProps {
  jobName: string;
  companyName: string;
  companyId: string;
  postDate: string;
  location: string;
  workPlace: string;
}

const Card: React.FC<CardProps> = ({ jobName, companyName, companyId, postDate, location, workPlace }) => {
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
        <div className="flex flex-col space-y-1">
          <h1 className="text-base font-semibold text-gray-700 capitalize ">
            {jobName}
          </h1>
          <h1 className="text-sm text-gray-700 ">
            {companyName}company name
          </h1>
        </div>
      </div>
      <div className="flex space-x-1">
        {/* <p className="mt-2 text-xs text-gray-500 ">Company ID: {companyId}</p> */}
        <p className="mt-2 text-xs text-gray-500 list-disc">{location}</p>
        <p className="mt-2 text-xs text-gray-500 list-disc">  •  Hybrid{workPlace}</p>
        <p className="mt-2 text-xs text-gray-500 list-disc">  •  {postDate}</p>
      </div>
    </div>
  );
};

export default Card;