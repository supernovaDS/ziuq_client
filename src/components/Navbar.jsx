import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = ({ token, setToken }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    navigate('/');
    setMenuOpen(false);
  };

  const activeClass =
    "text-[#D8B4FE] relative after:content-[''] after:absolute after:-bottom-5 after:left-0 after:w-full after:h-[2px] after:bg-[#D8B4FE]";
  const inactiveClass =
    "text-[#94A3B8] hover:text-[#F8FAFC] transition-all duration-300";

  return (
    <nav className="fixed top-0 w-full z-50 glass-nav">
      <div className="relative flex justify-between items-center px-6 md:px-12 h-16 w-full max-w-none mx-auto">
        
        {/* Logo - Kept Original */}
        <Link
          to="/"
          className="text-xl font-extrabold tracking-tight text-[#D8B4FE] font-headline hover:brightness-110 transition-all duration-300"
        >
          Ziuq
        </Link>

        {/* Desktop Menu - Kept Original */}
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

        {/* Right side */}
        <div className="flex items-center space-x-6 ml-auto">
          {token ? (
            <button
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

          {/* Mobile Toggle with Color Change Animation */}
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
        className={`md:hidden absolute top-16 left-0 w-full bg-black/95 backdrop-blur-xl border-t border-white/10 px-6 py-8 flex flex-col space-y-6 font-headline transition-all duration-500 ease-in-out
        ${menuOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-5 pointer-events-none"}`}
      >
        <div className="flex flex-col space-y-5 text-[15px] font-semibold">
          {[
            { name: 'Home', path: '/' },
            ...(token ? [
              { name: 'Browse Quizzes', path: '/quizzes' },
              { name: 'My Results', path: '/results' },
              { name: 'Dashboard', path: '/dashboard' }
            ] : [])
          ].map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMenuOpen(false)}
              className={`transition-all duration-300 ease-out flex items-center group active:scale-[0.98] ${
                location.pathname === item.path ? "text-[#D8B4FE]" : "text-[#94A3B8]"
              }`}
            >
              <span className="group-hover:text-[#F8FAFC] group-active:text-[#F8FAFC] group-hover:brightness-125 group-hover:pl-1 transition-all duration-300">
                {item.name}
              </span>
            </Link>
          ))}
        </div>

        <div className="border-t border-white/10"></div>

        {/* Mobile Buttons with Desktop Animations */}
        <div className="flex flex-col space-y-4">
          {token ? (
            <button
              onClick={handleLogout}
              className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-bold uppercase tracking-wider transition-all duration-300 active:scale-95 hover:bg-white/10 hover:border-[#D8B4FE]/50"
            >
              Sign Out
            </button>
          ) : (
            <Link
              to="/auth"
              onClick={() => setMenuOpen(false)}
              className="w-full text-center py-3 rounded-xl bg-primary text-on-primary text-xs font-bold uppercase tracking-wider transition-all duration-300 active:scale-95 hover:brightness-110 hover:shadow-[0_0_15px_rgba(216,180,254,0.4)] kinetic-glow"
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