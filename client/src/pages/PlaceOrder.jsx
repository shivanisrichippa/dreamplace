



import React, { useContext, useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import axios from "axios";
import { backendUrl } from "../App";

const PlaceOrder = () => {
  const { cartItems, houses, token, setCartItems, getCartAmount } =
    useContext(ShopContext);

  const [orderDetails, setOrderDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    area: "",
    district: "",
    state: "",
    country: "",
    phone: "",
    pincode: "",
    paymentMethod: "cod",
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      toast.error("Please log in to place an order.");
      navigate("/login");
    }
  }, [token, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderDetails({ ...orderDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const items = Object.keys(cartItems)
      .map((itemId) => {
        const house = houses.find((house) => house._id === itemId);
        if (house && cartItems[itemId] > 0) {
          return { ...house, quantity: cartItems[itemId] };
        }
        return null;
      })
      .filter((item) => item !== null);

    if (items.length === 0) {
      toast.error("Your cart is empty. Add some items to place an order.");
      return;
    }

    const orderData = {
      address: {
        firstName: orderDetails.firstName,
        lastName: orderDetails.lastName,
        email: orderDetails.email,
        street: orderDetails.street,
        area: orderDetails.area,
        district: orderDetails.district,
        state: orderDetails.state,
        country: orderDetails.country,
        phone: orderDetails.phone,
        pincode: orderDetails.pincode,
      },
      items,
      amount: getCartAmount(),
      paymentMethod: orderDetails.paymentMethod,
      payment: orderDetails.paymentMethod === "cod" ? false : true,
      status: "Order placed",
      date: Date.now(),
    };

    try {
      let response;
      if (orderDetails.paymentMethod === "razorpay") {
        response = await axios.post(
          `${backendUrl}/api/order/razorpay`,
          orderData,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.data.success) {
          const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: response.data.order.amount,
            currency: response.data.order.currency,
            name: "Your Shop",
            description: "Payment for your order",
            order_id: response.data.order.id,
            handler: async (razorpayResponse) => {
              try {
                // Log response for debugging
                console.log(razorpayResponse);
            
                toast.success("Payment successful!");
                setCartItems({});
                localStorage.removeItem("cartItems");
                navigate("/orders");
              } catch (error) {
                console.error("Payment handler error:", error);
                toast.error("Payment failed. Please try again.");
              }
            }
            
          };

          const razorpay = new window.Razorpay(options);
          razorpay.open();
        } else {
          toast.error(response.data.message);
        }
      } else {
        // For COD
        response = await axios.post(
          `${backendUrl}/api/order/place`,
          orderData,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.data.success) {
          toast.success("Order placed successfully!");
          setCartItems({});
          localStorage.removeItem("cartItems");
          navigate("/orders");
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.error("Order submission failed:", error);
      toast.error("An error occurred while placing your order. Please try again.");
    }
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Place Your Order</h2>
      <form onSubmit={handleSubmit}>
        <h4>Personal Information</h4>
        <div className="mb-4">
          <label htmlFor="firstName" className="form-label">First Name</label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            name="firstName"
            value={orderDetails.firstName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="lastName" className="form-label">Last Name</label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            name="lastName"
            value={orderDetails.lastName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={orderDetails.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="phone" className="form-label">Phone</label>
          <input
            type="text"
            className="form-control"
            id="phone"
            name="phone"
            value={orderDetails.phone}
            onChange={handleInputChange}
            required
          />
        </div>

        <h4>Address Information</h4>
        <div className="mb-4">
          <label htmlFor="street" className="form-label">Street</label>
          <input
            type="text"
            className="form-control"
            id="street"
            name="street"
            value={orderDetails.street}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="area" className="form-label">Area</label>
          <input
            type="text"
            className="form-control"
            id="area"
            name="area"
            value={orderDetails.area}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="district" className="form-label">District</label>
          <input
            type="text"
            className="form-control"
            id="district"
            name="district"
            value={orderDetails.district}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="state" className="form-label">State</label>
          <input
            type="text"
            className="form-control"
            id="state"
            name="state"
            value={orderDetails.state}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="country" className="form-label">Country</label>
          <input
            type="text"
            className="form-control"
            id="country"
            name="country"
            value={orderDetails.country}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="pincode" className="form-label">Pincode</label>
          <input
            type="text"
            className="form-control"
            id="pincode"
            name="pincode"
            value={orderDetails.pincode}
            onChange={handleInputChange}
            required
          />
        </div>

        <h4>Payment Method</h4>
        <div className="mb-4">
          <label htmlFor="paymentMethod" className="form-label">Select Payment Method</label>
          <select
            className="form-select"
            id="paymentMethod"
            name="paymentMethod"
            value={orderDetails.paymentMethod}
            onChange={handleInputChange}
            required
          >
            <option value="cod">Cash on Delivery</option>
            <option value="razorpay">Razorpay</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary w-100">Place Order</button>
      </form>
    </div>
  );
};

export default PlaceOrder;
