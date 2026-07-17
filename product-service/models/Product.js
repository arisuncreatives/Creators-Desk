import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  category: { type: String, required: true }, // e.g., "Desk Organizers", "Keycaps"
  image: { type: String, required: true },
  description: { type: String, required: true },
  features: [{ type: String }],
  inStock: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model('Product', productSchema);