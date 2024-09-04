import React, { ChangeEventHandler, useState } from 'react';
import { motion } from 'framer-motion';
import { AiOutlineClose } from 'react-icons/ai';
import { useAuth } from '@/context/AuthContext';
import AlertPopup from './AlertPopup';
import { useNavigate } from 'react-router-dom';
import { AlertProps, PopupProps } from '@/types';
import { register, resetPassword, sendOtp, verifyOtp } from '@/service/userService';
import { Eye, EyeOff } from 'lucide-react';


const Popup: React.FC<PopupProps> = ({ isOpen, onClose }) => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [isForgotPassword, setIsForgotPassword] = useState<boolean>(false);
  const [isOtpSent, setIsOtpSent] = useState<boolean>(false);
  const [isResetPassword, setIsResetPassword] = useState<boolean>(false);

  const [loginEmail, setLoginEmail] = useState<string>('');
  const [loginPassword, setLoginPassword] = useState<string>('');

  const [registerFullName, setRegisterFullName] = useState<string>('');
  const [registerPhoneNumber, setRegisterPhoneNumber] = useState<string>('');
  const [registerEmail, setRegisterEmail] = useState<string>('');
  const [registerPassword, setRegisterPassword] = useState<string>('');

  const [forgotEmail, setForgotEmail] = useState<string>('');
  const [otp, setOtp] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const [registerError, setRegisterError] = useState<string>('');

  const [alertPopup, setAlertPopup] = useState<AlertProps>({} as AlertProps);
  const [isAlertVisible, setIsAlertVisible] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

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
    setForgotEmail('');
    setOtp('');
    setNewPassword('');
    setConfirmPassword('');
    setRegisterError('');
  };

  const handleForgotPassword = () => {
    setIsForgotPassword(true);
    setIsOtpSent(false);
    setIsResetPassword(false);
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await sendOtp(forgotEmail);
    if (res.success) {
      setAlertPopup({
        message: res.message,
        type: res.success,
        onClose: closeAlert
      })
      setIsOtpSent(true);
    } else {
      setAlertPopup({
        message: res.message,
        type: res.success,
        onClose: closeAlert
      })
    }
    setIsAlertVisible(true);
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await verifyOtp(forgotEmail, otp);
    if (res.success) {
      setAlertPopup({
        message: res.message,
        type: res.success,
        onClose: closeAlert
      })
      setIsResetPassword(true);
    } else {
      setAlertPopup({
        message: res.message,
        type: res.success,
        onClose: closeAlert
      })
    }
    setIsAlertVisible(true);
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await resetPassword(forgotEmail, newPassword, confirmPassword);
    if (res.success) {
      setAlertPopup({
        message: res.message,
        type: res.success,
        onClose: closeAlert
      })
      handleClose();
      navigate('/');
    } else {
      setAlertPopup({
        message: res.message,
        type: res.success,
        onClose: closeAlert
      })
    }
    setIsAlertVisible(true);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await auth.login(loginEmail, loginPassword);
    if (res.success) {
      setAlertPopup({
        message: res.message,
        type: res.success,
        onClose: closeAlert
      })
      handleClose();
      navigate('/');
    } else {
      setAlertPopup({
        message: res.message,
        type: res.success,
        onClose: closeAlert
      })
    }
    setIsAlertVisible(true);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await register(registerFullName, registerPhoneNumber, registerEmail, registerPassword);
    if (res.success) {
      setAlertPopup({
        message: res.message,
        type: res.success,
        onClose: closeAlert
      })
      navigate('/');
      handleClose();
    } else {
      setAlertPopup({
        message: res.message,
        type: res.success,
        onClose: closeAlert
      })
    }
    setIsAlertVisible(true);
  };

  const handlePhoneNumber: ChangeEventHandler<HTMLInputElement> = (event) => {
    const phoneNumber = event.target.value.replace(/[^+\d]/g, '').replace(/\+/g, (_match, offset) => (offset === 0 ? '+' : '')).toString()
    if (phoneNumber.length > 13) {
      setRegisterPhoneNumber(phoneNumber.slice(0, 13));
    } else {
      setRegisterPhoneNumber(phoneNumber);
    }
    const phoneNumberPattern = /^(0|\+62)8[1-9]\d{7,11}$/;
    if (phoneNumberPattern.test(registerPhoneNumber)) {
      setRegisterError('');
    } else {
      setRegisterError("Nomor telepon harus dimulai dengan +62 atau 08 dan memiliki panjang 12 atau 13 digit.");
    }
  }

  const handleClose = () => {
    onClose();
    resetFormState();
    setIsLogin(true);
    setIsForgotPassword(false);
    setIsOtpSent(false);
    setIsResetPassword(false);
  };

  const closeAlert = () => {
    setIsAlertVisible(false);
    setAlertPopup(prevAlert => ({ ...prevAlert, [alertPopup.message]: '' }));
  };

  return (
    <>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-40"
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

                        <div className="relative">
                          <input
                            id="new-password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            type={showPassword ? 'text' : 'password'}
                            className="mt-1 p-2 w-full rounded border border-gray-600 bg-gray-700 text-white focus:border-blue-500 focus:outline-none"
                            placeholder="Password"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400"
                          >
                            {showPassword ? <EyeOff /> : <Eye />}
                          </button>
                        </div>

                      </div>
                      <div>
                        <label htmlFor="confirm-password" className="block text-sm font-medium">Confirm Password</label>
                        <div className="relative">
                          <input
                            id="confirm-password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            type={showPassword ? 'text' : 'password'}
                            className="mt-1 p-2 w-full rounded border border-gray-600 bg-gray-700 text-white focus:border-blue-500 focus:outline-none"
                            placeholder="Password"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400"
                          >
                            {showPassword ? <EyeOff /> : <Eye />}
                          </button>
                        </div>
                      </div>
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
                          required
                          id="otp"
                          type="text"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                          className="mt-1 p-2 w-full rounded border border-gray-600 bg-gray-700 text-white focus:border-blue-500 focus:outline-none"
                          placeholder="Enter OTP"
                        />
                      </div>
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
                        required
                        id="forgot-email"
                        type="email"
                        value={forgotEmail}
                        onChange={(e) => setForgotEmail(e.target.value)}
                        className="mt-1 p-2 w-full rounded border border-gray-600 bg-gray-700 text-white focus:border-blue-500 focus:outline-none"
                        placeholder="Enter your email"
                      />
                    </div>
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
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="login-password" className="block text-sm font-medium">Password</label>
                    <div className="relative">
                      <input
                        id="login-password"
                        type={showPassword ? 'text' : 'password'}
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        className="mt-1 p-2 w-full rounded border border-gray-600 bg-gray-700 text-white focus:border-blue-500 focus:outline-none"
                        placeholder="Password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400"
                      >
                        {showPassword ? <EyeOff /> : <Eye />}
                      </button>
                    </div>
                  </div>
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
                    <label htmlFor="register-fullname" className="block text-sm font-medium">Full Name</label>
                    <input
                      required
                      id="register-fullname"
                      type="text"
                      value={registerFullName}
                      onChange={(e) => setRegisterFullName(e.target.value)}
                      className="mt-1 p-2 w-full rounded border border-gray-600 bg-gray-700 text-white focus:border-blue-500 focus:outline-none"
                      placeholder="Full Name"
                    />
                  </div>
                  <div>
                    <label htmlFor="register-phone" className="block text-sm font-medium">Phone Number</label>
                    <input
                      required
                      id="register-phone"
                      type="text"
                      value={registerPhoneNumber}
                      onChange={handlePhoneNumber}
                      className="mt-1 p-2 w-full rounded border border-gray-600 bg-gray-700 text-white focus:border-blue-500 focus:outline-none"
                      placeholder="Phone Number"
                    />
                  </div>
                  <div>
                    <label htmlFor="register-email" className="block text-sm font-medium">Email</label>
                    <input
                      required
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
                    <div className="relative">
                      <input
                        id="register-password"
                        value={registerPassword}
                        onChange={(e) => setRegisterPassword(e.target.value)}
                        type={showPassword ? 'text' : 'password'}
                        className="mt-1 p-2 w-full rounded border border-gray-600 bg-gray-700 text-white focus:border-blue-500 focus:outline-none"
                        placeholder="Password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400"
                      >
                        {showPassword ? <EyeOff /> : <Eye />}
                      </button>
                    </div>
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
      {isAlertVisible && (
        <AlertPopup message={alertPopup.message} type={alertPopup.type} onClose={closeAlert} />
      )}
    </>
  );
};

export default Popup;
