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
  FIN_TECH: "fintech",
  MACHINE_LEARNING: "machine_learning",
  WEB_DEVELOPMENT: "web_development",
  IOT: "iot",
  COMPUTER_VISION: "computer_vision",
  NLP: "NLP",
  CYBERSECURITY: "cybersecurity",
};

export const PROPOSAL_STATUS = {
  SUBMITTED: "Submitted",
  APPROVED: "Approved",
  "REJECTED": "Rejected"
};

export const EMAIL_TEMPLATES = (URL) => (
  {
  FORGET_PASSWORD: `<h1>You have requested a password reset</h1>
    <p>Please go to this link to reset your password</p>
    <h5>Password reset link valid for 10 min</h5>
    <a href="${URL}" clicktracking="off">${URL}</a>`,
  ROLE_ASSIGNMENT: `<h1>You have requested an admin role</h1>
    <p>An Admin will review your request shortly.</p>
    <h5>You will receive an email once your registration request is approved.</h5>
    <a href="${URL}" clicktracking="off">${URL}</a>`
  }
);