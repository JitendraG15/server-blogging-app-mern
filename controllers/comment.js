const Post = require("../models/Post");
const Comment = require("../models/Comment");
const User = require("../models/Comment");

// Handler for comment on a particular post
exports.createComment = async (req, res) => {
  try {
    // Get necessary Details
    const { userID, postID } = req.query;
    const { content } = req.body;
    // const { postID } = req.params;

    if (!userID || !postID || !content) {
      return res.status(400).json({
        success: false,
        message: "userID, postID and content can't be left blank.",
      });
    }

    const newComment = await Comment.create({
      userID: userID,
      postID: postID,
      content: content,
    });

    const updatedPost = await Post.findByIdAndUpdate(
      { _id: postID },
      { $push: { comments: newComment._id } },
      {
        new: true,
      }
    ).populate("comments");

    return res.status(200).json({
      success: true,
      message: "New Comment created successfully.",
      newComment,
      updatedPost,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error occured while creating comment.",
    });
  }
};



// Handler for updating comment
exports.updateComment = async (req, res) => {
  try {
    const { commentID } = req.params;
    const { content } = req.body;

    if (!commentID || !content) {
      return res.status(400).json({
        success: false,
        message: "Comment ID and updated content is must.",
      });
    }

    const updatedComment = await Comment.findByIdAndUpdate(
      {
        _id: commentID,
      },
      { content: content },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Comment updated successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error occured while updating comment.",
    });
  }
};

// Handler for deleting a particular comment
exports.deleteComment = async (req, res) => {
  try {
    const { commentID } = req.params;

    if (!commentID) {
      return res.status(400).json({
        success: false,
        message: "Comment ID is required.",
      });
    }

    const deletedComment = await Comment.findByIdAndDelete({
      _id: commentID,
    });

    return res.status(200).json({
      success: true,
      message: "Comment Deleted Successfully.",
      deletedComment,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error occured while deleting comment.",
    });
  }
};
