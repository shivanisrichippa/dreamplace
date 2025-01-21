
import React, { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';

const Houses = () => {
  const { houses } = useContext(ShopContext);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Villa', '2BHK', '3BHK', 'Apartment', 'Studio'];

  const filteredHouses = selectedCategory === 'All'
    ? houses
    : houses.filter((house) => house.category === selectedCategory);

  return (
    <section className="product_section layout_padding">
      <div className="container">
        <div className="heading_container heading_center">
          <h2>Our Products</h2>
        </div>
        <div className="dropdown mb-4 text-center">
          <button
            className="btn p-0"
            type="button"
            data-bs-toggle="dropdown"
            style={{ fontSize: '16px', fontWeight: 'bold' }}
          >
            <i className="fa fa-filter me-2" /> Add Filters
          </button>
          <ul className="dropdown-menu">
            {categories.map((category) => (
              <li key={category}>
                <button
                  className={`dropdown-item ${selectedCategory === category ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="row">
          {filteredHouses.map((house) => (
            <div key={house._id} className="col-sm-6 col-lg-4">
              <div className="box">
                <div className="img-box">
                  <img
                    src={house.images[0] || 'placeholder.png'}
                    alt={house.name}
                  />
                  <a href={`/house/${house._id}`} className="add_cart_btn">
                    <span>Know More</span>
                  </a>
                </div>
                <div className="detail-box">
                  <h5>{house.name}</h5>
                  <h5><span>Rs.</span> {house.price}</h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Houses;
