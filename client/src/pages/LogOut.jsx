
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const LogOut = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Clear the token from localStorage
        localStorage.removeItem('authToken');
        toast.success('Logged out successfully!');
        navigate('/login');
    }, [navigate]);

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4 text-center">
                    <h2 className="mb-4">Logging Out...</h2>
                    <p>You are being redirected to the login page.</p>
                </div>
            </div>
        </div>
    );
};

export default LogOut;
