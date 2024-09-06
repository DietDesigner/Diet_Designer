import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import Landingpage from "./pages/Home/Landingpage";
import Header from "./components/Header/Header";
import Login from "./pages/Auth/Login";
import WelcomeScreen from "./pages/Planners/WelcomeScreen";
import { StepProvider } from "./pages/Planners/StepContext";
import { BaseStep } from "./pages/Planners/BaseStepComponent";
import MealPlanCount from "./pages/Planners/MealPlanCount";

function App() {
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      const mobileView = window.innerWidth <= 768;
      setIsMobile(mobileView);

      if (
        mobileView &&
        window.location.pathname !== "/login" &&
        window.location.pathname !== "/meal-plan-details"
      ) {
        navigate("/create-meal-plan"); // Redirect to login if on mobile and not already on the login page
      }
    };

    handleResize(); // Initial check on mount

    window.addEventListener("resize", handleResize); // Update on window resize

    return () => window.removeEventListener("resize", handleResize); // Cleanup
  }, [navigate]);

  if (!isMobile) {
    return (
      <div className="desktop-warning">
        <Landingpage />
      </div>
    );
  }

  return (
    <StepProvider>
      <div className="app-container">
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/welcome" element={<WelcomeScreen />} />
          <Route path="/create-meal-plan" element={<BaseStep />} />
          <Route path="/meal-plan-details" element={<MealPlanCount />} />
        </Routes>

        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </div>
    </StepProvider>
  );
}

export default App;
