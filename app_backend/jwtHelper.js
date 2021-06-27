const jwt = require("jsonwebtoken");

module.exports.generateAccessToken = (userData) => {
  console.log(
    "Token Secret ",
    process.env.ACCESS_TOKEN_SECRET,
    " User data ",
    userData
  );
  return jwt.sign(userData, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};

module.exports.generateRefreshToken = (userData) => {
  console.log(
    "Refresh Secret ",
    process.env.REFRESH_TOKEN_SECRET,
    " User data ",
    userData
  );
  return jwt.sign(userData, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: 18000,
  });
};

module.exports.authenticateAccessToken = (req, res, next) => {
  // console.log("Calling `authenticateAccessToken` ");
  // Gather the jwt access token from the request header
  const authHeader = req.headers["authorization"];
  // console.log("Header[authorization]", authHeader);
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    res.header("www-authenticate", "invalid_token");
    return res.sendStatus(401); // if there isn't any token
  }
  // console.log("Token is ", token);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    console.log(err);
    if (err) {
      // this should be expired token
      res.header("www-authenticate", "invalid_token");
      return res.sendStatus(401);
    }

    req.user = user;

    next();
  });
};

module.exports.authenticateRefreshToken = (req, res, next) => {
  // Gather the jwt access token from the request header
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    res.header("www-authenticate", "invalid_token");
    return res.sendStatus(401); // if there isn't any token
  }
  // console.log("Token is ", token);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    console.log(err);
    if (err) {
      // this should be expired token
      res.header("www-authenticate", "invalid_token");
      return res.sendStatus(401);
    }
    req.user = user;
    next(); // pass the execution off to whatever request the client intended
  });
};
