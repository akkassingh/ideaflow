import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  lastName: {
    type: String,
    default: "lastName",
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  avatar: String,
  avatarPublicId: String,
  date: {
      type: Date,
      default: Date.now
  }
});

// for the user instance we get back('this'), we transform it to JavaScript object and delete password.
// for getCurrentUser requests, we want to delete password
UserSchema.methods.toJSON = function () {
  let obj = this.toObject();
  delete obj.password;
  return obj;
};

export default mongoose.model("User", UserSchema);
