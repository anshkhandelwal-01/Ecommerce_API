const Cart = require('../model/Cart');
const Order = require('../model/Order');

// Place order
module.exports.place = async function(req, res) {
  try {
    const { userId } = req;
    const cart = await Cart.findOne({ userId }).populate('items.productId');
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }
    const order = await Order.create({ userId, items: cart.items });
    await Cart.findOneAndDelete({ userId });
    res.status(201).json({ message: 'Order placed successfully', orderId: order._id });
  } catch (error) {
    res.status(500).json({ error: 'Failed to place order' });
  }
}

// Get order history for user
module.exports.history = async function (req, res) {
  try {
    const { userId } = req;
    const orders = await Order.find({ userId });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch order history' });
  }
}

// Get order details by order ID
module.exports.detail = async function (req, res) {
  try {
    const { userId } = req;
    const { orderId } = req.params;
    const order = await Order.findOne({ _id: orderId, userId });
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch order details' });
  }
}
