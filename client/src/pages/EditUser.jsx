import { FormRow, FromRowSelect } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useLoaderData, useParams } from "react-router-dom";
import { ROLES } from "../utils/constants";
import { Form, useNavigation, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import SubmitBtn from "../components/SubmitBtn";
import { useQuery } from "@tanstack/react-query";

const singleUserQuery = (id) => {
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
  const { data: user } = useQuery(singleUserQuery(id));
  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">Edit User</h4>
        <div className="form-center">
          <FormRow
            type="text"
            name="firstName"
            labelText="first name"
            defaultValue={user.firstName}
          />
          <FormRow
            type="text"
            name="lastName"
            labelText="last name"
            defaultValue={user.lastName}
          />
          <FormRow type="text" name="email" defaultValue={user.email} />
          <FormRow type="text" name="role" defaultValue={user.role} />
          {(user.role === "admin" && user.VerifiedForAdminAccess) ? (
            <FromRowSelect
              name="VerifiedForAdminAccess"
              labelText="Privilged Access"
              defaultValue={user.VerifiedForAdminAccess}
              list={["true", "false"]}
            />
          ) : null}
          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  );
}
