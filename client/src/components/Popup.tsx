import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AiOutlineClose } from 'react-icons/ai';
import { useAuth } from '@/context/AuthContext';

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ isOpen, onClose }) => {
  const auth = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isResetPassword, setIsResetPassword] = useState(false);
  
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState('');
  const [forgotEmail, setForgotEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [loginError, setLoginError] = useState('');
  const [registerError, setRegisterError] = useState('');
  const [forgotPasswordError, setForgotPasswordError] = useState('');
  const [otpError, setOtpError] = useState('');
  const [resetPasswordError, setResetPasswordError] = useState('');

  const handleSwitch = () => {
    setIsLogin(!isLogin);
    setIsForgotPassword(false);
    setIsOtpSent(false);
    setIsResetPassword(false);
    resetFormState();
  };

  const resetFormState = () => {
    setLoginEmail('');
    setLoginPassword('');
    setRegisterEmail('');
    setRegisterPassword('');
    setRegisterConfirmPassword('');
    setForgotEmail('');
    setOtp('');
    setNewPassword('');
    setConfirmPassword('');
    setLoginError('');
    setRegisterError('');
    setForgotPasswordError('');
    setOtpError('');
    setResetPasswordError('');
  };

  const handleForgotPassword = () => {
    setIsForgotPassword(true);
    setIsOtpSent(false);
    setIsResetPassword(false);
  };

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail) {
      setForgotPasswordError('Email is required');
      return;
    }
    setForgotPasswordError('');
    setIsOtpSent(true);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp) {
      setOtpError('OTP is required');
      return;
    }
    setOtpError('');
    setIsResetPassword(true);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      setLoginError('Email and Password are required');
      return;
    }
    setLoginError('');
    auth.login(loginEmail, loginPassword);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!registerEmail || !registerPassword || !registerConfirmPassword) {
      setRegisterError('All fields are required');
      return;
    }
    if (registerPassword !== registerConfirmPassword) {
      setRegisterError('Passwords do not match');
      return;
    }
    setRegisterError('');
    // Perform registration action here
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || !confirmPassword) {
      setResetPasswordError('All fields are required');
      return;
    }
    if (newPassword !== confirmPassword) {
      setResetPasswordError('Passwords do not match');
      return;
    }
    setResetPasswordError('');
    // Perform reset password action here
  };

  const handleClose = () => {
    onClose();
    resetFormState();
    setIsLogin(true); // Kembali ke state login ketika form ditutup
    setIsForgotPassword(false); // Pastikan tidak dalam state forgot password
    setIsOtpSent(false); // Pastikan tidak dalam state OTP
    setIsResetPassword(false);
  };

  return (
    <>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={handleClose}
        >
          <motion.div
            initial={{ y: '-50%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            exit={{ y: '50%', opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-gray-800 text-white p-6 rounded-lg shadow-lg max-w-sm w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleClose}
              className="absolute top-2 right-2 text-gray-400 hover:text-white"
              aria-label="Close"
            >
              <AiOutlineClose className="w-6 h-6" />
            </button>
            <motion.div
              key={isForgotPassword ? (isOtpSent ? (isResetPassword ? 'reset' : 'otp') : 'forgot') : isLogin ? 'login' : 'register'}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <h2 className="text-xl font-bold mb-4">
                {isForgotPassword ? (isOtpSent ? (isResetPassword ? 'Reset Password' : 'Enter OTP') : 'Forgot Password') : isLogin ? 'Login' : 'Register'}
              </h2>
              {isForgotPassword ? (
                isOtpSent ? (
                  isResetPassword ? (
                    <form onSubmit={handleResetPassword} className="space-y-4">
                      <div>
                        <label htmlFor="new-password" className="block text-sm font-medium">New Password</label>
                        <input
                          id="new-password"
                          type="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="mt-1 p-2 w-full rounded border border-gray-600 bg-gray-700 text-white focus:border-blue-500 focus:outline-none"
                          placeholder="Enter new password"
                        />
                      </div>
                      <div>
                        <label htmlFor="confirm-password" className="block text-sm font-medium">Confirm Password</label>
                        <input
                          id="confirm-password"
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="mt-1 p-2 w-full rounded border border-gray-600 bg-gray-700 text-white focus:border-blue-500 focus:outline-none"
                          placeholder="Confirm new password"
                        />
                      </div>
                      {resetPasswordError && <p className="text-red-500 text-sm">{resetPasswordError}</p>}
                      <button
                        type="submit"
                        className="w-full py-2 bg-blue-600 hover:bg-blue-500 rounded text-white font-bold"
                      >
                        Reset Password
                      </button>
                    </form>
                  ) : (
                    <form onSubmit={handleVerifyOtp} className="space-y-4">
                      <div>
                        <label htmlFor="otp" className="block text-sm font-medium">Enter OTP</label>
                        <input
                          id="otp"
                          type="text"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                          className="mt-1 p-2 w-full rounded border border-gray-600 bg-gray-700 text-white focus:border-blue-500 focus:outline-none"
                          placeholder="Enter OTP"
                        />
                      </div>
                      {otpError && <p className="text-red-500 text-sm">{otpError}</p>}
                      <button
                        type="submit"
                        className="w-full py-2 bg-blue-600 hover:bg-blue-500 rounded text-white font-bold"
                      >
                        Verify OTP
                      </button>
                      <p className="text-sm text-center mt-2">
                        Didn't receive the OTP?{' '}
                        <button type="button" onClick={handleSendOtp} className="text-blue-400 hover:underline">
                          Resend
                        </button>
                      </p>
                    </form>
                  )
                ) : (
                  <form onSubmit={handleSendOtp} className="space-y-4">
                    <div>
                      <label htmlFor="forgot-email" className="block text-sm font-medium">Email</label>
                      <input
                        id="forgot-email"
                        type="email"
                        value={forgotEmail}
                        onChange={(e) => setForgotEmail(e.target.value)}
                        className="mt-1 p-2 w-full rounded border border-gray-600 bg-gray-700 text-white focus:border-blue-500 focus:outline-none"
                        placeholder="Enter your email"
                      />
                    </div>
                    {forgotPasswordError && <p className="text-red-500 text-sm">{forgotPasswordError}</p>}
                    <button
                      type="submit"
                      className="w-full py-2 bg-blue-600 hover:bg-blue-500 rounded text-white font-bold"
                    >
                      Send OTP
                    </button>
                    <p className="text-sm text-center mt-2">
                      Remembered your password?{' '}
                      <button type="button" onClick={() => setIsForgotPassword(false)} className="text-blue-400 hover:underline">
                        Login
                      </button>
                    </p>
                  </form>
                )
              ) : isLogin ? (
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label htmlFor="login-email" className="block text-sm font-medium">Email</label>
                    <input
                      id="login-email"
                      type="email"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      className="mt-1 p-2 w-full rounded border border-gray-600 bg-gray-700 text-white focus:border-blue-500 focus:outline-none"
                      placeholder="Email"
                    />
                  </div>
                  <div>
                    <label htmlFor="login-password" className="block text-sm font-medium">Password</label>
                    <input
                      id="login-password"
                      type="password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className="mt-1 p-2 w-full rounded border border-gray-600 bg-gray-700 text-white focus:border-blue-500 focus:outline-none"
                      placeholder="Password"
                    />
                  </div>
                  {loginError && <p className="text-red-500 text-sm">{loginError}</p>}
                  <button
                    type="submit"
                    className="w-full py-2 bg-blue-600 hover:bg-blue-500 rounded text-white font-bold"
                  >
                    Login
                  </button>
                  <p className="text-sm text-center mt-2">
                    Don't have an account?{' '}
                    <button type="button" onClick={handleSwitch} className="text-blue-400 hover:underline">
                      Register
                    </button>
                  </p>
                  <p className="text-sm text-center mt-2">
                    <button type="button" onClick={handleForgotPassword} className="text-blue-400 hover:underline">
                      Forgot Password?
                    </button>
                  </p>
                </form>
              ) : (
                <form onSubmit={handleRegister} className="space-y-4">
                  <div>
                    <label htmlFor="register-email" className="block text-sm font-medium">Email</label>
                    <input
                      id="register-email"
                      type="email"
                      value={registerEmail}
                      onChange={(e) => setRegisterEmail(e.target.value)}
                      className="mt-1 p-2 w-full rounded border border-gray-600 bg-gray-700 text-white focus:border-blue-500 focus:outline-none"
                      placeholder="Email"
                    />
                  </div>
                  <div>
                    <label htmlFor="register-password" className="block text-sm font-medium">Password</label>
                    <input
                      id="register-password"
                      type="password"
                      value={registerPassword}
                      onChange={(e) => setRegisterPassword(e.target.value)}
                      className="mt-1 p-2 w-full rounded border border-gray-600 bg-gray-700 text-white focus:border-blue-500 focus:outline-none"
                      placeholder="Password"
                    />
                  </div>
                  <div>
                    <label htmlFor="register-confirm-password" className="block text-sm font-medium">Confirm Password</label>
                    <input
                      id="register-confirm-password"
                      type="password"
                      value={registerConfirmPassword}
                      onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                      className="mt-1 p-2 w-full rounded border border-gray-600 bg-gray-700 text-white focus:border-blue-500 focus:outline-none"
                      placeholder="Confirm Password"
                    />
                  </div>
                  {registerError && <p className="text-red-500 text-sm">{registerError}</p>}
                  <button
                    type="submit"
                    className="w-full py-2 bg-blue-600 hover:bg-blue-500 rounded text-white font-bold"
                  >
                    Register
                  </button>
                  <p className="text-sm text-center mt-2">
                    Already have an account?{' '}
                    <button type="button" onClick={handleSwitch} className="text-blue-400 hover:underline">
                      Login
                    </button>
                  </p>
                </form>
              )}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default Popup;
