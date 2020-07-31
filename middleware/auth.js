const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    if (!token) {
      return res.status(401).json({ success: false });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        console.log("ERROR: ", err);
        return res.status(401).json({ error: err.message });
      }
      console.log("USER: ", user);
      req.user = user;
      next();
    });
  } catch ({ message }) {
    res.status(500).json({ error: message });
  }
};
