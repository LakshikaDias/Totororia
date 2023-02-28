import mongoose from "mongoose";

// const UserSchema = new mongoose.Schema(...) - This code creates a new Mongoose schema for a user object
const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    lastName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    picturePath: {
      type: String,
      default: "",
    },
    friends: {
      type: Array,
      default: [],
    },
    location: String,
    occupation: String,
    viewedProfile: Number,
    impressions: Number,
  },
  { timestamps: true }
);

// The mongoose.model() method is used to create the model.
// "User" - This code specifies the name of the collection that the model will use in the MongoDB database. In this case, the collection name will be "users".
const User = mongoose.model("User", UserSchema);
export default User;
