

import React from 'react';
import About from './About';
import Houses from './Houses';
import WhyUs from './WhyUs';

import LatestCollection from '../components/LatestCollection';
import { assets } from '../assets/assets'; // Import assets.js
import BestSeller from '../components/BestSeller';
import OurPolicy from '../components/OurPolicy';


function Home() {
  return (
    <div>
      <section className="slider_section">
        <div id="customCarousel1" className="carousel slide" data-ride="carousel">
          <div className="carousel-inner">
            {/* Slider Item 1 */}
            <div className="carousel-item active">
              <div className="container">
                <div className="row">
                  <div className="col-md-6">
                    <div className="detail-box">
                      <h1>Welcome to Dream Place</h1>
                      <p>
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit. A labore autem fugit. Repellendus repellat cupiditate voluptatum sequi, qui explicabo at placeat modi eligendi vitae iure, perferendis odit cum delectus debitis?</p>
                      <a href="/about">Read More</a>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="img-box">
                      <img src={assets.sliderImg2} alt="Slider Image 1" /> {/* Dynamic image reference */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Slider Item 2 */}
            <div className="carousel-item">
              <div className="container">
                <div className="row">
                  <div className="col-md-6">
                    
                    <div className="detail-box">
                      <h1>Welcome to our Space</h1>
                      <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis cum similique odio rerum vero sint nesciunt error minima doloribus odit, nemo ullam! Corporis recusandae laboriosam enim autem dolore qui alias.
                      </p>
                      <a href="/about">Read More</a>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="img-box">
                      <img src={assets.sliderImg} alt="Slider Image 2" /> {/* Dynamic image reference */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Slider Item 3 */}
            <div className="carousel-item">
              <div className="container">
                <div className="row">
                  <div className="col-md-6">
                    <div className="detail-box">
                      <h1>Welcome to our Space</h1>
                      <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, labore enim quod, dolor voluptate aut cumque porro debitis eum nihil facere id vel quas est eaque voluptatem, veritatis magnam commodi?
                      </p>
                      <a href="/about">Read More</a>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="img-box">
                      <img src={assets.sliderImg3} alt="sliderImg" /> {/* Dynamic image reference */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="carousel_btn_box">
            <a className="carousel-control-prev" href="#customCarousel1" role="button" data-slide="prev">
              <i className="fa fa-angle-left" aria-hidden="true"></i>
              <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#customCarousel1" role="button" data-slide="next">
              <i className="fa fa-angle-right" aria-hidden="true"></i>
              <span className="sr-only">Next</span>
            </a>
          </div> */}
        </div>
        <div className="carousel_btn_box">
            <a className="carousel-control-prev" href="#customCarousel1" role="button" data-slide="prev">
              <i className="fa fa-angle-left" aria-hidden="true"></i>
              <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#customCarousel1" role="button" data-slide="next">
              <i className="fa fa-angle-right" aria-hidden="true"></i>
              <span className="sr-only">Next</span>
            </a>
        </div>
      </section>
      <br />
      <br />
      <br />
      <section className="product_section">
        <div className="container">
          <div className="row">
            <LatestCollection />
          </div>
        </div>
      </section>
      <section className="product_section">
        <div className="container">
          <div className="row">
            <About />
          </div>
        </div>
      </section>
      <section className="product_section">
        <div className="container">
          <div className="row">
            <OurPolicy/>
          </div>
        </div>
      </section>
      <section className="product_section">
        <div className="container">
          <div className="row">
            <BestSeller />
          </div>
        </div>
      </section>
     
      <section className="product_section">
        <div className="container">
          <div className="row">
            <Houses />
          </div>
        </div>
      </section>
      <section className="product_section">
        <div className="container">
          <div className="row">
            <WhyUs />
          </div>
        </div>
      </section>
      {/* <section className="product_section">
        <div className="container">
          <div className="row">
            <Testimonials />
          </div>
        </div>
      </section> */}
    </div>
  );
}

export default Home;
