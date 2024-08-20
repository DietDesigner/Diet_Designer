import { useFormik } from "formik";
import React, { ChangeEvent, useState } from "react";
import { attendeeSchema } from "../../utils/validation";
import { useNavigate } from "react-router-dom";
import { useRegisterLagosAttendeeMutation } from "../../redux/slices/apiSlice";
import { toast } from "react-toastify";
import { signupErrorHandler } from "../../utils/errorHandler";
import Input from "../UI/Input";
import TextArea from "../UI/TextArea";
import { mainExpectations } from "../../data/ExpectationData";
import { CircularProgress } from "@chakra-ui/react";

interface PropState {
  onOpen: () => void;
  onOpenDonate: () => void;
}

const Attendee: React.FC<PropState> = ({ onOpen, onOpenDonate }) => {
  const [otherExpectation, setOtherExpectation] = useState("");
  const [otherInput, setOtherInput] = useState("");
  const [attendingAsOther, setAttendingAsOther] = useState("");
  const navigate = useNavigate();
  const [registerLagosAttendee, { isLoading }] =
    useRegisterLagosAttendeeMutation();

  const handleAttendingAsChange = (e: ChangeEvent<HTMLInputElement>) => {
    formik.handleChange(e);
    if (e.target.value !== "Other") {
      setAttendingAsOther("");
    }
  };
  const handleExpectationsChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;

    if (value === "Other") {
      if (checked) {
        formik.setFieldValue("expectations", [
          ...formik.values.expectations,
          value,
        ]);
      } else {
        formik.setFieldValue(
          "expectations",
          formik.values.expectations.filter(
            (expectation) => expectation !== value
          )
        );
        setOtherExpectation("");
      }
    } else {
      const newExpectations = checked
        ? [...formik.values.expectations, value]
        : formik.values.expectations.filter(
            (expectation) => expectation !== value
          );
      formik.setFieldValue("expectations", newExpectations);
    }
  };

  const handleOtherExpectationChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setOtherExpectation(value);
    if (formik.values.expectations.includes("Other")) {
      formik.setFieldValue(
        "expectations",
        formik.values.expectations
          .filter((expectation) => expectation !== "Other")
          .concat(value)
      );
    }
  };

  const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    formik.handleChange(e);
    if (e.target.value !== "Other") {
      setOtherInput("");
    }
  };

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      phoneNum: "",
      expectations: [] as string[],
      edition: "",
      stateOfResidence: "",
      organization: "",
      jobTitle: "",
      experienceOfPastSeminar: "",
      attendanceRole: "",
      attendingAs: "",
      howDidYouHear: "",
      sharedTopics: "",
      support: "Yes",
      agreement: "",
    },
    validationSchema: attendeeSchema,
    onSubmit: async (values) => {
      console.log("Form values:", values);

      if (values.howDidYouHear === "Other") {
        values.howDidYouHear = otherInput;
      }

      if (values.attendingAs === "Other") {
        values.attendingAs = attendingAsOther;
      }
      try {
        await registerLagosAttendee(values).unwrap();
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
            console.log("Form submitted, isValid:", formik.isValid);
            console.log("Form errors:", formik.errors);
            formik.handleSubmit(e);
          }}
        >
          <div className="flex flex-col md:flex-row gap-4 justify-between md:items-center ">
            <div>
              <Input
                label={"Full Name"}
                type={"text"}
                name="fullName"
                value={formik.values.fullName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.fullName && formik.errors.fullName ? (
                <div className="text-[red]">{formik.errors.fullName}</div>
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
                label={"Phone Number"}
                type={"text"}
                value={formik.values.phoneNum}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="phoneNum"
              />
              {formik.touched.phoneNum && formik.errors.phoneNum ? (
                <div className="text-[red]">{formik.errors.phoneNum}</div>
              ) : null}
            </div>
            <div>
              <Input
                label={"Designation/Job Title"}
                type={"text"}
                value={formik.values.jobTitle}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="jobTitle"
              />
              {formik.touched.jobTitle && formik.errors.jobTitle ? (
                <div className="text-[red]">{formik.errors.jobTitle}</div>
              ) : null}
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-4 justify-between md:items-center mt-4">
            <div>
              <Input
                label={"Organization/Company name"}
                type={"text"}
                value={formik.values.organization}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="organization"
              />

              {formik.touched.organization && formik.errors.organization ? (
                <div className="text-[red]">{formik.errors.organization}</div>
              ) : null}
            </div>
            <div>
              <Input
                label={"State of residence"}
                type={"text"}
                value={formik.values.stateOfResidence}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="stateOfResidence"
              />
              {formik.touched.stateOfResidence &&
              formik.errors.stateOfResidence ? (
                <div className="text-[red]">
                  {formik.errors.stateOfResidence}
                </div>
              ) : null}
            </div>
          </div>
          <div>
            <p className="mt-[40px] text-[#141414] text-[14px] font-[600]">
              Were you in attendance at the Business the Way Allaah Wants It
              2.0?
            </p>
            <div className="flex flex-col md:flex-row gap-2 md:items-center text-[#141414] text-[14px]">
              <div>
                <input
                  type="radio"
                  value="yes"
                  checked={formik.values.attendanceRole === "yes"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="attendanceRole"
                />{" "}
                <label htmlFor="yes">Yes</label>
              </div>
              <div>
                <input
                  type="radio"
                  name="attendanceRole"
                  value="no"
                  checked={formik.values.attendanceRole === "no"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />{" "}
                <label htmlFor="no">No</label>
              </div>
            </div>
            {formik.touched.attendanceRole && formik.errors.attendanceRole ? (
              <div className="text-[red]">{formik.errors.attendanceRole}</div>
            ) : null}
          </div>
          <div className="mt-[40px]">
            <TextArea
              label="If Yes, what was your experience?"
              value={formik.values.experienceOfPastSeminar}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="experienceOfPastSeminar"
            />
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
            <p className="text-[#141414] text-[14px] font-[600]">
              Are you attending as?
            </p>
            <div className="flex flex-col gap-2 items-start text-[#141414] text-[14px]">
              <div>
                <input
                  type="radio"
                  value="Entrepreneur"
                  checked={formik.values.attendingAs === "Entrepreneur"}
                  onChange={handleAttendingAsChange}
                  onBlur={formik.handleBlur}
                  name="attendingAs"
                />
                <label className="pl-1">Entrepreneur/Business owner</label>
              </div>
              <div>
                <input
                  type="radio"
                  value="Professional"
                  checked={formik.values.attendingAs === "Professional"}
                  onChange={handleAttendingAsChange}
                  onBlur={formik.handleBlur}
                  name="attendingAs"
                />
                <label className="pl-1">Professional</label>
              </div>
              <div>
                <input
                  type="radio"
                  value="Student"
                  checked={formik.values.attendingAs === "Student"}
                  onChange={handleAttendingAsChange}
                  onBlur={formik.handleBlur}
                  name="attendingAs"
                />
                <label className="pl-1">Student</label>
              </div>
              <div>
                <input
                  type="radio"
                  value="Other"
                  name="attendingAs"
                  checked={formik.values.attendingAs === "Other"}
                  onChange={handleAttendingAsChange}
                  onBlur={formik.handleBlur}
                />
                <label className="pl-1">Other</label>
                {formik.values.attendingAs === "Other" && (
                  <input
                    type="text"
                    className="w-[30%] border-0 border-b-2 border-gray-400 bg-transparent focus:border-[#15265E] focus:outline-none ml-2"
                    value={attendingAsOther}
                    onChange={(e) => setAttendingAsOther(e.target.value)}
                    onBlur={formik.handleBlur}
                    name="attendingAsOther"
                  />
                )}
              </div>
            </div>
            {formik.touched.attendingAs && formik.errors.attendingAs ? (
              <div className="text-[red]">{formik.errors.attendingAs}</div>
            ) : null}
          </div>
          <div>
            <div className="flex flex-col gap-2 mt-[30px]">
              <label className="text-[#141414] text-[14px] font-[600]">
                What are your main expectations from attending this event?
              </label>
              <div className="flex flex-col items-start gap-2">
                {mainExpectations.map(({ value, label }) => (
                  <div className="flex gap-2 items-center" key={value}>
                    <input
                      type="checkbox"
                      value={value}
                      checked={formik.values.expectations.includes(value)}
                      onChange={handleExpectationsChange}
                      onBlur={formik.handleBlur}
                      name="expectations"
                    />
                    <label htmlFor={value}>{label}</label>
                  </div>
                ))}
                <div className="flex gap-2 items-center">
                  <input
                    type="checkbox"
                    value="Other"
                    checked={formik.values.expectations.includes("Other")}
                    onChange={handleExpectationsChange}
                    onBlur={formik.handleBlur}
                    name="expectations"
                  />
                  <label htmlFor="Other">Other</label>
                  {formik.values.expectations.includes("Other") && (
                    <input
                      type="text"
                      className="w-[50%] border-0 border-b-2 border-gray-400 bg-transparent focus:border-[#15265E] focus:outline-none"
                      value={otherExpectation}
                      onChange={handleOtherExpectationChange}
                      onBlur={() =>
                        formik.setFieldValue(
                          "otherExpectation",
                          otherExpectation
                        )
                      }
                      name="otherExpectation"
                    />
                  )}
                </div>
              </div>
              {formik.touched.expectations && formik.errors.expectations ? (
                <div className="text-[red]">{formik.errors.expectations}</div>
              ) : null}
            </div>
          </div>
          <div>
            <p className="text-[#141414] text-[14px] font-[600]">
              How did you hear about the event?
            </p>
            <div className="flex flex-col gap-2 md:items-start text-[#141414] text-[14px]">
              <div>
                <input
                  type="radio"
                  value="Social media"
                  onChange={handleRadioChange}
                  onBlur={formik.handleBlur}
                  checked={formik.values.howDidYouHear === "Social media"}
                  name="howDidYouHear"
                />
                <label className="pl-1">Social Media</label>
              </div>
              <div>
                <input
                  type="radio"
                  value="Email invitation"
                  onChange={handleRadioChange}
                  onBlur={formik.handleBlur}
                  checked={formik.values.howDidYouHear === "Email invitation"}
                  name="howDidYouHear"
                />
                <label className="pl-1">Email Invitation</label>
              </div>
              <div>
                <input
                  type="radio"
                  value="Website blog"
                  onChange={handleRadioChange}
                  onBlur={formik.handleBlur}
                  checked={formik.values.howDidYouHear === "Website blog"}
                  name="howDidYouHear"
                />
                <label className="pl-1">Website Blog</label>
              </div>
            </div>
            <div className="flex flex-col gap-2 items-start text-[#141414] text-[14px] mt-1">
              <div>
                <input
                  type="radio"
                  value="Word of mouth/referral"
                  onChange={handleRadioChange}
                  onBlur={formik.handleBlur}
                  checked={
                    formik.values.howDidYouHear === "Word of mouth/referral"
                  }
                  name="howDidYouHear"
                />
                <label className="pl-1">Word of mouth/referral</label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  value="Other"
                  onChange={handleRadioChange}
                  onBlur={formik.handleBlur}
                  checked={formik.values.howDidYouHear === "Other"}
                  name="howDidYouHear"
                />
                <label className="pl-1">Other</label>
                {formik.values.howDidYouHear === "Other" && (
                  <input
                    type="text"
                    className="w-[30%] border-0 border-b-2 border-gray-400 bg-transparent focus:border-[#15265E] focus:outline-none ml-2"
                    value={otherInput}
                    onChange={(e) => setOtherInput(e.target.value)}
                    onBlur={formik.handleBlur}
                    name="otherInput"
                  />
                )}
              </div>
            </div>
            {formik.touched.howDidYouHear && formik.errors.howDidYouHear ? (
              <div className="text-[red]">{formik.errors.howDidYouHear}</div>
            ) : null}
          </div>
          <div className="mt-[30px]">
            <TextArea
              label={
                "Please share any specific topics or questions you would like to be addressed during the event"
              }
              type={"text"}
              value={formik.values.sharedTopics}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="sharedTopics"
            />
          </div>
          <div>
            <p className="mt-[40px] w-full md:w-[600px] text-[#141414] text-[14px] font-[600]">
              The conference is free to attend, but a donation (any amount you
              can contribute) is required for access. Click the donate button
              below to make your payment and secure your spot at the conference.
            </p>
          </div>
          <div className="">
            <button
              className="btn text-[#fff] bg-[#15265E] hover:bg-[#2563EB] hover:text-white w-full md:w-[177px]  border rounded-md p-2"
              onClick={() => onOpenDonate()}
            >
              Donate
            </button>
          </div>
          <div>
            <p className="mt-[40px] text-[#141414] text-[14px] font-[600]">
              By submitting this registration form, I agree to receive
              event-related communications via email and/or phone number
              provided above?
            </p>
            <div className="flex gap-2 items-center text-[#141414] text-[14px]">
              <div>
                <input
                  type="radio"
                  value="yes"
                  checked={formik.values.agreement === "yes"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="agreement"
                />{" "}
                <label htmlFor="yes">Yes</label>
              </div>
              <div>
                <input
                  type="radio"
                  name="agreement"
                  value="no"
                  checked={formik.values.agreement === "no"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />{" "}
                <label htmlFor="no">No</label>
              </div>
            </div>
            {formik.touched.agreement && formik.errors.agreement ? (
              <div className="text-[red]">{formik.errors.agreement}</div>
            ) : null}
          </div>{" "}
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

export default Attendee;
