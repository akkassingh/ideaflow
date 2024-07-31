import { Link } from "react-router-dom";

export default function Footer() {

  return (
    <div>
      <footer>
        <p>
            For more information, visit our 
            <Link to="/support" className="footer-link
            " >Support</Link> page.
        </p>
    </footer>
    </div>
  );
}
