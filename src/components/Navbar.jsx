import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import API from '../api';

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [menuOpen]);

  const handleLogout = async () => {
    try {
      setLoading(true);
      await API.post('/auth/logout', {}, { withCredentials: true });
      toast.success("Logged out successfully");
      setUser(null);
      setMenuOpen(false);
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  const activeClass =
    "text-[#D8B4FE] relative after:content-[''] after:absolute after:-bottom-5 after:left-0 after:w-full after:h-[2px] after:bg-[#D8B4FE]";
  const inactiveClass =
    "text-[#94A3B8] hover:text-[#F8FAFC] transition-all duration-300";

  return (
    <nav className="w-full z-100 glass-nav sticky top-0">
      <div className="relative flex justify-between items-center px-6 md:px-12 h-16 w-full max-w-none mx-auto">

        {/* Logo */}
        <Link
          to="/"
          className="z-110 text-xl font-extrabold tracking-tight text-[#D8B4FE] font-headline hover:brightness-110 transition-all duration-300"
        >
          Ziuq
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center space-x-10 font-headline tracking-tight text-[13px] font-semibold">
          <Link to="/" className={location.pathname === '/' ? activeClass : inactiveClass}>Home</Link>
          {user && (
            <>
              <Link to="/quizzes" className={location.pathname === '/quizzes' ? activeClass : inactiveClass}>Browse Quizzes</Link>
              <Link to="/results" className={location.pathname === '/results' ? activeClass : inactiveClass}>My Results</Link>
              <Link to="/dashboard" className={location.pathname === '/dashboard' ? activeClass : inactiveClass}>Dashboard</Link>
            </>
          )}
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-6 ml-auto z-110">
          {user ? (
            <button
              disabled={loading}
              onClick={handleLogout}
              className="hidden md:block bg-surface-container-high border border-white/10 text-on-surface-variant hover:text-white px-5 py-2 rounded-full font-bold text-[10px] uppercase tracking-wider active:scale-95 transition-all"
            >
              Sign Out
            </button>
          ) : (
            <Link
              to="/auth"
              className="hidden md:block bg-primary text-on-primary px-5 py-2 rounded-full font-bold text-[12px] uppercase tracking-wider active:scale-95 transition-all hover:brightness-110 kinetic-glow"
            >
              Sign In
            </Link>
          )}

          {/* Mobile Toggle */}
          <button
            className={`md:hidden text-2xl transition-all duration-300 active:scale-90 ${menuOpen ? "text-[#D8B4FE]" : "text-white hover:text-[#D8B4FE]"}`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`md:hidden fixed inset-0 top-16 w-full h-screen z-100 bg-black/95 backdrop-blur-xl border-t border-white/10 px-6 py-8 flex flex-col space-y-6 font-headline transition-all duration-500 ease-in-out
        ${menuOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-10 pointer-events-none"}`}
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
              className={`transition-all duration-300 ease-out flex items-center group active:scale-[0.98] ${location.pathname === item.path ? "text-[#D8B4FE]" : "text-[#94A3B8]"
                }`}
            >
              <span className="group-hover:text-[#F8FAFC] group-active:text-[#F8FAFC] group-hover:brightness-125 group-hover:pl-1 transition-all duration-300">
                {item.name}
              </span>
            </Link>
          ))}
        </div>

        <div className="border-t border-white/10"></div>

        <div className="flex flex-col space-y-4">
          {user ? (
            <button
              onClick={handleLogout}
              className="w-full py-4 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-bold uppercase tracking-wider transition-all duration-300 active:scale-95"
            >
              Sign Out
            </button>
          ) : (
            <Link
              to="/auth"
              onClick={() => setMenuOpen(false)}
              className="w-full text-center py-4 rounded-xl bg-primary text-on-primary text-xs font-bold uppercase tracking-wider transition-all duration-300 active:scale-95 kinetic-glow"
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