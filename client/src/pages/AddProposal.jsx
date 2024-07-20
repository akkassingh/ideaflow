import { FormRow, FromRowSelect } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useOutletContext } from "react-router-dom";
import { PROPOSAL_DOMAINS } from ".././utils/constants";
import { Form, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import SubmitBtn from "../components/SubmitBtn";

export const action =
  (queryClient) =>
    async ({ request }) => {
      const formData = await request.formData();
      const data = Object.fromEntries(formData);
      console.log("data is ", data);
      let payload = {
        title: data.title,
        description: data.description,
        domains: data.domains,
        supervisors: data.supervisors?.length > 0,
        leader: data.leader,
        members: data.members?.length > 0 ,
        funding_type: data?.funding_type,
        funding_agency: data?.funding_agency
      }
      let sampleload = {
        "title": "Refined Granite Towels",
        "description": "modi",
        "domains": [
            "web_development"
        ],
        "supervisors": [
            "mona@fanshawe.com"
        ],
        "leader": "akkassingh@gmail.com",
        "members": [
            "Damion.Kessler@hotmail.com"
        ],
        "funding_type": "internal",
        "funding_agency": "SSN Trust"
    };
      try {
        await customFetch.post("/proposal", sampleload);
        queryClient.invalidateQueries(["proposals"]);
        toast.success("Proposal Added added successfully");
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
          <FormRow type="text" name="title" />
          <FormRow type="text" name="description" />
          <FromRowSelect
            labelText="Domain"
            name="projectDomain"
            defaultValue={PROPOSAL_DOMAINS.COMPUTER_VISION}
            list={Object.values(PROPOSAL_DOMAINS)}
          />
          <FormRow type="text" name="supervisors" />
          <FormRow type="text" name="leader" />
          <FormRow type="text" name="members" />
          <FormRow type="text" name="funding_type" />
          <FormRow type="text" name="funding_agency" />
          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};

export default AddProposal;
