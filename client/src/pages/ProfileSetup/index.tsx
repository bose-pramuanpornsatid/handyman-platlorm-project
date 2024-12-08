import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import styles from './index.module.css'

const ProfileSetup: React.FC = () => {
  const navigate = useNavigate();
  const auth_uid = localStorage.getItem('auth_uid');
  const [userData, setUserData] = useState({
    user_name: '',
    skills: '',
    year: '',
    school_id: role === 'student' ? '' : null,
    company_id: role === 'recruiter' ? '' : null,
    auth_uid: auth_uid,
  });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...userData,
      school_id: userData.school_id ? parseInt(userData.school_id) : null,
      company_id: userData.company_id ? parseInt(userData.company_id) : null,
      year: parseInt(userData.year),
    };

    try {
      console.log('Payload:', payload);
      const response = await fetch('https://pythonapi-995028621724.us-central1.run.app/user/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log('User created successfully');
      navigate('/profile');
    } catch (err) {
      setError('Failed to create user');
    }
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

            {role === 'student' && (
              <>
                <div className="sm:col-span-3">
                  <label htmlFor="school_id" className="block text-sm font-medium text-gray-900">
                    School ID
                  </label>
                  <div className="mt-2">
                    <input
                      id="school_id"
                      name="school_id"
                      type="text"
                      value={userData.school_id || ''}
                      onChange={handleChange}
                      placeholder="School ID"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                    />
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

            {role === 'recruiter' && (
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
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-indigo-600"
          >
            Save
          </button>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}
      </form>
    </div>
  );
};

export default ProfileSetup;