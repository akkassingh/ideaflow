import mongoose from "mongoose";
import crypto from "crypto";

const UserSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    role: {
      type: String,
      enum: ["student", "faculty", "admin"],
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    VerifiedForAdminAccess: Boolean,
  },
  { timestamps: true }
);

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

// Brute Wrapper (Not proud of it!)
UserSchema.statics.onlyExisting = function () {
  return this.find().onlyExisting();
};

UserSchema.query.onlyExisting = function () {
  return this.find({
    deleted_at: null,
  });
};

// --

UserSchema.statics.getByEmails = function (emails) {
  return this.find().getByEmails(emails);
};

UserSchema.query.getByEmails = function (emails) {
  return this.find({
    email: { $in: emails },
  });
};

// --

export default mongoose.model("User", UserSchema);
