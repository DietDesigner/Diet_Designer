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
import StepFour from "./StepFour";
import { useStep } from "./StepContext";

const StepThree = () => {
  const { goToNextStep, goToPreviousStep, formData, updateFormData } =
    useStep();

  const handleNext = () => {
    updateFormData({ stepOneData: "some data" });
    goToNextStep();
  };
  const handlePrev = () => {
    updateFormData({ stepOneData: "some data" });
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
    <div>
      <div className="w-full max-w-[400px] px-[2rem] md:mx-[auto] flex flex-col  relative top-[10rem]  z-50">
        <div className={`flex flex-col gap-[1rem] 2xl:gap-[3rem] w-[100%] `}>
          <img
            src="/assets/arrow-left.svg"
            alt="al"
            width={24}
            height={24}
            onClick={handlePrev}
          />

          <div className="flex flex-col gap-[1rem] w-full">
            <form
              className="flex flex-col gap-2"
              // onSubmit={formik.handleSubmit}
            >
              <div>
                <p className="mt-[40px] text-[#141414] text-[14px] font-[600]">
                  How many times do you cook per day?
                </p>
                <div className="flex flex-col gap-2  text-[#141414] text-[14px]">
                  <div>
                    <input
                      type="radio"
                      value="2"
                      className="radio radio-xs radio-secondary"
                      //   checked={formik.values.attendanceRole === "yes"}
                      //   onChange={formik.handleChange}
                      //   onBlur={formik.handleBlur}
                      //   name="attendanceRole"
                    />{" "}
                    <label htmlFor="yes">2</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      name="attendanceRole"
                      className="radio radio-xs radio-secondary"
                      value="3"
                      //   checked={formik.values.attendanceRole === "no"}
                      //   onChange={formik.handleChange}
                      //   onBlur={formik.handleBlur}
                    />{" "}
                    <label htmlFor="no">3</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      name="attendanceRole"
                      className="radio radio-xs radio-secondary"
                      value="4"
                      //   checked={formik.values.attendanceRole === "no"}
                      //   onChange={formik.handleChange}
                      //   onBlur={formik.handleBlur}
                    />{" "}
                    <label htmlFor="no">4</label>
                  </div>

                  <div>
                    <input
                      type="radio"
                      value="Other"
                      name="attendingAs"
                      className="radio radio-xs radio-secondary"
                      //   checked={formik.values.attendingAs === "Other"}
                      //   onChange={handleAttendingAsChange}
                      //   onBlur={formik.handleBlur}
                    />
                    <label className="pl-1">Other</label>
                    {/* {formik.values.attendingAs === "Other" && (
                      <input
                        type="text"
                        className="w-[30%] border-0 border-b-2 border-gray-400 bg-transparent focus:border-[#15265E] focus:outline-none ml-2"
                        value={attendingAsOther}
                        onChange={(e) => setAttendingAsOther(e.target.value)}
                        onBlur={formik.handleBlur}
                        name="attendingAsOther"
                      />
                    )} */}
                  </div>
                </div>
                {/* {formik.touched.attendanceRole &&
                formik.errors.attendanceRole ? (
                  <div className="text-[red]">
                    {formik.errors.attendanceRole}
                  </div>
                ) : null} */}

                <p className="mt-[40px] text-[#141414] text-[14px] font-[600]">
                  How often do you cook?
                </p>
                <div className="flex flex-col gap-2  text-[#141414] text-[14px]">
                  <div>
                    <input
                      type="radio"
                      value="2"
                      className="radio radio-xs radio-secondary"
                      //   checked={formik.values.attendanceRole === "yes"}
                      //   onChange={formik.handleChange}
                      //   onBlur={formik.handleBlur}
                      //   name="attendanceRole"
                    />{" "}
                    <label htmlFor="yes">Daily</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      name="attendanceRole"
                      value="3"
                      className="radio radio-xs radio-secondary"
                      //   checked={formik.values.attendanceRole === "no"}
                      //   onChange={formik.handleChange}
                      //   onBlur={formik.handleBlur}
                    />{" "}
                    <label htmlFor="no">Weekly</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      name="attendanceRole"
                      value="4"
                      className="radio radio-xs radio-secondary"
                      //   checked={formik.values.attendanceRole === "no"}
                      //   onChange={formik.handleChange}
                      //   onBlur={formik.handleBlur}
                    />{" "}
                    <label htmlFor="no">Monthly</label>
                  </div>
                </div>
              </div>
              <div>
                <p className="mt-[40px] text-[#141414] text-[14px] font-[600]">
                  Which method applies to you?
                </p>
                <div className="flex flex-col gap-2  text-[#141414] text-[14px]">
                  <div>
                    <input
                      type="radio"
                      value="2"
                      className="radio radio-xs radio-secondary"
                      //   checked={formik.values.attendanceRole === "yes"}
                      //   onChange={formik.handleChange}
                      //   onBlur={formik.handleBlur}
                      //   name="attendanceRole"
                    />{" "}
                    <label htmlFor="yes">
                      I cook all my meals in one session
                    </label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      name="attendanceRole"
                      value="3"
                      className="radio radio-xs radio-secondary"
                      //   checked={formik.values.attendanceRole === "no"}
                      //   onChange={formik.handleChange}
                      //   onBlur={formik.handleBlur}
                    />{" "}
                    <label htmlFor="no">I cook multiple times in a day</label>
                  </div>

                  <div>
                    <input
                      type="radio"
                      value="Other"
                      name="attendingAs"
                      className="radio radio-xs radio-secondary"
                      //   checked={formik.values.attendingAs === "Other"}
                      //   onChange={handleAttendingAsChange}
                      //   onBlur={formik.handleBlur}
                    />
                    <label className="pl-1">Other</label>
                    {/* {formik.values.attendingAs === "Other" && (
                      <input
                        type="text"
                        className="w-[30%] border-0 border-b-2 border-gray-400 bg-transparent focus:border-[#15265E] focus:outline-none ml-2"
                        value={attendingAsOther}
                        onChange={(e) => setAttendingAsOther(e.target.value)}
                        onBlur={formik.handleBlur}
                        name="attendingAsOther"
                      />
                    )} */}
                  </div>
                </div>
                {/* {formik.touched.attendanceRole &&
                formik.errors.attendanceRole ? (
                  <div className="text-[red]">
                    {formik.errors.attendanceRole}
                  </div>
                ) : null} */}

                <div className="flex flex-col gap-2  text-[#141414] text-[14px] mt-[1rem]">
                  <Input
                    type="text"
                    placeholder="Search here..."
                    label="Input your preferred meals:"
                  />
                  <div className="relative bottom-[40px] left-[10px]">
                    <img
                      src="/assets/Icon-left.svg"
                      width={20}
                      height={20}
                      alt="search-icon"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-[-2rem]">
                <div className="flex flex-row flex-wrap cursor-pointer mb-[2rem] items-center gap-[.5rem]">
                  <div className="rounded-xl border p-2">Rice</div>
                  <div className="rounded-xl border p-2">Spaghetti</div>
                  <div className="rounded-xl border p-2">Stew</div>
                  <div className="rounded-xl border p-2">Porridge</div>
                </div>
              </div>

              <div className="flex flex-col gap-2 mb-[2rem]">
                <button
                  //   type="submit"
                  className="btn text-[#fff] bg-[#990099] hover:bg-[#F0E6F0] w-[100%] border-0 rounded-md p-2"
                  onClick={handleNext}
                >
                  Next
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepThree;
