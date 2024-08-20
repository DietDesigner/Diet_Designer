import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import React from "react";

const ReusableModal = ({
  isOpen,
  onClose,
  children,
  closeOnOverlayClick,
  showheader,
  header,
  size,
  px,
  py,
}: {
  children: React.ReactNode;
  isOpen?: any;
  onClose?: any;
  size: string;
  header?: string;
  showheader?: boolean;
  closeOnOverlayClick: boolean;
  px: string;
  py: string;
}) => {
  return (
    <>
      <Modal
        closeOnOverlayClick={closeOnOverlayClick}
        size={size}
        isCentered
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent mx={{ base: "2rem", xl: "0rem" }} px={px} py={py}>
          {showheader && (
            <>
              {" "}
              <ModalHeader className="text-center font-[600] text-[#15265E]">
                {header}
              </ModalHeader>{" "}
              <ModalCloseButton />
            </>
          )}
          <ModalBody>{children}</ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
export default ReusableModal;
