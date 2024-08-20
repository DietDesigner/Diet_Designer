import { useFormik } from "formik";
import React, { ChangeEvent, useState } from "react";
import { vendorSchema } from "../../utils/validation";
import { useNavigate } from "react-router-dom";
import { useRegisterLagosVendorMutation } from "../../redux/slices/apiSlice";
import { toast } from "react-toastify";
import { signupErrorHandler } from "../../utils/errorHandler";
import Input from "../UI/Input";
import TextArea from "../UI/TextArea";
import { businessCategory } from "../../data/ExpectationData";
import { CircularProgress } from "@chakra-ui/react";

interface PropState {
  onOpen: () => void;
}

const Vendor: React.FC<PropState> = ({ onOpen }) => {
  const [otherBusinessCategory, setOtherBusinessCategory] = useState("");
  const navigate = useNavigate();
  const [registerLagosVendor, { isLoading }] = useRegisterLagosVendorMutation();

  const handleExpectationsChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;

    if (checked) {
      formik.setFieldValue("businessCategory", [
        ...formik.values.businessCategory,
        value,
      ]);
    } else {
      formik.setFieldValue(
        "businessCategory",
        formik.values.businessCategory.filter((category) => category !== value)
      );
      if (value === "Other") {
        setOtherBusinessCategory("");
        formik.setFieldValue("otherBusinessCategory", "");
      }
    }
  };

  const handleOtherBusinessCategoryChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setOtherBusinessCategory(value);
    formik.setFieldValue("otherBusinessCategory", value);
  };

  const formik = useFormik({
    initialValues: {
      vendorCompanyName: "",
      email: "",
      contactPersonName: "",
      website: "",
      socialMedia: "",
      attendanceRole: "",
      experienceOfPastSeminar: "",
      businessCategory: [] as string[],
      servicesDescription: "",
      otherRequirements: "",
      agreement: "",
      edition: "",
    },
    validationSchema: vendorSchema,
    onSubmit: async (values) => {
      try {
        await registerLagosVendor(values).unwrap();
        toast.success("Registration successful!");
        onOpen();
      } catch (err) {
        console.log(err);
        const registerError = signupErrorHandler(err);
        toast.error(registerError);
      }
    },
  });
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <div className=" flex flex-col gap-[1rem] w-full ">
        <form
          className="flex flex-col gap-2"
          onSubmit={(e) => {
            console.log(" form values:", formik.values);
            console.log("Form submitted, isValid:", formik.isValid);
            console.log("Form errors:", formik.errors);
            formik.handleSubmit(e);
          }}
        >
          <div className="flex flex-col md:flex-row gap-4 justify-between md:items-center ">
            <div>
              <Input
                label={"Vendor/Company name"}
                type={"text"}
                name="vendorCompanyName"
                value={formik.values.vendorCompanyName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.vendorCompanyName &&
              formik.errors.vendorCompanyName ? (
                <div className="text-[red]">
                  {formik.errors.vendorCompanyName}
                </div>
              ) : null}
            </div>
            <div>
              <Input
                label={"Email"}
                type={"email"}
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="email"
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-[red]">{formik.errors.email}</div>
              ) : null}
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-4 justify-between md:items-center mt-4">
            <div>
              <Input
                label={"Contact Person’s name"}
                type={"text"}
                value={formik.values.contactPersonName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="contactPersonName"
              />
              {formik.touched.contactPersonName &&
              formik.errors.contactPersonName ? (
                <div className="text-[red]">
                  {formik.errors.contactPersonName}
                </div>
              ) : null}
            </div>
            <div>
              <Input
                label={"Website (if applicable)"}
                type={"text"}
                value={formik.values.website}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="website"
              />
              {formik.touched.website && formik.errors.website ? (
                <div className="text-[red]">{formik.errors.website}</div>
              ) : null}
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-4 justify-between md:items-center mt-4">
            <div>
              <Input
                label={"Social Media (if applicable)"}
                type={"text"}
                value={formik.values.socialMedia}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="socialMedia"
              />

              {formik.touched.socialMedia && formik.errors.socialMedia ? (
                <div className="text-[red]">{formik.errors.socialMedia}</div>
              ) : null}
            </div>
          </div>
          <div>
            <p className="text-[#141414] text-[14px] font-[600]">
              Which edition of the event will you be attending?
            </p>
            <div className="flex flex-col md:flex-row gap-2 md:items-center text-[#141414] text-[14px]">
              <div>
                <input
                  type="radio"
                  value="lagos"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  checked={formik.values.edition === "lagos"}
                  name="edition"
                />{" "}
                <label htmlFor="lagos">Lagos 3.0</label>
              </div>
              <div>
                <input
                  type="radio"
                  value="abuja"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  checked={formik.values.edition === "abuja"}
                  name="edition"
                />{" "}
                <label htmlFor="abuja">Abuja 1.0</label>
              </div>
              <div>
                <input
                  type="radio"
                  value="both"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  checked={formik.values.edition === "both"}
                  name="edition"
                />{" "}
                <label htmlFor="both">Both</label>
              </div>
            </div>
            {formik.touched.edition && formik.errors.edition ? (
              <div className="text-[red]">{formik.errors.edition}</div>
            ) : null}
          </div>
          <div>
            <p className="mt-[25px] text-[#141414] text-[14px] font-[600]">
              Were you at the Business the Way Allaah Wants It 2.0 as a vendor
              or attendee?
            </p>
            <div className="flex flex-col md:flex-row gap-2 md:items-center text-[#141414] text-[14px]">
              <div>
                <input
                  type="radio"
                  value="vendor"
                  checked={formik.values.attendanceRole === "vendor"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="attendanceRole"
                />{" "}
                <label htmlFor="yes">Vendor</label>
              </div>
              <div>
                <input
                  type="radio"
                  name="attendanceRole"
                  value="attendee"
                  checked={formik.values.attendanceRole === "attendee"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />{" "}
                <label htmlFor="no">Attendee</label>
              </div>
              <div>
                <input
                  type="radio"
                  name="attendanceRole"
                  value="none"
                  checked={formik.values.attendanceRole === "none"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />{" "}
                <label htmlFor="no">None</label>
              </div>
            </div>
            {formik.touched.attendanceRole && formik.errors.attendanceRole ? (
              <div className="text-[red]">{formik.errors.attendanceRole}</div>
            ) : null}
          </div>
          <div className="mt-[40px]">
            <TextArea
              label="If applicable, what was your experience?"
              value={formik.values.experienceOfPastSeminar}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="experienceOfPastSeminar"
            />
          </div>
          {/* <div>
            <div className="flex flex-col gap-2 mt-[30px]">
              <label className="text-[#141414] text-[14px] font-[600]">
                Select business category
              </label>
              <div className="flex flex-col items-start gap-2">
                {businessCategory.map(({ value, label }) => (
                  <div className="flex gap-2 items-center" key={value}>
                    <input
                      type="checkbox"
                      value={value}
                      checked={formik.values.businessCategory.includes(value)}
                      onChange={handleOtherBusinessCategoryChange}
                      onBlur={formik.handleBlur}
                      name="businessCategory"
                    />
                    <label htmlFor={value}>{label}</label>
                  </div>
                ))}
                <div className="flex gap-2 items-center">
                  <input
                    type="checkbox"
                    value="Other"
                    checked={formik.values.businessCategory.includes("Other")}
                    onChange={handleOtherExpectationChange}
                    onBlur={formik.handleBlur}
                    name="businessCategory"
                  />
                  <label htmlFor="Other">Other</label>
                  {formik.values.businessCategory.includes("Other") && (
                    <input
                      type="text"
                      className="w-[50%] border-0 border-b-2 border-gray-400 bg-transparent focus:border-[#15265E] focus:outline-none"
                      value={otherBusinessCategory}
                      onChange={handleOtherBusinessCategoryChange}
                      onBlur={formik.handleBlur}
                      name="otherBusinessCategory"
                    />
                  )}
                </div>
              </div>
              {formik.touched.businessCategory &&
              formik.errors.businessCategory ? (
                <div className="text-[red]">
                  {formik.errors.businessCategory}
                </div>
              ) : null}
            </div>
          </div> */}
          <div className="flex flex-col items-start gap-2">
            {businessCategory.map(({ value, label }) => (
              <div className="flex gap-2 items-center" key={value}>
                <input
                  type="checkbox"
                  value={value}
                  checked={formik.values.businessCategory.includes(value)}
                  onChange={handleExpectationsChange}
                  onBlur={formik.handleBlur}
                  name="businessCategory"
                />
                <label htmlFor={value}>{label}</label>
              </div>
            ))}
            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                value="Other"
                checked={formik.values.businessCategory.includes("Other")}
                onChange={handleExpectationsChange}
                onBlur={formik.handleBlur}
                name="businessCategory"
              />
              <label htmlFor="Other">Other</label>
              {formik.values.businessCategory.includes("Other") && (
                <input
                  type="text"
                  className="w-[50%] border-0 border-b-2 border-gray-400 bg-transparent focus:border-[#15265E] focus:outline-none"
                  value={otherBusinessCategory}
                  onChange={handleOtherBusinessCategoryChange}
                  onBlur={formik.handleBlur}
                  name="otherBusinessCategory"
                />
              )}
            </div>
          </div>
          <div className="mt-[30px]">
            <TextArea
              label={
                "Briefly describe your business and the products/services you offer."
              }
              type={"text"}
              value={formik.values.servicesDescription}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="servicesDescription"
            />

            {formik.touched.servicesDescription &&
            formik.errors.servicesDescription ? (
              <div className="text-[red]">
                {formik.errors.servicesDescription}
              </div>
            ) : null}
          </div>
          <div className="mt-[30px]">
            <TextArea
              label={
                "The committe will be providing table, chairs and booth tag, would you require any other thing?"
              }
              type={"text"}
              value={formik.values.otherRequirements}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="otherRequirements"
            />

            {formik.touched.otherRequirements &&
            formik.errors.otherRequirements ? (
              <div className="text-[red]">
                {formik.errors.otherRequirements}
              </div>
            ) : null}
          </div>
          <div>
            <p className="mt-[0px] text-[#141414] text-[14px] font-[600]">
              If selected as a vendor, you would be required to pay a sum of
              40,000 naira.
            </p>
          </div>
          <div>
            <p className="mt-[40px] text-[#141414] text-[14px] font-[600]">
              By submitting this registration survey, I confirm that I have read
              and understood the terms and condition for participating as a
              vendor at the Business the Way Allaah Wants It Exhibition Trade
              Fair. And if I am chosen as one of vendors, I agree to abide by
              the the event guidelines and ensure that my products/services
              comply with Halal principles.
            </p>
          </div>{" "}
          <div className="flex gap-2 items-center text-[#141414] text-[14px]">
            <div>
              <input
                type="checkbox"
                checked={formik.values.agreement === "agreed"}
                onChange={(e) => {
                  formik.setFieldValue(
                    "agreement",
                    e.target.checked ? "agreed" : ""
                  );
                }}
                onBlur={formik.handleBlur}
                name="agreement"
              />
              <label htmlFor="agreement" className="pl-1">
                Yes
              </label>

              {formik.touched.agreement && formik.errors.agreement ? (
                <div className="text-[red]">{formik.errors.agreement}</div>
              ) : null}
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-2 justify-center items-center mt-4 mb-2">
            <button
              disabled={isLoading}
              type="submit"
              className="btn text-[#fff] bg-[#15265E] hover:bg-[#2563EB] w-full md:w-[196px]  border-0 rounded-md p-2"
            >
              {isLoading ? (
                <CircularProgress
                  value={10}
                  size="20px"
                  className="animate-spin"
                />
              ) : (
                "Register"
              )}
            </button>
            <button
              disabled={isLoading}
              className="btn text-[#15265E] bg-[#fff] hover:bg-[#2563EB] hover:text-white w-full md:w-[177px]  border rounded-md p-2"
              onClick={() => navigate("/")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </React.Suspense>
  );
};

export default Vendor;
