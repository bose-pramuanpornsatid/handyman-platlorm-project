import { createBrowserRouter } from 'react-router-dom'

import Layout from './components/Layout/Layout'
import Index from './pages/Index'
import Notfound from './pages/Notfound'
import Quiz from './pages/Quiz'
import Login from './pages/Login'
import Jobboard from './pages/Jobboard'
import SignUp from './pages/SignUp'

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
        element: <Quiz />,
      },
      {
        path: 'jobboard', 
        element: <Jobboard />,
      },
      {
        path: 'profile', 
        element: <Quiz />,
      },
    ],
  },
  {
    path: '*',
    element: <Notfound />, // Render a 404 Notfound page for unmatched routes
  },
]);

export default router
