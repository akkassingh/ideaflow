import { FormRow, FromRowSelect, FormRowOptional } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useOutletContext } from "react-router-dom";
import { PROPOSAL_DOMAINS, FUNDING_TYPE } from ".././utils/constants";
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
        await customFetch.post("/proposal", data);
        queryClient.invalidateQueries(["proposals"]);
        toast.success("Proposal added successfully");
        return redirect("all-proposals");
      } catch (error) {
        toast.error(error?.response?.data?.error?.message);
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
          <FormRow type="text" name="title" />
          <FormRow type="text" name="description" />
          <FormRowOptional type="url" name="weblink" />
          <FromRowSelect
            labelText="Domain"
            name="domain"
            defaultValue={PROPOSAL_DOMAINS.OTHERS}
            list={Object.values(PROPOSAL_DOMAINS)}
          />
          <FromRowSelect
            labelText="Funding Type"
            name="funding_type"
            defaultValue={FUNDING_TYPE.OTHERS}
            list={[ ...Object.values(FUNDING_TYPE)]}
          />
          <FormRowOptional type="text" name="funding_agency" />
        </div>
        <div>
        <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};

export default AddProposal;
