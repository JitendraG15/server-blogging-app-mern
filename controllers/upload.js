// const cloudinary = require("../config/cloudinary");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const Post = require("../models/Post");
const User = require("../models/User");


// Handler to upload post thumbnail
exports.uploadImage = async (req, res) => {
  try {
    // Get thumbnail image from request files

    const image = req.files.image;
    console.log("Image:", image);
    // Upload the Thumbnail to Cloudinary
    const thumbnailImage = await uploadImageToCloudinary(
      image,
      process.env.FOLDER_NAME
    );
    console.log(thumbnailImage);

    return res.status(200).json({ url: thumbnailImage.secure_url });
  } catch (error) {
    res.status(500).json({ message: "Upload failed", error: error.message });
  }
};

// Update Profile Image
exports.updateProfileImage = async (req, res) => {
  try {
    // Get thumbnail image from request files

    const image = req.files.image;
    const id = req.query.id;
    console.log("ID:", id);
    console.log("Image:", image);
    // Upload the Thumbnail to Cloudinary
    const profileImage = await uploadImageToCloudinary(
      image,
      process.env.FOLDER_NAME
    );
    console.log(profileImage);
    const user = await User.findByIdAndUpdate(
      id,
      {
        image: profileImage.secure_url,
      },
      {
        new: true,
      }
    );

    console.log("User:", user);

    return res.status(200).json({
      success: true,
      message: "Profile Updated Successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: "Upload failed", error: error.message });
  }
};
