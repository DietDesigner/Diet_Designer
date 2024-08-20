import { Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import Landingpage from "./pages/Home/Landingpage";
import Header from "./components/Header/Header";
import Login from "./pages/Auth/Login";
import WelcomeScreen from "./pages/Planners/WelcomeScreen";
import { StepProvider } from "./pages/Planners/StepContext";
import { BaseStep } from "./pages/Planners/BaseStepComponent";

function App() {
  return (
    <StepProvider>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Landingpage />} />
          {/* <Route path="/sign-up" element={<SignUpAttendee />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/welcome" element={<WelcomeScreen />} />
          <Route path="/create-meal-plan" element={<BaseStep />} />
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
