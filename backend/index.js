const express = require("express");
const app = express();
const cors = require("cors");
const connectMongo = require("./connectdb");
const usersRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postsRoute = require("./routes/posts");
connectMongo();
require("dotenv").config();

// middleware
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("This is backend of social media application !");
});

app.use("/api/users", usersRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postsRoute);

app.listen(8000, () => {
  console.log("backend is running at http://localhost:8000");
});
