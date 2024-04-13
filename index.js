const express = require("express");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const server = express();
const database = require("./config/database");
const { cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/post");
const commentRoute = require("./routes/comment");
const categoryRoute = require("./routes/category");
const imageUploadRoute = require("./routes/imageUpload");
const profileRoute = require("./routes/profile");
const adminRoute = require("./routes/admin");
const cors = require("cors");

// adding middleware for json data parsing
server.use(express.json());

// Adding middleware for cookie data parsing purpose
server.use(cookieParser());

// Loading .env configuration to access all dotenv variables
dotenv.config();

// Adding middleware to enable cross platform communication for example client to server
server.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

// Middleware for file related tasks
server.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// Calling database connection utility function to connect to Database
database.connect();

// Connecting to cloudinary
cloudinaryConnect();

// Middlewares for routing purpose
server.use("/api/v1/auth", authRoute);
server.use("/api/v1/post", postRoute);
server.use("/api/v1/comment", commentRoute);
server.use("/api/v1/category", categoryRoute);
server.use("/api/v1/upload", imageUploadRoute);
server.use("/api/v1/myprofile", profileRoute);
server.use("/api/v1/admin", adminRoute);

// Loading port number
const port = process.env.PORT || 4000;

// Making server live to listen to client requests
server.listen(port, (req, res) => {
  console.log(`Server is up and listening at port no. ${port}`);
});
