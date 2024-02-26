const Product = require('../model/Product');

// Create a new product by entering the field values
module.exports.create = async function (req, res) {
  const { title, price, description, availability } = req.query;
  try {
      const product = await Product.create({ title, price, description, availability });
      
      res.status(201).json(product);
  } catch (error) {
      res.status(500).json({ error: 'Failed to create the product' });
  }
}

// Get product listing by category ID
module.exports.products = async function(req, res) {
  try {
    const { categoryId } = req.params;
    const products = await Product.find({ categoryId });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
}

// Get product details by product ID
module.exports.detail = async function (req, res) {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product details' });
  }
}
