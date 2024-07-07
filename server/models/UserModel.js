import mongoose from "mongoose";
import crypto from "crypto";

const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  date: {
      type: Date,
      default: Date.now
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
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
