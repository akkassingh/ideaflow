import { FaCalendarDay, FaCriticalRole, FaUserEdit, FaRegTrashAlt } from "react-icons/fa";
import { Link, Form } from "react-router-dom";
import Wrapper from "../assets/wrappers/ProposalTile";
import UserInfo from "./UserInfo";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
day.extend(advancedFormat);

export default function User({
  _id,
  firstName,
  lastName,
  email,
  role,
  VerifiedForAdminAccess,
  createdAt,
  updatedAt
}) {
  const date = day(createdAt).format("MMM Do,YYY");

  return (
    <Wrapper>
      <header>
        <div className="main-icon">{firstName.charAt(0)}</div>
        <div className="info">
          <h5>{role}</h5>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <UserInfo text={firstName} />
          {/* <UserInfo text={lastName} />
          <UserInfo text={email} /> */}
          <UserInfo icon={<FaCriticalRole />} text={role} />
          <UserInfo icon={<FaCriticalRole />} text={VerifiedForAdminAccess} />
          {/* <UserInfo icon={<FaCalendarDay />} text={createdAt} />
          <UserInfo icon={<FaCalendarDay />} text={updatedAt} /> */}
        </div>

        <footer className="actions">
          <Link to={`../edit-user/${_id}`} className="btn edit-btn">
            <FaUserEdit />
          </Link>
          <Form method="post" action={`../delete-user/${_id}`}>
            <button type="submit" className="btn delete-btn">
            <FaRegTrashAlt />
            </button>
          </Form>
        </footer>
      </div>
    </Wrapper>
  );
}
