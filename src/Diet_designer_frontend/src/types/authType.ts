import { Dispatch, SetStateAction } from "react";
interface TalentData {
  mainService: string;
  id: string;
  fullName: string;
  talentEmail: string;
  talentPhoneNum: string;
}
interface CompanyData {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
}
export type UserType = {
  id: number;
  name: string;

  token: string;
  talentData: TalentData;
  companyData: CompanyData;
};

export type LoginRequestType = {
  email: string;
  password: string;
};

export type RegistrationRequestType = {
  name: string;
  email: string;
  password: string;
};

export type RegisterPayloadType = {
  fullName: string;
  setFullName: Dispatch<SetStateAction<string>>;
  companyName: string;
  setCompanyName: Dispatch<SetStateAction<string>>;
  companyEmail: string;
  setCompanyEmail: Dispatch<SetStateAction<string>>;
  companyPhoneNum: string;
  setCompanyPhoneNum: Dispatch<SetStateAction<string>>;
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
  confirmpassword: string;
  setConfirmPassword: Dispatch<SetStateAction<string>>;
  isLoading: boolean;
};
export interface RegisterTalentPayloadType {
  fullName: string;
  setFullName: Dispatch<SetStateAction<string>>;
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
  confirmpassword: string;
  setConfirmPassword: Dispatch<SetStateAction<string>>;
  isLoading: boolean;
  talentEmail: string;
  setTalentEmail: Dispatch<SetStateAction<string>>;
  talentPhoneNum: string;
  setTalentPhoneNum: Dispatch<SetStateAction<string>>;
}

export interface TalentLoginForm {
  talentEmail: string;
  password: string;
}

export interface companyLoginForm {
  companyEmail: string;
  password: string;
}
export interface talentRegisterForm {
  fullName: string;
  password: string;
  confirmpassword: string;
  talentEmail: string;
  talentPhoneNum: string;
}
export interface talentforgotpassForm {
  talentEmail: string;
}
export interface companyRegisterForm {
  fullName: string;
  password: string;
  companyName: string;
  confirmpassword: string;
  companyEmail: string;
  companyPhoneNum: string;
}
export interface companyforgotpassForm {
  companyEmail: string;
}
