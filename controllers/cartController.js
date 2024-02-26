const Cart = require('../model/Cart');

// Add product to user's cart
module.exports.add = async function(req, res) {
  try {
    const { userId } = req;
    const { productId, quantity } = req.body;
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = await Cart.create({ userId, items: [{ productId, quantity }] });
    } else {
      const existingItem = cart.items.find(item => item.productId === productId);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({ productId, quantity });
      }
      await cart.save();
    }
    res.status(201).json({ message: 'Product added to cart successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add product to cart' });
  }
}

// View user's cart
module.exports.cart = async function(req, res) {
  try {
    const { userId } = req;
    const cart = await Cart.findOne({ userId }).populate('items.productId');
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch cart' });
  }
}

// Update cart item quantity
module.exports.update = async function(req, res) {
  try {
    const { userId } = req;
    const { cartItemId } = req.params;
    const { quantity } = req.body;
    const cart = await Cart.findOne({ userId });
    const item = cart.items.id(cartItemId);
    if (!item) {
      return res.status(404).json({ error: 'Item not found in cart' });
    }
    item.quantity = quantity;
    await cart.save();
    res.json({ message: 'Cart item updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update cart item' });
  }
}

// Remove item from cart
module.exports.delete = async function(req, res) {
  try {
    const { userId } = req;
    const { cartItemId } = req.params;
    const cart = await Cart.findOne({ userId });
    cart.items.id(cartItemId).remove();
    await cart.save();
    res.json({ message: 'Cart item removed successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove cart item' });
  }
}