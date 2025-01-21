


// import mongoose from 'mongoose';

// const productSchema = new mongoose.Schema({
//     name: { type: String, required: true, trim: true },
//     description: { type: String, required: true, trim: true },
//     price: { type: Number, required: true, min: 0 },
//     image: {
//         type: [String],
//         validate: {
//             validator: (val) => val.length >= 1 && val.length <= 4, // Flexible image count validation
//             message: "You must upload between 1 and 4 images.",
//         },
//     },
//     category: { type: String, required: true },
//     bestseller: { type: Boolean, default: false },
//     date: { type: Date, default: Date.now }, // Use Date type for date
//     rentDays: { type: Number, min: 1 },
//     email: {
//         type: String,
//         // required: true,
//         // unique: true,
//     },
//     verified: { type: Boolean, default: false },
   
// });

// const productModel = mongoose.models.product || mongoose.model('Product', productSchema);

// export default productModel;



import mongoose from 'mongoose';

const houseSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true, 
        trim: true // Name of the house (e.g., "Luxury Villa", "2BHK Apartment")
    },
    email: { 
        type: String, 
        // required: true, 
        trim: true 
    }, // Email of the owner or agent
    address: { 
        type: String, 
        required: true, 
        trim: true // Address of the house
    },
    description: { 
        type: String, 
        required: true, 
        trim: true // Detailed description of the property
    },
    price: { 
        type: Number, 
        required: true, 
        min: 0 // Price of the house
    },
    contact: { 
        type: String, 
        required: true, 
        trim: true // Contact number for inquiries
    },
    images: {
        type: [String], 
        validate: {
            validator: (val) => val.length >= 1 && val.length <= 4, // Ensure between 1 and 4 images
            message: "You must upload between 1 and 4 images.",
        },
    },
    category: { 
        type: String, 
        required: true, 
        enum: ['Villa', '2BHK', '3BHK', 'Studio', 'Apartment', 'Penthouse'], // Example categories
        trim: true 
    },
    bestseller: { 
        type: Boolean, 
        default: false // Whether it's a featured or bestseller property
    },
    date: { 
        type: Date, 
        default: Date.now // Date when the listing was created
    },
    verified: { 
        type: Boolean, 
        default: false // Whether the property is verified by the admin
    }
});

// Create the model
const houseModel = mongoose.models.House || mongoose.model('House', houseSchema);

export default houseModel;
