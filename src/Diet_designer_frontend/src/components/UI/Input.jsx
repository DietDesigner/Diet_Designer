import { MdError } from "react-icons/md";
const Input = ({
  label,
  type,
  value,
  onChange,
  onChangeInput,
  icon,
  onClick,
  name,
  error,
  touched,
  fieldProps,
  placeholder,
  accept,
  disabled,
  defaultValue,
  className,
}) => {
  const inputBorderColor = touched && error ? "input-error" : "";
  return (
    <div className={`flex w-[100%] flex-col gap-2  ${className}`}>
      <label className="font-bold text-sm">{label}</label>
      <div
        className={`input input-md input-bordered rounded-[4px] flex items-center gap-2 ${inputBorderColor} ${className}`}
      >
        <input
          disabled={disabled}
          name={name}
          onChange={type === "text" ? onChangeInput : onChange}
          type={type}
          value={value}
          defaultValue={defaultValue}
          accept={accept}
          dateFormat="dd-MM-yyyy"
          className="grow text-sm border-none focus:ring-0 input-placeholder"
          {...fieldProps}
          placeholder={placeholder}
        />
        {icon && <div onClick={onClick}>{icon}</div>}
      </div>
      {touched && error && (
        <div className="text-error flex gap-1 items-center">
          <MdError fontSize={"1rem"} />
          <p className="text-sm text-error">{error}</p>
        </div>
      )}
    </div>
  );
};

export default Input;
