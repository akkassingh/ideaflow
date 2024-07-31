import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from "react-icons/fa";
import { Link, Form } from "react-router-dom";
import Wrapper from "../assets/wrappers/Proposal";
import ProposalInfo from "./ProposalInfo";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
day.extend(advancedFormat);

export default function Proposal({
  _id,
  ProposalType,
  createdAt,
  ProposalStatus,
  title,
  description,
  domains,
  supervisors,
  leader,
  members,
  status
}) {
  const date = day(createdAt).format("MMM D, YYYY h:mm A");

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
          <ProposalInfo icon={<FaCalendarAlt />} text={date} />
          <div className={`status ${status}`}>{status}</div>
          <ProposalInfo text={description} />
        </div>

        <footer className="actions">
          <Link to={`../edit-proposal/${_id}`} className="btn edit-btn">
            Edit
          </Link>
          <Form method="post" action={`../delete-proposal/${_id}`}>
            <button type="submit" className="btn delete-btn">
              Delete
            </button>
          </Form>
        </footer>
      </div>
    </Wrapper>
  );
}
