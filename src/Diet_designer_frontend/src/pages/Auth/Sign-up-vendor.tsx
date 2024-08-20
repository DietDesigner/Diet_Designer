import FormHeader from "../../components/Header/FormHeader";
import Vendor from "../../components/Forms/Vendor";
import { ChakraProvider, useDisclosure } from "@chakra-ui/react";
import RegistrationSuccess from "../Modalcomponents/RegistrationSuccess";

const SignUpVendor = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <ChakraProvider>
      <div className="  flex flex-col  gap-[1.5rem] 2xl:gap-[3rem] w-[100%] px-[1rem] md:px-[10rem] ">
        {" "}
        <FormHeader />
        <p className="text-[#141414] font-[600] text-center md:text-left">
          Register as a vendor
        </p>
        <Vendor onOpen={onOpen} />
        <RegistrationSuccess isOpen={isOpen} onClose={onClose} />
      </div>
    </ChakraProvider>
  );
};

export default SignUpVendor;
