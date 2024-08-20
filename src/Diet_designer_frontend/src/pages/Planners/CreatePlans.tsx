import { useState } from "react";
import { useFormik } from "formik";
// import { loginSchema } from "../utils/validation";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CircularProgress } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import Input from "../../components/UI/Input";

import { useStep } from "./StepContext";

export const mainServiceData = [
  "Frontend Developer",
  "Backend Developer",
  "Full-Stack Engineer",
];
const CreatePlans = () => {
  const [selectedStates, setSelectedStates] = useState(
    Array(7).fill(false) // Assuming you have 7 divs to manage
  );

  const handleToggle = (index: number) => {
    // Toggle the selected state of the clicked div
    const updatedStates = selectedStates.map((selected, i) =>
      i === index ? !selected : selected
    );
    setSelectedStates(updatedStates);
  };
  const {
    goToNextStep,
    goToPreviousStep,
    formData,
    updateFormData,
    currentStep,
  } = useStep();

  const handleNext = () => {
    updateFormData({ stepOneData: "some data" });
    goToNextStep();
  };

  const handlePrev = () => {
    goToPreviousStep();
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
    <div className={``}>
      <div className="w-full max-w-[400px] px-[2rem] md:mx-[auto] flex flex-col  relative top-[130px] md:top-[150px] z-50">
        <div className={`flex flex-col gap-[1rem] 2xl:gap-[3rem] w-[100%]  `}>
          <img
            src="/assets/arrow-left.svg"
            alt="al"
            width={24}
            height={24}
            onClick={handlePrev}
            className="cursor-pointer"
          />

          <div className="bg-[#D9D9D9] w-full md:w-[330px] h-[264px] rounded-md pt-[1rem] pl-[1rem]"></div>
          <div className="flex flex-col gap-[1rem] w-full">
            <form
              className="flex flex-col gap-2"
              // onSubmit={formik.handleSubmit}
            >
              <Input
                label="Name your new plan"
                type={"text"}
                // fieldProps={formik.getFieldProps("emailAddress")}
                // touched={formik.touched.emailAddress}
                // error={formik.errors.emailAddress}
                placeholder="Enter the name of your plan"
              />
            </form>

            <p className="font-[600] ">Why do you want a new plan?</p>
            <div className="flex flex-row flex-wrap cursor-pointer mb-[2rem] items-center gap-[.5rem]">
              {[
                "Weight",
                "Scheduling",
                "Monthly",
                "Snacks",
                "Snacks",
                "Weight",
                "Weight",
              ].map((item, index) => (
                <div
                  key={index}
                  className={`rounded-xl border p-2 ${
                    selectedStates[index]
                      ? "border-[#CC400C] bg-[#FBF1F1] flex flex-row"
                      : ""
                  }`}
                  onClick={() => handleToggle(index)}
                >
                  {item}
                  <img
                    src="/assets/multiply.svg"
                    width={18}
                    height={18}
                    alt=""
                    className={`${selectedStates[index] ? "block" : "hidden"}`}
                  />
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-2 mb-[2rem]">
              <button
                type="submit"
                className="btn text-[#fff] bg-[#990099] hover:bg-[#F0E6F0] w-[100%] border-0 rounded-md p-2"
                onClick={handleNext}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePlans;
