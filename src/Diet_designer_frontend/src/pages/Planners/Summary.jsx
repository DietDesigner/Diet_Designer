import { useState } from "react";
import SpinnerLoading from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useStep } from "./StepContext";

const Summary = () => {
  const navigate = useNavigate();
  const { goToPreviousStep, formData, updateFormData } = useStep();

  const handlePrev = () => {
    updateFormData({ stepOneData: "some data" });
    goToPreviousStep();
  };
  return (
    <div>
      <div className="w-full max-w-[400px] px-[2rem] md:mx-[auto] flex flex-col  relative top-[10rem]  z-50">
        <div className={`flex flex-col gap-[1rem] 2xl:gap-[3rem] w-[100%]`}>
          <img
            src="/assets/arrow-left.svg"
            alt="al"
            width={24}
            height={24}
            onClick={handlePrev}
          />

          <p className="font-[600]">Input Summary</p>

          <div className="flex flex-col gap-[1rem] w-full">
            <form
              className="flex flex-col gap-2"
              // onSubmit={formik.handleSubmit}
            >
              <div>
                <div className="flex flex-col mb-4">
                  <label className="text-sm font-semibold text-gray-800 mb-2">
                    Plan Name
                  </label>
                  <input
                    type="text"
                    id="plan-name"
                    placeholder="Carbohydrate Plan"
                    className="appearance-none border-b-2 border-gray-300 w-full py-2 text-gray-500 focus:outline-none focus:border-gray-500"
                  />
                </div>
                <div className="flex flex-col mb-4">
                  <label className="text-sm font-semibold text-gray-800 mb-2">
                    Reason for plans
                  </label>
                  <input
                    type="text"
                    id="plan-name"
                    placeholder="Carbohydrate Plan"
                    className="appearance-none border-b-2 border-gray-300 w-full py-2 text-gray-500 focus:outline-none focus:border-gray-500"
                  />
                </div>
                <div className="flex flex-col mb-4">
                  <label className="text-sm font-semibold text-gray-800 mb-2">
                    Are you on diet?
                  </label>
                  <input
                    type="text"
                    id="plan-name"
                    placeholder="Yes"
                    className="appearance-none border-b-2 border-gray-300 w-full py-2 text-gray-500 focus:outline-none focus:border-gray-500"
                  />
                </div>
                <div className="flex flex-col mb-4">
                  <label className="text-sm font-semibold text-gray-800 mb-2">
                    How many times do you plan to eat per day?
                  </label>
                  <input
                    type="text"
                    id="plan-name"
                    placeholder="2"
                    className="appearance-none border-b-2 border-gray-300 w-full py-2 text-gray-500 focus:outline-none focus:border-gray-500"
                  />
                </div>
                <div className="flex flex-col mb-4">
                  <label className="text-sm font-semibold text-gray-800 mb-2">
                    How often do you cook?
                  </label>
                  <input
                    type="text"
                    id="plan-name"
                    placeholder="Weekly"
                    className="appearance-none border-b-2 border-gray-300 w-full py-2 text-gray-500 focus:outline-none focus:border-gray-500"
                  />
                </div>
                <div className="flex flex-col mb-4">
                  <label className="text-sm font-semibold text-gray-800 mb-2">
                    How many times per day do you cook?
                  </label>
                  <input
                    type="text"
                    id="plan-name"
                    placeholder="2"
                    className="appearance-none border-b-2 border-gray-300 w-full py-2 text-gray-500 focus:outline-none focus:border-gray-500"
                  />
                </div>
                <div className="flex flex-col mb-4">
                  <label className="text-sm font-semibold text-gray-800 mb-2">
                    Which method applies to you?
                  </label>
                  <input
                    type="text"
                    id="plan-name"
                    placeholder="I cook multiple times in the day"
                    className="appearance-none border-b-2 border-gray-300 w-full py-2 text-gray-500 focus:outline-none focus:border-gray-500"
                  />
                </div>
                <div className="flex flex-col mb-4">
                  <label className="text-sm font-semibold text-gray-800 mb-2">
                    Input your preferred meals
                  </label>
                  <input
                    type="text"
                    id="plan-name"
                    placeholder="I cook multiple times in the day"
                    className="appearance-none border-b-2 border-gray-300 w-full py-2 text-gray-500 focus:outline-none focus:border-gray-500"
                  />
                </div>
                <div className="flex flex-col mb-4">
                  <label className="text-sm font-semibold text-gray-800 mb-2">
                    How many times do you want to cook in 7 days?
                  </label>
                  <input
                    type="text"
                    id="plan-name"
                    placeholder="Twice Everyday"
                    className="appearance-none border-b-2 border-gray-300 w-full py-2 text-gray-500 focus:outline-none focus:border-gray-500"
                  />
                </div>

                <div className="w-full md:w-[330px] h-[90px] rounded-md bg-[#ECE6F0] mt-[2rem] pl-[14px] pt-[1rem]">
                  <div className="flex items-center bg-[transparent] p-4 rounded-md">
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
                </div>
              </div>

              <div className="flex flex-row gap-2 mb-[2rem] mt-[2rem]">
                <button
                  //   type="submit"
                  className="btn bg-[transparent] shadow-md border rounded-md text-[#990099] hover:bg-[#F0E6F0] w-[160px] md:w-[161px] h-auto md:h-[44px] border-0 rounded-md p-2"
                  onClick={() => navigate("/")}
                >
                  Edit Plan
                </button>
                <button
                  //   type="submit"
                  className="btn text-[#fff] bg-[#990099] hover:bg-[#F0E6F0] w-[160px] md:w-[161px] h-auto md:h-[44px] border-0 rounded-md p-2"
                  onClick={() => navigate("/")}
                >
                  Generate Plan
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
