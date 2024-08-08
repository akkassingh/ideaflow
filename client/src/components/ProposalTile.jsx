import { FaCalendarAlt, FaEye, FaScrewdriver, FaTrash, FaGlobe } from "react-icons/fa";
import { Link, Form, useOutletContext } from "react-router-dom";
import Wrapper from "../assets/wrappers/ProposalTile";
import ProposalInfo from "./ProposalInfo";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
day.extend(advancedFormat);

export default function 
ProposalTile({
  _id,
  title,
  updatedAt,
  status,
  domain,
  submittedBy,
  description
}) {
  const lastUpdated = day(updatedAt).format("MMM D, YYYY h:mm A");
  const { user } = useOutletContext();
  let CanEditPrivilges = false;
  if ((user.role === "admin" && user.VerifiedForAdminAccess) || user._id === submittedBy) {
    CanEditPrivilges = true;
  }

  return (
    <Wrapper>
      <header>
        <div className="main-icon">{title.charAt(0)}</div>
        <div className="info">
          <h5>{title}</h5>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <ProposalInfo icon={<FaCalendarAlt />} text={lastUpdated} />
          <ProposalInfo icon={<FaGlobe />} text={domain} />
          <ProposalInfo text={`${description.substring(0, 50)} ...`} />
          <div className={`status ${status.toLowerCase()}`}>{status}</div>
        </div>
        {CanEditPrivilges ? (
          <footer className="actions">
            <Link to={`../edit-proposal/${_id}`} className="btn edit-btn">
              <FaScrewdriver />
            </Link>
            <Form method="post" action={`../delete-proposal/${_id}`}>
              <button type="submit" className="btn delete-btn">
                <FaTrash />
              </button>
            </Form>
            <Link to={`../view-proposal/${_id}`} className="btn view-btn"><FaEye /></Link>
          </footer>
        ) : (
          <footer className="actions">
            <Link to={`../view-proposal/${_id}`} className="btn view-btn">
              <FaEye />
            </Link>
          </footer>
        )}
      </div>
    </Wrapper>
  );
}
