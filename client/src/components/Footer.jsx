import { Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/Footer";

export default function Footer() {

  return (
    <Wrapper>
    <div>
      <footer>
        <p>
            For more information, visit our 
            <Link to="/support" className="footer-link" > <b>Support</b> </Link> page.
        </p>
    </footer>
    </div>
    </Wrapper>
  );
}
