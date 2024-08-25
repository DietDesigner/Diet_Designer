import { useStep } from "./StepContext";
import StepThree from "./StepThree";
import StepTwo from "./StepTwo";
import CreatePlans from "./CreatePlans";
import StepFour from "./StepFour";
import Summary from "./Summary";
import WelcomeScreen from "./WelcomeScreen";

export const BaseStep = () => {
  const { currentStep } = useStep();

  return (
    <div>
      {currentStep === 0 && <WelcomeScreen />}
      {currentStep === 1 && <CreatePlans />}
      {currentStep === 2 && <StepTwo />}
      {currentStep === 3 && <StepThree />}
      {/* {currentStep === 4 && <StepFour />} */}
      {currentStep === 4 && <Summary />}
    </div>
  );
};
