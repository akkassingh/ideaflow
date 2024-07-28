import styled from "styled-components";
import Wrapper from "../assets/wrappers/LandingPage";
import innovify2 from "../assets/images/ino1.png";
import "../index.css";
import { Link } from "react-router-dom";
import Logo from "../components/logo";

export default function Landing() {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div>
          <h1>
          Proposal <span>Submission</span> App
          </h1>
          <p>
            A platform for students to submit their proposals for projects and
            get them approved by supervisors.
          </p>
          <Link to="/register" className="btn register-link">
            Register
          </Link>
          <Link to="/login" className="btn">
            LogIn
          </Link>
        </div>
        <img src={innovify2} alt="hunt" className="img main-img" />
      </div>
    </Wrapper>
  );
}
