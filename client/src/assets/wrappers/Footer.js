import styled from "styled-components";

const Wrapper = styled.section`
  /* Footer container */
footer {
  background-color: #f8f9fa; /* Light grey background */
  padding: 2px; /* Some padding around the content */
  text-align: center; /* Center-align text */
  border-top: 1px solid #e9ecef; /* Light grey border at the top */
  font-family: Arial, sans-serif; /* Font family for the text */
}

/* Paragraph inside the footer */
footer p {
  margin: 0; /* Remove default margins */
  color: #6c757d; /* Grey text color */
  font-size: 14px; /* Font size */
}

/* Link inside the footer */
.footer-link {
  color: #a82a23; /* Bootstrap blue color */
  text-decoration: none; /* Remove underline */
}

.footer-link:hover {
  text-decoration: underline; /* Underline on hover */
}
`;
export default Wrapper;
