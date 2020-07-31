require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/user.js");
const cors = require("cors");

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("mongoose connected successfully"))
  .catch((err) => console.log(`Error in mongoose ${error}`));

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/user", userRouter);

if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.port || 5000;

app.listen(PORT, () => console.log("Server is listening..."));
