const Post = require("../models/Post");
const User = require("../models/User");


// Hanlder for fetching user posts/blogs
exports.fetchMyPosts = async (req, res) => {
  try {
    const { userID } = req.query;
    console.log("UserID:", userID);

    const user = await User.findById(userID);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Can't find user.",
      });
    }

    const posts = await Post.find({ userID: userID })
      .populate("userID")
      .populate("category")
      .populate({
        path: "comments", // Populate the comments of the post
        populate: {
          path: "userID", // Populate the author of each comment
        },
        options: {
          sort: { createdAt: -1 }, // Sort comments by createdAt field in descending order
        },
      });

    return res.status(200).json({
      success: true,
      message: "User posts fetched successfully!",
      posts,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error occured  while fetching posts.",
    });
  }
};


// Handler for fetching user profile
exports.fetchUserProfile = async (req, res) => {
  try {
    // Get user id
    const userID = req.user.userID;
    if (!userID) {
      return res.status(400).json({
        success: false,
        message: "User Id is missing",
      });
    }

    // Fetch user profile from database
    const user = await User.findById(userID);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No user profile found",
      });
    }

    // return user profile as response
    return res.status(200).json({
      success: true,
      user,
      message: "User profile fetched successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error occured while fetching user profile",
    });
  }
};


// Handler to update user profile image
exports.updateProfilePicture = async (req, res) => {
  try {
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error occured while updating profile image",
    });
  }
};
