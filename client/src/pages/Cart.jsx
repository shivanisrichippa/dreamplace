// import React, { useContext, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { ShopContext } from "../context/ShopContext";
// import CartTotal from "./CartTotal";
// import { assets } from "../assets/assets.js";

// const Cart = () => {
//     const { cartItems, products, setCartItems, updateQuantity } = useContext(ShopContext);
//     const [cartData, setCartData] = useState([]);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const token = localStorage.getItem("authToken");
//         if (!token) {
//             navigate("/login");
//         }
//     }, [navigate]);

//     useEffect(() => {
//         const tempData = Object.keys(cartItems)
//             .filter((itemId) => cartItems[itemId] > 0)
//             .map((itemId) => {
//                 const product = products.find((product) => product._id === itemId);
//                 if (product) {
//                     return {
//                         _id: product._id,
//                         name: product.name,
//                         price: product.price,
//                         image: product.image[0],
//                         quantity: cartItems[itemId],
//                     };
//                 }
//                 return null;
//             })
//             .filter((item) => item !== null);

//         setCartData(tempData);
//     }, [cartItems, products]);

//     const handleQuantityChange = (itemId, quantity) => {
//         if (quantity <= 0) {
//             const updatedCart = { ...cartItems };
//             delete updatedCart[itemId];
//             setCartItems(updatedCart); // Update the cart to reflect the item removal
//         } else {
//             updateQuantity(itemId, quantity);
//         }
//     };

//     return (
//         <section className="cart_section layout_padding py-5">
//             <div className="container">
//                 <div className="heading_container heading_center mb-4">
//                     <h2>Your Cart</h2>
//                 </div>

//                 <div className="row">
//                     {cartData.length > 0 ? (
//                         cartData.map((item) => (
//                             <div key={item._id} className="col-12 col-md-6 mb-4">
//                                 <div className="card border-0 shadow-sm">
//                                     <div className="row no-gutters">
//                                         <div className="col-4 d-flex align-items-center justify-content-center">
//                                             <img
//                                                 src={item.image}
//                                                 alt={item.name}
//                                                 className="img-fluid cart-item-image"
//                                                 style={{
//                                                     maxWidth: "100px",
//                                                     height: "100px",
//                                                     objectFit: "contain",
//                                                     borderRadius: "8px",
//                                                 }}
//                                             />
//                                         </div>
//                                         <div className="col-8">
//                                             <div className="card-body">
//                                                 <h5 className="card-title mb-2">{item.name}</h5>
//                                                 <p className="card-text mb-1">
//                                                     <strong>Price:</strong> Rs. {item.price}
//                                                 </p>
//                                                 <div className="d-flex justify-content-between align-items-center">
//                                                     <div className="d-flex align-items-center">
//                                                         <label className="me-2">Qty:</label>
//                                                         <input
//                                                             type="number"
//                                                             className="form-control w-50"
//                                                             value={item.quantity}
//                                                             min="0"
//                                                             onChange={(e) =>
//                                                                 handleQuantityChange(
//                                                                     item._id,
//                                                                     parseInt(e.target.value)
//                                                                 )
//                                                             }
//                                                         />
//                                                     </div>
//                                                     <div>
//                                                         <img
//                                                             src={assets.bin_icon}
//                                                             alt="Remove"
//                                                             width="25"
//                                                             height="25"
//                                                             style={{ cursor: "pointer" }}
//                                                             onClick={() => handleQuantityChange(item._id, 0)}
//                                                         />
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))
//                     ) : (
//                         <div className="col-12 text-center">
//                             <p>Your cart is empty</p>
//                         </div>
//                     )}
//                 </div>

//                 {cartData.length > 0 && (
//                     <div className="row mt-4">
//                         <div className="col-12 text-center">
//                             <button
//                                 className="btn btn-warning btn-sm"
//                                 style={{ fontWeight: "bold" }}
//                                 onClick={() => navigate("/place-order")}
//                             >
//                                 Check-Out
//                             </button>
//                         </div>
//                     </div>
//                 )}

//                 {cartData.length > 0 && <CartTotal />}
//             </div>
//         </section>
//     );
// };

// export default Cart;




import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import CartTotal from "./CartTotal";

const Cart = () => {
  const { cartItems, houses, setCartItems, updateQuantity, getCartAmount } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);
  const navigate = useNavigate();

  // Redirect to login if no token is present
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  // Generate cart data based on cartItems and houses
  useEffect(() => {
    const tempData = Object.keys(cartItems)
      .filter((itemId) => cartItems[itemId] > 0)
      .map((itemId) => {
        const house = houses.find((house) => house._id === itemId);
        if (house) {
          return {
            _id: house._id,
            name: house.name,
            price: house.price,
            image: house.images[0],
            quantity: cartItems[itemId],
          };
        }
        return null;
      })
      .filter((item) => item !== null);

    setCartData(tempData);
  }, [cartItems, houses]);

  // Handle quantity change for a cart item
  const handleQuantityChange = (itemId, quantity) => {
    if (quantity <= 0) {
      const updatedCart = { ...cartItems };
      delete updatedCart[itemId];
      setCartItems(updatedCart);
    } else {
      updateQuantity(itemId, quantity);
    }
  };

  return (
    <section className="cart_section layout_padding py-5">
      <div className="container">
        <div className="heading_container heading_center mb-4">
          <h2>Your Cart</h2>
        </div>

        <div className="row">
          {cartData.length > 0 ? (
            cartData.map((item) => (
              <div key={item._id} className="col-12 col-md-6 mb-4">
                <div className="card border-0 shadow-sm">
                  <div className="row no-gutters">
                    <div className="col-4 d-flex align-items-center justify-content-center">
                      <img
                        src={item.image || "placeholder.png"}
                        alt={item.name}
                        className="img-fluid cart-item-image"
                        style={{
                          maxWidth: "100px",
                          height: "100px",
                          objectFit: "contain",
                          borderRadius: "8px",
                        }}
                      />
                    </div>
                    <div className="col-8">
                      <div className="card-body">
                        <h5 className="card-title mb-2">{item.name}</h5>
                        <p className="card-text mb-1">
                          <strong>Price:</strong> Rs. {item.price}
                        </p>
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="d-flex align-items-center">
                            <label className="me-2">Qty:</label>
                            <input
                              type="number"
                              className="form-control w-50"
                              value={item.quantity}
                              min="1"
                              onChange={(e) =>
                                handleQuantityChange(
                                  item._id,
                                  parseInt(e.target.value)
                                )
                              }
                            />
                          </div>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleQuantityChange(item._id, 0)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center">
              <p>Your cart is empty</p>
            </div>
          )}
        </div>

        {cartData.length > 0 && (
          <>
            <div className="row mt-4">
              <div className="col-12 text-center">
                <button
                  className="btn btn-warning btn-lg"
                  onClick={() => navigate("/place-order")}
                >
                  Check-Out
                </button>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-12">
                <CartTotal totalAmount={getCartAmount()} />
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Cart;
