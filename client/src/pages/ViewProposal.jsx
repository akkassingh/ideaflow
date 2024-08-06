import { FaUserCircle } from "react-icons/fa";
import Wrapper from "../assets/wrappers/ViewProposal.js";
import {
  useLoaderData,
  useOutletContext,
  Link,
  redirect,
} from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { useQuery } from "@tanstack/react-query";
import ProposalInfo from "../components/ProposalInfo";
import { singleUserQuery } from "./EditUser";
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
  } = proposal;
  const authorProfile = useQuery(singleUserQuery(submittedBy));
  const lastUpdated = day(updatedAt).format("MMM D, YYYY h:mm A");

  let CanEditPrivilges = false;
  if (user.VerifiedForAdminAccess) {
    CanEditPrivilges = true;
  }

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
            <label className="proposal-label">domain:</label>
            <span className="proposal-span">{domain}</span>
          </div>
          <div className="proposal-row">
            <label className="proposal-label">funding Type:</label>
            <span className="proposal-span">{funding_agency}</span>
          </div>
          <div className="proposal-row">
            <label className="proposal-label">funding Type:</label>
            <span className="proposal-span">{funding_type}</span>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
