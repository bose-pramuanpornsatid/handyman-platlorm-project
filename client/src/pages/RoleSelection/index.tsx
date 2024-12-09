import React, { memo } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

import styles from './index.module.css'
import { CheckIcon } from "@heroicons/react/20/solid";

const tiers = [
  {
    name: 'Student / Applicant',
    id: 'tier-student',
    href: '#',
    description: "Kickstart your career with our job board that connects students to internships, part-time, and full-time opportunities, making job hunting simple and effective.",
    features: ['Personalized job recommendations', 'Extensive internship listings', 'Track your applications easily with Streak'],
    featured: false,
  },
  {
    name: 'Recruiter',
    id: 'tier-recruiter',
    href: '#',
    description: 'Efficiently find and connect with qualified candidates through our streamlined job posting and hiring tools.',
    features: [
      'Manage and edit job posts effortlessly'
    ],
    featured: false,
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
// const [updating, setUpdating] = useState(false);

const RoleSelection: React.FC = memo(() => {
  const navigate = useNavigate();
  const location = useLocation();
  const auth_uid = location.state?.auth_uid;

  const handleSelectRole = (role: string) => {
    navigate('/profile-setup', { state: { role, auth_uid } });
  };

  return (
    <div className={styles.container}>
      <div className="relative isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div aria-hidden="true" className="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 blur-3xl">
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="mx-auto aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
          />
        </div>
        <div className="mx-auto max-w-4xl text-center">
          <p className="mt-2 text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-6xl">
            Choose the right role
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-pretty text-center text-lg font-medium text-gray-600 sm:text-xl/8">
          {/*  */}
        </p>
        <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 items-stretch gap-y-6 sm:mt-20 sm:gap-y-0 lg:max-w-4xl lg:grid-cols-2">
          {tiers.map((tier, tierIdx) => (
            <div
              key={tier.id}
              className={classNames(
                tier.featured ? 'relative bg-gray-900 shadow-2xl' : 'bg-white/60 sm:mx-8 lg:mx-0',
                tier.featured
                  ? ''
                  : tierIdx === 0
                    ? 'rounded-t-3xl sm:rounded-b-none lg:rounded-bl-3xl lg:rounded-tr-none'
                    : 'sm:rounded-t-none lg:rounded-bl-none lg:rounded-tr-3xl',
                'rounded-3xl p-8 ring-1 ring-gray-900/10 sm:p-10 flex flex-col'
              )}
            >
              <div className="flex-grow">
                <h3
                  id={tier.id}
                  className={classNames(tier.featured ? 'text-indigo-400' : 'text-indigo-600', 'text-base/7 font-semibold')}
                >
                  {tier.name}
                </h3>

                <p className={classNames(tier.featured ? 'text-gray-300' : 'text-gray-600', 'mt-6 text-base/7')}>
                  {tier.description}
                </p>
                <ul
                  role="list"
                  className={classNames(
                    tier.featured ? 'text-gray-300' : 'text-gray-600',
                    'mt-8 space-y-3 text-sm/6 sm:mt-10',
                  )}
                >
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <CheckIcon
                        aria-hidden="true"
                        className={classNames(tier.featured ? 'text-indigo-400' : 'text-indigo-600', 'h-6 w-5 flex-none')}
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <button
                onClick={() => handleSelectRole(tier.name.toLowerCase().includes('recruiter') ? 'recruiter' : 'student')}
                className={classNames(
                  tier.featured
                    ? 'bg-indigo-500 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline-indigo-500'
                    : 'text-indigo-600 ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300 focus-visible:outline-indigo-600',
                  'mt-8 block rounded-md px-3.5 py-2.5 text-center text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 sm:mt-10 cursor-pointer'
                )}
              >
                Get started today
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
})
RoleSelection.displayName = 'RoleSelection'

export default RoleSelection