const Category = require('../model/Category');

// Get category listing
module.exports.categories = async function(req, res) {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
}
