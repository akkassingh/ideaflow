import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from "react-icons/fa";
import { Link, Form } from "react-router-dom";
import Wrapper from "../assets/wrappers/Proposal";
import ProposalInfo from "./ProposalInfo";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
day.extend(advancedFormat);

export default function Proposal({
  _id,
  position,
  company,
  ProposalLocation,
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
  const date = day(createdAt).format("MMM Do,YYY");

  return (
    <Wrapper>
      <header>
        <div className="main-icon">{title.charAt(0)}</div>
        <div className="info">
          <h5>{position}</h5>
          <p>{company}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <ProposalInfo text={title} />
          <ProposalInfo text={domains} />
          <ProposalInfo icon={<FaLocationArrow />} text={supervisors} />
          <ProposalInfo icon={<FaCalendarAlt />} text={date} />
          <ProposalInfo icon={<FaBriefcase />} text={leader} />
          <ProposalInfo icon={<FaBriefcase />} text={members} />
          <div className={`status ${status}`}>{status}</div>
        </div>

        <footer className="actions">
          <Link to={`../edit-proposal/${_id}`} className="btn edit-btn">
            Edit
          </Link>
          <Form method="post" action={`../delete-propsal/${_id}`}>
            <button type="submit" className="btn delete-btn">
              Delete
            </button>
          </Form>
        </footer>
      </div>
    </Wrapper>
  );
}
