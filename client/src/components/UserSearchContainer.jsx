import { FormRow, FromRowSelect, SubmitBtn } from ".";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { Form, useSubmit, Link } from "react-router-dom";
import { ROLES, USER_SORT_BY } from "../utils/constants";
import { useAllUsersContext } from "../pages/AllUsers";

export default function UserSearchContainer() {
  const { searchValues } = useAllUsersContext();
  const { search, role, sort, VerifiedForAdminAccess } = searchValues;
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
        <h5 className="form-title">Search Users</h5>
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
            labelText="User Role"
            name="role"
            list={["all", ...Object.values(ROLES)]}
            defaultValue={role}
            onChange={(e) => {
              submit(e.currentTarget.form);
            }}
          />
          <FromRowSelect
            labelText="Verified"
            name="VerifiedForAdminAccess"
            list={["all", "true", "false"]}
            defaultValue={VerifiedForAdminAccess}
            onChange={(e) => {
              submit(e.currentTarget.form);
            }}
          />
          <FromRowSelect
            name="sort"
            defaultValue={sort}
            list={[...Object.values(USER_SORT_BY)]}
            onChange={(e) => {
              submit(e.currentTarget.form);
            }}
          />
          <Link to="/dashboard/admin" className="btn form-btn delete-btn">
            Reset Search Values
          </Link>
        </div>
      </Form>
    </Wrapper>
  );
}
