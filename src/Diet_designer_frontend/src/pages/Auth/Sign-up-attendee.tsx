import FormHeader from "../../components/Header/FormHeader";
import { ChakraProvider, useDisclosure } from "@chakra-ui/react";
import RegistrationSuccess from "../Modalcomponents/RegistrationSuccess";
import DonationModal from "../Modalcomponents/DonationModal";
import Attendee from "../../components/Forms/Attendee";

const SignUpAttendee = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenDonate,
    onOpen: onOpenDonate,
    onClose: onCloseDonate,
  } = useDisclosure();

  return (
    <ChakraProvider>
      <div className="  flex flex-col  gap-[1.5rem] 2xl:gap-[3rem] w-[100%] px-[1rem] md:px-[10rem] ">
        {" "}
        <FormHeader />
        <p className="text-[#141414] font-[600] text-center md:text-left">
          Register as an attendee
        </p>
        <Attendee onOpen={onOpen} onOpenDonate={onOpenDonate} />
        <DonationModal
          isOpenDonate={isOpenDonate}
          onCloseDonate={onCloseDonate}
        />
        <RegistrationSuccess isOpen={isOpen} onClose={onClose} />
      </div>
    </ChakraProvider>
  );
};

export default SignUpAttendee;
