import jwt from "jsonwebtoken";

// middleware function named "verifyToken" that can be used to authenticate and authorize incoming requests by checking the validity of a Jwt
export const verifyToken = async (req, res, next) => {
  try {
    // retrieves the value of the "Authorization" header from the incoming request
    let token = req.header("Authorization");

    // If the header is missing or empty, the function returns a 403 error response with the message "Access Denied
    if (!token) {
      return res.status(403).send("Access Denied");
    }

    // If the header exists, it checks if it starts with the string "Bearer "
    // If it does, it removes that substring and any leading whitespace from the token string to extract the actual JWT token value
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }

    // verifies the JWT token using the "jwt.verify" method,  passing in the token value and the secret key
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    // extracts the "verified" user object and adds it to the "req" object as a new property called "user"
    req.user = verified;
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
