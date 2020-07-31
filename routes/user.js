const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const auth = require("../middleware/auth");
const { update } = require("../models/User");

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    console.log("USER: ", user);
    if (!user) res.status(401).json({ error: "Wrong email or password" });

    const isMatch = await bcrypt.compare(password, user.hash);
    if (!isMatch) res.status(401).json({ error: "Wrong email or password" });

    const token = await jwt.sign(
      { email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "2d" }
    );
    return res
      .status(200)
      .json({ success: true, token, boardSettings: user.boardSettings });
  } catch ({ message }) {
    res.status(500).json({ error: message });
  }
});

router.post("/register", async (req, res) => {
  const { email, password, passwordConfirmation } = req.body;

  try {
    if (password.length < 8)
      throw Error("Password has to be at least 8 characters long");
    if (password !== passwordConfirmation)
      throw Error("Passwords do not match");

    if (await User.findOne({ email }))
      return res.status(401).json({ errors: ["Email already taken"] });

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    console.log("TYPEOF HASH: ", typeof hash);

    await new User({ email, hash }).save();

    res.status(200).json({ success: true });
  } catch ({ message }) {
    console.log("ERROR: ", err);
    res.status(500).json({ error: message, success: false });
  }
});

router.put("/settings", auth, async (req, res) => {
  const { width, height, numberOfBombs } = req.body;

  const boardSettings = {
    width,
    height,
    numberOfBombs,
  };

  const user = await User.findOneAndUpdate(
    { email: req.user.email },
    { boardSettings },
    { new: true, fields: "boardSettings" }
  );

  res.status(200).json({ success: true, boardSettings: user.boardSettings });
});

router.delete("/", async (req, res) => {
  const doc = await User.deleteMany({});
  res.status(200).json({ deleted: doc.deletedCount });
});

module.exports = router;
