import React, { useState, useEffect, memo } from 'react';

import styles from './index.module.css';
import Card from './Card';

import Papa from 'papaparse';

const csvFilePath = './data/posting.csv';

const Jobboard: React.FC = memo(() => {
  const [mockData, setMockData] = useState<any[]>([]); // Use state to store the job data
  const [loading, setLoading] = useState(true); // Add loading state

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
      })
      .catch((error) => {
        console.error('Error reading CSV file:', error);
        setLoading(false); // Stop loading if there is an error
      });
  }, []); // Empty dependency array ensures this runs once on component mount

  if (loading) {
    return <div>Loading...</div>; // Show a loading state while fetching data
  }

  return (
    <div className={styles.container}>
      <section className="">
        <div className="container px-6 py-10 mx-auto">
          <h1 className="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl">
            Explore <span className="underline decoration-blue-500">job openings</span>
          </h1>

          <p className="mt-4 text-gray-500 xl:mt-6">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nostrum quam voluptatibus
          </p>
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mt-8 xl:mt-12 xl:gap-16">
            {mockData.map((job) => (
              <Card
                key={job.posting_id}
                jobName={job.job_name}
                companyId={job.company_id}
                postDate={job.post_date}
                location={job.location}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
});

Jobboard.displayName = 'Jobboard';

export default Jobboard;