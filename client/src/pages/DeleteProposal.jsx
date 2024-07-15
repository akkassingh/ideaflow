import { redirect } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export const action =
  (queryClient) =>
  async ({ params }) => {
    try {
      await customFetch.delete(`/proposal/${params.id}`);
      queryClient.invalidateQueries(["proposal"]);
      toast.success("proposal deleted successfully");
    } catch (error) {
      toast.error(error.response.data.msg);
    }
    return redirect("/dashboard/all-proposals");
  };
export default function DeleteProposal() {
  return (
    <div>
      <h1>Delete Proposal</h1>
    </div>
  );
}
