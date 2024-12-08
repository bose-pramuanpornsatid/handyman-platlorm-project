import { createBrowserRouter, Navigate } from 'react-router-dom'

import Layout from './components/Layout/Layout'
import Index from './pages/Index'
import Notfound from './pages/Notfound'
import Quiz from './pages/Quiz'
import Login from './pages/Login'
import Jobboard from './pages/Jobboard'
import SignUp from './pages/SignUp'
import Profile from './pages/Profile'
import RoleSelection from './pages/RoleSelection'
import ProfileSetup from './pages/ProfileSetup'

const ProtectedRoute = ({ element }) => {
  const auth_uid = localStorage.getItem('auth_uid');
  return auth_uid ? element : <Navigate to="/login" />;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />, // Render the Layout as the parent for all routes
    children: [
      {
        index: true, // Default route ("/")
        element: <Index />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'signup', 
        element: <SignUp />,
      },
      {
        path: 'quiz', 
        element: <ProtectedRoute element={<Quiz />} />,
      },
      {
        path: 'jobboard', 
        element: <ProtectedRoute element={<Jobboard />} />,
      },
      {
        path: 'profile', 
        element: <ProtectedRoute element={<Profile />} />,
      },
      {
        path: 'role-selection',
        element: <ProtectedRoute element={<RoleSelection />} />,
      },
      {
        path: 'profile-setup',
        element: <ProtectedRoute element={<ProfileSetup />} />,
      }
    ],
  },
  {
    path: '*',
    element: <Notfound />, // Render a 404 Notfound page for unmatched routes
  },
]);

export default router
