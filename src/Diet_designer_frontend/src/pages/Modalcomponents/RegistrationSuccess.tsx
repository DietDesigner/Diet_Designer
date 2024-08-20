import { useNavigate } from "react-router-dom";
import ReusableModal from "../../components/UI/ReusableModal";

interface PropState {
  isOpen: boolean;
  onClose: () => void;
}

const RegistrationSuccess: React.FC<PropState> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  return (
    <div>
      <div>
        {isOpen && (
          <ReusableModal
            isOpen={isOpen}
            onClose={onClose}
            size="md"
            // showheader={true}
            header=""
            closeOnOverlayClick={true}
            px="4"
            py="4"
          >
            <img
              src="/assets/check.svg"
              width={84}
              height={88}
              alt="icon"
              className="block mx-[auto]"
            />
            <div className="p-[20px] text-center">
              <p className="font-[600]">Registration successful!</p>

              <p className="text-[14px]">
                Your details has been collected. We look forward to seeing you
                in the event.
              </p>
              <button
                className="btn text-[#fff] bg-[#15265E] hover:bg-[#2563EB] w-full md:w-[100px]  border-0 rounded-md p-2 mt-4"
                onClick={() => navigate("/")}
              >
                Proceed
              </button>
            </div>
          </ReusableModal>
        )}
      </div>
    </div>
  );
};

export default RegistrationSuccess;
