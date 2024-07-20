import Proposal from "../models/ProposalModel.js";
import User from "../models/UserModel.js";
import { StatusCodes } from "http-status-codes";
import day from "dayjs";
import sendEmail from "../utils/sendEmail.js";
import {EMAIL_TEMPLATES} from "../utils/constants.js";

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
      if (leader == null) {
        res.status(400).send({
          message: "Invalid leader email",
        });
      } else {
        req.body.supervisors = supervisors;
        req.body.members = members;
        req.body.leader = leader;
        req.body.submittedBy = req.user.userId;
        let FRONTEND_APP_BASE_URL = process.env.FRONTEND_APP_BASE_URL
        const proposal = new Proposal(req.body);
        proposal
          .save()
          .then((resource) => {
            sendEmail({
              to: "akkassingh@gmail.com",
              // to: user.email,
              subject: `Proposal ${resource.title} Submitted Successfuly`,
              text: `<h2>Congratulations!</h2>
                    <p>Your proposal has been Submitted successfully.</p>
                    <p>The Current Status of your submission is <b>${resource.status}</b>. Next Steps, A Faculty Member will review your proposal and take the required action.</p>
                    <p>Best regards,</p>
                    <p>${process.env.APP_DISPLAY_NAME}</p>`,
            });
            sendEmail({
              to: "akkassingh@gmail.com",
              // to: user.email,
              subject: `Proposal ${resource.title} Submitted`,
              text: `<h2>${resource.title} Submitted</h2>
                    <p>A New Propoal has been Submitted by ${resource.leader.firstName}</p>
                    <a href="${FRONTEND_APP_BASE_URL}/dashboard/edit-proposal/${JSON.stringify(resource._id)}" clicktracking="off">${resource.title}-${process.env.APP_DISPLAY_NAME}</a>
                    <p>Best regards,</p>
                    <p>From ${process.env.APP_DISPLAY_NAME}</p>`,
            });
            res.status(201).send({
              id: resource._id,
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
