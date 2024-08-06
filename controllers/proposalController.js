import Proposal from "../models/ProposalModel.js";
import User from "../models/UserModel.js";
import { StatusCodes } from "http-status-codes";
import day from "dayjs";
import sendEmail from "../utils/sendEmail.js";

const APP_DISPLAY_NAME = process.env.APP_DISPLAY_NAME || "Ideaflow";
const APP_BASE_URL = process.env.APP_BASE_URL;

const addProposal = async (req, res) => {
  let user = req.user;
  req.body.submittedBy = user.userId;
  let queryObject = { role: "faculty" };
  const faculties = await User.find(queryObject);
  console.log(faculties.length);
  console.log(faculties[0].email);
  const proposal = new Proposal(req.body);
  proposal
    .save()
    .then((resource) => {
      // sending confirmation email to user
      sendEmail({
        to: "akkassingh@gmail.com",
        // to: user.email,
        subject: `Proposal ${resource.title} Submitted`,
        text: `<h2>Congratulations!</h2>
                    <p>Your proposal has been Submitted successfully.</p>
                    <p>The Current Status of your submission is <b>${resource.status}</b>. Next Steps, A Faculty Member will review your proposal and take the required action.</p>
                    <p>Best regards,</p>
                    <p>${APP_DISPLAY_NAME}</p>`,
      });
      if (faculties.length > 0) {
        faculties.forEach((faculty) => {
          sendEmail({
            to: "akkassingh@gmail.com",
            // to: faculty.email,
            subject: `New Proposal ${resource.title} Submitted`,
            text: `<h2>New Proposal Submitted</h2>
                    <p>Dear ${faculty.firstName}, .</p>
                    <p>A New Propoal has been Submitted by ${user.firstName}</p>
                    <a href="${APP_BASE_URL}/dashboard/edit-proposal/${JSON.stringify(
              resource._id
            )}" clicktracking="off">${resource.title}-${APP_DISPLAY_NAME}</a>
                    <p>Best regards,</p>
                    <p>From ${APP_DISPLAY_NAME}</p>`,
          });
        });
      }
      res.status(201).send({
        id: resource._id,
        message: "Proposal created",
      });
    })
    .catch((error) => {
      res.status(StatusCodes.BAD_REQUEST).json({ error });
    });
};

const updatePropsal = async (req, res) => {
  const obj = { ...req.body };
  const updatedItem = await Proposal.findByIdAndUpdate(req.params.id, obj, {
    new: true,
  });
  res.status(StatusCodes.OK).json({ item: updatedItem });
};

const deleteProposal = async (req, res) => {
  const removedItem = await Proposal.findByIdAndDelete(req.params.id);

  res.status(StatusCodes.OK).json({ item: removedItem });
};

const getProposal = async (req, res) => {
  const item = await Proposal.findById(req.params.id);

  res.status(StatusCodes.OK).json(item);
};

const getAllProposals = async (req, res) => {
  const { search, sort, proposalStatus, proposalDomain } = req.query;

  const queryObject = {};

  //any char search for company and position
  if (search) {
    queryObject.$or = [
      { title: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ];
  }
  if (proposalStatus && proposalStatus !== "all") {
    queryObject.status = { $regex: proposalStatus, $options: "i" };
  }
  if (proposalDomain && proposalDomain !== "all") {
    queryObject.domain = { $elemMatch: { $eq: proposalDomain } };
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

  res
    .status(StatusCodes.OK)
    .json({ totalItems, numOfPages, currentPage: page, items });
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
  let stats = await Proposal.aggregate([
    {
      $group: {
        _id: "$status",
        count: {
          $sum: 1,
        },
      },
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

export {
  addProposal,
  updatePropsal,
  deleteProposal,
  getProposal,
  getAllProposals,
  getProposals,
  showStats,
};
