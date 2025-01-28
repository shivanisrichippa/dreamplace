
import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { backendUrl } from '../App';

const Login = () => {
  const { token, setToken } = useContext(ShopContext);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate('/');
    }

    const handleUnload = () => {
      localStorage.removeItem('authToken');
      setToken(null);
    };

    window.addEventListener('beforeunload', handleUnload);
    return () => window.removeEventListener('beforeunload', handleUnload);
  }, [token, navigate, setToken]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${backendUrl}/api/user/login`, formData);
      if (data.success) {
        localStorage.setItem('authToken', data.token); // Store token in localStorage
        setToken(data.token); // Set token in context
        toast.success('Login successful!');
        navigate('/'); // Redirect to home page
      } else {
        toast.error(data.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed. Please try again.');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <h2 className="text-center mb-4">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label>Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                required
                onChange={handleChange}
              />
            </div>
            <div className="form-group mb-3">
              <label>Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                required
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="btn btn-warning mt-3 w-100">Login</button>
          </form>
          <p className="text-center mt-3">
            Don't have an account? <a href="/signup">Sign up here</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
