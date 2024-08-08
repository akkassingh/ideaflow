import { FaUserCircle, FaRegFile } from "react-icons/fa";
import Wrapper from "../assets/wrappers/ViewTiles.js";
import {
  useLoaderData,
  useOutletContext,
  Link,
  redirect,
  NavLink,
} from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { useQuery } from "@tanstack/react-query";
import ProposalInfo from "../components/ProposalInfo";
import { FaCalendarAlt, FaScrewdriver } from "react-icons/fa";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
day.extend(advancedFormat);

const singleProposalQuery = (id) => {
  return {
    queryKey: ["proposal", id],
    queryFn: async () => {
      const { data } = await customFetch.get(`/proposal/${id}`);
      return data;
    },
  };
};
export const loader =
  (queryClient) =>
  async ({ params }) => {
    try {
      await queryClient.ensureQueryData(singleProposalQuery(params.id));
      return params.id;
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return redirect("/dashboard/all-proposals");
    }
  };

export default function ViewProposal() {
  const id = useLoaderData();
  const { data: proposal } = useQuery(singleProposalQuery(id));
  const { user } = useOutletContext();
  let {  _doc, authorProfile
  } = proposal;
  let {
    title,
    updatedAt,
    status,
    submittedBy,
    description,
    domain,
    createdAt,
    funding_agency,
    funding_type,
    weblink,
    attachment,
  } = _doc;

  const lastUpdated = day(updatedAt).format("MMM D, YYYY h:mm A");

  let CanEditPrivilges = false;
  if (user.VerifiedForAdminAccess) {
    CanEditPrivilges = true;
  }

  const fileName = attachment.substring(attachment.lastIndexOf('/') + 1);

  return (
    <Wrapper>
      <div className="proposal-details">
        <h2 className="proposal-title">{title}</h2>
        <div className="proposal-center">
          <div className="proposal-row">
            <label className="proposal-label">description:</label>
            <span className="proposal-span">{description}</span>
          </div>
          <div className="proposal-row">
            <label className="proposal-label">status:</label>
            <span className="proposal-span">{status}</span>
          </div>
          <div className="proposal-row">
            <label className="proposal-label">submittedBy:</label>
            {authorProfile.avatar ? (
          <img src={authorProfile.avatar} alt="avatar" className="img" />
        ) : (
          <FaUserCircle />
        )}
            <span className="proposal-span">{authorProfile.firstName}, {authorProfile.lastName}</span>
            <span className="proposal-span">{authorProfile.email}</span>
          </div>
          <div className="proposal-row">
            <label className="proposal-label">domain:</label>
            <span className="proposal-span">{domain}</span>
          </div>
          <div className="proposal-row">
            <label className="proposal-label">funding Agency:</label>
            <span className="proposal-span">{funding_agency}</span>
          </div>
          <div className="proposal-row">
            <label className="proposal-label">funding Type:</label>
            <span className="proposal-span">{funding_type}</span>
          </div>
          <div className="proposal-row">
            <label className="proposal-label">weblink:</label>
            <span className="proposal-span">{weblink}</span>
          </div>
          <div className="proposal-row">
            <label className="proposal-label">last updated:</label>
            <span className="proposal-span">{lastUpdated}</span>
            </div>
          <div className="proposal-row">
            <label className="proposal-label">attachment:</label>
            <NavLink to={attachment}>
              {fileName} <FaRegFile />
            </NavLink>
            </div>
        </div>
      </div>
    </Wrapper>
  );
}
