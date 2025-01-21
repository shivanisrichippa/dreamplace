import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { backendUrl } from '../App';

const SignUp = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        address: '',
        mobileNumber: '',
    });
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState(localStorage.getItem('authToken')); // Initialize with localStorage
    const navigate = useNavigate();

    // Handle input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle file selection
    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            // Validate file type and size
            const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
            const maxSize = 2 * 1024 * 1024; // 2 MB

            if (!validTypes.includes(file.type)) {
                toast.error('Invalid file type. Only JPEG, JPG, and PNG are allowed.');
                return;
            }

            if (file.size > maxSize) {
                toast.error('File size exceeds 2MB. Please choose a smaller file.');
                return;
            }

            setImage(file);

            // Generate image preview
            const reader = new FileReader();
            reader.onloadend = () => setImagePreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    // Validate form inputs
    const validateForm = () => {
        if (!formData.name || !formData.email || !formData.password || !formData.address || !formData.mobileNumber) {
            toast.error('All fields are required');
            return false;
        }
        if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
            toast.error('Invalid email format');
            return false;
        }
        if (formData.password.length < 8) {
            toast.error('Password must be at least 8 characters long');
            return false;
        }
        if (!/^\d{10}$/.test(formData.mobileNumber)) {
            toast.error('Mobile number must be 10 digits');
            return false;
        }
        return true;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        const form = new FormData();
        Object.keys(formData).forEach((key) => form.append(key, formData[key]));
        if (image) form.append('image', image);

        try {
            setLoading(true); // Show loading state
            const { data } = await axios.post(`${backendUrl}/api/user/sign-up`, form, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (data.success) {
                toast.success('Signup successful!');
                localStorage.setItem('authToken', data.token); // Save token
                navigate('/'); // Redirect to home
            } else {
                toast.error(data.message || 'Signup failed. Please try again.');
            }
        } catch (error) {
            console.error('Signup Error:', error.response || error);
            toast.error(error.response?.data?.message || 'Signup failed. Please try again.');
        } finally {
            setLoading(false); // Hide loading state
        }
    };

    // Redirect if already signed in
    useEffect(() => {
        if (token) {
            navigate('/');
            toast.success('Already signed up and logged in!');
        }
    }, [token, navigate]);

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4">
                    <h2 className="text-center mb-4">Sign Up</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group mb-3">
                            <label>Name</label>
                            <input
                                type="text"
                                name="name"
                                className="form-control"
                                placeholder="Enter your name"
                                required
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                className="form-control"
                                placeholder="Enter your email"
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
                                placeholder="Enter a secure password"
                                required
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label>Address</label>
                            <textarea
                                name="address"
                                className="form-control"
                                rows="3"
                                placeholder="Enter your address"
                                required
                                onChange={handleChange}
                            ></textarea>
                        </div>
                        <div className="form-group mb-3">
                            <label>Mobile Number</label>
                            <input
                                type="text"
                                name="mobileNumber"
                                className="form-control"
                                placeholder="Enter your mobile number"
                                required
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label>Upload Your Photo</label>
                            <input
                                type="file"
                                className="form-control"
                                onChange={handleFileChange}
                                required
                            />
                            {imagePreview && (
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className="mt-3"
                                    style={{ maxWidth: '100%', maxHeight: '200px' }}
                                />
                            )}
                        </div>
                        <button
                            type="submit"
                            className="btn btn-warning mt-3 w-100"
                            disabled={loading}
                        >
                            {loading ? 'Signing Up...' : 'Sign Up'}
                        </button>
                    </form>
                    <p className="text-center mt-3">
                        Already have an account? <a href="/login">Login here</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
