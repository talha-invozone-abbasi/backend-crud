const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  let token = req.headers["x-auth-token"];

  if (!token) {
    res.status(403);
    res.json({
      message: "Token mising",
    });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.json({
        message: "Token not Valid",
      });
    }
    req.user = decoded.id;
    next();
  });
};
