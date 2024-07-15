import { FormRow, FromRowSelect } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useLoaderData, useParams } from "react-router-dom";
import { PROPOSAL_STATUS, PROPOSAL_DOMAINS, PROPOSAL_SORT_BY } from ".././utils/constants";
import { Form, useNavigation, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import SubmitBtn from "../components/SubmitBtn";
import { useQuery } from "@tanstack/react-query";

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
export const action =
  (queryClient) =>
  async ({ request, params }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    try {
      await customFetch.put(`/proposal/${params.id}`, data);
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
  const {
    data: proposal,
  } = useQuery(singleProposalQuery(id));
  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">Edit Proposal</h4>
        <div className="form-center">
          <FormRow type="text" name="Title" defaultValue={proposal.title} />
          <FormRow type="text" name="Description" defaultValue={proposal.description} />
          <FormRow type="text" name="Domains" defaultValue={proposal.domains} />
          <FormRow type="text" name="Supervisors" defaultValue={proposal.supervisors} />
          <FormRow type="text" name="Leader" defaultValue={proposal.leader} />
          <FormRow type="text" name="Members" defaultValue={proposal.members} />
          <FormRow type="text" name="Funding Type" defaultValue={proposal.funding_type} />
          <FormRow type="text" name="Funding Agency" defaultValue={proposal.funding_agency} />
          <FormRow type="text" name="Approved On" defaultValue={proposal.approved_on} />
          <FormRow type="text" name="Rejected By" defaultValue={proposal.rejected_on} />
          <FormRow type="text" name="Remarks" defaultValue={proposal.remarks} />
          <FromRowSelect
            name="proposalType"
            labelText="proposal type"
            defaultValue={proposal.status}
            list={Object.values(PROPOSAL_STATUS)}
          />
          <FromRowSelect
            name="Domain"
            labelText="proposal Domain"
            defaultValue={proposal.domains}
            list={Object.values(PROPOSAL_DOMAINS)}
          />
          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  );
}
