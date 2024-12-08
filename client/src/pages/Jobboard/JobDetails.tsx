import { copy } from '@testing-library/user-event/dist/cjs/clipboard/copy.js';
import React from 'react';
import { useState, useEffect } from 'react';

interface JobDetailsProps {
  jobName: string;
  companyId: string;
  postDate: string;
  location: string;
  description: string;
  applyUrl: string;
  incrementStreak: () => void;
}

interface Company {
  address: string;
  company_id: number;
  company_name: string;
  job_description: string;
  url: string;
}

const JobDetails: React.FC<JobDetailsProps> = ({ jobName, companyId, postDate, location, description, applyUrl, incrementStreak }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [company, setCompany] = useState<Company | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  async function fetchCompany() {
    const apiUrl = `https://pythonapi-995028621724.us-central1.run.app/company/${companyId}`;
    const response = await fetch(apiUrl, {
      method: 'GET',
      redirect: 'follow',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const payload = await response.json();
    const company: Company = payload['message'];
    setCompany(company);
    console.log('Company:', company);
  }

  useEffect(() => {
    fetchCompany();
  }, [companyId]);

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
        Company name: {company?.company_name}
      </h1>
      <p className="mt-2 text-sm text-gray-700 ">{postDate}</p>
      <div className="mt-2 flex space-x-3 items-center">
        <a
          onClick={toggleModal}
          href={applyUrl}
          target="_blank"
          rel="noopener noreferrer"
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

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-50">
          <div className="relative p-4 w-full max-w-2xl bg-white rounded-lg shadow-lg">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-xl font-semibold text-gray-900">
                Did you apply?
              </h3>
              <button
                onClick={toggleModal}
                className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex items-center justify-center"
              >
                ✕
              </button>
            </div>
            {/* Modal Body */}
            <div className="p-4 space-y-4">
              <p className="text-base text-gray-500">
                Let us know, and we will help you track your application while also increasing your streak!
              </p>
            </div>
            {/* Modal Footer */}
            <div className="flex items-center p-4 border-t">
              <button
                onClick={() => {
                  incrementStreak(); // Increment streak on "Yes"
                  toggleModal(); // Close modal
                }}
                className="text-white bg-indigo-700 hover:bg-blue-800 px-5 py-2.5 rounded-lg text-sm font-medium"
              >
                Yes
              </button>
              <button
                onClick={toggleModal}
                className="py-2.5 px-5 ml-3 text-sm font-medium text-gray-900 bg-white rounded-lg border"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobDetails;
