import Promise from "promise"
import mongoose from "mongoose";

var Schema = mongoose.Schema;

// Validations to consider
// - rejected_on and approved_on should NOT BOTH be Non-NULL!
// - setup a trigger/autorun to make on or the other null, if the other is forcefully non-nulled
// - (add on...)
var ProposalSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      maxLength: 100,
    },
    description: {
      type: String,
    },
    domains: {
      type: [
        {
          type: String,
          enum: [
            "fintech",
            "machine_learning",
            "web_development",
            "iot",
            "computer_vision",
            "nlp",
            "cybersecurity",
          ],
        },
      ],
      required: true,
    },
    supervisors: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      ],
      validate: {
        validator: function (given_proj) {
          var current_proposal = this;
          return new Promise(function (resolve, reject) {
            current_proposal.populate("supervisors").then((populated_data) => {
              var allFaculties = true;
              var supervisorsList = populated_data.supervisors;
              supervisorsList.forEach((supervisor) => {
                console.log(supervisor.role);
                if (supervisor.role != "faculty") {
                  allFaculties = false;
                }
              });
              return resolve(allFaculties);
            });
          });
        },
        message: (props) => `All supervisors must be faculty`,
      },
      required: true,
    },
    // the user type of leader determines if project is Student project or Faculty project
    leader: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    members: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      ],
      validate: {
        validator: function (given_proj) {
          var current_proposal = this;
          return new Promise(function (resolve, reject) {
            var memberList = current_proposal.members;
            var leaderEmail = current_proposal.leader.email;
            var existed = false;
            console.log(leaderEmail);
            memberList.forEach(function (member) {
              if (member.email == leaderEmail) {
                existed = true;
              }
            });

            if (existed) {
              return resolve(false);
            } else {
              return resolve(true);
            }
          });
        },
        message: (props) =>
          `Duplicate entry for leader found in members list. Mention only once`,
      },
      required: true,
    },
    funding_type: {
      type: String,
      enum: ["internal", "external"],
      required: true,
    },
    funding_agency: {
      type: String,
      required: true,
    },
    approved_on: {
      type: Date,
      default: null,
    },
    rejected_on: {
      type: Date,
      default: null,
      validate: {
        validator: function (given_proj) {
          var current_proposal = this;
          return new Promise(function (resolve, reject) {
            var result = true;
            if (
              current_proposal.rejected_on != null &&
              current_proposal.approved_on != null
            ) {
              result = false;
            }
            // console.log(result)
            return resolve(result);
          });
        },
        message: (props) =>
          `Either rejected or approved date should be mentioned but not both!`,
      },
      message: (props) =>
        `Either rejected or approved date should be mentioned but not both!`,
    },
    remarks: {
      type: String,
    },
    status: {
      type: String,
      enum: ["submitted", "approved", "rejected"],
      default: "submitted",
    }
  }
);

// Chain <ModelName>.onlyExisting before any query to list only "non-deleted" records
ProposalSchema.statics.onlyExisting = function () {
  return this.find().onlyExisting();
};

ProposalSchema.query.onlyExisting = function () {
  return this.find({
    deleted_at: null,
  });
};

// --

ProposalSchema.statics.Id = function (id) {
  return this.find().getById();
};

ProposalSchema.query.getById = function (id) {
  return this.find({
    _id: id,
  });
};

// --

ProposalSchema.methods.isApproved = function () {
  return this.rejected_on != null && this.approved_on == null;
};

ProposalSchema.methods.isRejected = function () {
  return this.rejected_on == null && this.approved_on != null;
};

ProposalSchema.methods.isAwaitingDecision = function () {
  return this.rejected_on == null && this.approved_on == null;
};

// --

// virtual for executive members
ProposalSchema.virtual("executive_members").get(function () {
  var all_members = [];
  all_members = all_members.concat([leader], members);
  return all_members;
});

// virtual for executive members
ProposalSchema.virtual("all_members").get(function () {
  var all_members = [];
  all_members = all_members.concat(executive_members, supervisors);
  return all_members;
});

ProposalSchema.virtual("document_base64").get(function () {
  console.log(this.pdf_document);
  if (this.pdf_document) {
    return Buffer.from(this.pdf_document).toString("base64");
  } else {
    return null;
  }
});

// virtual for user URL
ProposalSchema.virtual("url").get(function () {
  return "/api/proposal/" + this._id;
});

//Export model
export default mongoose.model("Proposal", ProposalSchema);
