import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import './SellProduct.css'; // Adjust styling as needed
import axios from 'axios';
import { backendUrl } from "../App.jsx";
import { assets } from '../assets/assets.js';

function SellProperty() {
  const [images, setImages] = useState({
    image1: null,
    image2: null,
    image3: null,
    image4: null,
  });

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Villa'); // Default category
  const [bestseller, setBestseller] = useState(false);
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [token, setToken] = useState(null);

  const navigate = useNavigate();

  // Category options list
  const categories = ["Villa", "2BHK", "3BHK", "Apartment", "Penthouse", "Studio"];

  useEffect(() => {
    const savedToken = localStorage.getItem('authToken');
    if (savedToken) {
      setToken(savedToken);
    } else {
      toast.error('You must be logged in to sell a property!');
      navigate('/login'); // Redirect to login if not logged in
    }
  }, [navigate]);

  const handleImageChange = (e, key) => {
    const file = e.target.files[0];
    setImages((prevImages) => ({
      ...prevImages,
      [key]: file,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
  
    // Check if user is logged in
    if (!token) {
      setError('You must be logged in to sell a property.');
      toast.error('Please log in first!');
      return;
    }
  
    // Validate required fields
    if (!name || !description || !price || !category || !address || !contact || !email) {
      setError('Please fill out all required fields.');
      toast.error('All fields are required.');
      return;
    }
  
    try {
      setLoading(true);
  
      // Prepare form data to send to the server
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('category', category);
      formData.append('bestseller', bestseller.toString());
      formData.append('address', address);
      formData.append('contact', contact);
      formData.append('date', date);
      formData.append('email', email);
  
      // Append images to form data
      Object.keys(images).forEach((key) => {
        if (images[key]) {
          formData.append(key, images[key]);
        }
      });
  
      // Send the property data to the backend
      const response = await axios.post(`${backendUrl}/api/product/add`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          token,
        },
      });
  
      if (response.data.success) {
        toast.success('Property uploaded successfully! Waiting for admin approval.');
        // Reset form fields
        setName('');
        setDescription('');
        setPrice('');
        setCategory('Villa'); // Reset category to default
        setAddress('');
        setContact('');
        setEmail('');
        setDate(new Date().toISOString().split('T')[0]);
        setImages({ image1: null, image2: null, image3: null, image4: null });
        setBestseller(false);
      } else {
        toast.error(response.data.message || 'Property upload failed.');
      }
  
      setLoading(false);
    } catch (error) {
      console.error('Error submitting form:', error);
      setError('An error occurred while uploading the property.');
      toast.error('An error occurred. Please try again.');
      setLoading(false);
    }
  };
  

  return (
    <div className="app-container">
      <div className="main-content">
        <div className="container py-4">
          <form className="product-form" onSubmit={handleSubmit}>
            <div className="text-center mb-4">
              <h2>Sell Your Property</h2>
            </div>

            {error && <div className="alert alert-danger">{error}</div>}

            <div className="row mb-4">
              {['image1', 'image2', 'image3', 'image4'].map((key, index) => (
                <div className="col-12 col-sm-6 col-md-3" key={key}>
                  <label htmlFor={key} className="upload-container">
                    <img
                      src={
                        images[key] ? URL.createObjectURL(images[key]) : assets.upload_area
                      }
                      alt={`Upload Area ${index + 1}`}
                      className="upload-image img-fluid"
                    />
                    <input
                      type="file"
                      id={key}
                      hidden
                      onChange={(e) => handleImageChange(e, key)}
                    />
                  </label>
                </div>
              ))}
            </div>

            <div className="form-group mb-3">
              <label htmlFor="name">Property Name</label>
              <input
                type="text"
                id="name"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                className="form-control"
                rows="3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="price">Price</label>
              <input
                type="number"
                id="price"
                className="form-control"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            {/* Category Dropdown */}
            <div className="form-group mb-3">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                className="form-control category-dropdown"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.map((categoryOption, index) => (
                  <option key={index} value={categoryOption}>
                    {categoryOption}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group mb-3">
              <label htmlFor="address">Address</label>
              <textarea
                id="address"
                className="form-control"
                rows="3"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="contact">Contact</label>
              <input
                type="text"
                id="contact"
                className="form-control"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="email">Your Email</label>
              <input
                type="email"
                id="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="text-center">
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Uploading...' : 'Upload Property'}
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default SellProperty;
