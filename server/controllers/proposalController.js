import Proposal from "../models/ProposalModel.js";
import { StatusCodes } from "http-status-codes";

const getAllProposals = async (req, res) => {
  const { sort } = req.query;

  const queryObject = {};
  
  const sortOptions = {
    newest: "-createdAt",
    oldest: "createdAt",
    "a-z": "position",
    "z-a": "-position",
  };

  const sortKey = sortOptions[sort] || sortOptions.newest;

  const items = await Proposal.find().sort({ done: 1 });

  const totalItems = await Proposal.countDocuments(queryObject);

  res.status(StatusCodes.OK).json({ totalItems, items });
};

const getProposals = async (req, res) => {
  const { sort } = req.query;

  const queryObject = {
    submittedBy: req.user.userId,
  };

  const sortOptions = {
    newest: "-createdAt",
    oldest: "createdAt",
    "a-z": "position",
    "z-a": "-position",
  };

  const sortKey = sortOptions[sort] || sortOptions.newest;

  const items = await Proposal.find(queryObject).sort({ done: 1 });

  const totalItems = await Proposal.countDocuments(queryObject);

  res.status(StatusCodes.OK).json({ totalItems, items });
};

const addProposal = async (req, res) => {
  // since we passed along the userId by adding it in middleware, we can assign it to 'createdBy' and add
  req.body.submittedBy = req.user.userId;
  const item = await Proposal.create(req.body);
  res.status(StatusCodes.CREATED).json({ item });
};

const updatePropsal = async (req, res) => {
  const updatedItem = await Proposal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(StatusCodes.OK).json({ item: updatedItem });
};

const deleteProposal = async (req, res) => {
  const removedItem = await Proposal.findByIdAndDelete(req.params.id);

  res.status(StatusCodes.OK).json({ item: removedItem });
};

export { addProposal, updatePropsal, deleteProposal, getAllProposals, getProposals };
