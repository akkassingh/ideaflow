export const STATE_OPTIONS = [
  { label: "Select A State", value: "Select A State" },
  { label: "Alabama", value: "AL" },
  { label: "Alaska", value: "AK" },
  { label: "Arizona", value: "AZ" },
  { label: "Arkansas", value: "AR" },
  { label: "California", value: "CA" },
  { label: "Colorado", value: "CO" },
  { label: "Connecticut", value: "CT" },
  { label: "Delaware", value: "DE" },
  { label: "Florida", value: "FL" },
  { label: "Georgia", value: "GA" },
  { label: "Hawaii", value: "HI" },
  { label: "Idaho", value: "ID" },
  { label: "Illinois", value: "IL" },
  { label: "Indiana", value: "IN" },
  { label: "Iowa", value: "IA" },
  { label: "Kansas", value: "KS" },
  { label: "Kentucky", value: "KY" },
  { label: "Louisiana", value: "LA" },
  { label: "Maine", value: "ME" },
  { label: "Maryland", value: "MD" },
  { label: "Massachusetts", value: "MA" },
  { label: "Michigan", value: "MI" },
  { label: "Minnesota", value: "MN" },
  { label: "Mississippi", value: "MS" },
  { label: "Missouri", value: "MO" },
  { label: "Montana", value: "MT" },
  { label: "Nebraska", value: "NE" },
  { label: "Nevada", value: "NV" },
  { label: "New Hampshire", value: "NH" },
  { label: "New Jersey", value: "NJ" },
  { label: "New Mexico", value: "NM" },
  { label: "New York", value: "NY" },
  { label: "North Carolina", value: "NC" },
  { label: "North Dakota", value: "ND" },
  { label: "Ohio", value: "OH" },
  { label: "Oklahoma", value: "OK" },
  { label: "Oregon", value: "OR" },
  { label: "Pennsylvania", value: "PN" },
  { label: "Rhode Island", value: "RI" },
  { label: "South Carolina", value: "SC" },
  { label: "South Dakota", value: "SD" },
  { label: "Tennessee", value: "TN" },
  { label: "Texas", value: "TX" },
  { label: "Utah", value: "UT" },
  { label: "Vermont", value: "VT" },
  { label: "Virginia", value: "VA" },
  { label: "Washington", value: "WA" },
  { label: "Washington DC", value: "DC" },
  { label: "West Virginia", value: "WV" },
  { label: "Wisconsin", value: "WI" },
  { label: "Wyoming", value: "WY" },
];

export const USER_ROLES = {
  USER: "user",
  FACULTY: "faculty",
  ADMIN: "admin"
}

export const PROPOSAL_SORT_BY = {
  NEWES_FIRST: "newest",
  OLDEST_FIRST: "oldest",
  ASCENDING: "a-z",
  DESCENDING: "z-a",
};

export const PROPOSAL_DOMAINS = {
  FIN_TECH: "Fintech",
  MACHINE_LEARNING: "Machine Learning",
  WEB_DEVELOPMENT: "Web Development",
  IOT: "iot",
  COMPUTER_VISION: "Computer Vision",
  NLP: "NLP",
  CYBERSECURITY: "Cybersecurity",
  BLOCKCHAIN: "Blockchain",
  CLOUD_COMPUTING: "Cloud Computing",
  DATA_SCIENCE: "Data Science",
  OTHERS: "Others"
};

export const PROPOSAL_STATUS = {
  SUBMITTED: "Submitted",
  APPROVED: "Approved",
  "REJECTED": "Rejected"
};

export const EMAIL_TEMPLATES = (BASE_URL, data) => (
  {
  FORGET_PASSWORD: `<h1>You have requested a password reset</h1>
    <p>Please go to this link to reset your password</p>
    <h5>Password reset link valid for 10 min</h5>
    <a href="${BASE_URL}" clicktracking="off">${BASE_URL}</a>`,
  ROLE_ASSIGNMENT: `<h1>You have requested an admin role</h1>
    <p>An Admin will review your request shortly.</p>
    <h5>You will receive an email once your registration request is approved.</h5>
    <a href="${BASE_URL}" clicktracking="off">${BASE_URL}</a>`,
  PROPOSAL_SUBMITTED_SUCCESS: `<h2>Congratulations!</h2>
    <p>Your propoal has been Submitted successfully.</p>
    <p>The Current Status of your submisstion is ${data.status}. Next Steps, A Faculty Member will review your proposal and take the required action.</p>
    <p>Best regards,</p>
    <p>From ${process.env.APP_DISPLAY_NAME}</p>
    `,
  NOTIFY_NEW_PROPOSAL_SUBMITTED  : `<h2>${data.title} Submitted</h2>
    <p>A New Propoal has been Submitted.</p>
    <a href="${BASE_URL}/dashboard/edit-proposal/${JSON.stringify(data._id)}" clicktracking="off">${APP_DISPLAY_NAME}</a>
    <p>Best regards,</p>
    <p>From ${process.env.APP_DISPLAY_NAME}</p>`,
  }
);

export const APP_DISPLAY_NAME = process.env.APP_DISPLAY_NAME;
export const APP_BASE_URL = process.env.APP_BASE_URL;