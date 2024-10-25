// ForgotPasswordModal.tsx
import React, { useState } from "react";
import Modal from "react-modal";
import { Button } from "@/components/ui/button";
import { CustomInput } from "@/components/customComponents/customInput";
import { Mail, Loader } from "lucide-react";

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  handlePasswordReset: (email: string) => void;
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

const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({
  isOpen,
  onRequestClose,
  handlePasswordReset,
  isLoading,
}) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Simple email validation
    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    try {
      // Call the parent handler
      await handlePasswordReset(email);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred. Please try again.");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Forgot Password Modal"
      style={customModalStyles as Modal.Styles}
    >
      <div>
        <h2 className="text-xl sm:text-2xl font-semibold text-center text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500 mb-4">
          Forgot Your Password?
        </h2>
        <p className="text-gray-300 text-center mb-6 text-sm sm:text-base">
          Enter your email address below and we'll send you instructions to reset your password.
        </p>
        <form onSubmit={handleSubmit}>
          <CustomInput
            icon={<Mail className="text-emerald-500" />}
            iconPosition="left"
            placeholder="Email"
            aria-label="Email"
            type="email"
            className="bg-gray-800 border-none rounded-md focus:ring-emerald-500 w-full mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
          />
          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
          <Button
            size="lg"
            type="submit"
            className={`w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-2 sm:py-3 rounded-xl shadow-xl transition-all duration-300 ease-in-out transform ${
              isLoading
                ? "opacity-50 cursor-not-allowed"
                : "hover:shadow-emerald-600 hover:-translate-y-1"
            }`}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <Loader className="animate-spin mr-2 w-5 h-5" />
                Sending...
              </div>
            ) : (
              "Send Reset Instructions"
            )}
          </Button>
        </form>
        <p className="text-center text-gray-400 mt-4 text-sm sm:text-base">
          Remembered your password?{" "}
          <button
            onClick={onRequestClose}
            className="text-emerald-500 hover:underline"
          >
            Sign In
          </button>
        </p>
      </div>
    </Modal>
  );
};

export default ForgotPasswordModal;
