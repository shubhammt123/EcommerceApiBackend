const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');
const cart = require('../controller/cart');


router.post('/cart/items', verifyToken, cart.addItemToCart);
router.put('/cart/items/:itemId', verifyToken, cart.removeItemFromCart);
router.put('/cart/items', verifyToken, cart.updateCartItemQuantity);
router.post('/cart/clear', verifyToken, cart.clearCart);
router.get('/cart/items', verifyToken, cart.getCart);


module.exports = router;