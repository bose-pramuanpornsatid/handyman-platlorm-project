import React, { useState, useEffect, memo } from 'react';
import styles from './index.module.css';
import Card from './Card';
import JobDetails from './JobDetails';
import Papa from 'papaparse';

const csvFilePath = './data/posting.csv';

const Jobboard: React.FC = memo(() => {
  const [postingsList, setPostingsList] = useState<any[]>([]); // State to store job data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state
  const [selectedJob, setSelectedJob] = useState<any | null>(null); // Selected job

  // Fetch job list from the backend API
  async function fetchJobList() {
    try {
      const apiUrl = 'https://pythonapi-995028621724.us-central1.run.app/posting';
      const response = await fetch(apiUrl, {
        method: 'GET',
        redirect: 'follow', // Follow redirects explicitly
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const payload = await response.json();
      console.log('Payload:', payload);
      setPostingsList(payload.result);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching job list:', error);
      setError('Failed to fetch job list. Please try again later.');
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchJobList();
  }, []); // Fetch job list once on component mount

  // Fetch detailed job data from the API
  const handleCardClick = async (postingId: string) => {
    try {
      const response = await fetch(`https://pythonapi-995028621724.us-central1.run.app/posting/${postingId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setSelectedJob(data['message']); // Set the selected job with fetched data
    } catch (error: any) {
      console.error('Error fetching job details:', error);
      setError('Failed to fetch job details. Please try again later.');
    }
  };

  // Fetch mock data from CSV (fallback or for local testing)
  const fetchMockData = () => {
    fetch(csvFilePath)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
      })
      .then((csvText) => {
        const parsedData = Papa.parse(csvText, { header: true }).data;
        setPostingsList(parsedData);
        setLoading(false);
        setSelectedJob(parsedData[0] || null);
      })
      .catch((error) => {
        console.error('Error reading CSV file:', error);
        setLoading(false);
        setError('Failed to load mock data.');
      });
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading state while fetching data
  }

  if (error) {
    return <div className="text-red-500">{error}</div>; // Show error message if there's an error
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
                  {postingsList.map((job) => (
                    <div key={job.posting_id} onClick={() => handleCardClick(job.posting_id)}>
                      <Card
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
                    <JobDetails
                      jobName={selectedJob.job_name}
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