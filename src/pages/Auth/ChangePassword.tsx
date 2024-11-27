/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldValues } from "react-hook-form";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import "animate.css";
import toast from "react-hot-toast";
import { useChangePassMutation } from "../../redux/features/auth/authApi";
import Form from "../../components/form/Form";
import PasswordFields from "../../components/form/PasswordFields";
import InputField from "../../components/form/InputField";

const ChangePass = () => {
  const navigate = useNavigate();
  const [changePassword] = useChangePassMutation();

  const onSubmit = async (data: FieldValues) => {
    const loadingToast = toast.loading("loading...");

    try {
      await changePassword(data).unwrap();
      toast.success("Password changed !", { id: loadingToast });
      navigate("/profile");
    } catch (error: any) {
      console.error(error);
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
        <h2 className="text-3xl font-bold text-center text-primary-700 mb-8">
          Change Password
        </h2>
        <Form onSubmit={onSubmit}>
          <InputField label="Old Password" name="oldPassword" type="password" />
          <PasswordFields name={"newPassword"} label={"New Password"} />
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-5 grid place-items-center"
          >
            <input type="submit" value="Submit" className="btn-primary " />
          </motion.div>
        </Form>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-4 text-center"
        >
          <p className="text-sm text-gray-600">
            Go to{" "}
            <Link
              to="/profile"
              className="text-primary-700 font-semibold hover:underline transition duration-200"
            >
              Profile
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default ChangePass;
