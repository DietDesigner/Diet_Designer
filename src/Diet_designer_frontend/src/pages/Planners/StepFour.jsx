import { useState } from "react";
import Input from "../../components/UI/Input";
import SpinnerLoading from "./Spinner";
import { useStep } from "./StepContext";

const StepFour = () => {
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
                  How many times do you want to cook in 7 days?
                </p>
                <div className="flex flex-col gap-2  text-[#141414] text-[14px]">
                  <div>
                    <input
                      type="radio"
                      value="2"
                      className="radio radio-secondary radio-xs"
                      //   checked={formik.values.attendanceRole === "yes"}
                      //   onChange={formik.handleChange}
                      //   onBlur={formik.handleBlur}
                      //   name="attendanceRole"
                    />{" "}
                    <label htmlFor="yes">Once everyday</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      name="attendanceRole"
                      className="radio radio-secondary radio-xs"
                      value="3"
                      //   checked={formik.values.attendanceRole === "no"}
                      //   onChange={formik.handleChange}
                      //   onBlur={formik.handleBlur}
                    />{" "}
                    <label htmlFor="no">Twice everyday</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      name="attendanceRole"
                      value="4"
                      className="radio radio-secondary radio-xs"

                      //   checked={formik.values.attendanceRole === "no"}
                      //   onChange={formik.handleChange}
                      //   onBlur={formik.handleBlur}
                    />{" "}
                    <label htmlFor="no">Thrice everyday</label>
                  </div>
                </div>
                {/* {formik.touched.attendanceRole &&
                formik.errors.attendanceRole ? (
                  <div className="text-[red]">
                    {formik.errors.attendanceRole}
                  </div>
                ) : null} */}
              </div>

              <div className="w-full md:w-[330px] h-[300px] bg-[#ECE6F0] mt-[2rem] pl-[14px] pt-[1rem]">
                <p className="font-[700]">Select meal plan duration</p>
                <div className="flex flex-row justify-between items-center mt-[2rem] border-b-[1px] border-[#79747E] pb-4 ">
                  <p className="font-[700] text-[24px]">Enter dates</p>
                  <img
                    src="/assets/state-layer.svg"
                    width={40}
                    height={40}
                    alt="icon"
                  />
                </div>

                <div className="flex items-center bg-[transparent] p-4 rounded-md mt-[1rem]">
                  <div className="relative w-1/2">
                    <label className="absolute -top-3 left-2 bg-[#f2edf7] text-[#6e47a1] px-1 text-sm">
                      Date
                    </label>
                    <input
                      type="text"
                      placeholder="mm/dd/yyyy"
                      className="w-full p-2 border-2 border-[#6e47a1] rounded-md rounded-tl-none focus:outline-none focus:border-[#6e47a1] bg-[#f2edf7]"
                    />
                  </div>
                  <div className="relative w-1/2 ml-4">
                    <input
                      type="text"
                      placeholder="End date"
                      className="w-full p-2 border-2 border-[#6e47a1] rounded-md focus:outline-none focus:border-[#6e47a1] bg-[#f2edf7]"
                    />
                  </div>
                </div>

                <div className="flex flex-row justify-end gap-[1rem] mt-[2rem] pr-4">
                  <button className="text-[#65558F] font-[500]">Cancel</button>
                  <button className="text-[#65558F] font-[500]">Ok</button>
                </div>
              </div>

              <div className="flex flex-col gap-2 mb-[2rem] mt-[2rem]">
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

export default StepFour;
