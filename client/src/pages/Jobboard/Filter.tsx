import React, { memo, useState } from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

interface FilterProps {
  onLocationChange: (query: string) => void; // Callback function to pass location filter updates
  onWorkTypeChange: (selectedWorkTypes: string[]) => void; // Callback for work type filter updates
}

const Filter: React.FC<FilterProps> = memo(({ onLocationChange, onWorkTypeChange }) => {
  const [selectedExperience, setSelectedExperience] = useState<string[]>([]);
  const [selectedWorkType, setSelectedWorkType] = useState<string[]>([]);
  const [locationQuery, setLocationQuery] = useState<string>(''); // State for search query
  const [locations, setLocations] = useState<string[]>(['New York', 'San Francisco', 'Los Angeles', 'Chicago', 'Seattle']); // Static location list

  const experienceOptions = ['Internship', 'Full-time', 'Part-time'];
  const workTypeOptions = ['On-site', 'Remote'];

  // Function to handle selections for checkboxes
  const handleSelection = (
    selectedList: string[],
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    option: string
  ) => {
    setter((prev) =>
      prev.includes(option) ? prev.filter((item) => item !== option) : [...prev, option]
    );
  };

  const filteredLocations = locations.filter((loc) =>
    loc.toLowerCase().includes(locationQuery.toLowerCase())
  );

  const handleLocationSelect = (location: string) => {
    setLocationQuery(location);
    onLocationChange(location);
  };

  // Function to clear selections
  const handleClearSelection = (
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    clearCallback?: () => void
  ) => {
    setter([]);
    if (clearCallback) {
      clearCallback();
    }
  };

  // Function to apply work type filter
  const applyWorkTypeFilter = () => {
    onWorkTypeChange(selectedWorkType);
  };

  return (
    <div className="flex space-x-4">
      {/* Experience Level Menu */}
      <Menu as="div" className="relative inline-block text-left">
        {({ open }) => (
          <>
            <div>
              <MenuButton
                className="inline-flex w-full justify-center gap-x-1.5 rounded-2xl bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                Experience level
                <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
              </MenuButton>
            </div>

            {open && (
              <MenuItems
                transition
                className="absolute z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none"
              >
                <div className="py-1">
                  {experienceOptions.map((option) => (
                    <MenuItem key={option} as="div">
                      <div
                        className="flex items-center px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100 hover:text-gray-900"
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent menu from closing
                          handleSelection(selectedExperience, setSelectedExperience, option);
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={selectedExperience.includes(option)}
                          onChange={() =>
                            handleSelection(selectedExperience, setSelectedExperience, option)
                          }
                          className="mr-2 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        {option}
                      </div>
                    </MenuItem>
                  ))}
                </div>
                <div className="flex justify-between p-2">
                  <button
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                    onClick={() => handleClearSelection(setSelectedExperience)}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
                  >
                    Show Results
                  </button>
                </div>
              </MenuItems>
            )}
          </>
        )}
      </Menu>

      {/* Work Type Menu */}
      <Menu as="div" className="relative inline-block text-left">
        {({ open }) => (
          <>
            <div>
              <MenuButton
                className="inline-flex w-full justify-center gap-x-1.5 rounded-2xl bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                Work type
                <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
              </MenuButton>
            </div>

            {open && (
              <MenuItems
                transition
                className="absolute z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none"
              >
                <div className="py-1">
                  {workTypeOptions.map((option) => (
                    <MenuItem key={option} as="div">
                      <div
                        className="flex items-center px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100 hover:text-gray-900"
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent menu from closing
                          handleSelection(selectedWorkType, setSelectedWorkType, option);
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={selectedWorkType.includes(option)}
                          onChange={() =>
                            handleSelection(selectedWorkType, setSelectedWorkType, option)
                          }
                          className="mr-2 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        {option}
                      </div>
                    </MenuItem>
                  ))}
                </div>
                <div className="flex justify-between p-2">
                  <button
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                    onClick={() => {
                      handleClearSelection(setSelectedWorkType);
                      onWorkTypeChange([]); // Notify parent to clear work type filter
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
                    onClick={applyWorkTypeFilter}
                  >
                    Show Results
                  </button>
                </div>
              </MenuItems>
            )}
          </>
        )}
      </Menu>

      {/* Location Menu */}
      <Menu as="div" className="relative inline-block text-left">
        {({ open }) => (
          <>
            <div>
              <MenuButton
                className="inline-flex w-full justify-center gap-x-1.5 rounded-2xl bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                Location
                <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
              </MenuButton>
            </div>

            {open && (
              <MenuItems
                transition
                className="absolute z-10 mt-2 w-64 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none"
              >
                <div className="p-4">
                  <input
                    type="text"
                    placeholder="Search location"
                    value={locationQuery}
                    onChange={(e) => {
                      setLocationQuery(e.target.value);
                      onLocationChange(e.target.value);
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm text-gray-900"
                  />
                </div>
                <div className="py-1">
                  {filteredLocations.map((location) => (
                    <MenuItem key={location} as="div">
                      <div
                        className="flex items-center px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100 hover:text-gray-900"
                        onClick={() => handleLocationSelect(location)}
                      >
                        {location}
                      </div>
                    </MenuItem>
                  ))}
                </div>
                <div className="flex justify-between p-2">
                  <button
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                    onClick={() => setLocationQuery('')}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
                  >
                    Show Results
                  </button>
                </div>
              </MenuItems>
            )}
          </>
        )}
      </Menu>
    </div>
  );
});
Filter.displayName = 'Filter';

export default Filter;
