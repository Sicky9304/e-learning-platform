// React Router
import { Navigate, useLocation } from 'react-router-dom';

// Auth Context
import { useAuth } from '../context/AuthContext';

const ProtectedCourseRoute = ({ children }) => {
  // Get Current User
  const { user } = useAuth();
  // console.log('Protected Route User:', user);

  // Get Current Route
  const location = useLocation();

  // Redirect To Login If User Is Not Logged In
  if (!user) {
    return (
      <Navigate
        to={`/login?redirect=${location.pathname}`}
        replace
      />
    );
  }

  // Show Protected Content
  return children;
};

export default ProtectedCourseRoute;
