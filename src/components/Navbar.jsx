import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = ({ token, setToken }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    navigate('/');
  };

  const activeClass = "text-[#D8B4FE] relative after:content-[''] after:absolute after:-bottom-5 after:left-0 after:w-full after:h-[2px] after:bg-[#D8B4FE]";
  const inactiveClass = "text-[#94A3B8] hover:text-[#F8FAFC] transition-all duration-300";

  return (
    <nav className="fixed top-0 w-full z-50 glass-nav">
      <div className="relative flex justify-between items-center px-6 md:px-12 h-16 w-full max-w-none mx-auto">
        <Link to={token ? "/" : "/"} className="text-xl font-extrabold tracking-tight text-[#D8B4FE] font-headline hover:brightness-110 transition-all">
          Ziuq
        </Link>
        
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center space-x-10 font-headline tracking-tight text-[13px] font-semibold">
          <Link to="/" className={location.pathname === '/' ? activeClass : inactiveClass}>Home</Link>
          {token && (
            <>
              <Link to="/quizzes" className={location.pathname === '/quizzes' ? activeClass : inactiveClass}>Browse Quizzes</Link>
              <Link to="/results" className={location.pathname === '/results' ? activeClass : inactiveClass}>My Results</Link>
              <Link to="/dashboard" className={location.pathname === '/dashboard' ? activeClass : inactiveClass}>Dashboard</Link>
            </>
          )}
        </div>

        <div className="flex items-center space-x-6 ml-auto">
          {token ? (
            <button 
              onClick={handleLogout}
              className="bg-surface-container-high border border-white/10 text-on-surface-variant hover:text-white px-5 py-2 rounded-full font-bold text-[10px] uppercase tracking-wider active:scale-95 transition-all"
            >
              Sign Out
            </button>
          ) : (
            <Link 
              to="/auth"
              className="bg-primary text-on-primary px-5 py-2 rounded-full font-bold text-[12px] uppercase tracking-wider active:scale-95 transition-all hover:brightness-110 kinetic-glow"
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
