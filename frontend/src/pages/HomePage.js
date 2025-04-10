import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
    return (
        <div className="home-page">
            <h1>Welcome to the Messaging App</h1>
            <p>Connect with your community, study group, or workplace.</p>
            <div className="navigation">
                <Link to="/login" className="btn">Login</Link>
                <Link to="/signup" className="btn">Sign Up</Link>
            </div>
        </div>
    );
};

export default HomePage;