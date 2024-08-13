import styled from "styled-components";

const Wrapper = styled.section`
  border-radius: var(--border-radius);
  width: 100%;
  background: var(--background-secondary-color);
  padding: 3rem 2rem 4rem;

  .proposal-title {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 20px;
    text-align: center;
  }

  .proposal-center {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .proposal-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #e0e0e0;
    padding: 10px 0;
  }

  .proposal-label {
    font-weight: 600;
    flex-basis: 30%;
  }

  .proposal-span {
    flex-basis: 70%;
    display: flex;
    align-items: center;
    justify-content: space-between; /* Ensures content is distributed between left and right */
  }

  .details {
    display: flex;
    flex-direction: column;
    align-items: flex-start; /* Aligns name and email to the left */
  }

  .img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    object-fit: cover;
    margin-left: 10px;
    display: inline-block;
  }

  .proposal-span a {
    text-decoration: none;
  }

  .proposal-span a:hover {
    text-decoration: underline;
  }

  h2.proposal-title {
    text-align: center;
    font-size: 2em;
  }

  .proposal-row .proposal-span a {
    text-decoration: none;
    display: inline-flex;
    align-items: center;
  }

  .proposal-row .proposal-span a:hover {
    text-decoration: underline;
  }

  .proposal-row .proposal-span a svg {
    margin-left: 5px;
  }
`;

export default Wrapper;
