
require("dotenv").config();
const express = require("express");
const connection = require("./config/db");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 3000;

const usersRoute=require("./routes/user.route")
const postsRoute= require('./routes/post.route');
const analyticsRoute=require("./routes/analytics.route")





app.use(cors());


app.use(express.json());
app.use(express.urlencoded({ extended: false }));




app.get("/", async (req, res) => {
  res.send({ mesg: "Welcome to CommUnity" });
});

app.use("/users",usersRoute)
app.use('/posts', postsRoute);
app.use("/analytics",analyticsRoute)


app.listen(PORT, async () => {
  try {
    await connection;
    console.log("Database connection Successful");
  } catch (err) {
    console.log(err);
    console.log("Couldn't connect to database");
  }

  console.log("app is running in port ", PORT);
});

module.exports=app