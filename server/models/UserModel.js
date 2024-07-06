import mongoose from "mongoose";
import crypto from "crypto";

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
  },
  resetLink: {
    data: String
  }
});

// for the user instance we get back('this'), we transform it to JavaScript object and delete password.
// for getCurrentUser requests, we want to delete password
UserSchema.methods.toJSON = function () {
  let obj = this.toObject();
  delete obj.password;
  return obj;
};

UserSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 10 * (60 * 1000);

  return resetToken;
};

export default mongoose.model("User", UserSchema);
