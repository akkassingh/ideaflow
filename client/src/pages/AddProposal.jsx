import { FormRow, FromRowSelect, FormRowOptional } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useOutletContext } from "react-router-dom";
import { PROPOSAL_DOMAINS } from ".././utils/constants";
import { Form, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import SubmitBtn from "../components/SubmitBtn";
import { use } from "express/lib/router";

export const action =
  (queryClient) =>
    async ({ request }) => {
      const formData = await request.formData();
      const data = Object.fromEntries(formData);
      console.log("formData is ", data);
      let NewProposal = {
        title: data.title,
        description: data.description,
        urls: data.links,
        domains: [data.projectDomain],
        supervisors: data.supervisors.split(","),
        leader: data.leader,
        members: data.members.split(","),
        funding_type: data.funding_type,
        funding_agency: data.funding_agency,
      };
      console.log("Proposal is ", NewProposal);
      try {
        await customFetch.post("/proposal", NewProposal);
        queryClient.invalidateQueries(["proposals"]);
        toast.success("Proposal added successfully");
        return redirect("all-proposals");
      } catch (error) {
        toast.error(error?.response?.data?.msg);
        return error;
      }
    };
const AddProposal = () => {
  const { user } = useOutletContext();

  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">add proposal</h4>
        <div className="form-center">
        <FormRow type="text" name="Student Name" />
          <FormRow type="text" name="title" />
          <FormRow type="text" name="description" />
          <FromRowSelect
            labelText="Domain"
            name="projectDomain"
            defaultValue={PROPOSAL_DOMAINS.COMPUTER_VISION}
            list={Object.values(PROPOSAL_DOMAINS)}
          />
          <FormRow type="text" name="Email" />
          <FormRow type="text" name="leader" defaultValue={user.email}/>
          <FormRowOptional type="text" name="supervisors" />
          <FormRowOptional type="text" name="members" />
          <FormRowOptional type="text" name="funding_type" />
          <FormRowOptional type="text" name="funding_agency" />
          <FormRow type="text" name="Phone Number" />
          <FormRow type="file" name="Files" />
          <FormRow type="text" name="Comments" />
        </div>
        <div>
        <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};

export default AddProposal;
