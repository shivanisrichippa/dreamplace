import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  items: { type: Array, required: true },
  amount: { type: Number, required: true },
  address: { type: Object, required: true },
  status: { type: String, required: true, default: 'Order placed' },
  paymentMethod: { type: String, required: true },
  payment: { type: Boolean, required: true, default: false },
  date: { type: Number, required: true },
});

const orderModel = mongoose.models.order || mongoose.model('order', orderSchema);
export default orderModel;
// import mongoose from "mongoose";

// const orderSchema = new mongoose.Schema({
//   userId: { type: String, required: true }, // User who placed the order
//   items: [
//     {
//       _id: { type: String, required: true }, // Reference to the item (e.g., product ID)
//       name: { type: String, required: true }, // Item name
//       price: { type: Number, required: true }, // Price of the item
//       quantity: { type: Number, required: true }, // Quantity purchased
//       image: { type: String }, // URL of the item's image
//     },
//   ],
//   amount: { type: Number, required: true }, // Total amount for the order
//   address: { type: Object, required: true }, // Shipping address
//   status: { type: String, default: "Order placed" }, // Order status
//   paymentMethod: { type: String, required: true }, // Payment method (e.g., COD, Razorpay, etc.)
//   payment: { type: Boolean, default: false }, // Payment status (true if paid)
//   date: { type: Date, default: Date.now }, // Date of the order
// });

// const orderModel = mongoose.models.order || mongoose.model("order", orderSchema);

// export default orderModel;
