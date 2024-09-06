import { useState } from "react";
import Input from "../../components/UI/Input";
import { useStep } from "./StepContext";
import SelectComponent from "../../components/UI/SelectComponent";

const StepThree = () => {
  const [disliked_foods, setDislikedFoods] = useState("");
  const [dietary_restrictions, setDietaryRestrictions] = useState("");
  const [caloric_intake, setCalorificIntake] = useState(0);
  const [override, setOverride] = useState(false);
  const { goToNextStep, goToPreviousStep, formData, updateFormData } =
    useStep();

  const handleNext = () => {
    updateFormData({
      disliked_foods,
      dietary_restrictions,
      override,
      caloric_intake,
    });
    goToNextStep();
  };
  const handlePrev = () => {
    updateFormData({ stepOneData: "some data" });
    goToPreviousStep();
  };

  const dietRest = ["Yes", "No"];
  const overrideData = ["true", "false"];

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
            <form className="flex flex-col gap-2">
              <div className="flex flex-col gap-[1rem]">
                <Input
                  label="Do you have any food you dislike?"
                  type={"text"}
                  placeholder="Enter dislike food"
                  value={disliked_foods}
                  onChange={(e) => setDislikedFoods(e.target.value)}
                />
                <Input
                  label="Whats your calorific intake?"
                  type={"number"}
                  placeholder="Enter calorific intake"
                  value={caloric_intake}
                  onChange={(e) => setCalorificIntake(Number(e.target.value))}
                />
                <SelectComponent
                  label="Do you have any diet restriction?"
                  type={"text"}
                  placeholder="Enter dietary restriction"
                  value={dietary_restrictions}
                  onChange={(e) => setDietaryRestrictions(e.target.value)}
                  options={dietRest}
                />
                <SelectComponent
                  label="Do you want to regenerate with previous meal plan name?"
                  type={"text"}
                  placeholder="Regenerate with previous meal plan name"
                  value={override}
                  onChange={(e) => setOverride(Boolean(e.target.value))}
                  options={overrideData}
                />
              </div>

              <div className="flex flex-col gap-2 mb-[2rem]">
                <button
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
