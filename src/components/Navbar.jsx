import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import API from '../api';

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setLoading(true);
      await API.post('/auth/logout', {}, { withCredentials: true });
      toast.success("Logged out successfully");
      setUser(null);
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  const activeClass =
    "text-white relative after:content-[''] after:absolute after:-bottom-5 after:left-0 after:w-full after:h-[2px] after:bg-[#2563eb]";
  const inactiveClass =
    "text-[#888] hover:text-white transition-all duration-300";

  return (
    <nav className="fixed w-full z-50 bg-black/90 backdrop-blur-md border-b border-white/5">
      <div className="relative flex justify-between items-center px-6 md:px-12 h-16 w-full max-w-none mx-auto">

        {/* Logo */}
        <Link
          to="/"
          className="text-xl font-extrabold italic tracking-tight text-white font-headline hover:opacity-80 transition-all duration-300"
        >
          Ziuq
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center space-x-14 font-body tracking-tight text-[0.9rem] font-semibold">
          <Link to="/" className={location.pathname === '/' ? activeClass : inactiveClass}>Home</Link>
          {user && (
            <>
              <Link to="/quizzes" className={location.pathname === '/quizzes' ? activeClass : inactiveClass}>Browse Quizzes</Link>
              <Link to="/results" className={location.pathname === '/results' ? activeClass : inactiveClass}>My Results</Link>
              <Link to="/dashboard" className={location.pathname === '/dashboard' ? activeClass : inactiveClass}>Dashboard</Link>
              <Link to="/profile" className={location.pathname === '/profile' ? activeClass : inactiveClass}>Profile</Link>
            </>
          )}
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-6 ml-auto">
          {user ? (
            <button
              disabled={loading}
              onClick={handleLogout}
              className="hidden md:block cursor-pointer bg-[#111] border border-white/10 text-[#888] hover:text-white px-5 py-2 rounded-full font-bold text-[10px] uppercase tracking-wider active:scale-95 transition-all"
            >
              Sign Out
            </button>
          ) : (
            <Link
              to="/auth"
              className="hidden md:block cursor-pointer bg-[#2563eb] text-white px-5 py-2 rounded-full font-bold text-[12px] uppercase tracking-wider active:scale-95 transition-all hover:bg-[#1d4ed8]"
            >
              Sign In
            </Link>
          )}

          {/* Mobile Toggle */}
          <button
            className={`md:hidden text-2xl transition-all duration-300 active:scale-90 ${menuOpen ? "text-white" : "text-[#888] hover:text-white"}`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`md:hidden absolute top-16 left-0 w-full bg-black/95 backdrop-blur-xl border-t border-white/5 px-6 py-8 flex flex-col space-y-6 font-body transition-all duration-500 ease-in-out
        ${menuOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-5 pointer-events-none"}`}
      >
        <div className="flex flex-col space-y-5 text-[15px] font-semibold">
          {[
            { name: 'Home', path: '/' },
            ...(user ? [
              { name: 'Browse Quizzes', path: '/quizzes' },
              { name: 'My Results', path: '/results' },
              { name: 'Dashboard', path: '/dashboard' }
            ] : [])
          ].map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMenuOpen(false)}
              className={`transition-all duration-300 ease-out flex items-center group active:scale-[0.98] ${location.pathname === item.path ? "text-white" : "text-[#888]"
                }`}
            >
              <span className="group-hover:text-white group-hover:pl-1 transition-all duration-300">
                {item.name}
              </span>
            </Link>
          ))}
        </div>

        <div className="border-t border-white/5"></div>

        {/* Mobile Buttons */}
        <div className="flex flex-col space-y-4">
          {user ? (
            <button
              onClick={handleLogout}
              className="w-full py-3 rounded-xl bg-white/5 border border-white/5 text-white text-xs font-bold uppercase tracking-wider transition-all duration-300 active:scale-95 hover:bg-white/10"
            >
              Sign Out
            </button>
          ) : (
            <Link
              to="/auth"
              onClick={() => setMenuOpen(false)}
              className="w-full text-center py-3 rounded-xl bg-[#2563eb] text-white text-xs font-bold uppercase tracking-wider transition-all duration-300 active:scale-95 hover:bg-[#1d4ed8]"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;