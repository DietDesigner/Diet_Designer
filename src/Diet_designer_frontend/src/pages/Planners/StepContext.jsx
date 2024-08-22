import React, { createContext, useState, useContext } from "react";

// Create a context for the steps
const StepContext = createContext(null);

export const useStep = () => {
  const context = useContext(StepContext);
  if (!context) {
    throw new Error("useStep must be used within a StepProvider");
  }
  return context;
};

export const StepProvider = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});

  const goToNextStep = () => setCurrentStep((prevStep) => prevStep + 1);
  const goToPreviousStep = () => setCurrentStep((prevStep) => prevStep - 1);
  const updateFormData = (newData) =>
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
