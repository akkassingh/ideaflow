import Proposal from "../models/ProposalModel.js";
import User from "../models/UserModel.js";
import { StatusCodes } from "http-status-codes";

const addProposal = async (req, res) => {
  function getUsersFromEmails(emailArr) {
    return User.onlyExisting().getByEmails(emailArr);
  }
  Promise.all([
    getUsersFromEmails(req.body.supervisors),
    getUsersFromEmails(req.body.members),
    getUsersFromEmails([req.body.leader]),
  ])
    .then(([supervisors, members, [leader]]) => {
      if (supervisors.length != req.body.supervisors.length) {
        res.status(400).send({
          message: "One or more invalid emails for supervisors",
        });
      } else if (members.length != req.body.members.length) {
        res.status(400).send({
          message: "One or more invalid emails for members",
        });
      } else if (leader == null) {
        res.status(400).send({
          message: "Invalid leader email",
        });
      } else {
        req.body.supervisors = supervisors;
        req.body.members = members;
        req.body.leader = leader;
        const proposal = new Proposal(req.body);
        proposal
          .save()
          .then((resource) => {
            res.status(201).send({
              id: resource._id,
              url: resource.url,
              message: "Proposal created",
            });
          })
          .catch((error) => {
            res.status(StatusCodes.BAD_REQUEST).json({ error });
          });
      }
    })
    .catch((error) => {
      res.status(StatusCodes.BAD_REQUEST).json({ error });
    });
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


export { addProposal, updatePropsal, deleteProposal, getAllProposals, getProposals };
