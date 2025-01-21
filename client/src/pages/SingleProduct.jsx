
import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { Carousel } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RelatedProperties from '../components/RelatedProperties';

const SingleProduct= () => {
  const { propertyId } = useParams();  // Fetch property ID from URL
  const { houses, addToCart } = useContext(ShopContext);  // Get houses from context
  const [propertyData, setPropertyData] = useState(null);  // State to store single property data
  const navigate = useNavigate();

  // Fetch the property data based on the ID
  useEffect(() => {
    const property = houses.find((item) => item._id === propertyId);  // Find property by ID
    if (property) {
      setPropertyData(property);  // Set property data to state
    } else {
      setPropertyData(null); // Set to null if no property found
    }
  }, [houses, propertyId]);

  // Ensure that property data exists before rendering
  if (!propertyData) {
    return <div>Loading... or Property not found</div>;
  }

  // Handle adding property to cart
  const handleAddToCart = () => {
    addToCart(propertyData._id);  // Add property to cart
    toast.success('Property added to cart');
  };

  const handleBuyNow = () => {
    toast.success('Proceed to Checkout');
    navigate("/place-order");  // Navigate to checkout page
  };

  return (
    <section className="property_section layout_padding">
      <div className="container">
        <div className="heading_container heading_center mb-5">
          <h2>{propertyData.name}</h2> {/* Property name */}
        </div>
        <div className="row">
          {/* Property Images Carousel */}
          <div className="col-sm-12 col-md-6">
            <Carousel>
              {propertyData.images && propertyData.images.length > 0 ? (
                propertyData.images.map((img, index) => (
                  <Carousel.Item key={index}>
                    <img className="d-block w-100" src={img} alt={`Property Image ${index + 1}`} />
                  </Carousel.Item>
                ))
              ) : (
                <div>No images available</div>
              )}
            </Carousel>
          </div>

          {/* Property Details */}
          <div className="col-sm-12 col-md-6">
            <div className="detail-box">
              <p>{propertyData.description}</p> {/* Property description */}
              <p><strong>100% Quality Property</strong></p>  {/* Quality assurance */}
              <h5><span>Rs.</span> {propertyData.price}</h5>  {/* Property price */}
              <div className="property_info mb-3">
                <p><strong>Category:</strong> {propertyData.category}</p>  {/* Property category */}
                <p><strong>Location:</strong> {propertyData.address}</p>  {/* Property address */}
                <p><strong>Contact:</strong> {propertyData.contact}</p>  {/* Property contact */}
              </div>

              {/* Additional Details */}
              {/* <div className="additional_details mb-3">
                <p><strong>Property Type:</strong> {propertyData.type}</p>
                <p><strong>Size:</strong> {propertyData.size} sq. ft.</p>
                <p><strong>Furnishing:</strong> {propertyData.furnishing}</p>
              </div> */}

              {/* Buttons */}
              <div className="buttons d-flex flex-column flex-md-row">
                <button className="btn btn-primary mb-3 mb-md-0 mr-md-3" onClick={handleBuyNow}>
                  Buy Now
                </button>
                <button className="btn btn-secondary" onClick={handleAddToCart}>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Related Properties Section */}
        <RelatedProperties category={propertyData.category} />
      </div>
    </section>
  );
};

export default SingleProduct;
