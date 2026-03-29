import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import Home from './pages/Home';
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard';
import QuizFeed from './pages/QuizFeed';
import QuizManager from './pages/QuizManager';
import Results from './pages/Results';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  // Using a state function to get the initial token
  const [token, setToken] = useState(localStorage.getItem('token'));
  const navigate = useNavigate();

  // Listen to storage events just in case
  useEffect(() => {
    const handleStorage = () => {
      setToken(localStorage.getItem('token'));
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  // Update token when location changes just to be safe
  useEffect(() => {
    setToken(localStorage.getItem('token'));
  }, [navigate]);

  return (
    <>
      <Navbar token={token} setToken={setToken} />
      <div className="pt-20 min-h-screen flex flex-col relative z-10 oracle-grid">
        <div className="flex-1">
          <Routes>
              <Route path="/" element={<Home token={token} />} />
              <Route path="/auth" element={token ? <Navigate to="/dashboard" /> : <Auth setToken={setToken} />} />
              <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/" />} />
              <Route path="/dashboard/manage/:quizId" element={token ? <QuizManager /> : <Navigate to="/" />} />
              <Route path="/quizzes" element={token ? <QuizFeed /> : <Navigate to="/auth" />} />
              <Route path="/results" element={token ? <Results /> : <Navigate to="/auth" />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default App
