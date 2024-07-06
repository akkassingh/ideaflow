import mongoose from "mongoose";
import { PRODUCE_TYPE } from "../utils/constants.js";
const Schema = mongoose.Schema;

const ProposalSchema = new mongoose.Schema({
  submittedBy: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  ptitle: {
    type: String,
    required: true,
  },
  plogo: {
    type: String,
  },
  pwebsite: {
    type: String,
  },
  category: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: Schema.Types.Mixed,
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
    },
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
      text: {
        type: String,
        required: true,
      },
      name: {
        type: String,
      },
      avatar: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Proposal", ProposalSchema);
