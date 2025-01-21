
import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";

const CartTotal = () => {
    const { cartItems, houses } = useContext(ShopContext);

    // Calculate the cart total and delivery fee
    const cartTotal = Object.keys(cartItems).reduce((sum, itemId) => {
        const house = houses.find((house) => house._id === itemId);
        const quantity = cartItems[itemId];
        const price = house?.price || 0; // Default to 0 if house not found
        return sum + price * quantity;
    }, 0);

    const shippingFee = cartTotal > 0 ? Math.max(cartTotal * 0.1, 50) : 0; // Minimum shipping fee of Rs. 50
    const totalAmount = cartTotal + shippingFee;

    return (
        <div className="card p-4 mt-4 shadow-sm">
            <h4 className="mb-3">Cart Summary</h4>
            {Object.keys(cartItems).length > 0 ? (
                <>
                    <div className="mb-2">
                        <p>
                            <strong>Cart Total:</strong> Rs. {cartTotal.toFixed(2)}
                        </p>
                        <p>
                            <strong>Shipping Fee (10% or min Rs. 50):</strong> Rs. {shippingFee.toFixed(2)}
                        </p>
                    </div>
                    <div className="border-top pt-3">
                        <h5>
                            <strong>Total Amount:</strong> Rs. {totalAmount.toFixed(2)}
                        </h5>
                    </div>
                </>
            ) : (
                <p className="text-muted">No items in the cart.</p>
            )}
        </div>
    );
};

export default CartTotal;
