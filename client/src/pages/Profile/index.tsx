import React, { memo, useState, useEffect } from 'react'

import styles from './index.module.css'

// Mock data for user
const user = {
  username: 'johndoe',
  email: 'johndoe@example.com',
  first_name: 'John',
  last_name: 'Doe',
  location: 'New York',
}

// Mock function for onEdit
const onEdit = () => {
  console.log('Edit button clicked')
}

const Profile: React.FC = memo(() => (
  <div className={styles.container}>
    <div className="mx-auto mt-16 max-w-4xl hidden3">
      <div className="bg-white shadow overflow-hidden sm:rounded-lg p-8">
        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
          <div>
            <h3 className="text-sm font-medium text-gray-700">Username</h3>
            <p className="mt-1 text-sm text-gray-900">{user.username}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-700">Email</h3>
            <p className="mt-1 text-sm text-gray-900">{user.email}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-700">First Name</h3>
            <p className="mt-1 text-sm text-gray-900">{user.first_name}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-700">Last Name</h3>
            <p className="mt-1 text-sm text-gray-900">{user.last_name}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-700">Location</h3>
            <p className="mt-1 text-sm text-gray-900">{user.location}</p>
          </div>
        </div>
        <button
          onClick={onEdit}
          className="mt-6 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Edit Profile
        </button>
      </div>
    </div>
  </div>
))
Profile.displayName = 'Profile'

export default Profile
