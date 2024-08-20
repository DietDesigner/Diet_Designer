import ReusableModal from "../../components/UI/ReusableModal";

const LocationModal = ({
  isOpenLocation,
  onCloseLocation,
}: {
  onCloseLocation: () => void;
  isOpenLocation: boolean;
}) => {
  const handleAbujaLocation = () => {
    window.open("https://maps.app.goo.gl/sAfxPfHff84E2Tkz9", "_blank");
  };
  return (
    <div>
      <ReusableModal
        isOpen={isOpenLocation}
        onClose={onCloseLocation}
        size="sm"
        // showheader={true}
        header=""
        closeOnOverlayClick={true}
        px="4"
        py="4"
      >
        <div className="flex flex-col justify-center items-center gap-[1rem]">
          <p className="text-center font-[700] text-[24px]">
            Conference Location
          </p>
          <p className="text-center font-[400] text-xs">
            Abuja Conference Venue: National Mosque Conference Centre, Abuja
          </p>

          <p
            className="text-white bg-[#15265E] rounded-3xl p-2 text-xs cursor-pointer"
            onClick={handleAbujaLocation}
          >
            View Location on Map
          </p>

          <img src="/assets/long-hor.svg" alt="" />

          <p className="text-center font-[400] text-xs">
            Lagos Conference Venue: To be communicated
          </p>
        </div>
      </ReusableModal>
    </div>
  );
};

export default LocationModal;
