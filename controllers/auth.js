const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Handler for registering user
exports.signup = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    console.log(userName, email, password)

    // Check user exists or not
    const isExist = await User.findOne({ email: email });
    if (isExist) {
      return res.status(400).json({
        success: false,
        message: "User already exists.",
      });
    }

    // Generate salt
    const salt = await bcrypt.genSalt(10);

    // Hash the password using the generated salt
    const hashedPassword = await bcrypt.hash(password, salt);

     const name = userName.split(" ");
    // Make db entry for the new user
    const newUser = await User.create({
      userName: userName,
      email: email,
      password: hashedPassword,
      image:`https://api.dicebear.com/5.x/initials/svg?seed= ${name[0]} ${name[1]}`,
    });

    return res.status(200).json({
      success: true,
      message: "User registration successful",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Unknown error occured while  signing up",
    });
  }
};

// Handler for login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user is valid or not
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not registered with us.",
      });
    }

    // Match the password & Generate JWT Token
    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign(
        { email: user.email, userID: user._id, role: user.role },
        process.env.JWT_SECRET,
        {
          expiresIn: "24h",
        }
      );

      // Save token to user document in database

      user.token = token;
      user.password = undefined;
      // Set cookie for token and return success response
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: `User Logged In Successfully!`,
      });
    } else {
      return res.status(401).json({
        success: false,
        message: `Password is incorrect`,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server side error while logging in",
    });
  }
};
