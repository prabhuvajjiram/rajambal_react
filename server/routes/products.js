import express from 'express';
import multer from 'multer';
import Product from '../models/Product.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({ storage });

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create product
router.post('/', upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'additional_images', maxCount: 5 },
  { name: 'color_images', maxCount: 10 }
]), async (req, res) => {
  try {
    const productData = {
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      image_path: req.files.image[0].path,
      additional_images: req.files.additional_images?.map(file => file.path) || [],
      colors: []
    };

    if (req.body.color_names && req.files.color_images) {
      const colorNames = Array.isArray(req.body.color_names) 
        ? req.body.color_names 
        : [req.body.color_names];

      productData.colors = colorNames.map((name, index) => ({
        name,
        image_path: req.files.color_images[index].path
      }));
    }

    const product = new Product(productData);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update product
router.put('/:id', upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'additional_images', maxCount: 5 },
  { name: 'color_images', maxCount: 10 }
]), async (req, res) => {
  try {
    const updates = {
      title: req.body.title,
      description: req.body.description,
      price: req.body.price
    };

    if (req.files.image) {
      updates.image_path = req.files.image[0].path;
    }

    if (req.files.additional_images) {
      updates.additional_images = req.files.additional_images.map(file => file.path);
    }

    if (req.body.color_names && req.files.color_images) {
      const colorNames = Array.isArray(req.body.color_names) 
        ? req.body.color_names 
        : [req.body.color_names];

      updates.colors = colorNames.map((name, index) => ({
        name,
        image_path: req.files.color_images[index].path
      }));
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete product
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;