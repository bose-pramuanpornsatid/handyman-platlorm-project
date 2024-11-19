import React, { useState, useEffect, memo } from 'react';

import styles from './index.module.css';
import Card from './Card';
import JobDetails from './JobDetails';

import Papa from 'papaparse';

const csvFilePath = './data/posting.csv';

const Jobboard: React.FC = memo(() => {
  const [mockData, setMockData] = useState<any[]>([]); // Use state to store the job data
  const [loading, setLoading] = useState(true); // Add loading state
  const [selectedJob, setSelectedJob] = useState<any | null>(null); // State for selected job

  useEffect(() => {
    // Fetch the CSV file and parse it
    fetch(csvFilePath)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
      })
      .then((csvText) => {
        const parsedData = Papa.parse(csvText, { header: true }).data;
        setMockData(parsedData); // Update state with parsed data
        setLoading(false); // Set loading to false after data is loaded
        setSelectedJob(parsedData[0] || null); // Set first job as default
      })
      .catch((error) => {
        console.error('Error reading CSV file:', error);
        setLoading(false); // Stop loading if there is an error
      });
  }, []); // Empty dependency array ensures this runs once on component mount

  const handleCardClick = (job: any) => {
    setSelectedJob(job); // Set the selected job when a card is clicked
  };

  if (loading) {
    return <div>Loading...</div>; // Show a loading state while fetching data
  }

  return (
    <div className={styles.container}>
      <section className="">
        <div className="container px-6 py-10 mx-auto">
          <h1 className="text-xl font-semibold text-gray-800 capitalize">
            Explore <span className="underline decoration-blue-500">job openings</span>
          </h1>
          <div className="divide-y divide-gray-300 h-screen">
            <p className="mt-1 text-gray-500 text-lg">
              Discover exciting career opportunities across diverse industries.
            </p>
            <div className="mt-5 flex divide-x divide-gray-300 h-screen">
            <div className="w-1/3 p-3">
              <div className="grid grid-cols-1 xl:grid-cols-1 gap-3 mt-3 xl:mt-5 xl:gap-5 overflow-y-auto h-full">
              {mockData.map((job) => (
                <div key={job.posting_id} onClick={() => handleCardClick(job)}>
                  <Card
                    key={job.posting_id}
                    jobName={job.job_name}
                    companyName={job.company_name}
                    companyId={job.company_id}
                    postDate={job.post_date}
                    location={job.location}
                    workPlace={job.work_place}
                  />
                </div>
              ))}
              </div>
            </div>
            <div className="w-2/3 p-3">
              {selectedJob ? (
                  <JobDetails
                    jobName={selectedJob.job_name}
                    companyName={selectedJob.company_name}
                    companyId={selectedJob.company_id}
                    postDate={selectedJob.post_date}
                    location={selectedJob.location}
                    description={selectedJob.description || 'No description available.'}
                  />
                ) : (
                  <p className="text-gray-500">Select a job to see more details</p>
              )}
            </div>
          </div>
        </div>
        </div>
      </section>
    </div>
  );
});

Jobboard.displayName = 'Jobboard';

export default Jobboard;