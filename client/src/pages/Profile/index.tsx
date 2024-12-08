import React, { memo, useState, useEffect } from 'react'
import { auth } from '@/main';
import Streak from '@/components/Streak';
import Card from '../../pages/Jobboard/Card';
import Leaderboard from '@/components/Leaderboard';
import { useLocation, useNavigate } from 'react-router-dom';

import styles from './index.module.css'

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
  email: string | null;
}

interface Application {
  posting_id: number;
  user_id: number;
  application_date: string;
  status: string;
}

interface Posting {
  job_name: string;
  job_description: string;
  med_salary: number | null;
  sponsor: string | null;
  remote_allowed: string | null;
  location: string | null;
  post_date: string;
  ng_or_internship: string | null;
  company_name: string | null;
}

interface ApplicationWithPosting {
  application_data: Application;
  posting_data: Posting;
}

const Profile: React.FC = memo(() => {
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
    email: null,
  });

  const [applicationsWithPostings, setApplicationsWithPostings] = useState<ApplicationWithPosting[]>([]);

  async function fetchUserDetails() {
    try {
      auth.onAuthStateChanged(async (user) => {
        if (!user) {
          console.error('No authenticated user found');
          return;
        }

        await user.reload(); // Ensure the user data is up-to-date
        const email = user.email || '';
        console.log('Email:', email);

        const response = await fetch(`https://pythonapi-995028621724.us-central1.run.app/user/auth/${userData.auth_uid}`)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        setUserData({ ...data.message, email });
        console.log('User details:', data.message)
      });
    } catch (error) {
      console.error('Failed to fetch user details:', error)
    }
  }

  async function fetchApplicationList() {
    try {
      const apiUrl = `https://pythonapi-995028621724.us-central1.run.app/user/${userData.user_id}/applications`;
      const response = await fetch(apiUrl, {
        method: 'GET',
        redirect: 'follow',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const payload = await response.json();
      setApplicationsWithPostings(payload.result);
      console.log('Payload:', payload);
    } catch (error) {
      console.error('Error fetching job list:', error);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      if (userData.auth_uid) {
        await fetchUserDetails();
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    fetchApplicationList()
  }, [userData]);

  // Mock function for onEdit
  const onEdit = () => {
    const navigate = useNavigate();
    navigate('/profile-setup');
  }
  return (
    <div className={styles.container}>
      <h1 className='text-gray-900 text-xl5 font-black'>Hi {userData.user_name}, Welcome Back!</h1>
      <div className="mx-auto mt-16 max-w-full w-10/12">
        <div className="flex flex-row gap-8">
          {/* Left Section: Profile Information and Edit */}
          <div className="flex-1 bg-white shadow overflow-visible p-10">
            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
              <div>
                <h3 className="text-sm font-medium text-gray-700">Username</h3>
                <p className="mt-1 text-sm text-gray-900 break-words">{userData.user_name}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-700">Email</h3>
                <p className="mt-1 text-sm text-gray-900 break-words">{userData.email}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-700">First Name</h3>
                <p className="mt-1 text-sm text-gray-900 break-words">{userData.first_name}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-700">Last Name</h3>
                <p className="mt-1 text-sm text-gray-900 break-words">{userData.last_name}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-700">Location</h3>
                <p className="mt-1 text-sm text-gray-900 break-words">{userData.skills}</p>
              </div>
            </div>
            <button
              onClick={onEdit}
              className="mt-6 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Edit Profile
            </button>
          </div>
          {/* Right Section: Streak */}
          <div className="flex-1 bg-white shadow overflow-visible p-10">
            <Streak streak={userData.current_streak!} />
            <div className="text-black text-base">Score:{userData.points}</div>
          </div>
        </div>
        <div className="flex divide-x divide-white h-full">
          <div className="w-1/2 p-3">
            {/* Title Section */}
            <div className="flex items-center mb-4 text-gray-900">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                <path fill-rule="evenodd" d="M4.125 3C3.089 3 2.25 3.84 2.25 4.875V18a3 3 0 0 0 3 3h15a3 3 0 0 1-3-3V4.875C17.25 3.839 16.41 3 15.375 3H4.125ZM12 9.75a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5H12Zm-.75-2.25a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5H12a.75.75 0 0 1-.75-.75ZM6 12.75a.75.75 0 0 0 0 1.5h7.5a.75.75 0 0 0 0-1.5H6Zm-.75 3.75a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5H6a.75.75 0 0 1-.75-.75ZM6 6.75a.75.75 0 0 0-.75.75v3c0 .414.336.75.75.75h3a.75.75 0 0 0 .75-.75v-3A.75.75 0 0 0 9 6.75H6Z" clip-rule="evenodd" />
                <path d="M18.75 6.75h1.875c.621 0 1.125.504 1.125 1.125V18a1.5 1.5 0 0 1-3 0V6.75Z" />
              </svg>
              <h1 className='text-lg font-bold text-left'>Current Applications</h1>
            </div>
            <div className="grid grid-cols-1 mt-3 gap-3 overflow-y-auto">
              {applicationsWithPostings.map(({ application_data, posting_data }) => (
                <div key={application_data.posting_id}>
                  <Card
                    jobName={posting_data.job_name}
                    companyName={posting_data.company_name?.toString() || ''}
                    postDate={posting_data.post_date}
                    location={posting_data.location}
                    workPlace={posting_data.remote_allowed}
                    applicationStatus={application_data.status}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="w-1/2 p-3">
            <Leaderboard/>
          </div>
        </div>
      </div>
      <div>
      </div>
    </div>
  );
});

Profile.displayName = 'Profile'

export default Profile