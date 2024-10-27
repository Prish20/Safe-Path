import { useState } from "react";
import { motion } from "framer-motion";
import { CustomInput } from "@/components/customComponents/customInput";
import { Eye, EyeOff, LockKeyhole, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { resetPasswordSchema } from "@/lib/validationSchema";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { resetPassword } from "@/user/userThunks";
import { toast } from "sonner";
import { AUTH_PATH } from "@/routes/paths";

interface Errors {
  password?: string;
  confirmPassword?: string;
}

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { token } = useParams<{ token: string }>();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      resetPasswordSchema.parse({
        password,
        confirmPassword,
      });
      setErrors({});
      setIsLoading(true);

      const trimmedToken = token?.trim() || "";
      await dispatch(resetPassword({ password, token: trimmedToken })).unwrap();
      toast.success("Password reset successfully");
      navigate(AUTH_PATH.login);
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
        console.error("An error occurred during password reset:", error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex justify-center items-center rounded-xl bg-gradient-to-r from-gray-800 to-gray-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full bg-gray-900 bg-opacity-70 rounded-xl shadow-2xl overflow-hidden"
      >
        <div className="p-10">
          <h2 className="text-3xl font-semibold text-center text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500 mb-4">
            Reset Your Password
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="relative mt-4">
              <CustomInput
                icon={<LockKeyhole className="text-emerald-500" />}
                iconPosition="left"
                placeholder="New Password"
                aria-label="New Password"
                type={showPassword ? "text" : "password"}
                className="bg-gray-800 border-none rounded-md focus:ring-emerald-500 w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
              <button
                type="button"
                aria-label="Toggle password visibility"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 focus:outline-none"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
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

            <div className="relative mt-4">
              <CustomInput
                icon={<LockKeyhole className="text-emerald-500" />}
                iconPosition="left"
                placeholder="Confirm New Password"
                aria-label="Confirm New Password"
                type={showConfirmPassword ? "text" : "password"}
                className="bg-gray-800 border-none rounded-md focus:ring-emerald-500 w-full"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={isLoading}
              />
              <button
                type="button"
                aria-label="Toggle confirm password visibility"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 focus:outline-none"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                disabled={isLoading}
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <Button
              size="lg"
              type="submit"
              className={`mt-6 w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-3 rounded-xl shadow-xl transition-all duration-300 ease-in-out transform ${
                !isLoading
                  ? "hover:shadow-emerald-600 hover:-translate-y-1"
                  : ""
              }`}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <Loader className="animate-spin mr-2 w-5 h-5" />
                  Resetting Password...
                </div>
              ) : (
                "Reset Password"
              )}
            </Button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default ResetPassword;
