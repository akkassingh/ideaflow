import { StatusCodes } from "http-status-codes";
import User from "../models/UserModel.js";
import Proposal from "../models/ProposalModel.js";
import cloudinary from "cloudinary";
import { formatImage } from "../middleware/multerMiddleware.js";

/*
When user logs in, we are not storing user value in the front-end on the client when user logs in. It's stored in JWT in the cookie that is sent to browser. Therefore, we need a way to get the user's data
*/
export const getCurrentUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId });

  // convert to JSON since we converted to Object to delete password
  const userWithoutPassword = user.toJSON();
  res.status(StatusCodes.OK).json({ user: userWithoutPassword });
};

export const getApplicationStats = async (req, res) => {
  const users = await User.countDocuments();
  const proposals = await Proposal.countDocuments();
  res.status(StatusCodes.OK).json({ users, proposals });
};

export const updateUser = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return res
      .status(400)
      .json({ success: false, message: "User does not exist" });
  // if req.body.haveAdminAccess is different from user.haveAdminAccess, then we need to check if the req.user is an admin by role
  if ( req.body.VerifiedForAdminAccess !== user.VerifiedForAdminAccess && req.user.role !== "admin" ) {
    return res
      .status(400)
      .json({
        success: false,
        message: "You do not have permission to update this field",
      });
  }
  // we don't want password inside this functionality--don't want to update it in this way
  const obj = { ...req.body };
  delete obj.password;
  if (req.file) {
    const file = formatImage(req.file);

    const response = await cloudinary.v2.uploader.upload(file);

    obj.avatar = response.secure_url;
    obj.avatarPublicId = response.public_id;
  }

  const updatedUser = await User.findByIdAndUpdate(user.id, obj);
  if (req.file && updatedUser.avatarPublicId) {
    await cloudinary.v2.uploader.destroy(updatedUser.avatarPublicId);
  }
  res.status(StatusCodes.OK).json({ msg: "updated user" });
};

export const getAllUsers = async (req, res) => {
  const { search, sort } = req.query;

  const queryObject = {};

  //any char search for company and position
  if (search) {
    queryObject.$or = [
      { firstName: { $regex: search, $options: "i" } },
      { lastName: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
    ];
  }

  const sortOptions = {
    newest: "-createdAt",
    oldest: "createdAt",
    "a-z": "position",
    "z-a": "-position",
  };

  const sortKey = sortOptions[sort] || sortOptions.newest;
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const items = await User.find(queryObject)
    .sort(sortKey)
    .skip(skip)
    .limit(limit);

  const totalItems = await User.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalItems / limit);

  res
    .status(StatusCodes.OK)
    .json({ totalItems, numOfPages, currentPage: page, items });
};

export const getUserById = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id });
  if (!user)
    return res
      .status(400)
      .json({ success: false, message: "User does not exist" });
  return res.status(200).json({ success: true, data: user });
};

export const getUserByEmail = async (req, res) => {
  const user = await User.findOne({ email: req.params.email });
  if (!user)
    return res
      .status(400)
      .json({ success: false, message: "User does not exist" });
  return res.status(200).json({ success: true, data: user });
};
