import { Link, Form, redirect, useNavigate, useParams } from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { FormRow, Logo, SubmitBtn } from "../components";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export const action =
  (queryClient) =>
  async ({ request, params }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
      console.log(" data is ", request.params);
      await customFetch.put(`/auth/resetpassword/${params.resetToken}`, data);
      queryClient.invalidateQueries();
      toast.success("Password Updated successfully");
      return redirect("/login");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return error;
    }
  };
export default function ForgetPassword() {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>Reset Password</h4>
        <FormRow type="password" name="password" />
        <SubmitBtn />
        <p>
          Not a member yet?
          <Link to="/login" className="member-btn">
            login
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
}
