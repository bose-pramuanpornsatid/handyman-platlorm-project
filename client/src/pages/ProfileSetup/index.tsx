import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { auth } from '@/main'; // Ensure correct import for Firebase auth
import { useAuthState } from 'react-firebase-hooks/auth'; // Add this import

import styles from './index.module.css'

interface UserData {
  school_id: string | null;
  company_id: string | null;
  year: number | null;
  user_name: string;
  skills: string;
  current_streak: number | null;
  points: number | null;
  auth_uid: string | null;
}

const ProfileSetup: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Access navigation state
  const { role: passedRole } = location.state || {}; // Extract role from navigation state
  const [user, loadingAuth, errorAuth] = useAuthState(auth); // User authentication state
  const [userData, setUserData] = useState<UserData>({
    school_id: passedRole === 'student' ? '' : null,
    company_id: passedRole === 'recruiter' ? '' : null,
    year: null,
    user_name: '',
    skills: '',
    current_streak: 0,
    points: null,
    auth_uid: '',
  });
  const [error, setError] = useState('');
  
  // Add state for schools
  const [schools, setSchools] = useState<{ school_id: number; school_name: string }[]>([]);
  const [schoolSearch, setSchoolSearch] = useState('');
  
  const [loading, setLoading] = useState(false); // Add loading state

  // Define the fetchSchools function
  const fetchSchools = async () => {
    try {
      const response = await fetch('https://jobkinator-server-995028621724.us-central1.run.app/schools');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setSchools(data.result);
    } catch (error) {
      console.error('Failed to fetch schools:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (passedRole === 'student') {
        await fetchSchools();
      }
    };

    fetchData();
  }, [passedRole]);

  useEffect(() => {
    if (user) {
      setUserData(prevData => ({
        ...prevData,
        auth_uid: user.uid,
      }));
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (loading) {
      return; // Prevent multiple submissions
    }
    
    setLoading(true); // Set loading to true before API call
    
    const payload = {
      school_id: passedRole === 'student' ? (userData.school_id ? parseInt(userData.school_id) : null) : null,
      company_id: passedRole === 'recruiter' ? (userData.company_id ? parseInt(userData.company_id) : null) : null,
      year: userData.year ? parseInt(userData.year) : null,
      user_name: userData.user_name,
      skills: userData.skills,
      auth_uid: userData.auth_uid,
    };
    
    console.log('Payload:', payload)

    try {
      // Use only create API
      const response = await fetch('https://jobkinator-server-995028621724.us-central1.run.app/user/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      navigate('/profile');
    } catch (err) {
      setError('Failed to create user');
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  // Add handler for school selection
  const handleSchoolSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    setUserData(prevData => ({
      ...prevData,
      school_id: selectedId,
    }));
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold text-gray-900">Profile Setup</h2>
          <p className="mt-1 text-sm text-gray-600">
            Please provide your information to complete your profile.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label htmlFor="user_name" className="block text-sm font-medium text-gray-900">
                User Name
              </label>
              <div className="mt-2">
                <input
                  id="user_name"
                  name="user_name"
                  type="text"
                  value={userData.user_name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                />
              </div>
            </div>

            { (passedRole === 'student') && (
              <>
                <div className="sm:col-span-6">
                  <label htmlFor="school_name" className="block text-sm font-medium text-gray-900">
                    School Name
                  </label>
                  <div className="mt-2">
                    <input
                      id="school_search"
                      name="school_search"
                      type="text"
                      value={schoolSearch}
                      onChange={(e) => setSchoolSearch(e.target.value)}
                      placeholder="Search for your school"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                    />
                    <select
                      id="school_name"
                      name="school_name"
                      value={userData.school_id}
                      onChange={handleSchoolSelect}
                      className="mt-2 block w-full rounded-md bg-white border border-gray-300 py-2 px-3 text-base text-gray-900 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                      required
                    >
                      <option value="">Select your school</option>
                      {schools
                        .filter(school => school.school_name.toLowerCase().includes(schoolSearch.toLowerCase()))
                        .slice(0, 6) // Limit to top 6 matches
                        .map(school => (
                          <option key={school.school_id} value={school.school_id}>
                            {school.school_name}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="year" className="block text-sm font-medium text-gray-900">
                    Year
                  </label>
                  <div className="mt-2">
                    <input
                      id="year"
                      name="year"
                      type="number"
                      value={userData.year}
                      onChange={handleChange}
                      placeholder="Year"
                      required
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                    />
                  </div>
                </div>
              </>
            )}

            { (passedRole === 'recruiter') && (
              <div className="sm:col-span-6">
                <label htmlFor="company_id" className="block text-sm font-medium text-gray-900">
                  Company ID
                </label>
                <div className="mt-2">
                  <input
                    id="company_id"
                    name="company_id"
                    type="text"
                    value={userData.company_id || ''}
                    onChange={handleChange}
                    placeholder="Company ID"
                    required
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                  />
                </div>
              </div>
            )}

            <div className="sm:col-span-6">
              <label htmlFor="skills" className="block text-sm font-medium text-gray-900">
                Skills
              </label>
              <div className="mt-2">
                <input
                  id="skills"
                  name="skills"
                  type="text"
                  value={userData.skills}
                  onChange={handleChange}
                  placeholder="Your Skills"
                  required
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button type="button" className="text-sm font-semibold text-gray-900">
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading} // Disable button when loading
            className={`rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-indigo-600 ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Saving...' : 'Save'}
          </button>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}
      </form>
    </div>
  );
};

export default ProfileSetup;