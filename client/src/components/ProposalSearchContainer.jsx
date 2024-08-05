import { FormRow, FromRowSelect, SubmitBtn } from ".";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { Form, useSubmit, Link } from "react-router-dom";
import {
  PROPOSAL_DOMAINS,
  PROPOSAL_STATUS,
  PROPOSAL_SORT_BY,
} from "../utils/constants";
import { useAllProposalsContext } from "../pages/AllProposals";

export default function ProposalSearchContainer() {
  const { searchValues } = useAllProposalsContext();
  const { search, proposalStatus, proposalDomain, sort } = searchValues;
  const submit = useSubmit();
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
      <Form className="form">
        <h5 className="form-title">search form</h5>
        <div className="form-center">
          <FormRow
            type="search"
            name="search"
            defaultValue={search}
            onChange={debounce((form) => {
              submit(form);
            })}
          />
          <FromRowSelect
            labelText="proposal status"
            name="proposalStatus"
            list={["all", ...Object.values(PROPOSAL_STATUS)]}
            defaultValue={proposalStatus}
            onChange={(e) => {
              submit(e.currentTarget.form);
            }}
          />
          <FromRowSelect
            labelText="proposal Domains"
            name="proposalDomain"
            list={["all", ...Object.values(PROPOSAL_DOMAINS)]}
            defaultValue={proposalDomain}
            onChange={(e) => {
              submit(e.currentTarget.form);
            }}
          />
          <FromRowSelect
            name="sort"
            defaultValue={sort}
            list={[...Object.values(PROPOSAL_SORT_BY)]}
            onChange={(e) => {
              submit(e.currentTarget.form);
            }}
          />
          <Link
            to="/dashboard/all-proposals"
            className="btn form-btn delete-btn"
          >
            Reset Search Values
          </Link>
        </div>
      </Form>
    </Wrapper>
  );
}
