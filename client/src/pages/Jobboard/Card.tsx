import React, { useState } from 'react';

interface CardProps {
  jobName: string;
  companyName: string;
  postDate: string;
  location: string | null;
  workPlace: number | null;
  applicationStatus?: 'Applied' | 'Reject' | 'Accept'; // Optional prop
  showActions?: boolean; // New prop to show action elements
  onStatusChange?: (newStatus: string) => void; // Handler for status change
  onDelete?: () => void; // Handler for delete action
}

const Card: React.FC<CardProps> = ({ jobName, companyName, postDate, location, workPlace, applicationStatus, showActions, onStatusChange, onDelete }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const workplaceText = workPlace === 1 ? 'Remote' : 'On-Site';
  // console.log(companyName + ' : ' + workplaceText);

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
    <div className="p-3 max-w-full bg-white rounded-lg shadow border border-gray-200 hover:bg-gray-100 relative">
      {/* Top Right Actions */}
      {showActions && (
        <div className="absolute top-2 right-2 flex space-x-2">
          <span
            className={`text-xs font-medium px-2.5 py-0.5 rounded border cursor-pointer ${getTagStyles(applicationStatus!)}`}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            {applicationStatus}
          </span>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-1 bg-white border rounded shadow z-10">
              <button
                onClick={() => { onStatusChange && onStatusChange('Applied'); setIsDropdownOpen(false); }}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Applied
              </button>
              <button
                onClick={() => { onStatusChange && onStatusChange('Reject'); setIsDropdownOpen(false); }}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Reject
              </button>
              <button
                onClick={() => { onStatusChange && onStatusChange('Accept'); setIsDropdownOpen(false); }}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Accept
              </button>
            </div>
          )}
          <button
            onClick={() => {
              if (window.confirm('Are you sure you want to delete this application?')) {
                onDelete && onDelete();
              }
            }}
            className="p-1 bg-red-500 text-white rounded text-xs"
          >
            Delete
          </button>
        </div>
      )}
      <div className="flex space-x-3">
        <span className="inline-block p-3 text-blue-500 bg-blue-100 rounded-full w-12 h-12">
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
        <div className="flex flex-col space-y-1 items-start flex-1 min-w-0">
          <div className="flex flex-wrap space-x-2 max-w-96">
            <h2 className="text-base font-semibold text-gray-700 capitalize break-words whitespace-normal text-left">{jobName}</h2>
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