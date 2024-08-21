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
import SelectComponent from "../../components/UI/SelectComponent";
import { planData } from "../../data/plan";
import { useStep } from "./StepContext";

export const mainServiceData = [
  "Frontend Developer",
  "Backend Developer",
  "Full-Stack Engineer",
];
const WelcomeScreen = () => {
  const { goToNextStep, formData, updateFormData } = useStep();

  const handleNext = () => {
    updateFormData({ stepOneData: "some data" });
    goToNextStep();
  };

  // const [login, { isLoading }] = useLoginMutation();

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
      <div className="w-full max-w-[400px] px-[2rem] md:mx-[auto] flex flex-col  relative top-[130px] md:top-[150px] z-50">
        <div className="flex flex-col gap-[1rem] 2xl:gap-[3rem] w-[100%]">
          <h1 className="xl:leading-[40px] leading-[35px] w-[100%]  text-left xl:text-[30px] text-[25px] font-bold text-[#101828] ">
            Welcome
          </h1>
          <div className="w-full bg-[#990099] rounded-md flex flex-row justify-center items-center">
            <img src="/assets/add.svg" width={24} height={24} alt="icon" />
            <button
              type="submit"
              className=" text-[#fff] font-[Fira Sans] font-[600] p-2"
              onClick={handleNext}
            >
              Create New Meal Plan
            </button>
          </div>
          <div className="bg-[#ACFFAC] w-full md:w-[191px] h-auto md:h-[136px] rounded-md pt-[1rem] pl-[1rem]">
            <img
              src="/assets/user-octagon.svg"
              width={40}
              height={40}
              alt="oct"
            />

            <p className="text-[20px] text-[#101828] font-[600] mt-[2rem]">
              0 Meal plans
            </p>
          </div>
          <div className="flex flex-col gap-[1rem] w-full">
            <form
              className="flex flex-col gap-2"
              // onSubmit={formik.handleSubmit}
            >
              <SelectComponent
                type={"email"}
                // fieldProps={formik.getFieldProps("emailAddress")}
                // touched={formik.touched.emailAddress}
                // error={formik.errors.emailAddress}
                options={mainServiceData}
                placeholder="My Meal Plans"
                icon={
                  <img
                    src="/assets/export.svg"
                    width={20}
                    height={20}
                    alt="icon"
                    className="relative left-[300px] top-[-30px]"
                  />
                }
              />
            </form>

            <div className="flex flex-row justify-between items-center">
              <p className="text-[#101828] font-[600]">Plans you may like</p>
              <img src="/assets/export.svg" width={19} height={19} alt="" />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-[2rem]">
              {planData?.map((plan, index) => {
                return (
                  <div
                    key={index}
                    className="bg-[#ACFFAC] w-full md:w-[160px] h-auto md:h-[111px] rounded-xl pt-[1rem] pl-[1rem]"
                  >
                    <img src={plan?.logo} width={40} height={40} alt="oct" />

                    <p className="text-[20px] text-[#101828] font-[600] mt-[1rem]">
                      {plan.content}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
