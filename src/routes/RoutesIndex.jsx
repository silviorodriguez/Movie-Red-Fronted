import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { Home, Dashboard, Login, Secret, Signup, MovieDetail, MovieUpdate } from '@/pages';



const RoutesIndex = () => {
  const { isAuth } = useAuthContext();
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route 
        path="/dashboard" 
        element={
          isAuth ? <Dashboard /> : <Navigate to="/login" replace />
        } 
      />
      <Route path="/login" element={<Login />} />
      <Route path="/secret" element={<Secret />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/movies/:id" element={<MovieDetail />} />
      <Route path="/update/:id" element={<MovieUpdate />} />
    </Routes>
  );
};

export default RoutesIndex;