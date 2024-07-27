import { Link, Form, redirect, useNavigate } from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { FormRow, Logo, SubmitBtn } from "../components";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export const action =
  (queryClient) =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
      await customFetch.post("/auth/forgotpassword", data);
      queryClient.invalidateQueries();
      toast.success("Email sent successfully");
      return redirect("/");
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
        <h4>Forget Password</h4>
        <FormRow type="email" name="email" />
        <SubmitBtn />
        <p>
          Not a member yet?
          <Link to="/register" className="member-btn">
            Register
          </Link>
        </p>
        <p>
        Remember your password ?
          <Link to="/login" className="member-btn">
            login
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
}
