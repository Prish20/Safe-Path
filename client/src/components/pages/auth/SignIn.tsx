// SignIn.tsx
import { useState } from "react";
import { motion } from "framer-motion";
import { CustomInput } from "@/components/customComponents/customInput";
import {
  Mail,
  Eye,
  EyeOff,
  LockKeyhole,
  CircleArrowRight,
  Loader,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { z } from "zod";
import { signinSchema } from "@/lib/validationSchema";
import ForgotPasswordModal from "@/components/customComponents/ForgotPasswordModal";

interface Errors {
  email?: string;
  password?: string;
}

const SignIn = () => {
  // State management for form inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // State for password visibility toggle
  const [showPassword, setShowPassword] = useState(false);

  // State for form errors
  const [errors, setErrors] = useState<Errors>({});

  // State for Forgot Password Modal
  const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] = useState(false);
  const [isLoadingReset, setIsLoadingReset] = useState(false);

  // Handler for form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Validate form data using the imported schema
      signinSchema.parse({
        email,
        password,
      });

      // Reset errors
      setErrors({});

      // Set isLoading to true to indicate loading state
      setIsLoading(true);

      // Simulate form submission delay (e.g., API call)
      // Replace this with your actual API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // If submission is successful
      console.log("Sign-in form submitted successfully");

      // Reset isLoading to false
      setIsLoading(false);

      // Optionally, redirect the user to another page
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Errors = {};
        error.errors.forEach((err) => {
          const path = err.path[0] as keyof Errors;
          fieldErrors[path] = err.message;
        });
        setErrors(fieldErrors);
      } else {
        // Handle other types of errors (e.g., network errors)
        console.error("An error occurred during sign-in:", error);
      }

      // Reset isLoading to false in case of error
      setIsLoading(false);
    }
  };

  // Handler for Google Sign-In
  const handleGoogleSignIn = () => {
    // Implement Google Sign-In logic here
    console.log("Google Sign-In clicked");
  };

  // Handler for Password Reset
  const handlePasswordReset = async (email: string) => {
    try {
      setIsLoadingReset(true);

      // Implement password reset logic here
      console.log("Password reset requested for:", email);

      // Simulate password reset delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // If password reset is successful
      console.log("Password reset instructions sent to:", email);

      // Close the modal
      setIsForgotPasswordModalOpen(false);

      // Reset loading state
      setIsLoadingReset(false);

      // Optionally, show a success message
    } catch (error) {
      console.error("An error occurred during password reset:", error);

      // Reset loading state
      setIsLoadingReset(false);

      // Optionally, show an error message
    }
  };

  return (
    <div className="relative flex justify-center items-center rounded-xl bg-gradient-to-r from-gray-800 to-gray-900">
      {/* Forgot Password Modal */}
      <ForgotPasswordModal
        isOpen={isForgotPasswordModalOpen}
        onRequestClose={() => setIsForgotPasswordModalOpen(false)}
        handlePasswordReset={handlePasswordReset}
        isLoading={isLoadingReset}
      />

      <motion.div
        initial={{ opacity: isForgotPasswordModalOpen ? 0.5 : 0, y: 20 }}
        animate={{ opacity: isForgotPasswordModalOpen ? 0.5 : 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`max-w-md w-full bg-gray-900 bg-opacity-70 rounded-xl shadow-2xl overflow-hidden ${
          isForgotPasswordModalOpen ? "pointer-events-none" : ""
        }`}
      >
        <div className="p-10">
          <h2 className="text-3xl font-semibold text-center text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500 mb-4">
            Sign in to your account
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mt-6">
              <CustomInput
                icon={<Mail className="text-emerald-500" />}
                iconPosition="left"
                placeholder="Email"
                aria-label="Email"
                type="email"
                className="bg-gray-800 border-none rounded-md focus:ring-emerald-500 w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading || isForgotPasswordModalOpen}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
            {/* Password Input with Toggle View */}
            <div className="relative mt-4">
              <CustomInput
                icon={<LockKeyhole className="text-emerald-500" />}
                iconPosition="left"
                placeholder="Password"
                aria-label="Password"
                type={showPassword ? "text" : "password"}
                className="bg-gray-800 border-none rounded-md focus:ring-emerald-500 w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading || isForgotPasswordModalOpen}
              />
              <button
                type="button"
                aria-label="Toggle password visibility"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 focus:outline-none"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading || isForgotPasswordModalOpen}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {/* Forgot Password Link */}
            <div className="mt-2 text-left">
              <button
                type="button"
                onClick={() => setIsForgotPasswordModalOpen(true)}
                className="text-emerald-500 hover:underline text-sm"
                disabled={isLoading || isForgotPasswordModalOpen}
              >
                Forgot Password?
              </button>
            </div>

            <Button
              size="lg"
              type="submit"
              className={`mt-4 w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-3 rounded-xl shadow-xl transition-all duration-300 ease-in-out transform ${
                !isLoading
                  ? "hover:shadow-emerald-600 hover:-translate-y-1"
                  : ""
              }`}
              disabled={isLoading || isForgotPasswordModalOpen}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <Loader className="animate-spin mr-2 w-5 h-5" />
                  Signing In...
                </div>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          <p className="text-center mt-4 text-gray-400">or</p>

          <Button
            size="lg"
            className="mt-4 w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-3 rounded-xl shadow-xl hover:shadow-emerald-600 transition-all duration-300 ease-in-out transform hover:-translate-y-1"
            onClick={handleGoogleSignIn}
            disabled={isLoading || isForgotPasswordModalOpen}
          >
            <div className="flex justify-center items-center gap-2">
              <CircleArrowRight />
              Continue with Google
            </div>
          </Button>
          <div className="flex flex-row justify-center mt-4 gap-2">
            <p className="text-gray-400">Don't have an account?</p>
            <span className="text-emerald-500 underline">
              <Link to="/auth/register">Register here</Link>
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SignIn;
