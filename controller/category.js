const Category = require('../model/category');

exports.getAllCategory = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Failed to get categories', error });
    }
}

exports.getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: 'Failed to get category', error });
    }
}

exports.AddCategory = async (req, res) => {
    const { name } = req.body;
    try {
        const newCategory = new Category({ name });
        await newCategory.save();
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create category', error });
    }
}

exports.updateCategory = async (req, res) => {
    const { name } = req.body;
    try {
        const updatedCategory = await Category.findByIdAndUpdate(req.params.id, { name }, { new: true });
        if (!updatedCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json(updatedCategory);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update category', error });
    }
}

exports.deleteCategory = async (req, res) => {
    try {
        const deletedCategory = await Category.findByIdAndDelete(req.params.id);
        if (!deletedCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(204).json({ message: 'Category deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete category', error });
    }
}


