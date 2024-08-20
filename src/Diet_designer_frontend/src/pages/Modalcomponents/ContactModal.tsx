import ReusableModal from "../../components/UI/ReusableModal";

const ContactModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <div>
      <ReusableModal
        isOpen={isOpen}
        onClose={onClose}
        size="sm"
        // showheader={true}
        header=""
        closeOnOverlayClick={true}
        px="4"
        py="4"
      >
        <div className="flex flex-col justify-center items-center gap-[1rem]">
          <p className="text-center font-[700] text-[24px]">Contact Us</p>
          <p className="text-center font-[400] text-xs">
            For sponsorship, <br /> collaboration, vendor stand <br /> & Advert
            placement
          </p>

          <img src="/assets/long-hor.svg" alt="" />

          <p className="text-center font-[400] text-xs">
            07064797961, 09033609793
          </p>

          <p className="text-center font-[400] text-xs">btwawi2023@gmail.com</p>
        </div>
      </ReusableModal>
    </div>
  );
};

export default ContactModal;
