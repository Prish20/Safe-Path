import React, { useState } from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { useDispatch } from "react-redux";
import { User } from "@/types/user";
import { userActions } from "@/user/userSlice";
import { app } from "../../firebase";
import LoadingButton from "./customComponents/LoadingButton";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "@/redux/store";

const Oauth: React.FC = () => {
  const auth = getAuth(app);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleClick = async (): Promise<void> => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const provider = new GoogleAuthProvider();

      const resultsFromGoogle = await signInWithPopup(auth, provider).catch((error) => {
        if (error.code === 'auth/popup-closed-by-user') {
          setIsLoading(false);
          throw new Error('Sign-in cancelled by user');
        }
        throw error;
      });

      const user = resultsFromGoogle.user;

      if (!user || !user.email) {
        throw new Error("No valid user data received from Google");
      }

      const userData: Partial<User> = {
        firstName: user.displayName?.split(" ")[0] || "",
        lastName: user.displayName?.split(" ").slice(1).join(" ") || "",
        email: user.email,
        photoURL: user.photoURL || "",
      };

      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(userData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Authentication failed");
      }

      if (!data.email) {
        console.error("Invalid response data:", data);
        throw new Error("Invalid user data received from server");
      }

      dispatch(userActions.signInSuccess(data));
      toast.success("Logged in successfully");
      navigate("/dashboard/home");
    } catch (error: unknown) {
      console.error("Google sign-in error:", error);
      toast.error(
        error instanceof Error && error.message === 'Sign-in cancelled by user'
          ? 'Sign-in cancelled'
          : 'Google sign-in failed. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LoadingButton isLoading={isLoading} onClick={handleGoogleClick}>
      Continue with Google
    </LoadingButton>
  );
};

export default Oauth;
