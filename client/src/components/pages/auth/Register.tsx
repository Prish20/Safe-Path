import { motion } from "framer-motion";
import { useState } from "react";
import { CustomInput } from "@/components/customComponents/customInput";
import { CircleArrowRight, Mail, Eye, EyeOff } from "lucide-react";
import { LockKeyhole } from "lucide-react";
import { UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";

const Register = () => {
  // State to toggle password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="flex justify-center items-center rounded-xl bg-gradient-to-r from-gray-800 to-gray-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full bg-gray-900 bg-opacity-70 rounded-xl shadow-2xl overflow-hidden"
      >
        <div className="p-10">
          <h2 className="text-3xl font-semibold text-center text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">
            Create your account
          </h2>
          <form>
            <div className="flex w-full flex-col gap-4 mt-6 md:flex-row md:gap-4">
              <CustomInput
                icon={<UserRound className="text-emerald-500" />}
                iconPosition="left"
                placeholder="First name"
                className="bg-gray-800 border-none rounded-md focus:ring-emerald-500 w-full"
              />
              <CustomInput
                icon={<UserRound className="text-emerald-500" />}
                iconPosition="left"
                placeholder="Last name"
                className="bg-gray-800 border-none rounded-md focus:ring-emerald-500 w-full"
              />
            </div>
            <CustomInput
              icon={<Mail className="text-emerald-500" />}
              iconPosition="left"
              placeholder="Email"
              className="mt-4 bg-gray-800 border-none rounded-md focus:ring-emerald-500"
            />

            {/* Password Input with Toggle View */}
            <div className="relative mt-4">
              <CustomInput
                icon={<LockKeyhole className="text-emerald-500" />}
                iconPosition="left"
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                className="bg-gray-800 border-none rounded-md focus:ring-emerald-500 w-full"
              />
              <span
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </span>
            </div>

            {/* Confirm Password Input with Toggle View */}
            <div className="relative mt-4">
              <CustomInput
                icon={<LockKeyhole className="text-emerald-500" />}
                iconPosition="left"
                placeholder="Confirm Password"
                type={showConfirmPassword ? "text" : "password"}
                className="bg-gray-800 border-none rounded-md focus:ring-emerald-500 w-full"
              />
              <span
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </span>
            </div>

            <Button
              size="lg"
              type="submit"
              className="mt-4 w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-3 rounded-xl shadow-xl hover:shadow-emerald-600 transition-all duration-300 ease-in-out transform hover:-translate-y-1"
            >
              Register your account
            </Button>
          </form>

          <p className="text-center mt-4 text-gray-400">or</p>

          <Button
            size="lg"
            className="mt-4 w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-3 rounded-xl shadow-xl hover:shadow-emerald-600 transition-all duration-300 ease-in-out transform hover:-translate-y-1"
          >
            <div className="flex justify-center items-center gap-2">
              <CircleArrowRight />
              Continue with Google
            </div>
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
