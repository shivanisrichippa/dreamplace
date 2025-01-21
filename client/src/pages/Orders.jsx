
import React, { useContext, useEffect, useState, useCallback } from "react";
import { ShopContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { assets } from "../assets/assets"; // Adjust path as per your structure

const Orders = () => {
  const { backendUrl, token } = useContext(ShopContext);
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [confirmationModal, setConfirmationModal] = useState({
    show: false,
    orderId: null,
  });

  // Fetch user orders
  const fetchOrders = useCallback(async () => {
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${backendUrl}/api/order/userorders`,
        { userId: token },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success && Array.isArray(response.data.orders)) {
        const formattedOrders = response.data.orders.flatMap((order) =>
          (order.items || []).map((item) => ({
            ...item,
            status: order.status || "Pending",
            paymentStatus: order.paymentMethod === "Razorpay" ? "Paid" : order.payment ? "Paid" : "Unpaid",
            date: order.date,
            orderId: order._id,
            paymentMethod: order.paymentMethod,
          }))
        );

        setOrderData(formattedOrders.reverse());
      } else {
        setError(response.data.message || "Failed to fetch orders.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching orders.");
    } finally {
      setLoading(false);
    }
  }, [token, backendUrl]);

  // Cancel an order
  const handleCancelOrder = async () => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/order/cancel`,
        { orderId: confirmationModal.orderId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        setOrderData((prevOrders) =>
          prevOrders.filter((order) => order.orderId !== confirmationModal.orderId)
        );
        toast.success("Order canceled successfully!");
      } else {
        toast.error(response.data.message || "Failed to cancel order.");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "An error occurred while canceling the order.");
    } finally {
      setConfirmationModal({ show: false, orderId: null });
    }
  };

  // Show confirmation modal
  const confirmCancelOrder = (orderId) => {
    setConfirmationModal({ show: true, orderId });
  };

  // Close confirmation modal
  const closeConfirmationModal = () => {
    setConfirmationModal({ show: false, orderId: null });
  };

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4 text-uppercase fw-bold">Your Orders</h2>

      {loading ? (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : error ? (
        <div className="alert alert-danger text-center">{error}</div>
      ) : orderData.length === 0 ? (
        <div className="text-center">
          <img
            src={assets.exchange_icon || "/placeholder.png"}
            alt="No orders"
            style={{ maxWidth: "200px" }}
          />
          <p>You have no orders yet. Start shopping now!</p>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => navigate("/product")}
          >
            Shop Now
          </button>
        </div>
      ) : (
        <div className="row">
          {orderData.map((item, index) => (
            <div key={`${item.orderId}-${index}`} className="col-12 mb-4">
              <div className="card shadow-sm border-0 h-100">
                <div className="row g-0">
                  <div className="col-4 d-flex align-items-center justify-content-center">
                    <img
                      src={item.image?.[0] || "/placeholder.png"}
                      alt={item.name || "Product Image"}
                      className="img-fluid rounded"
                      style={{
                        width: "120px",
                        height: "120px",
                        objectFit: "cover",
                      }}
                      onError={(e) => {
                        e.target.src = "/placeholder.png";
                      }}
                    />
                  </div>
                  <div className="col-8">
                    <div className="card-body">
                      <h5 className="card-title mb-2">{item.name || "Unknown Product"}</h5>
                      <p className="card-text mb-1">
                        <strong>Price:</strong> Rs. {item.price || "N/A"}
                      </p>
                      <p className="card-text mb-1">
                        <strong>Payment Method:</strong> {item.paymentMethod || "N/A"}
                      </p>
                      <p className="card-text mb-1">
                        <strong>Payment Status:</strong>{" "}
                        {item.paymentStatus === "Paid" ? (
                          <span className="badge bg-success">Paid</span>
                        ) : (
                          <span className="badge bg-danger">Unpaid</span>
                        )}
                      </p>
                      <p className="card-text mb-1">
                        <strong>Delivery Status:</strong>{" "}
                        <span
                          className={`badge bg-${
                            item.status === "Delivered"
                              ? "success"
                              : item.status === "Shipped"
                              ? "primary"
                              : "warning"
                          }`}
                        >
                          {item.status}
                        </span>
                      </p>
                      <p className="card-text mb-1">
                        <strong>Order Date:</strong>{" "}
                        {new Date(item.date).toLocaleString()}
                      </p>
                      <div className="d-flex justify-content-between">
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => confirmCancelOrder(item.orderId)}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Confirmation Modal */}
      {confirmationModal.show && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Cancel Order</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeConfirmationModal}
                ></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to cancel this order?</p>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={closeConfirmationModal}
                >
                  No
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={handleCancelOrder}
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
