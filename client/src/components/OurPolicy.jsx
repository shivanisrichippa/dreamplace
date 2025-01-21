import React from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation
import { assets } from '../assets/assets'; // Ensure the correct path
import '../styles/css/style.css';
import '../styles/css/bootstrap.css';

const OurPolicy = () => {
  const navigate = useNavigate(); // Initialize useNavigate for routing

  return (
    <div>
      {/* Our Policies Section */}
      <section className="why_us_section layout_padding">
        <div className="container">
          <div className="heading_container heading_center">
            <h2>Our Policies</h2>
          </div>
          <div className="row">
            {/* Buy Property */}
            <div className="col-md-6">
              <div className="box" onClick={() => navigate('/houses')}>
                <div className="img-box">
                  <img src={assets.exchange_icon} alt="Buy Property" />
                </div>
                <div className="detail-box">
                  <h5>Buy Property</h5>
                  <p>
                    Explore verified properties for sale. View detailed descriptions, photos, pricing, and connect with sellers directly.
                  </p>
                </div>
              </div>
            </div>

            {/* Sell Property */}
            <div className="col-md-6">
              <div className="box" onClick={() => navigate('/sell-property')}>
                <div className="img-box">
                  <img src={assets.quality_icon} alt="Sell Property" />
                </div>
                <div className="detail-box">
                  <h5>Sell Your Property</h5>
                  <p>
                    List your property for sale by providing accurate details. Listings go live after admin verification to ensure quality and trust.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OurPolicy;
