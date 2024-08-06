import { FormRow, FromRowSelect } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useLoaderData, useParams, useOutletContext } from "react-router-dom";
import { ROLES } from "../utils/constants";
import { Form, useNavigation, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import SubmitBtn from "../components/SubmitBtn";
import { useQuery } from "@tanstack/react-query";

export const singleUserQuery = (id) => {
  return {
    queryKey: ["users", id],
    queryFn: async () => {
      const { data } = await customFetch.get(`/users/${id}`);
      return data;
    },
  };
};

export const loader =
  (queryClient) =>
  async ({ params }) => {
    try {
      await queryClient.ensureQueryData(singleUserQuery(params.id));
      return params.id;
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return redirect("/dashboard/all-users");
    }
  };
export const action =
  (queryClient) =>
  async ({ request, params }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    try {
      await customFetch.patch(`/users/update-user`, data);
      queryClient.invalidateQueries(["users"]);
      toast.success("User edited successfully");
      return redirect("/dashboard/all-users");
    } catch (error) {
      toast.error(error.response.data.message);
      return error;
    }
  };
export default function EditUser() {
  const id = useLoaderData();
  const { user } = useOutletContext();
  const { data: userData } = useQuery(singleUserQuery(id));
  const { VerifiedForAdminAccess, firstName, lastName, email, role } = userData;
  let CanEditPrivilges = false;
  if (user.role === ROLES.ADMIN && user.VerifiedForAdminAccess) {
    CanEditPrivilges = true;
  }
  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">Edit User</h4>
        <div className="form-center">
          <FormRow
            type="text"
            name="firstName"
            labelText="first name"
            defaultValue={firstName}
          />
          <FormRow
            type="text"
            name="lastName"
            labelText="last name"
            defaultValue={lastName}
          />
          <FormRow type="text" name="email" defaultValue={email} />
          <FromRowSelect
            name="role"
            labelText="role"
            defaultValue={role}
            list={Object.values(ROLES)}
          />
          {CanEditPrivilges && (
            <FromRowSelect
            name="VerifiedForAdminAccess"
            labelText="Privilged Access"
            defaultValue={VerifiedForAdminAccess}
            list={["true", "false"]}
          />
          )}
          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  );
}
