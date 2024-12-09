import React, { useState, useEffect, memo } from 'react';
import styles from './index.module.css';
import Card from './Card';
import JobDetails from './JobDetails';
import Filter from './Filter';
import Papa from 'papaparse';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import Streak from '../../components/Streak'
import { auth } from '@/main';

const csvFilePath = './data/posting.csv';

interface UserData {
  user_id: number | null;
  school_id: string | null;
  company_id: string | null;
  year: number | null;
  user_name: string;
  skills: string;
  current_streak: number | null;
  points: number | null;
  auth_uid: string | null;
}

interface Posting {
  job_name: string | null;
  posting_id: string | null;
  company_id: string | null;
  location: string | null;
  post_date: string | null;
  company_name: string | null;
  remote_allowed: number | null;
}

const Jobboard: React.FC = memo(() => {
  const [postingsList, setPostingsList] = useState<Posting[]>([]); // State to store job data
  const [filteredPostings, setFilteredPostings] = useState<Posting[]>([]); // State for filtered job data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state
  const [selectedJob, setSelectedJob] = useState<any | null>(null); // Selected job
  const [searchQuery, setSearchQuery] = useState<string>(''); // Search query state
  const [locationQuery, setLocationQuery] = useState<string>(''); // Location filter query
  const [currentPage, setCurrentPage] = useState(1);
  const postingsPerPage = 10;
  const handleLocationFilterChange = (query: string) => {
    setLocationQuery(query); // Update the location query for filtering
  };

  const [userData, setUserData] = useState<UserData>({
    user_id: null,
    school_id: null,
    company_id: null,
    year: null,
    user_name: '',
    skills: '',
    current_streak: 0,
    points: null,
    auth_uid: localStorage.getItem('auth_uid'),
  });

  const incrementStreak = async () => {
    const newStreak = Math.min(userData.current_streak! + 1, 50);
    setUserData({ ...userData, current_streak: newStreak });

    try {
      const response = await fetch(`https://pythonapi-995028621724.us-central1.run.app/user/${userData.user_id}/update`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          school_id: userData.school_id,
          company_id: userData.company_id,
          year: userData.year,
          user_name: userData.user_name,
          skills: userData.skills,
          current_streak: userData.current_streak,
          auth_uid: userData.auth_uid,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log('User streak updated successfully');
    } catch (error) {
      console.error('Failed to update user streak:', error);
      return; // Exit if updating streak fails
    }

    try {
      const response = await fetch(`https://pythonapi-995028621724.us-central1.run.app/application/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userData.user_id,
          posting_id: selectedJob.posting_id,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log('Application created successfully');
    } catch (error) {
      console.error('Failed to create application:', error);
    }
  };

  // Fetch job list from the backend API
  async function fetchPostingList() {
    try {
      const apiUrl = 'https://pythonapi-995028621724.us-central1.run.app/posting';
      const response = await fetch(apiUrl, {
        method: 'GET',
        redirect: 'follow',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const payload = await response.json();
      setPostingsList(payload.result as Posting[]);
      setFilteredPostings(payload.result as Posting[]); // Initialize filtered postings
      console.log('Job List:', postingsList);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching job list:', error);
      setError('Failed to fetch job list. Please try again later.');
      setLoading(false);
    }
  }

  // Fetch user details from the backend API
  async function fetchUserDetails() {
    try {
      const response = await fetch(`https://pythonapi-995028621724.us-central1.run.app/user/auth/${userData.auth_uid}`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      setUserData(data.message)
    } catch (error) {
      console.error('Failed to fetch user details:', error)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      await fetchPostingList();
      if (userData.auth_uid) {
        await fetchUserDetails();
      }
    };

    fetchData();
  }, [userData.auth_uid]); // Fetch job list and user details once on component mount

  // Update filtered postings based on search query
  useEffect(() => {
    const filtered = postingsList.filter(
      (job) =>
        ((job.job_name && job.job_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (job.company_name && job.company_name.toLowerCase().includes(searchQuery.toLowerCase()))) &&
        (locationQuery === '' || (job.location && job.location.toLowerCase().includes(locationQuery.toLowerCase())))
    );
    setFilteredPostings(filtered);
  }, [searchQuery, locationQuery, postingsList]);

  // Fetch detailed job data from the API
  const handleCardClick = async (postingId: string) => {
    try {
      const response = await fetch(`https://pythonapi-995028621724.us-central1.run.app/posting/${postingId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setSelectedJob(data['message']); // Set the selected job with fetched data
      console.log('Selected job:', data['message']);
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

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastPosting = currentPage * postingsPerPage;
  const indexOfFirstPosting = indexOfLastPosting - postingsPerPage;
  const currentPostings = filteredPostings.slice(indexOfFirstPosting, indexOfLastPosting);

  const totalPages = Math.ceil(filteredPostings.length / postingsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1).filter(
    (page) => page >= currentPage - 3 && page <= currentPage + 3
  );

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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-gray-800 capitalize">
                Explore <span className="underline decoration-blue-500">job openings</span>
              </h1>
              <p className="mt-1 text-gray-500 text-lg">
                Discover exciting career opportunities across diverse industries.
              </p>
              <Streak streak={userData.current_streak!} />
              {userData.current_streak !== null && (
                <p className="text-black text-xs">Your current streak: {userData.current_streak}</p>
              )}
            </div>
            <div className="w-full max-w-sm min-w-[200px]">
            <div className="relative flex">
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)} // Update search query
                  className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-3 pr-28 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                  placeholder="Search job or company"
                />
                <button
                  className="absolute top-0 right-0 h-full flex items-center justify-center rounded-r-md bg-slate-800 px-4 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  type="button"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-2">
                    <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" />
                  </svg>
                  Search
                </button>
              </div>
            </div>
          </div>


          <div className="divide-y divide-gray-300 h-screen mt-6">
            <Filter onLocationChange={handleLocationFilterChange} />
            <div className="mt-5 flex divide-x divide-gray-300 h-full">
              <div className="w-1/3 p-3">
                <div className="grid grid-cols-1 xl:grid-cols-1 gap-3 mt-3 xl:mt-5 xl:gap-5 overflow-y-auto h-full">
                  {currentPostings.map((post) => (
                    <div key={post.posting_id} onClick={() => handleCardClick(post.posting_id)}>
                      <Card
                        jobName={post.job_name}
                        companyName={post.company_name}
                        companyId={post.company_id}
                        postDate={post.post_date}
                        location={post.location}
                        workPlace={post.remote_allowed}
                      />
                    </div>
                  ))}
                </div>
                <div className="py-4 flex justify-center">
                  {pageNumbers.map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-3 py-1 mx-1 border rounded text-xs ${currentPage === page ? 'bg-blue-500 text-white' : 'bg-white text-blue-500 '}`}
                    >
                      {page}
                    </button>
                    
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
                      applyUrl={'https://www.linkedin.com/jobs/collections/recommended/?currentJobId=' + selectedJob.posting_id}
                      incrementStreak={incrementStreak}
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