const Size = require('../model/size');

exports.getAllSize = async (req, res) => {
    try {
        const categories = await Size.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Failed to get categories', error });
    }
}

exports.getSizeById = async (req, res) => {
    try {
        const category = await Size.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: 'Failed to get category', error });
    }
}

exports.AddSize = async (req, res) => {
    const { name } = req.body;
    try {
        const newCategory = new Size({ name });
        await newCategory.save();
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create category', error });
    }
}

exports.updateSize = async (req, res) => {
    const { name } = req.body;
    try {
        const updatedCategory = await Size.findByIdAndUpdate(req.params.id, { name }, { new: true });
        if (!updatedCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json(updatedCategory);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update category', error });
    }
}

exports.deleteSize = async (req, res) => {
    try {
        const deletedCategory = await Size.findByIdAndDelete(req.params.id);
        if (!deletedCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(204).json({ message: 'Category deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete category', error });
    }
}


