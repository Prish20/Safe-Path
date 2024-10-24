// src/pages/SignIn.tsx
import React, { useState } from 'react';

const SignIn: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    // Reset errors
    setEmailError('');
    setPasswordError('');

    // Validation
    let isValid = true;

    // Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address.');
      isValid = false;
    }

    // Password Validation
    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long.');
      isValid = false;
    }

    if (isValid) {
      console.log('Form submitted successfully:', { email, password });
      // Handle form submission here
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-200">
      <form
        onSubmit={submitHandler}
        className="bg-white p-8 rounded-lg shadow-lg w-96"
      >
        {/* Logo Section */}
        <div className="flex flex-col items-center mb-6">
          <div className="bg-green-500 p-4 rounded-full">
            <img src="/path/to/logo.png" alt="AgriCare Logo" className="h-16 w-16" />
          </div>
          <h1 className="text-2xl font-bold mt-4 text-green-700">Login to Your Account</h1>
          <p className="text-center text-gray-600 mt-2">
            Welcome back! Please login to continue.
          </p>
        </div>

        {/* Email Field */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email Address*
          </label>
          <input
            type="email"
            id="email"
            className={`mt-1 p-2 block w-full rounded-md border ${emailError ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:border-green-500 focus:ring-2 focus:ring-green-400`}
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-required="true"
            aria-invalid={!!emailError}
          />
          {emailError && (
            <p className="text-red-500 text-sm mt-1">{emailError}</p>
          )}
        </div>

        {/* Password Field */}
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password*
          </label>
          <input
            type="password"
            id="password"
            className={`mt-1 p-2 block w-full rounded-md border ${passwordError ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:border-green-500 focus:ring-2 focus:ring-green-400`}
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-required="true"
            aria-invalid={!!passwordError}
          />
          {passwordError && (
            <p className="text-red-500 text-sm mt-1">{passwordError}</p>
          )}
        </div>

        {/* Sign In Button */}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-green-600 text-white font-medium rounded-md shadow-md hover:bg-green-700 transition-colors mb-4"
        >
          Sign In
        </button>

        {/* Sign in with Google Button */}
        <button
          type="button"
          className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-md shadow-md hover:bg-blue-700 transition-colors"
        >
          Sign in with Google
        </button>

        {/* Register Link */}
        <div className="text-center mt-6">
          <p className="text-sm">
            Don't have an account?{' '}
            <a href="/register" className="text-green-500 font-medium">
              Register here
            </a>
          </p>
        </div>
      </form>
    </div>

  );
};

export default SignIn;
