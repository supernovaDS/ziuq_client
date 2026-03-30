import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import API from './api';

import Home from './pages/Home';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import QuizFeed from './pages/QuizFeed';
import QuizManager from './pages/QuizManager';
import Results from './pages/Results';
import Layout from './Layout';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check auth on app load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await API.get('/auth/me', { withCredentials: true});
        setUser(data);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) return null;

  return (
    <Layout user={user} setUser={setUser}>
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/auth" element={user ? <Navigate to="/dashboard" /> : <Auth setUser={setUser} />} />
        <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/auth" />} />
        <Route path="/dashboard/manage/:quizId" element={user ? <QuizManager /> : <Navigate to="/auth" />} />
        <Route path="/quizzes" element={user ? <QuizFeed /> : <Navigate to="/auth" />} />
        <Route path="/results" element={user ? <Results /> : <Navigate to="/auth" />} />
      </Routes>
    </Layout>
  );
}

export default App;