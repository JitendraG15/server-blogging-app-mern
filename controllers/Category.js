const Category = require("../models/Category");

// Handler for creating category
exports.createCategory = async (req, res) => {
  try {
    const { categoryName, categoryDescription } = req.body;

    if (!categoryName || !categoryDescription) {
      return res.status(400).json({
        success: false,
        message: "All fields are mandatory.",
      });
    }

    const newCategory = await Category.create({
      categoryName: categoryName,
      categoryDescription: categoryDescription,
    });

    return res.status(200).json({
      success: true,
      category: newCategory,
      message: "Category created successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error occured while creating category",
    });
  }
};

// Handler for fetching all category
exports.fetchCategory = async (req, res) => {
  try {
    const category = await Category.find({});
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "No category found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Category details fetched successfully",
      category,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error occured while fetching category details.",
    });
  }
};
