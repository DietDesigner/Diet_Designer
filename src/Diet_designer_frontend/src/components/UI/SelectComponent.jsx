import { MdError } from "react-icons/md";
import React from "react";

const SelectComponent = ({
  label,
  options,
  type,
  value,
  onChange,
  icon,
  onClick,
  name,
  error,
  touched,
  fieldProps,
  defaultValue,
  placeholder,
  isMulti,
}) => {
  const inputBorderColor = touched && error ? "input-error" : "";

  return (
    <div className="flex w-full flex-col gap-2">
      {label && <p className="text-sm font-bold">{label}</p>}
      <label>
        <select
          className={`select select-bordered w-full rounded-[4px]  focus:outline-none ${inputBorderColor}`}
          name={name}
          defaultValue={defaultValue}
          type={type}
          onChange={onChange}
          value={value}
          {...fieldProps}
          multiple={isMulti}
          placeholder={placeholder}
        >
          <option value="">{placeholder || "Select an option"}</option>
          {options?.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
        {icon && <div onClick={onClick}>{icon}</div>}
      </label>
      {touched && error && (
        <div className="text-error flex gap-1 justify-left items-center">
          <MdError fontSize={"1rem"} />
          <p className="text-sm text-error">{error}</p>
        </div>
      )}
    </div>
  );
};

export default SelectComponent;
