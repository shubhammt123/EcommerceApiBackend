const Cart = require('../model/cart');

exports.addItemToCart = async (req, res) => {
    const { productId, quantity } = req.body;
    const userId = req.user._id; 

    try {
        const cart = await Cart.findOne({ user: userId, isActive: true });
        if (!cart) {
            
            const newCart = new Cart({
                user: userId,
                items: [{ product: productId, quantity }]
            });
            await newCart.save();
            return res.status(201).json(newCart);
        }

        
        const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
        if (itemIndex > -1) {
            
            cart.items[itemIndex].quantity += quantity;
        } else {
            
            cart.items.push({ product: productId, quantity });
        }
        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: "Error adding item to cart", error: error.message });
    }
};

exports.removeItemFromCart = async (req, res) => {
    const { itemId } = req.params;
    const userId = req.user._id;
console.log(itemId);
console.log(userId);
    try {
        const cart = await Cart.findOneAndUpdate(
            { user: userId, "items._id": itemId },
            { $pull: { items: { _id: itemId } } },
            { new: true }
        );
        console.log(cart)
        if (!cart) {
            return res.status(404).json({ message: "Cart item not found or user cart does not exist" });
        }
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: "Error removing item from cart", error: error.message });
    }
};

exports.updateCartItemQuantity = async (req, res) => {
    const { itemId, quantity } = req.body;
    const userId = req.user._id;

    try {
        const cart = await Cart.findOne({ user: userId, "items._id": itemId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        const item = cart.items.id(itemId);
        if (!item) {
            return res.status(404).json({ message: "Cart item not found" });
        }

        if (quantity <= 0) {
            cart.items.id(itemId).remove();
        } else {
            item.quantity = quantity;
        }

        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: "Error updating cart item", error: error.message });
    }
};


exports.clearCart = async (req, res) => {
    const userId = req.user._id;

    try {
        const cart = await Cart.findOne({ user: userId, isActive: true });
        if (!cart) {
            return res.status(404).json({ message: "No active cart found" });
        }

        if (cart.items.length === 0) {
            return res.status(200).json({ message: "Cart is already empty" });
        }

        const result = await Cart.findOneAndUpdate(
            { _id: cart._id },
            { $set: { items: [] } },
            { new: true }
        );
        res.status(200).json({ message: "Cart cleared successfully", cart: result });
    } catch (error) {
        res.status(500).json({ message: "Error clearing cart", error: error.message });
    }
};


exports.getCart = async (req, res) => {
    const userId = req.user._id;  

    try {
        const cart = await Cart.findOne({ user: userId, isActive: true })
            .populate('items.product', 'name price description') 
            .exec();

        if (!cart) {
            return res.status(404).json({ message: "No active cart found" });
        }

        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving the cart", error: error.message });
    }
};
