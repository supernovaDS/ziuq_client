import React, { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { GoogleLogin } from '@react-oauth/google';

const Auth = (props) => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = isLogin ? '/auth/login' : '/auth/register';

    const payload = isLogin
      ? { email: formData.email, password: formData.password }
      : formData;

    try {
      setLoading(true);

      const { data } = await API.post(endpoint, payload, {
        withCredentials: true
      });

      props.setUser && props.setUser(data.user);

      if (!isLogin) {
        toast.success("Registered successfully");
      } else {
        toast.success("Signed in successfully");
      }

      navigate('/dashboard');

    } catch (err) {
      toast.error(err.response?.data?.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      setLoading(true);
      await API.post("/auth/google", { token: credentialResponse.credential }, { withCredentials: true });
      const { data } = await API.get("/auth/me", { withCredentials: true });
      props.setUser && props.setUser(data);
      toast.success("Logged in with Google");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      toast.error("Google login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-10 relative z-10">
      <div className="w-full max-w-md glass-card p-10 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden group">

        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-colors pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary/10 rounded-full blur-3xl group-hover:bg-secondary/20 transition-colors pointer-events-none"></div>

        <h2 className="text-3xl font-extrabold mb-8 text-center text-on-surface tracking-tighter">
          {isLogin ? 'Login' : 'Register'}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5 relative z-10">

          <div className='flex items-center justify-center'>
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={() => toast.error("Google login failed")}
            />
          </div>
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-outline-variant"></div>

            <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">
              or
            </span>

            <div className="flex-1 h-px bg-outline-variant"></div>
          </div>

          {!isLogin && (
            <>
              <input
                name="username"
                className="bg-surface/50 border border-outline-variant p-4 rounded-xl text-on-surface placeholder-white/20 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition"
                placeholder="Alias (Username)"
                required
                onChange={handleChange}
              />

              <div className="flex gap-3">
                <input
                  name="firstName"
                  className="bg-surface/50 border border-outline-variant p-4 rounded-xl w-1/2 text-on-surface placeholder-white/20 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition"
                  placeholder="First Name"
                  required
                  onChange={handleChange}
                />

                <input
                  name="lastName"
                  className="bg-surface/50 border border-outline-variant p-4 rounded-xl w-1/2 text-on-surface placeholder-white/20 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition"
                  placeholder="Last Name"
                  required
                  onChange={handleChange}
                />
              </div>
            </>
          )}

          <input
            name="email"
            type="email"
            className="bg-surface/50 border border-outline-variant p-4 rounded-xl text-on-surface placeholder-white/20 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition"
            placeholder="Email Address"
            required
            onChange={handleChange}
          />

          <input
            name="password"
            type="password"
            className="bg-surface/50 border border-outline-variant p-4 rounded-xl text-on-surface placeholder-white/20 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition"
            placeholder="Security Key (Password)"
            required
            onChange={handleChange}
          />

          <button
            disabled={loading}
            className={`${loading ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'} bg-linear-to-r from-primary to-primary-container text-on-primary p-4 rounded-xl font-bold uppercase tracking-widest text-sm hover:brightness-110 active:scale-95 transition-all shadow-[0_0_15px_rgba(196,154,255,0.3)] mt-2`}
          >
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>

        </form>

        <div className="mt-8 text-center relative z-10">
          <button
            type="button"
            className="text-on-surface-variant hover:text-primary transition-colors text-xs font-bold uppercase tracking-widest"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "No Profile? Register now." : "Return to Sign In."}
          </button>
        </div>

      </div>
    </div>
  );
};

export default Auth;