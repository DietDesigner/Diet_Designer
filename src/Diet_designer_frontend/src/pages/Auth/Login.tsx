import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { useFormik } from "formik";
// import { loginSchema } from "../utils/validation";
import { Link, useNavigate } from "react-router-dom";
// import { loginErrorHandler } from "../utils/errorHandler";
import { toast } from "react-toastify";
// import { useLoginMutation } from "../redux/slices/apiSlice";
import { CircularProgress } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
// import { setCredentials } from "../redux/slices/authSlice";
import Input from "../../components/UI/Input";

const Login = () => {
  const [visible, setVisible] = useState(false);

  // const [login, { isLoading }] = useLoginMutation();

  const handleVisible = () => {
    setVisible(!visible);
  };

  // const dispatch = useDispatch();
  // const navigate = useNavigate();

  // const handleLogin = async (values: any) => {
  //   try {
  //     const response = await login(values).unwrap();
  //     console.log(response);
  //     dispatch(setCredentials(response));
  //     navigate("/user-profile");
  //   } catch (err) {
  //     console.log(err);
  //     const loginError = loginErrorHandler(err);
  //     toast.error(loginError);
  //   }
  // };

  // const formik = useFormik({
  //   initialValues: {
  //     emailAddress: "",
  //     password: "",
  //   },
  //   validationSchema: loginSchema,
  //   onSubmit: (values) => {
  //     handleLogin(values);
  //   },
  // });

  return (
    <div>
      <div className="w-full max-w-[400px] px-[2rem] md:mx-[auto] flex flex-col justify-center items-center relative top-[130px] md:top-[150px] z-50">
        <div className="flex flex-col justify-center items-center gap-[1rem] 2xl:gap-[3rem] w-[100%]">
          <h1 className="xl:leading-[40px] leading-[35px] w-[100%] lg:text-center text-center xl:text-[30px] text-[25px] font-bold text-[#101828] ">
            Welcome Back!
          </h1>
          <p className="text-[#808080]">Enter your login details</p>
          <div className="flex flex-col gap-[1rem] w-full">
            <form
              className="flex flex-col gap-2"
              // onSubmit={formik.handleSubmit}
            >
              <Input
                label="Email Address"
                type={"email"}
                // fieldProps={formik.getFieldProps("emailAddress")}
                // touched={formik.touched.emailAddress}
                // error={formik.errors.emailAddress}
                className="input-placeholder"
                placeholder="Enter your email address"
                icon={
                  <img
                    src="/assets/emailIcon.svg"
                    width={20}
                    height={20}
                    alt="icon"
                  />
                }
              />
              <div className="flex flex-col gap-2">
                <Input
                  // className="pl-3"
                  label={"Password"}
                  type={!visible ? "password" : "text"}
                  icon={!visible ? <FaRegEyeSlash /> : <FaRegEye />}
                  onClick={handleVisible}
                  placeholder="Enter your password"
                  // fieldProps={formik.getFieldProps("password")}
                  // touched={formik.touched.password}
                  // error={formik.errors.password}
                />
                <div className="flex flex-row justify-between items-center">
                  <div className="flex flex-row gap-[.2rem]">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="checkbox"
                    />
                    <p className="text-[#808080]">Remember Me</p>
                  </div>

                  <Link
                    className="flex justify-end text-sm text-[#990099]"
                    to="forgot-password-talent"
                  >
                    Forgot Pin
                  </Link>
                </div>
              </div>
              <div className="flex flex-col gap-2 mt-[2rem]">
                <button
                  type="submit"
                  className="btn text-[#fff] bg-[#990099] hover:bg-[#F0E6F0] w-[100%] border-0 rounded-md p-2"
                >
                  {/* {isLoading ? (
                    <CircularProgress isIndeterminate size={"10"} />
                  ) : (
                    "Sign In"
                  )} */}
                  Sign In
                </button>
                <p className="text-center text-sm mt-1">
                  Don't have an account?{" "}
                  <Link
                    className="text-[#990099] font-[500] text-md"
                    to="/sign-up"
                  >
                    Sign up
                  </Link>{" "}
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
