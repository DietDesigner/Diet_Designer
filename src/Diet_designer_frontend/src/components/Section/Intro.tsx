import SimpleButton from "../UI/Button";

const Intro = () => {
  return (
    <div className="flex flex-col justify-center items-center relative top-[100px] md:top-[150px] z-50">
      <div className="flex flex-col justify-center items-center text-center w-full">
        <img src="/assets/switch.svg" width={440} height={446} alt="img" />
      </div>
    </div>
  );
};

export default Intro;
