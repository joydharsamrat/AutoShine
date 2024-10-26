import { Controller, useFormContext } from "react-hook-form";

const InputField = ({
  type,
  name,
  label,
  rules,
}: {
  type: string;
  name: string;
  label: string;
  rules?: object;
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

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
          render={({ field }) => (
            <input
              {...field}
              value={field.value ?? ""}
              id={name}
              type={type}
              placeholder={label}
              className={`block w-full rounded-md border-0 py-1.5 pl-2 pr-5 ring-1 ring-inset ring-gray-300 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-secondary-700 sm:text-sm sm:leading-6 ${
                errors[name] ? "border-red-500 ring-red-500" : ""
              }`}
            />
          )}
        />
        {errors[name] && (
          <span className="text-sm text-red-500">
            {errors[name]?.message as string}
          </span>
        )}
      </div>
    </div>
  );
};

export default InputField;
