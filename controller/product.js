const Product = require('../model/product');
const Review = require('../model/review');
const Rating = require('../model/rating');
const AverageRating = require('../model/averageRating');

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find()
            .populate('category')
            .populate('sizes')
            .populate('colors')
            .populate('collectionType')
            .exec();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error: error });
    }
}

exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
            .populate('category')
            .populate('sizes')
            .populate('colors')
            .populate('collectionType')
            
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        
        const reviews = await Review.find({ product: req.params.id }).populate('user', 'firstName lastName');
        const ratings = await Rating.find({ product: req.params.id }).populate('user', 'firstName lastName');

        
        product._doc.reviews = reviews;  
        product._doc.ratings = ratings;

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching product', error: error });
    }
}

exports.AddProduct = async (req, res) => {
    const { name, description, price, category, sizes, colors, collectionType } = req.body;
    try {
        const product = new Product({
            name,
            description,
            price,
            category,
            sizes,
            colors,
            collectionType
        });
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Failed to add product', error: error.message });
    }
}

exports.updateProduct = async (req, res) => {
    const { categoryId, sizeIds, colorIds, collectionTypeId } = req.body;
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
            $set: {
                category: categoryId,
                sizes: sizeIds,
                colors: colorIds,
                collectionType: collectionTypeId
            }
        }, { new: true })
        .populate('category sizes colors collectionType')
        ;

        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update product', error });
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(204).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete product', error });
    }
}
