import { useNavigate } from "react-router-dom";

const SimpleButton = () => {
  const navigate = useNavigate();

  return (
    <button
      className="border rounded-md text-[#fff] bg-[#15265E] p-2 mt-4 w-[196px] mb-8 md:mb-4"
      onClick={() => navigate("/register/attendee")}
    >
      Register
    </button>
  );
};

export default SimpleButton;
