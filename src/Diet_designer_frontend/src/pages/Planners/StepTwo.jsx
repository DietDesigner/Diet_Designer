import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CircularProgress } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { useStep } from "./StepContext";
import Input from "../../components/UI/Input";

const StepTwo = () => {
  const [mealPlan_purpose, setMealPlanPurpose] = useState("");
  const [allergies, setAllergies] = useState("");
  const [favorite_foods, setFavouriteFoods] = useState("");
  const { goToNextStep, goToPreviousStep, updateFormData } = useStep();

  const handleNext = () => {
    updateFormData({ mealPlan_purpose, allergies, favorite_foods });
    goToNextStep();
  };
  const handlePrev = () => {
    updateFormData({ stepOneData: "some data" });
    goToPreviousStep();
  };

  return (
    <div>
      <div className="w-full max-w-[400px] px-[2rem] md:mx-[auto] flex flex-col  relative top-[10rem]  z-50 ">
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
                  label="Enter meal plan purpose"
                  type={"text"}
                  placeholder="Enter meal plan purpose"
                  value={mealPlan_purpose}
                  onChange={(e) => setMealPlanPurpose(e.target.value)}
                />
                <Input
                  label="Do you have any allergy?"
                  type={"text"}
                  placeholder="Enter an allergy"
                  value={allergies}
                  onChange={(e) => setAllergies(e.target.value)}
                />
                <Input
                  label="Enter your favorite food"
                  type={"text"}
                  placeholder="Enter favorite food"
                  value={favorite_foods}
                  onChange={(e) => setFavouriteFoods(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-2 mb-[2rem] mt-[3rem]">
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

export default StepTwo;
