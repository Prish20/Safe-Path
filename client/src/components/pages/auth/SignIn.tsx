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
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { signinSchema } from "@/lib/validationSchema";
import ForgotPasswordModal from "@/components/customComponents/ForgotPasswordModal";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { signInUser, verifyOtp, requestPasswordReset } from "@/user/userThunks";
import { toast } from "sonner";
import EmailVerificationModal from "@/components/customComponents/EmailVerificationModal";
import { DASHBOARD_PATH } from "@/routes/paths";

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
  const navigate = useNavigate();

  // State for form errors
  const [errors, setErrors] = useState<Errors>({});

  // State for Forgot Password Modal
  const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] =
    useState(false);
  const [isLoadingReset, setIsLoadingReset] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  // State for Email Verification Modal
  const [isEmailVerificationModalOpen, setIsEmailVerificationModalOpen] =
    useState(false);
  const [unverifiedEmail, setUnverifiedEmail] = useState("");
  const [isLoadingVerification, setIsLoadingVerification] = useState(false);
  const [verificationError, setVerificationError] = useState<string | null>(
    null
  );

  // Add this new state
  const [otpValue, setOtpValue] = useState("");

  // Handler for form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      signinSchema.parse({
        email,
        password,
      });
      setErrors({});
      setIsLoading(true);
      const result = await dispatch(signInUser({ email, password })).unwrap();

      if (!result.isVerified) {
        setUnverifiedEmail(email);
        setIsEmailVerificationModalOpen(true);
      } else {
        try {
          navigate(DASHBOARD_PATH.home);
          console.log("Navigation completed");
        } catch (navError) {
          console.error("Navigation error:", navError);
        }
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Errors = {};
        error.errors.forEach((err) => {
          const path = err.path[0] as keyof Errors;
          fieldErrors[path] = err.message;
        });
        setErrors(fieldErrors);
      } else {
        toast.error(error as string);
        console.error("An error occurred during sign-in:", error);
      }

      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuccessfulVerification = () => {
    setIsEmailVerificationModalOpen(false);
    navigate(DASHBOARD_PATH.home);
  };

  // Handler for Google Sign-In
  const handleGoogleSignIn = () => {
    // Implement Google Sign-In logic here
    console.log("Google Sign-In clicked");
  };

  // Update the handlePasswordReset function
  const handlePasswordReset = async (email: string) => {
    try {
      setIsLoadingReset(true);
      await dispatch(requestPasswordReset(email)).unwrap();
      toast.success("Password reset instructions sent to your email");
      setIsForgotPasswordModalOpen(false);
    } catch (error) {
      toast.error(error as string);
      console.error("An error occurred during password reset:", error);
    } finally {
      setIsLoadingReset(false);
    }
  };

  // Update the handleEmailVerification function
  const handleEmailVerification = async () => {
    setIsLoadingVerification(true);
    setVerificationError(null);
    try {
      await dispatch(
        verifyOtp({ email: unverifiedEmail, otp: otpValue })
      ).unwrap();
      handleSuccessfulVerification();
    } catch (error) {
      setVerificationError(error as string);
      console.error("An error occurred during email verification:", error);
    } finally {
      setIsLoadingVerification(false);
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

      {/* Email Verification Modal */}
      <EmailVerificationModal
        isOpen={isEmailVerificationModalOpen}
        onRequestClose={() => setIsEmailVerificationModalOpen(false)}
        email={unverifiedEmail}
        otpValue={otpValue}
        setOtpValue={setOtpValue}
        handleVerifyOtp={handleEmailVerification}
        isLoading={isLoadingVerification}
        errorMessage={verificationError}
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
