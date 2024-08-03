import { FormRow, FromRowSelect } from "../components";
import { FaUserCircle } from "react-icons/fa";
import Wrapper from "../assets/wrappers/EditProposal.js";
import { useLoaderData, useOutletContext, useSubmit } from "react-router-dom";
import { PROPOSAL_STATUS, PROPOSAL_DOMAINS } from ".././utils/constants";
import { Form, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import SubmitBtn from "../components/SubmitBtn";
import { useQuery } from "@tanstack/react-query";

const singleProposalQuery = (id) => {
  return {
    queryKey: ["proposal", id],
    queryFn: async () => {
      const { data } = await customFetch.get(`/proposal/${id}`);
      if (data.leader) {
        const response = await customFetch.get(`/users/${data.leader}`);
        data.leaderProfile = response.data;
      }
      if (data.submittedBy) {
        const response = await customFetch.get(`/users/${data.leader}`);
        data.submittedByProfile = response.data;
      }
      if (data.members && data.members.length > 0) {
        const membersProfiles = await Promise.all(
          data.members.map(async (member) => {
            const response = await customFetch.get(`/users/${member}`);
            return response.data;
          })
        );
        data.membersProfiles = membersProfiles;
      }
      if (data.supervisors && data.supervisors.length > 0) {
        const supervisorsProfiles = await Promise.all(
          data.supervisors.map(async (supervisor) => {
            const response = await customFetch.get(`/users/${supervisor}`);
            return response.data;
          })
        );
        data.supervisorsProfiles = supervisorsProfiles;
      }
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
export const action =
  (queryClient) =>
  async ({ request, params }) => {
    const formData = await request.formData();
    console.log("formData is ", formData);
    const file = formData.get("attachement");
    if (file && file.size > 500000) {
      toast.error("File size is too large");
      return null;
    }
    const data = Object.fromEntries(formData);
    console.log("data is ", data);
    const updatedProposal = {
      title: data.title,
      description: data.description,
      domains: data.domains ? data.domains.split(",") : [],
      supervisors: data.supervisors ? data.supervisors.split(",") : [],
      leader: data.leader,
      submittedBy: data.submittedBy,
      members: data.members ? data.members.split(",") : [],
      funding_type: data.funding_type,
      funding_agency: data.funding_agency,
      status: data.status,
    };

    try {
      await customFetch.put(`/proposal/${params.id}`, updatedProposal);
      queryClient.invalidateQueries(["proposal"]);
      toast.success("Proposal edited successfully");
      return redirect("/dashboard/all-proposals");
    } catch (error) {
      toast.error(error.response.data.msg);
      return error;
    }
  };
export default function EditProposal() {
  const id = useLoaderData();
  const { data: proposal } = useQuery(singleProposalQuery(id));
  const { user } = useOutletContext();

  

  const debounce = (onChange) => {
    let timeout;
    return (e) => {
      const form = e.currentTarget.form;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        onChange(form);
      }, 2000);
    };
  };

  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">Edit Proposal</h4>
        <div className="form-center">
          <FormRow type="text" name="title" defaultValue={proposal.title} />
          <FormRow
            type="text"
            name="description"
            defaultValue={proposal.description}
          />
          <FormRow
            type="search"
            name="leader"
            defaultValue={proposal.leaderProfile?.email || proposal.leaderProfile?.firstName}
            onChange={debounce((form) => {
              search(form);
            })}
          />
          
          {proposal.membersProfiles && proposal.membersProfiles.length > 0 ? (
            proposal.membersProfiles.map((member) =>
              member.avatar ? (
                <img
                  src={member.avatar}
                  alt={member.firstName}
                  className="img"
                  key={member.id || member.firstName} // Use a unique identifier here
                />
              ) : (
                <div className="main-icon">{member.firstName.charAt(0)}</div>
              )
            )
          ) : (
            <FormRow type="text" name="members" />
          )}
          {proposal.supervisorsProfiles &&
          proposal.supervisorsProfiles.length > 0 ? (
            <div style={{ margin: 10 }}>
              <label className="form-label" htmlFor="supervisors">
                Supervisors
              </label>
              {proposal.supervisorsProfiles.map((supervisor) =>
                supervisor.avatar ? (
                  <img
                    src={supervisor.avatar}
                    alt={supervisor.firstName}
                    className="img"
                    key={supervisor.id || supervisor.firstName} // Use a unique identifier here
                  />
                ) : (
                  <div className="main-icon">{supervisor.firstName.charAt(0)}</div>
                )
              )}
            </div>
          ) : (
            <FormRow type="text" name="supervisors" />
          )}
          <FromRowSelect
            name="domains"
            labelText="Domains"
            defaultValue={proposal.domains[0]}
            list={Object.values(PROPOSAL_DOMAINS)}
          />
          <FormRow
            type="text"
            name="funding_type"
            labelText="Funding Type"
            defaultValue={proposal.funding_type}
          />
          <FormRow
            type="text"
            name="funding_agency"
            labelText="Funding Agency"
            defaultValue={proposal.funding_agency}
          />
          <label htmlFor="attachement" className="form-label">
            Select Attachement(Max 0.5MB)
          </label>
          <input
            type="file"
            id="attachement"
            className="form-input"
            name="attachement"
          />
          {(user.role === "admin" && user.VerifiedForAdminAccess) ? (
            <FromRowSelect
              name="status"
              labelText="proposal status"
              defaultValue={proposal.status}
              list={Object.values(PROPOSAL_STATUS)}
            />
          ) : (
            <></>
          )}
          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  );
}
