import React, { useEffect, useState } from "react";

import useUtilityService from "../../hooks/UtilityService";
import { toast } from "react-toastify";
import { Diet_designer_backend } from "declarations/Diet_designer_backend";

const MealPlanCount = () => {
  const [plan, setPlan] = useState(null);
  const { getPrincipalFromLocalStorage } = useUtilityService();
  const principal = getPrincipalFromLocalStorage();

  const getPlan = async () => {
    try {
      const response = await Diet_designer_backend.get_AI_Meal_Plan(
        principal?.__principal__
      );
      console.log("plan response", response[1]);
      setPlan(response[1]);
    } catch (e) {
      console.log(e);
      toast.error(e);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getPlan();
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="w-full max-w-[400px] px-[2rem] md:mx-[auto] flex flex-col  relative top-[130px] md:top-[150px] z-50">
        <div className="flex flex-col gap-[1rem] 2xl:gap-[3rem] w-[100%]">
          <h1 className="xl:leading-[40px] leading-[35px] w-[100%]  text-left xl:text-[30px] text-[25px] font-bold text-[#101828] ">
            Welcome
          </h1>
          <p className="font-[700]">Plan Details</p>
          {plan?.map((item, index) => {
            console.log(item?.user_preferences);

            return (
              <div
                key={index}
                className="flex flex-col gap-[1rem] bg-[#ACFFAC] w-full md:w-[191px] h-auto md:h-[136px] rounded-md pt-[1rem] pl-[1rem]"
              >
                <p className="font-[700]">{item?.day1}</p>
                <p>{item?.day2}</p>
                <p>{item?.day3}</p>
                <p> {item?.day4}</p>
                <p>{item?.day5}</p>
                <p> {item?.day6}</p>
                <p> {item?.day7}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MealPlanCount;
