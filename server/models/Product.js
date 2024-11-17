import mongoose from 'mongoose';

const colorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image_path: { type: String, required: true }
});

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image_path: { type: String, required: true },
  colors: [colorSchema],
  additional_images: [String],
  created_at: { type: Date, default: Date.now }
});

export default mongoose.model('Product', productSchema);