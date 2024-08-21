import { Spinner } from "@chakra-ui/react";

const SpinnerLoading = () => {
  return (
    <div className="flex flex-col justify-center items-center h-[100vh] relative top-[-50px]">
      <Spinner
        thickness="8px"
        speed="0.65s"
        emptyColor="gray.200"
        color="purple.500"
        size="xl"
      />
    </div>
  );
};

export default SpinnerLoading;
