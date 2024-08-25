import { useState } from "react";
import Input from "../../components/UI/Input";
import { useStep } from "./StepContext";
import useUtilityService from "../../hooks/UtilityService";

export const mainServiceData = [
  "Frontend Developer",
  "Backend Developer",
  "Full-Stack Engineer",
];
const CreatePlans = () => {
  const [mealTitle, setMealTitle] = useState("");
  const [country, setCountry] = useState("");

  const { goToNextStep, goToPreviousStep, updateFormData } = useStep();

  const handleNext = () => {
    updateFormData({ mealTitle, country });
    goToNextStep();
  };

  const handlePrev = () => {
    goToPreviousStep();
  };

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
            <form className="flex flex-col gap-2">
              <Input
                label="Name your new plan"
                type={"text"}
                placeholder="Enter the name of your plan"
                value={mealTitle}
                onChange={(e) => setMealTitle(e.target.value)}
              />
              <Input
                label="Enter your country"
                type={"text"}
                placeholder="Enter your country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </form>

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
