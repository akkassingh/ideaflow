import { redirect } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export const action =
  (queryClient) =>
  async ({ params }) => {
    try {
      await customFetch.delete(`/users/${params.id}`);
      queryClient.invalidateQueries(["users"]);
      toast.success("user privilige updated successfully");
    } catch (error) {
      toast.error(error.response.data.msg);
    }
    return redirect("/dashboard/all-users");
  };
export default function DeleteUser() {
  return (
    <div>
      <h1>Delete User</h1>
    </div>
  );
}
