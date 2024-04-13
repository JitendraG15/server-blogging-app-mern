const cloudinary = require("cloudinary").v2; 


// Function for making connection with cloudinary server
exports.cloudinaryConnect = () => {
    try {
        cloudinary.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.CLOUD_API_KEY,
            api_secret: process.env.CLOUD_API_SECRET,
        });
        console.log("Connected TO CLoudinary Successfully!")
    } catch (error) {
        console.error("Cloudinary configuration error:", error);
        throw error;
    }
};
  
