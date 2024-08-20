import React, { useState } from "react";
import ReusableModal from "../../components/UI/ReusableModal";
import Input from "../../components/UI/Input";
import { useVerifyDonationMutation } from "../../redux/slices/apiSlice";
import { toast } from "react-toastify";
import { responseErrorHandler } from "../../utils/errorHandler";
import { config } from "../../config/config";
import { PaystackButton } from "react-paystack";
import { useDisclosure } from "@chakra-ui/react";
import DonationSuccess from "./DonationSuccess ";

const { publicKey } = config;

interface PropState {
  isOpenDonate: boolean;
  onCloseDonate: () => void;
}

const DonationModal: React.FC<PropState> = ({
  isOpenDonate,
  onCloseDonate,
}) => {
  const [amount, setAmount] = useState("");
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [editionPaidFor, setEditionPaidFor] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [verifyPayment] = useVerifyDonationMutation();

  const validateFields = () => {
    if (
      !amount ||
      !donorName ||
      !donorEmail ||
      String(!editionPaidFor) === ""
    ) {
      toast.error("Please fill all the required fields");
      return;
    }
  };

  const verifyOrderPayment = async (reference: any) => {
    try {
      const data = {
        total: amount,
        fullName: donorName,
        email: donorEmail,
        editionPaidFor,
        referenceId: reference,
      };

      const response = await verifyPayment(data).unwrap();
      response.status === 200 &&
        toast.success("Your Payment has been verified successfully");
      onOpen();
      onCloseDonate();
    } catch (err) {
      const errMsg = responseErrorHandler(err);
      toast.error(errMsg);
    }
  };

  const componentTransferProps = {
    amount: Number(amount) * 100,
    email: donorEmail,
    publicKey,
    text: "Donate",
    onSuccess: ({ reference }: { reference: any }) => {
      verifyOrderPayment(reference);
    },
    onClose: () => {
      alert("Wait! You need this oil, don't go!!!!");
    },
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    validateFields();

    // You can add any additional logic here if needed
  };

  return (
    <div>
      <div className="relative ">
        {isOpenDonate && (
          <ReusableModal
            isOpen={isOpenDonate}
            onClose={onCloseDonate}
            size="xl"
            showheader={true}
            header="Donate To BTWAWI"
            closeOnOverlayClick={true}
            px="4"
            py="4"
          >
            <form onSubmit={handleSubmit}>
              <div className="p-[20px]">
                <Input
                  label="Full Name"
                  type="text"
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                />
                <br />
                <Input
                  label="Enter donation amount"
                  type="text"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />

                <br />
                <Input
                  label="Email "
                  type="text"
                  value={donorEmail}
                  onChange={(e) => setDonorEmail(e.target.value)}
                />
                <br />
                <Input
                  label="Edition you are paying for (Indicate whether Lagos or Abuja) "
                  type="text"
                  value={editionPaidFor.toLowerCase()}
                  onChange={(e) => setEditionPaidFor(e.target.value)}
                />
              </div>
              <div className="flex flex-col md:flex-row gap-2 justify-center items-center mt-4 mb-2">
                {!donorName ||
                !donorEmail ||
                !editionPaidFor ||
                amount === "" ? (
                  <button
                    disabled
                    className="btn text-[#fff] bg-[gray] w-full md:w-[100px]  border-0 rounded-md p-2"
                  >
                    Donate
                  </button>
                ) : (
                  <PaystackButton
                    {...componentTransferProps}
                    className="btn text-[#fff] bg-[#15265E] hover:bg-[#2563EB] w-full md:w-[100px]  border-0 rounded-md p-2"
                  >
                    Donate
                  </PaystackButton>
                )}
                <button
                  className="btn text-[#15265E] bg-[#fff] w-full md:w-[100px]"
                  onClick={() => onCloseDonate()}
                >
                  Cancel
                </button>
              </div>
            </form>
          </ReusableModal>
        )}
      </div>
      <DonationSuccess isOpen={isOpen} onClose={onClose} />
    </div>
  );
};

export default DonationModal;
