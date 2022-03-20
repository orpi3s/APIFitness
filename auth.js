const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

function authorizeUser(req, res, next) {
  try {
    const auth = req.header("Authorization");
    const prefix = "Bearer ";

    if (!auth || (auth && !auth.startsWith(prefix))) {
      throw new Error("User is unathorized to perform this action");
    }
    const token = auth.slice(prefix.length);

    const { id, username } = jwt.verify(token, JWT_SECRET);

    req.user = { id, username };

    next();
  } catch (err) {
    next(err);
  }
}

module.exports = authorizeUser;
