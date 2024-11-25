import { useFormContext } from "react-hook-form";
import { motion } from "framer-motion";
import InputField from "../../components/form/InputField";

const PasswordFields = ({ name, label }: { name: string; label: string }) => {
  const { watch } = useFormContext();
  const passwordValue = watch(name);

  return (
    <>
      {/* New Password Field */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <InputField
          type="password"
          label={label}
          name={name}
          rules={{
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          }}
        />
      </motion.div>

      {/* Confirm Password Field */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <InputField
          type="password"
          label="Confirm Password"
          name="confirmPassword"
          rules={{
            required: "Please confirm your password",
            validate: (value: string) =>
              value === passwordValue || "Passwords do not match",
          }}
        />
      </motion.div>
    </>
  );
};

export default PasswordFields;
