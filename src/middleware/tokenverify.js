const jwt = require('jsonwebtoken');

const tokenBlacklist = require("../middleware/tokenBlocklist")

require("dotenv").config();


function isTokenBlacklisted(token) {
  console.log(token,"in bolck")
  console.log( tokenBlacklist.has(token),"has token");
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  console.log(authHeader, "auth");
  const token = authHeader && authHeader.split(' ')[1];
  console.log(token,"block")
  if (token === undefined) return res.status(401).json({ error: "Can't get token" });

  if (isTokenBlacklisted(token)) {
    return res.status(401).json({ message: 'Token is revoked' });
  }

  jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, decode) => {
    if (err) throw res.status(401).json({ error: "The given token is mismatched" });

    req.user = decode;
    next();
  });
}

module.exports = {
  authenticateToken
};



