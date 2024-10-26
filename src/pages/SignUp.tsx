import { FieldValues } from "react-hook-form";
import Form from "../components/form/Form";
import InputField from "../components/form/InputField";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "animate.css";

const SignUp = () => {
  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-primary-700 to-secondary-700 p-5">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full animate__animated animate__fadeIn">
        <h2 className="text-3xl font-bold text-center text-primary-700 mb-8">
          Sign Up
        </h2>
        <Form onSubmit={onSubmit}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <InputField
              type="text"
              label="Name"
              name="name"
              rules={{ required: "Name is required" }}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <InputField
              type="email"
              label="Email"
              name="email"
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Please enter a valid email address",
                },
              }}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <InputField
              type="text"
              label="Phone"
              name="phone"
              rules={{
                required: "Phone number is required",
                pattern: {
                  value: /^\+?[1-9]\d{1,14}$/,
                  message: "Please enter a valid phone number",
                },
              }}
            />
            <InputField
              type="text"
              label="Address"
              name="address"
              rules={{ required: "Address is required" }}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <InputField
              type="password"
              label="Password"
              name="password"
              rules={{
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              }}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-5 grid place-items-center"
          >
            <input type="submit" value="Sign Up" className="btn-primary " />
          </motion.div>
        </Form>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-4 text-center"
        >
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary-700 font-semibold hover:underline transition duration-200"
            >
              Log in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default SignUp;
