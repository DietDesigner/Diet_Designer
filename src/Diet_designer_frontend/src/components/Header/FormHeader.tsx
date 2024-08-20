import { useNavigate } from "react-router-dom";
import { Logo } from "../UI/Logo";

const FormHeader = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col md:flex-row justify-center md:justify-between items-center mt-[1rem]">
      <div>
        <Logo onClick={() => navigate("/")} />
      </div>
      <div className=" md:block mt-[1rem] md:mt-[0]">
        <p className="text-[#15265E] text-center md:text-left leading-9 text-[36px] font-[700]">
          Business <br />
          the way Allah wants it.
        </p>
      </div>
    </div>
  );
};

export default FormHeader;
