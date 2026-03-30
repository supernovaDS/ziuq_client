import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import Home from './pages/Home';
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard';
import QuizFeed from './pages/QuizFeed';
import QuizManager from './pages/QuizManager';
import Results from './pages/Results';
import Layout from './Layout';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const navigate = useNavigate();

  useEffect(() => {
    const handleStorage = () => {
      setToken(localStorage.getItem('token'));
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  useEffect(() => {
    setToken(localStorage.getItem('token'));
  }, [navigate]);

  return (
    <Layout token={token} setToken={setToken}>
      <Routes>
        <Route path="/" element={<Home token={token} />} />
        <Route path="/auth" element={token ? <Navigate to="/dashboard" /> : <Auth setToken={setToken} />} />
        <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/" />} />
        <Route path="/dashboard/manage/:quizId" element={token ? <QuizManager /> : <Navigate to="/" />} />
        <Route path="/quizzes" element={token ? <QuizFeed /> : <Navigate to="/auth" />} />
        <Route path="/results" element={token ? <Results /> : <Navigate to="/auth" />} />
      </Routes>
    </Layout>
  )
}

export default App;