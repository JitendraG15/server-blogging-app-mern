const User = require("../models/User");

// Handler for changing user role to admin
exports.changeUserRole = async (req, res) => {
  try {
    const userID = req.query.userID;

    if (!userID) {
      return res.status(400).json({
        success: false,
        message: "User Id must be present",
      });
    }

    const user = await User.findByIdAndUpdate(
      userID,
      {
        role: "admin",
      },
      {
        new: true,
      }
    );

    if (user.role !== "admin") {
      return res.status(401).json({
        success: false,
        message: "user role could not be updated",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User role updated successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error occured while chaning user role",
    });
  }
};
