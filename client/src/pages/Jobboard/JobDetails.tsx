import React from 'react';
import { useState } from 'react';

interface JobDetailsProps {
  jobName: string;
  category: string;
  companyName: string;
  companyId: string;
  postDate: string;
  location: string;
  description: string;
}

const JobDetails: React.FC<JobDetailsProps> = ({ jobName, category, companyName, companyId, postDate, location, description }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  return (
    <div className="p-3 w-full h-xl bg-white rounded-lg shadow-md h-full">
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
    </div>
    <h1 className="mt-4 text-2xl font-bold text-gray-700 capitalize ">
      {jobName}
    </h1>
    <h1 className="mt-2 text-sm text-gray-700 ">
        {category}category
    </h1>
    <h1 className="mt-2 text-sm text-gray-700 ">
        {companyName}company name
    </h1>
    <p className="mt-2 text-sm text-gray-700 ">{postDate}</p>
    <div className="mt-2 flex space-x-3 items-center">
      <a
        href="#"
        className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Apply Now
      </a>
      <svg
        className="w-8 h-8 fill-current text-indigo-600 hover:text-indigo-500 transition-colors"
        width="335"
        height="335"
        viewBox="0 0 335 335"
        xmlns="http://www.w3.org/2000/svg"
        onClick={toggleBookmark}
      >
        <path
          fill="currentColor"
          d="M83.75 272.187V78.3899C83.75 71.9598 85.9042 66.5951 90.2127 62.296C94.5212 57.9968 99.8858 55.8426 106.307 55.8333H228.707C235.128 55.8333 240.493 57.9875 244.801 62.296C249.11 66.6044 251.259 71.9691 251.25 78.3899V272.187L167.5 236.217L83.75 272.187ZM97.7083 250.552L167.5 220.542L237.292 250.552V78.3899C237.292 76.2403 236.398 74.2676 234.612 72.4716C232.825 70.6756 230.852 69.7823 228.693 69.7916H106.307C104.157 69.7916 102.184 70.6849 100.388 72.4716C98.5924 74.2583 97.699 76.231 97.7083 78.3899V250.552Z"
        />
      </svg>
    </div>
    <h1 className="mt-5 text-lg font-semibold text-gray-700">At the glance</h1>
    {/* <p className="mt-2 text-base text-gray-500 ">Company ID: {companyId}</p> */}
    <p className="mt-2 text-base text-gray-500 ">Location: {location}</p>

    <h1 className="mt-5 text-lg font-semibold text-gray-700">About the Job</h1>
    <p className="mt-2 text-base text-gray-500 ">{description}</p>
  </div>
  );
};

export default JobDetails;
