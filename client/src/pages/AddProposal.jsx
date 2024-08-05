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
      try {
        await customFetch.post("/proposal", formData);
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
      <Form method="post" className="form" encType="multipart/form-data">
        <h4 className="form-title">add proposal</h4>
        <div className="form-center">
          <FormRow type="text" name="title" />
          <FormRow type="text" name="description" />
          <FromRowSelect
            labelText="Domain"
            name="projectDomain"
            defaultValue={PROPOSAL_DOMAINS.COMPUTER_VISION}
            list={Object.values(PROPOSAL_DOMAINS)}
          />
          <FormRowOptional type="url" name="weblink" />
          <FormRowOptional type="text" name="funding_type" />
          <FormRowOptional type="text" name="funding_agency" />
          <FormRow type="file" name="attachments" />
        </div>
        <div>
        <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};

export default AddProposal;
