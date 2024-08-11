import { FormRow, FromRowSelect, FormRowOptional } from "../components";
import { FaUserCircle } from "react-icons/fa";
import Wrapper from "../assets/wrappers/EditProposal.js";
import { useLoaderData, useOutletContext } from "react-router-dom";
import { PROPOSAL_STATUS, PROPOSAL_DOMAINS, FUNDING_TYPE } from ".././utils/constants";
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
    const file = formData.get("attachment");
    if (file && file.size > 500000) {
      file.size > 500000;
      toast.error("Image size is too large");
      return null;
    }
    try {
      await customFetch.put(`/proposal/${params.id}`, formData);
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
  let { _doc, authorProfile } = proposal;
  let {
    title,
    status,
    description,
    domain,
    funding_agency,
    funding_type,
    weblink,
    attachment,
    remarks,
  } = _doc;
  let CanEditPrivilges = false;
  if (user.VerifiedForAdminAccess) {
    CanEditPrivilges = true;
  }
  const fileName = attachment
    ? attachment.substring(attachment.lastIndexOf("/") + 1)
    : "submit attachment";
  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">Edit Proposal</h4>
        <div className="form-center">
          <FormRow type="text" name="title" defaultValue={title} />
          <FormRow type="text" name="description" defaultValue={description} />
          <FormRowOptional type="text" name="weblink" defaultValue={weblink} />
          {/* <FormRow type="file" name="attachment" labelText={attachment} /> */}
          <FormRowOptional type="file" name="attachment" labelText={fileName} />
          <FromRowSelect
            name="domain"
            labelText="domain"
            defaultValue={domain}
            list={Object.values(PROPOSAL_DOMAINS)}
          />
          <FromRowSelect
            name="funding_type"
            labelText="Funding Type"
            defaultValue={funding_type}
            list={[...Object.values(FUNDING_TYPE)]}
          />
          <FormRowOptional
            type="text"
            name="funding_agency"
            labelText="Funding Agency"
            defaultValue={funding_agency}
          />
          {CanEditPrivilges && (
            <>
            <FromRowSelect
              name="status"
              labelText="proposal status"
              defaultValue={status}
              list={Object.values(PROPOSAL_STATUS)}
            />
            <FormRowOptional type="text" name="remarks" defaultValue={remarks} />
            </>
          )}
          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  );
}
