import styled from "styled-components";

const Wrapper = styled.section`
/* Wrapper for the proposal details */
.proposal-details {
  background-color: #fff; /* White background */
  border-radius: 8px; /* Rounded corners */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
  padding: 20px; /* Padding inside the box */
  max-width: 800px; /* Maximum width of the box */
  margin: 20px auto; /* Center the box and add some margin */
  font-family: 'Arial', sans-serif; /* Font family for text */
}

/* Title of the proposal */
.proposal-title {
  font-size: 24px; /* Large font size */
  font-weight: bold; /* Bold font weight */
  color: #333; /* Dark grey color */
  margin-bottom: 20px; /* Space below the title */
}

/* Centering content in the proposal */
.proposal-center {
  display: flex; /* Flexbox for layout */
  flex-direction: column; /* Column layout */
}

/* Individual row in the proposal details */
.proposal-row {
  display: flex; /* Flexbox for row layout */
  justify-content: space-between; /* Space between label and content */
  margin-bottom: 15px; /* Space below each row */
}

/* Label for proposal details */
.proposal-label {
  font-weight: bold; /* Bold font weight */
  color: #555; /* Medium grey color */
  width: 150px; /* Fixed width for labels */
}

/* Content span for proposal details */
.proposal-span {
  flex: 1; /* Take remaining space */
  color: #777; /* Lighter grey color */
  padding-left: 10px; /* Space between label and content */
  word-wrap: break-word; /* Break long words */
}

/* Styling for link buttons (if any are added later) */
.footer-link {
  color: #007bff; /* Bootstrap blue color */
  text-decoration: none; /* Remove underline */
}

.footer-link:hover {
  text-decoration: underline; /* Underline on hover */
}

`;
export default Wrapper;
