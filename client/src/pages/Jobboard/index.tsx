import React, { useState, useEffect, memo } from 'react';

import styles from './index.module.css';
import Card from './Card';
import JobDetails from './JobDetails';

import Papa from 'papaparse';

const csvFilePath = './data/posting.csv';

const Jobboard: React.FC = memo(() => {
  const [mockPostingsList, setMockPostingslist] = useState<any[]>([]); // Use state to store the job data
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
        setMockPostingslist(parsedData); // Update state with parsed data
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

  const handleCardClickAPI = (postingId: string) => {
    // Fetch detailed job data from the mock API
    fetch(`https://pythonapi-995028621724.us-central1.run.app/posting/id?id=${postingId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setSelectedJob(data); // Set the selected job with fetched data
      })
      .catch((error) => {
        console.error('Error fetching job details from API:', error);
      });
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
            <div className="mt-5 flex divide-x divide-gray-300 h-full">
            <div className="w-1/3 p-3">
              <div className="grid grid-cols-1 xl:grid-cols-1 gap-3 mt-3 xl:mt-5 xl:gap-5 overflow-y-auto h-full">
              {mockPostingsList.map((job) => (
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
              <div className="overflow-y-auto h-full">
              {selectedJob ? (
                // posting_id,job_name,job_description,med_salary,sponsor,remote_allowed,
                // location,post_date,ng_or_internship,company_id
                  <JobDetails
                    jobName={selectedJob.job_name}
                    companyName={selectedJob.company_name}
                    companyId={selectedJob.company_id}
                    postDate={selectedJob.post_date}
                    location={selectedJob.location}
                    description={selectedJob.job_description || 'No description available.'}
                  />
                ) : (
                  <p className="text-gray-500">Select a job to see more details</p>
              )}
              </div>
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