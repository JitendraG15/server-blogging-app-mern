const Post = require("../models/Post");
const User = require("../models/User");
const Comment = require("../models/Comment");
const Category = require("../models/Category");

// handler for creating a new post
exports.createPost = async (req, res) => {
  try {
    // Get post data
    // const {userID} = req.user;
    const { userID, title, thumbnail, categoryID, content } = req.body;
    console.log(userID, title, thumbnail, categoryID, content);
    if (!userID || !title || !thumbnail || !categoryID || !content) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the required fields.",
      });
    }

    // Get User by userID
    const user = await User.findById({ _id: userID });

    // create post
    const newPost = await Post.create({
      userID: user._id,
      title: title,
      thumbnail: thumbnail,
      category: categoryID,
      content: content,
    });

    //  Return Success Response
    return res.status(200).json({
      success: true,
      message: "Post created successfully.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error occured while creating post",
    });
  }
};

// Handler for fetching a particular Post Details
exports.fetchPost = async (req, res) => {
  try {
    const { postID } = req.query;

    if (!postID) {
      return res.status(400).json({
        success: false,
        message: "Post ID is required to fetch post details",
      });
    }

    const post = await Post.findById({ _id: postID })
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
      message: "Post Details fetched successfully",
      post,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error occured while fetching post details",
    });
  }
};

// Handler for fetching all the Posts owned by a particular user
exports.fetchMyPost = async (req, res) => {
  try {
    // const { userID } = req.query;

    if (!postID) {
      return res.status(400).json({
        success: false,
        message: "Post ID is required to fetch post details",
      });
    }

    const post = await Post.findById({ _id: postID })
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
      message: "Post Details fetched successfully",
      post,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error occured while fetching post details",
    });
  }
};

// Handler for fetching all the Posts
exports.fetchPosts = async (req, res) => {
  try {
    const posts = await Post.find({})
      .populate("userID")
      .populate("category")
      .populate("comments")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Posts fetched successfully",
      posts,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error occured while fetching posts",
    });
  }
};


// Handler for fetching all the posts of a particular category
exports.fetchCategoryPosts = async (req, res) => {
  try {
    // Get Category ID
    const { categoryID } = req.query;
    console.log("category Name:", categoryID);
    if (!categoryID) {
      return res.status(400).json({
        success: false,
        message: "Category ID is missing",
      });
    }

    const category = await Category.findOne({ categoryName: categoryID });

    // Fetch posts having given category id
    const posts = await Post.find({ category: category._id })
      .populate("userID")
      .populate("category")
      .populate("comments")
      .sort({ createdAt: -1 });

    if (!posts) {
      return res.status(404).json({
        success: false,
        message: "No posts find provided given category",
      });
    }

    console.log("Posts:", posts);

    // return posts after querying
    return res.status(200).json({
      success: true,
      message: "Posts fetched successfully",
      posts,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      successs: false,
      message: "Error occured while fetching category posts",
    });
  }
};

// Handler for updating a particular post
exports.updatePost = async (req, res) => {
  try {
    // Get Details to update
    const { postID, title, categoryID, content } = req.body;

    // Check if postID is provided
    if (!postID) {
      return res.status(400).json({
        success: false,
        message: "postID is required for updating the post.",
      });
    }

    // Create an object to store the fields to be updated
    let updateFields = {};

    if (title) updateFields.title = title;
    if (categoryID) updateFields.categoryID = categoryID;
    if (content) updateFields.content = content;

    // Find the post by postID and update it
    const updatedPost = await Post.findByIdAndUpdate(postID, updateFields, {
      new: true,
    });

    if (!updatedPost) {
      return res.status(404).json({
        success: false,
        message: "Post not found.",
      });
    }

    // Return the updated post
    res.status(200).json({
      success: true,
      message: "Post updated successfully.",
      data: updatedPost,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error occured while updating the post.",
    });
  }
};

// Handler for deleting a particular Post
exports.deletePost = async (req, res) => {
  try {
    // Get Post ID
    const { postID } = req.body;

    if (!postID) {
      return res.status(400).json({
        success: false,
        message: "postID is required for deleting the post.",
      });
    }

    // Delete all comments associated with the postID
    await Comment.deleteMany({ postID: postID });

    // find and delete the post
    const post = await Post.findByIdAndDelete({ _id: postID });

    return res.status(200).json({
      success: true,
      message: "Post Deleted Successfully!",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error occured while deleting the post.",
    });
  }
};
