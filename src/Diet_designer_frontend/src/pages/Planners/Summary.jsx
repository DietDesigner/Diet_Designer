import { useState } from "react";
import SpinnerLoading from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useStep } from "./StepContext";
import { Diet_designer_backend } from "declarations/Diet_designer_backend";
import { toast } from "react-toastify";
import useUtilityService from "../../hooks/UtilityService";
import { Spinner } from "@chakra-ui/react";

const Summary = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { goToPreviousStep, formData, updateFormData } = useStep();
  const { getPrincipalFromLocalStorage } = useUtilityService();
  const principal = getPrincipalFromLocalStorage();
  console.log("principal", principal);
  console.log(formData);
  const handlePrev = () => {
    updateFormData({ stepOneData: "some data" });
    goToPreviousStep();
  };

  const handleGeneratePlan = async () => {
    const UserPreferences = {
      allergies: formData?.allergies,
      country: formData?.country,
      dietary_restrictions: formData?.dietary_restrictions,
      disliked_foods: formData?.disliked_foods,
      favorite_foods: formData?.favorite_foods,
      mealPlan_purpose: formData?.mealPlan_purpose,
    };

    const NutritionalGoals = {
      caloric_intake: formData?.caloric_intake,
    };
    setIsLoading(true);
    try {
      const response = await Diet_designer_backend.createMealPlan(
        formData?.mealTitle,
        UserPreferences,
        NutritionalGoals,
        principal?.__principal__,
        formData?.override
      );
      console.log(response);
      if (response) {
        navigate("/create-meal-plan");
        setTimeout(() => {
          window.location.reload();
        }, 0);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      toast.error(error);
      setIsLoading(false);
    }
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
            <form className="flex flex-col gap-2">
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
                    value={formData?.mealTitle}
                  />
                </div>
                <div className="flex flex-col mb-4">
                  <label className="text-sm font-semibold text-gray-800 mb-2">
                    Calorific Intake
                  </label>
                  <input
                    type="text"
                    id="plan-name"
                    placeholder="Carbohydrate Plan"
                    className="appearance-none border-b-2 border-gray-300 w-full py-2 text-gray-500 focus:outline-none focus:border-gray-500"
                    value={formData?.caloric_intake}
                  />
                </div>
                <div className="flex flex-col mb-4">
                  <label className="text-sm font-semibold text-gray-800 mb-2">
                    Your country
                  </label>
                  <input
                    type="text"
                    id="plan-name"
                    placeholder="Carbohydrate Plan"
                    className="appearance-none border-b-2 border-gray-300 w-full py-2 text-gray-500 focus:outline-none focus:border-gray-500"
                    value={formData?.country}
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
                    value={formData?.mealPlan_purpose}
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
                    value={formData?.dietary_restrictions}
                  />
                </div>
                <div className="flex flex-col mb-4">
                  <label className="text-sm font-semibold text-gray-800 mb-2">
                    Do you have any allergy?
                  </label>
                  <input
                    type="text"
                    id="plan-name"
                    placeholder="2"
                    className="appearance-none border-b-2 border-gray-300 w-full py-2 text-gray-500 focus:outline-none focus:border-gray-500"
                    value={formData?.allergies}
                  />
                </div>
                <div className="flex flex-col mb-4">
                  <label className="text-sm font-semibold text-gray-800 mb-2">
                    Your favorite food
                  </label>
                  <input
                    type="text"
                    id="plan-name"
                    placeholder="Weekly"
                    className="appearance-none border-b-2 border-gray-300 w-full py-2 text-gray-500 focus:outline-none focus:border-gray-500"
                    value={formData?.favorite_foods}
                  />
                </div>
                <div className="flex flex-col mb-4">
                  <label className="text-sm font-semibold text-gray-800 mb-2">
                    Any food you disliked?
                  </label>
                  <input
                    type="text"
                    id="plan-name"
                    placeholder="2"
                    className="appearance-none border-b-2 border-gray-300 w-full py-2 text-gray-500 focus:outline-none focus:border-gray-500"
                    value={formData?.disliked_foods}
                  />
                </div>
                <div className="flex flex-col mb-4">
                  <label className="text-sm font-semibold text-gray-800 mb-2">
                    Generate plan with previous meal plan name?
                  </label>
                  <input
                    type="text"
                    id="plan-name"
                    placeholder="I cook multiple times in the day"
                    className="appearance-none border-b-2 border-gray-300 w-full py-2 text-gray-500 focus:outline-none focus:border-gray-500"
                    value={formData?.override}
                  />
                </div>
              </div>

              <div className="flex flex-row gap-2 mb-[2rem] mt-[2rem]">
                <button
                  className="btn text-[#fff] bg-[#990099] hover:bg-[#F0E6F0] w-[160px] md:w-[161px] h-auto md:h-[44px] border-0 rounded-md p-2"
                  onClick={() => navigate("/")}
                >
                  Edit Plan
                </button>
                {isLoading ? (
                  <button className="btn bg-[transparent] shadow-md border rounded-md text-[#990099] hover:bg-[#F0E6F0] w-[160px] md:w-[161px] h-auto md:h-[44px] border-0 rounded-md p-2">
                    <Spinner
                      thickness="4px"
                      speed="0.65s"
                      emptyColor="gray.200"
                      color="white"
                      size="xs"
                    />
                  </button>
                ) : (
                  <button
                    className="btn bg-[transparent] shadow-md border rounded-md text-[#990099] hover:bg-[#F0E6F0] w-[160px] md:w-[161px] h-auto md:h-[44px] border-0 rounded-md p-2"
                    onClick={handleGeneratePlan}
                  >
                    Generate Plan
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
