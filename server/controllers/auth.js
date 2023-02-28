import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Register user************************

export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
    } = req.body;

    const salt = await bcrypt.genSalt();
    console.log("salt:", salt);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 10000),
      impressions: Math.floor(Math.random() * 10000),
    });

    // new user object is saved to the database
    const savedUser = await newUser.save();

    // response is sent to the client with the saved user object and a status code of 201 (Created)
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login user************************
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // The findOne method is then called on the User model to search for a document in the collection that matches the given email address.
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ msg: "User does not exist. " });

    // compare method of the bcrypt library is then used to compare a plain-text password with the hashed password stored in the user object
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });

    // The jwt.sign method is used to generate a JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    // The delete used to remove the password property from the user object  before sending it back to the client.
    delete user.password;
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
