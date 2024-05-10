const Color = require('../model/color');

exports.getAllColor = async (req, res) => {
    try {
        const categories = await Color.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Failed to get categories', error });
    }
}

exports.getColorById = async (req, res) => {
    try {
        const category = await Color.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: 'Failed to get category', error });
    }
}

exports.AddColor = async (req, res) => {
    const { name } = req.body;
    try {
        const newCategory = new Color({ name });
        await newCategory.save();
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create category', error });
    }
}

exports.updateColor = async (req, res) => {
    const { name } = req.body;
    try {
        const updatedCategory = await Color.findByIdAndUpdate(req.params.id, { name }, { new: true });
        if (!updatedCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json(updatedCategory);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update category', error });
    }
}

exports.deleteColor = async (req, res) => {
    try {
        const deletedCategory = await Color.findByIdAndDelete(req.params.id);
        if (!deletedCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(204).json({ message: 'Category deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete category', error });
    }
}


