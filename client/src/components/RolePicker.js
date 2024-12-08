
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { CheckIcon } from "@heroicons/react/20/solid";


function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const RolePicker = ({ handleRoleSelect, updating }) => (
  <div className="mx-auto mt-16 py-4 grid max-w-lg grid-cols-1 items-center gap-10 gap-y-6 sm:mt-20 sm:gap-y-0 lg:max-w-4xl lg:grid-cols-2">
    {[
      {
        id: "handyman",
        name: "Handyman",
        description:
          "Offer your skills and expertise to those in need of help with their projects.",
        features: [
          "Create a professional profile",
          "Set your rates and availability",
          "Gain customer reviews and ratings",
          "Easy-to-use booking system",
        ],
        action: () => handleRoleSelect("handyman"),
      },
      {
        id: "requester",
        name: "Requester",
        description:
          "Easily find skilled handymen for any of your repair or project needs.",
        features: [
          "Browse skilled professionals",
          "Read handyman reviews",
          "Simple booking process",
          "Transparent pricing options",
        ],
        action: () => handleRoleSelect("requester"),
      },
      {
        id: "student",
        name: "Student",
        description: "Find job opportunities and internships.",
        action: () => handleRoleSelect("student"),
      },
      {
        id: "recruiter",
        name: "Recruiter",
        description: "Post job listings and find talent.",
        action: () => handleRoleSelect("recruiter"),
      },
    ].map((role, idx) => (
      <div
        key={role.id}
        className={classNames(
          "rounded-3xl p-8 ring-1 ring-gray-900/10 sm:p-10",
          idx === 0 ? "bg-indigo-100" : "bg-white/60 sm:mx-8 lg:mx-0"
        )}
      >
        <h3 className="text-indigo-600 text-base/7 font-semibold">
          {role.name}
        </h3>
        <p className="mt-4 text-gray-900 text-lg font-medium">
          {role.description}
        </p>
        <ul
          role="list"
          className="mt-8 space-y-3 text-gray-600 text-sm/6 sm:mt-10"
        >
          {role.features && role.features.map((feature) => (
            <li key={feature} className="flex gap-x-3">
              <CheckIcon
                aria-hidden="true"
                className="text-indigo-600 h-6 w-5 flex-none"
              />
              {feature}
            </li>
          ))}
        </ul>
        <button
          onClick={role.action}
          disabled={updating}
          className={classNames(
            "mt-8 block rounded-md px-3.5 py-2.5 text-center text-sm font-semibold",
            role.id === "handyman"
              ? "bg-indigo-500 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline-indigo-500"
              : "text-indigo-600 ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300 focus-visible:outline-indigo-600",
            "focus:outline-none focus:ring-2 focus:ring-offset-2",
            updating && "opacity-50 cursor-not-allowed"
          )}
        >
          {updating ? "Updating..." : `Sign up as a ${role.name}`}
        </button>
      </div>
    ))}
  </div>
);

RolePicker.propTypes = {
  handleRoleSelect: PropTypes.func.isRequired,
  updating: PropTypes.bool.isRequired,
};

const ProfileDisplay = ({ user, onEdit }) => (
  <div className="mx-auto mt-16 max-w-4xl hidden3">
    <div className="bg-white shadow overflow-hidden sm:rounded-lg p-8">
      <h1 className="text-4xl text-indigo-600 font-bold mb-6">
        Your Profile {user.is_handyman === 1 ? ": Handyman" : ": Requester"}
      </h1>

      {/* Profile Image Display */}
      <div className="mb-6 flex justify-center">
        <img
          src={
            user.profile_image
              ? user.profile_image
              : "/media/default_images/default_profile.png"
          }
          alt="Profile"
          className="w-32 h-32 rounded-full mx-auto"
        />
      </div>

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
        {user.is_handyman === 1 && (
          <>
            <div>
              <h3 className="text-sm font-medium text-gray-700">Specialty</h3>
              <p className="mt-1 text-sm text-gray-900">{user.specialty}</p>
            </div>
            <div className="sm:col-span-2">
              <h3 className="text-sm font-medium text-gray-700">Details</h3>
              <p className="mt-1 text-sm text-gray-900">{user.details}</p>
            </div>
          </>
        )}
      </div>
      <button
        onClick={onEdit}
        className="mt-6 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Edit Profile
      </button>
    </div>
  </div>
);

ProfileDisplay.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    specialty: PropTypes.string,
    details: PropTypes.string,
    is_handyman: PropTypes.number.isRequired,
    profile_image: PropTypes.string,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
};

const ProfileEditor = ({
  user,
  handleChange,
  handleProfileSubmit,
  handleCancel,
  handleImageChange,
  updating,
  error,
}) => (
  <div className="mx-auto mt-16 max-w-4xl">
    <form
      onSubmit={handleProfileSubmit}
      className="bg-white shadow overflow-hidden sm:rounded-lg p-8 space-y-8"
    >
      <h1 className="text-4xl text-indigo-600 font-bold mb-6">
        Edit Your Profile
      </h1>
      <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            Username
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="username"
              id="username"
              value={user.username}
              disabled
              className="block w-full border-2 rounded-md border-gray-300 shadow-sm bg-gray-100 cursor-not-allowed px-2 py-1.5 bg-gray-50 text-gray-900"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 bg-white"
          >
            Email
          </label>
          <div className="mt-1">
            <input
              type="email"
              name="email"
              id="email"
              value={user.email}
              onChange={handleChange}
              required
              className="block w-full border-2  rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-2 py-1.5 bg-gray-50 text-gray-900"
            />
          </div>
        </div>

        {/* Profile Image Upload Field */}
        <div>
          <label
            htmlFor="profile_image"
            className="block text-sm font-medium text-gray-700"
          >
            Profile Image
          </label>
          <div className="mt-1">
            <input
              type="file"
              name="profile_image"
              id="profile_image"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="first_name"
            className="block text-sm font-medium text-gray-700"
          >
            First Name
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="first_name"
              id="first_name"
              value={user.first_name}
              onChange={handleChange}
              className="block w-full border-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-2 py-1.5 bg-gray-50 text-gray-900"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="last_name"
            className="block text-sm font-medium text-gray-700"
          >
            Last Name
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="last_name"
              id="last_name"
              value={user.last_name}
              onChange={handleChange}
              className="block w-full border-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-2 py-1.5  bg-gray-50 text-gray-900"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700"
          >
            Location
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="location"
              id="location"
              value={user.location}
              onChange={handleChange}
              className="block w-full border-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-2 py-1.5 bg-gray-50 text-gray-900 "
            />
          </div>
        </div>

        {user.is_handyman === 1 && (
          <>
            <div>
              <label
                htmlFor="specialty"
                className="block text-sm font-medium text-gray-700"
              >
                Specialty
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="specialty"
                  id="specialty"
                  value={user.specialty}
                  onChange={handleChange}
                  className="block w-full  border-2 bg-gray-50 text-gray-900 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-2 py-1.5"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="details"
                className="block text-sm font-medium text-gray-700"
              >
                Details
              </label>
              <div className="mt-1">
                <textarea
                  type="text"
                  name="details"
                  id="details"
                  value={user.details}
                  onChange={handleChange}
                  className="block w-full  border-2 bg-gray-50 text-gray-900 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-2 py-1.5 bg-white"
                  rows="4"
                />
              </div>
            </div>
          </>
        )}
      </div>

      {error && <div className="text-red-500 text-sm">{error}</div>}

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={handleCancel}
          className="inline-flex justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={updating}
          className={classNames(
            "inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",
            updating && "opacity-50 cursor-not-allowed"
          )}
        >
          {updating ? "Updating..." : "Update Profile"}
        </button>
      </div>
    </form>
  </div>
);

ProfileEditor.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    specialty: PropTypes.string,
    details: PropTypes.string,
    is_handyman: PropTypes.number.isRequired,
    profile_image: PropTypes.string,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleProfileSubmit: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  handleImageChange: PropTypes.func.isRequired,
  updating: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

const Profile = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    location: "",
    is_handyman: -1, // -1 indicates role not selected
    details: "",
    specialty: ""
  });
  const [profileImageFile, setProfileImageFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updating, setUpdating] = useState(false);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/profile/", {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        });
        // console.log(response.data);
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch user data");
        setLoading(false);
      }
    };



    fetchUser();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show3');
        } else {
          entry.target.classList.remove('show3');
        }
      });
    });

    const hiddenElements = document.querySelectorAll('.hidden3'); 
    hiddenElements.forEach((el) => observer.observe(el));

  
    return () => observer.disconnect();
  }, [user,loading, editMode]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show4');
        } else {
          entry.target.classList.remove('show4');
        }
      });
    });

    const hiddenElements = document.querySelectorAll('.hidden4'); 
    hiddenElements.forEach((el) => observer.observe(el));

  
    return () => observer.disconnect();
  }, [user,loading]);

  const handleRoleSelect = async (role) => {
    setUpdating(true);
    try {
      const updatedUser = {
        ...user,
        is_handyman: role === "handyman" ? 1 : 0,
      };
      await axios.put("http://127.0.0.1:8000/api/profile/", updatedUser, {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      });
      setUser(updatedUser);
      setUpdating(false);
    } catch (error) {
      setError("Failed to update role");
      setUpdating(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setProfileImageFile(e.target.files[0]);
  };


  
  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      const formData = new FormData();

      // Only add fields to FormData if they have a non-empty value
      if (user.email) {
        formData.append('email', user.email);
      }
      if (user.first_name) {
        formData.append('first_name', user.first_name);
      }
      if (user.last_name) {
        formData.append('last_name', user.last_name);
      }
      if (user.location) {
        formData.append('location', user.location);
      }
      if (user.specialty) {
        formData.append('specialty', user.specialty);
      }
      if (user.details) {
        formData.append('details', user.details);
      }
      if (profileImageFile) {
        formData.append('profile_image', profileImageFile);
      }

      await axios.put("http://127.0.0.1:8000/api/profile/", formData, {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Profile updated successfully");
      setEditMode(false);
      window.location.reload();
    } catch (error) {
      setError("Failed to update profile");
    } finally {
      setUpdating(false);
    }
  };


  const handleEditToggle = () => {
    setEditMode(true);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setError("");
    console.log("Edit mode:", editMode);  // Verify if this updates correctly
  };

  if (loading) {
    return (
      <div className="relative isolate bg-white px-6 py-24 sm:py-32 lg:px-8 min-h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg">Loading...</p>
      </div>
    );
  }

  if (error && !editMode) {
    return (
      <div className="relative isolate bg-white px-6 py-24 sm:py-32 lg:px-8 min-h-screen flex items-center justify-center">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }



  return (
    <div className="relative isolate bg-white px-6 py-24 sm:py-32 lg:px-8 min-h-screen hidden3">
      {/* Background Gradient */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 blur-3xl"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="mx-auto aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 hidden4 "
        />
      </div>

      {/* Header */}
      <div className="mx-auto max-w-4xl text-center  hidden3  "  style={{ backgroundColor: 'transparent' }}>
        <h2 className="text-base/7 font-semibold  text-indigo-600">
          {user.is_handyman === -1 ? "Choose Your Role" : "Your Profile"}
        </h2>
        <p className="mt-2 text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-6xl">
          {user.is_handyman === -1
            ? "Select your role on the platform"
            : editMode
            ? "Edit Your Profile"
            : "Manage Your Profile"}
        </p>
      </div>
      <p className="mx-auto mt-6 max-w-2xl text-pretty text-center text-lg font-medium text-gray-600 sm:text-xl/8 hidden3"  style={{ backgroundColor: 'transparent' }}>
        {user.is_handyman === -1
          ? "Whether you’re looking to hire a skilled handyman or offer your services, we provide the best tools to support you."
          : editMode
          ? "Update your personal information and manage your account details."
          : "View and manage your profile information."}
      </p>

      {/* Conditional Rendering Based on Role and Edit Mode */}
      {user.is_handyman === -1 ? (
        <RolePicker handleRoleSelect={handleRoleSelect} updating={updating} />
      ) : editMode ? (
        <ProfileEditor
          user={user}
          handleChange={handleChange}
          handleProfileSubmit={handleProfileSubmit}
          handleCancel={handleCancelEdit}
          handleImageChange={handleImageChange}
          updating={updating}
          error={error}
        />
      ) : (
        <ProfileDisplay user={user} onEdit={handleEditToggle} />
      )}
    </div>
  );
};

export default Profile;