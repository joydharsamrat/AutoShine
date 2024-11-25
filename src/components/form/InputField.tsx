import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // For eye icons

const InputField = ({
  type,
  name,
  label,
  rules,
  defaultValue,
}: {
  type: string;
  name: string;
  label: string;
  rules?: object;
  readonly?: boolean;
  defaultValue?: string | number | File;
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  // Determine input type based on state
  const inputType = type === "password" && isPasswordVisible ? "text" : type;

  return (
    <div className="my-1">
      {label && (
        <label htmlFor={name} className="block text-sm font-medium leading-6">
          {label}
        </label>
      )}
      <div className="relative rounded-md shadow-sm">
        <Controller
          name={name}
          control={control}
          rules={rules}
          defaultValue={defaultValue}
          render={({ field }) => (
            <input
              {...field}
              value={field.value ?? ""}
              id={name}
              type={inputType}
              placeholder={label}
              className={`block w-full rounded-md border-0 py-1.5 pl-2 pr-10 ring-1 ring-inset ring-gray-300 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-secondary-700 sm:text-sm sm:leading-6 ${
                errors[name] ? "border-red-500 ring-red-500" : ""
              }`}
            />
          )}
        />
        {/* Eye Icon for Password Field */}
        {type === "password" && (
          <button
            type="button"
            onClick={() => setPasswordVisible(!isPasswordVisible)}
            className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
          </button>
        )}
      </div>
      {errors[name] && (
        <span className="text-sm text-red-500">
          {errors[name]?.message as string}
        </span>
      )}
    </div>
  );
};

export default InputField;
