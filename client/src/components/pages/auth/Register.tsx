// Register.tsx
import { useState } from "react";
import { motion } from "framer-motion";
import { CustomInput } from "@/components/customComponents/customInput";
import {
  CircleArrowRight,
  Mail,
  UserRound,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import PasswordStrengthMeter from "@/components/common/PassStrength";
import { z } from "zod";
import { registerSchema } from "@/lib/validationSchema";
import EmailVerificationModal from "@/components/customComponents/EmailVerificationModal";
import PasswordInput from "@/components/customComponents/PasswordInput";
import LoadingButton from "@/components/customComponents/LoadingButton";
import { Button } from "@/components/ui/button";

interface Errors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

const Register = () => {
  // State management for form inputs
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  // State for password visibility toggles
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // State for form errors
  const [errors, setErrors] = useState<Errors>({});

  // Loading state
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingVerifyOtp, setIsLoadingVerifyOtp] = useState(false);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);

  // OTP state
  const [otpValue, setOtpValue] = useState("");

  // Handler for form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Validate form data using the imported schema
      registerSchema.parse({
        firstName,
        lastName,
        email,
        password,
        confirmPassword,

      });

      // Reset errors
      setErrors({});

      // Set isLoading to true to indicate loading state
      setIsLoading(true);

      // Simulate form submission delay (e.g., API call)
      // Replace this with your actual API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // If submission is successful
      console.log("Form submitted successfully");

      // Reset isLoading to false
      setIsLoading(false);

      // Open the email verification modal
      setIsModalOpen(true);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Errors = {};
        error.errors.forEach((err) => {
          const path = err.path[0] as keyof Errors;
          fieldErrors[path] = err.message;
        });
        setErrors(fieldErrors);
      } else {
        console.error("An error occurred during registration:", error);
      }
      setIsLoading(false);
    }
  };

  // Handler for verifying OTP
  const handleVerifyOtp = async () => {
    try {
      // To do: Implement OTP verification logic here
      setIsLoadingVerifyOtp(true);
      console.log("Verifying OTP:", otpValue);

      // Simulate OTP verification delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      console.log("OTP verified successfully");
      setIsLoadingVerifyOtp(false);
      navigate("/auth/login");

      setIsModalOpen(false);
    } catch (error) {
      setIsLoadingVerifyOtp(false);
      console.error("An error occurred during OTP verification:", error);
    }
  };

  // Handler for Google Sign-In
  const handleGoogleSignIn = () => {
    // Implement Google Sign-In logic here
    console.log("Google Sign-In clicked");
  };

  return (
    <div className="relative flex justify-center items-center rounded-xl bg-gradient-to-r from-gray-800 to-gray-900">
      {/* Email Verification Modal */}
      <EmailVerificationModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        email={email}
        otpValue={otpValue}
        setOtpValue={setOtpValue}
        handleVerifyOtp={handleVerifyOtp}
        isLoading={isLoadingVerifyOtp}
      />

      {/* Main Content */}
      <motion.div
        initial={{ opacity: isModalOpen ? 0.5 : 0, y: 20 }}
        animate={{ opacity: isModalOpen ? 0.5 : 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`max-w-md w-full bg-gray-900 bg-opacity-70 rounded-xl shadow-2xl overflow-hidden ${
          isModalOpen ? "pointer-events-none" : ""
        }`}
      >
        <div className="p-10">
          <h2 className="text-3xl font-semibold text-center text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">
            Create your account
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="flex w-full flex-col gap-4 mt-6 md:flex-row md:gap-4">
              <div className="w-full">
                <CustomInput
                  icon={<UserRound className="text-emerald-500" />}
                  iconPosition="left"
                  placeholder="First name"
                  aria-label="First name"
                  className="bg-gray-800 border-none rounded-md focus:ring-emerald-500 w-full"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  disabled={isLoading || isModalOpen}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                )}
              </div>
              <div className="w-full">
                <CustomInput
                  icon={<UserRound className="text-emerald-500" />}
                  iconPosition="left"
                  placeholder="Last name"
                  aria-label="Last name"
                  className="bg-gray-800 border-none rounded-md focus:ring-emerald-500 w-full"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  disabled={isLoading || isModalOpen}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                )}
              </div>
            </div>
            <div className="mt-4">
              <CustomInput
                icon={<Mail className="text-emerald-500" />}
                iconPosition="left"
                placeholder="Email"
                aria-label="Email"
                type="email"
                className="bg-gray-800 border-none rounded-md focus:ring-emerald-500 w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading || isModalOpen}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
            {/* Password Input */}
            <PasswordInput
              label="Password"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              showPassword={showPassword}
              toggleShowPassword={() => setShowPassword(!showPassword)}
              error={errors.password}
              disabled={isLoading || isModalOpen}
            />
            {/* Confirm Password Input */}
            <PasswordInput
              label="Confirm Password"
              value={confirmPassword}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
              showPassword={showConfirmPassword}
              toggleShowPassword={() => setShowConfirmPassword(!showConfirmPassword)}
              error={errors.confirmPassword}
              disabled={isLoading || isModalOpen}
            />
            <PasswordStrengthMeter password={password} />

            <LoadingButton
              type="submit"
              isLoading={isLoading}
              disabled={isLoading || isModalOpen}
              className="mt-4"
            >
              {isLoading ? "Registering..." : "Register your account"}
            </LoadingButton>
          </form>

          <p className="text-center mt-4 text-gray-400">or</p>

          <Button
            size="lg"
            className="mt-4 w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-3 rounded-xl shadow-xl hover:shadow-emerald-600 transition-all duration-300 ease-in-out transform hover:-translate-y-1"
            onClick={handleGoogleSignIn}
            disabled={isLoading || isModalOpen}
          >
            <div className="flex justify-center items-center gap-2">
              <CircleArrowRight />
              Continue with Google
            </div>
          </Button>
          <div className="flex flex-row justify-center mt-4 gap-2">
            <p className="text-gray-400">Already have an account?</p>
            <span className="text-emerald-500 underline">
              <Link to="/auth/login">Login here</Link>
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
