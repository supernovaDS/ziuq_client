import React, { useState, useContext } from 'react';
import API from '../api';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '', firstName: '', lastName: '', email: '', password: ''
  });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/register', formData);
      login(res.data.user, res.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="p-6 max-w-sm mx-auto">
      <h2 className="text-2xl mb-4 font-bold">Register</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input type="text" name="username" placeholder="Username" className="border p-2 rounded" onChange={handleChange} required />
        <input type="text" name="firstName" placeholder="First Name" className="border p-2 rounded" onChange={handleChange} required />
        <input type="text" name="lastName" placeholder="Last Name" className="border p-2 rounded" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" className="border p-2 rounded" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" className="border p-2 rounded" onChange={handleChange} required />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Register</button>
      </form>
    </div>
  );
};

export default Register;
