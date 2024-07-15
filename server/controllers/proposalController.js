import Proposal from "../models/ProposalModel.js";
import User from "../models/UserModel.js";
import { StatusCodes } from "http-status-codes";
import day from "dayjs";

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
        req.body.submittedBy = req.user.userId;
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

const getProposal = async(req, res) => {
  const item = await Proposal.findById(req.params.id);

  res.status(StatusCodes.OK).json(item);
}

const getAllProposals = async (req, res) => {
  const { search, sort } = req.query;

  const queryObject = {};
  
    //any char search for company and position
    if (search) {
      queryObject.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
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

  const items = await Proposal.find(queryObject)
                              .sort(sortKey)
                              .skip(skip)
                              .limit(limit);

  const totalItems = await Proposal.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalItems / limit);

  res.status(StatusCodes.OK).json({ totalItems, numOfPages, currentPage: page, items });
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

const showStats = async (req, res) => {
  let stats = await Proposal.aggregate(
    [
      {
        $group: {
          _id: "$status",
          count: { 
            $sum: 1
          }
        }
      },
  ]);
  console.log("stats are ", stats);
  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});

  const defaultStats = {
    submitted: stats.submitted || 0,
    approved: stats.approved || 0,
    rejected: stats.rejected || 0,
  };

  let monthlyApplications = await Proposal.aggregate([
    {
      $group: {
        _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": -1, "_id.month": -1 } },
    { $limit: 6 },
  ]);
  monthlyApplications = monthlyApplications
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;

      const date = day()
        .month(month - 1)
        .year(year)
        .format("MMM YY");
      return { date, count };
    })
    .reverse();

  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
};


export { addProposal, updatePropsal, deleteProposal, getProposal, getAllProposals, getProposals, showStats };
