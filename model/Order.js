const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  product: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Product' 
},
  quantity: { 
    type: Number, 
    required: true 
}
});

const orderSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
},
  items: [orderItemSchema],
  total: { 
    type: Number, 
    required: true 
},
  date: { 
    type: Date, 
    default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
