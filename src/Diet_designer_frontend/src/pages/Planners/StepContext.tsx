import React, { createContext, useState, useContext } from "react";

interface StepData {
  goToNextStep: () => void;
  formData: object;
  updateFormData: (newData: any) => void;
  currentStep: number;
  goToPreviousStep: () => void;
}
// Create a context for the steps
const StepContext = createContext<StepData | null>(null);

export const useStep = () => {
  const context = useContext(StepContext);
  if (!context) {
    throw new Error("useStep must be used within a StepProvider");
  }
  return context;
};

export const StepProvider = ({ children }: { children: any }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});

  const goToNextStep = () => setCurrentStep((prevStep) => prevStep + 1);
  const goToPreviousStep = () => setCurrentStep((prevStep) => prevStep - 1);
  const updateFormData = (newData: any) =>
    setFormData((prevData) => ({ ...prevData, ...newData }));

  return (
    <StepContext.Provider
      value={{
        currentStep,
        goToNextStep,
        goToPreviousStep,
        formData,
        updateFormData,
      }}
    >
      {children}
    </StepContext.Provider>
  );
};
