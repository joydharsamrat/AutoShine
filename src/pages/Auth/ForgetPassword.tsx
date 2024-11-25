/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldValues } from "react-hook-form";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "animate.css";
import toast from "react-hot-toast";
import { useForgotPassMutation } from "../../redux/features/auth/authApi";
import Form from "../../components/form/Form";
import InputField from "../../components/form/InputField";
import { useState } from "react";

const ForgetPass = () => {
  const [getLink] = useForgotPassMutation();
  const [isSuccess, setIsSuccess] = useState(false);

  const onSubmit = async (data: FieldValues) => {
    const loadingToast = toast.loading("loading...");

    try {
      await getLink(data).unwrap();
      toast.success("Check Your Email For reset link!", { id: loadingToast });
      setIsSuccess(true);
    } catch (error: any) {
      console.log(error);
      toast.error(
        `${error?.data?.message}` || "Reset failed! Please try again",
        {
          id: loadingToast,
        }
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-primary-700 to-secondary-700 p-5">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full animate__animated animate__fadeIn">
        {isSuccess ? (
          // Success message displayed when the form is successfully submitted
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-primary-700 mb-4">
              Check Your Email For Reset Link!
            </h2>
            <p className="text-sm text-neutral-600">
              If the email is registered, you'll receive a reset link shortly.
            </p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-4 text-center space-x-5"
            >
              <Link
                to="/"
                className="text-primary-700 font-semibold hover:underline transition duration-200 "
              >
                Home
              </Link>
              <Link
                to="/login"
                className="text-primary-700 font-semibold hover:underline transition duration-200"
              >
                Login
              </Link>
            </motion.div>
          </motion.div>
        ) : (
          <>
            <h2 className="text-3xl font-bold text-center text-primary-700 mb-8">
              Get Reset Link
            </h2>
            <p className="text-sm text-neutral-600">
              Provide your email to get a reset password link.
            </p>
            <Form onSubmit={onSubmit}>
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
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="mt-5 grid place-items-center"
              >
                <input type="submit" value="Submit" className="btn-primary " />
              </motion.div>
            </Form>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgetPass;
