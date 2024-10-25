// EmailVerificationModal.tsx
import React from "react";
import Modal from "react-modal";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

interface EmailVerificationModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  email: string;
  otpValue: string;
  setOtpValue: (value: string) => void;
  handleVerifyOtp: () => void;
  isLoading: boolean;
}

const customModalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#1f2937",
    border: "none",
    borderRadius: "0.75rem",
    padding: "2rem",
    maxWidth: "500px",
    width: "90%",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    backdropFilter: "blur(100px)",
    zIndex: 1000,
  },
};

Modal.setAppElement("#root");

const EmailVerificationModal: React.FC<EmailVerificationModalProps> = ({
  isOpen,
  onRequestClose,
  email,
  otpValue,
  setOtpValue,
  handleVerifyOtp,
  isLoading,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customModalStyles}
      contentLabel="Email Verification Modal"
    >
      <div className="p-6">
        <div className="mb-6">
          <h2 className="text-2xl text-nowrap font-semibold text-center text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500 mb-4">
            Verify Your Account
          </h2>
          <p className="text-gray-300 text-center mb-6">
            Please enter the 6-digit code sent to{" "}
            <span className="font-medium">{email}</span>.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <InputOTP
            value={otpValue}
            onChange={setOtpValue}
            maxLength={6}
            className="justify-center mb-6"
          >
            <InputOTPGroup className="gap-2 mx-auto">
              {[...Array(6)].map((_, index) => (
                <InputOTPSlot
                  key={index}
                  index={index}
                  className="bg-gray-800 text-white border border-gray-600 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200 ease-in-out p-2 text-center text-2xl font-bold tracking-widest w-8 h- md:w-12 md:h-12 mb-4"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                />
              ))}
            </InputOTPGroup>
          </InputOTP>
          <Button
            size="lg"
            className={`w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-2 rounded-xl shadow-xl transition-all duration-300 ease-in-out transform ${
              otpValue.length < 6 || isLoading
                ? "opacity-50 cursor-not-allowed"
                : "hover:shadow-emerald-600 hover:-translate-y-1"
            }`}
            onClick={handleVerifyOtp}
            disabled={otpValue.length < 6 || isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <Loader className="animate-spin mr-2 w-5 h-5" />
                Verifying...
              </div>
            ) : (
              "Verify"
            )}
          </Button>
        </div>
        <p className="text-center text-gray-400 mt-4">
          Didn't receive the code?{" "}
          <button
            onClick={() => {
              // Implement resend OTP logic here
              console.log("Resend OTP clicked");
            }}
            className="text-emerald-500 hover:underline"
          >
            Resend Code
          </button>
        </p>
      </div>
    </Modal>
  );
};

export default EmailVerificationModal;
