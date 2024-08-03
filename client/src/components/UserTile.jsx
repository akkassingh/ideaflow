import { FaCalendarAlt, FaEye, FaScrewdriver, FaTrash,FaUniversalAccess } from "react-icons/fa";
import { Link, Form, useOutletContext } from "react-router-dom";
import Wrapper from "../assets/wrappers/UserTile";
import UserInfo from "./UserInfo";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
day.extend(advancedFormat);

export default function ProposalTile({
  _id,
  firstName,
  email,
  role,
  VerifiedForAdminAccess,
  createdAt,
  updatedAt,
  avatar,
}) {
  const lastUpdated = day(updatedAt).format("MMM D, YYYY h:mm A");

  return (
    <Wrapper>
      <header>
      {avatar ? (
          <img src={avatar} alt='avatar' className='user-avatar' />
        ) : (
          <div className="main-icon">{firstName.charAt(0)}</div>
        )}
        <div className="info">
          {/* <h5>{firstName}</h5> */}
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <UserInfo icon={`First Name `} text={firstName} />
          <UserInfo icon={<FaCalendarAlt />} text={lastUpdated} />
          <UserInfo text={email} />
          <UserInfo text={role} />
          <UserInfo icon={<FaUniversalAccess /> } text={VerifiedForAdminAccess.toString()} />
        </div>
          <footer className="actions">
            <Link to={`../edit-user/${_id}`} className="btn edit-btn">
              <FaScrewdriver />
            </Link>
            <Form method="post" action={`../delete-user/${_id}`}>
              <button type="submit" className="btn delete-btn">
                <FaTrash />
              </button>
            </Form>
            <Link to={`../view-user/${_id}`} className="btn view-btn">
              <FaEye />
            </Link>
          </footer>
      </div>
    </Wrapper>
  );
}
