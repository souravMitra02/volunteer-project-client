import React, { use, useContext, useState } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthContext/AuthContext";
import { Helmet } from "react-helmet";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { motion } from "framer-motion";

const Login = () => {
  const { loginUser, googleLogin } = use(AuthContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    loginUser(email, password)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Login Successful!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: error.message,
        });
      });
  };

  const handleGoogleLogin = () => {
    googleLogin()
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Google Login Successful!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Google Login Failed",
          text: error.message,
        });
      });
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center  px-4">
      <Helmet>
        <title>Login | Volunteer Hub</title>
      </Helmet>

      {/* Login Form */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md bg-white/10 backdrop-blur-md border-2 border-gray-200 shadow-3xl shadow-gray-500 rounded-2xl p-8 md:mt-10 lg:mt-40 "
      >
        <h2 className="text-3xl font-extrabold text-center mb-6 ">
          Login to Your Account
        </h2>

        <form onSubmit={handleLogin} className="space-y-6 ">
          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Email Address</label>
            <input
              type="email"
              name="email"
              className="w-full px-4 py-2 rounded-xl bg-white/10 border placeholder-gray-400 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400"
              placeholder="example@email.com"
              required
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1 relative">
            <label className="text-sm font-medium">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              className="w-full px-4 py-2 rounded-xl bg-white/10 border placeholder-gray-400 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400"
              placeholder="Enter your password"
              required
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-9 text-lg cursor-pointer "
            >
              {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
            </span>
          </div>

          <div className="text-right">
            <span className="text-sm text-blue-400 hover:underline cursor-pointer">
              Forgot password?
            </span>
          </div>

          <motion.button
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full py-2 rounded-xl bg-blue-500 hover:bg-blue-600 font-semibold transition duration-300 shadow-md hover:shadow-lg"
          >
            Login
          </motion.button>

          {/* Divider */}
          <div className="flex items-center gap-2 my-4">
            <hr className="flex-grow border-gray-500" />
            <span className="text-sm ">OR</span>
            <hr className="flex-grow border-gray-500" />
          </div>

          {/* Google Login */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleGoogleLogin}
            type="button"
            className="w-full py-2 flex items-center justify-center gap-2 rounded-xl hover:cursor-pointer hover:bg-gray-200 font-medium border transition-all bg-white text-black"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 533.5 544.3"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M533.5 278.4c0-17.4-1.6-34.3-4.7-50.5H272v95.5h146.9c-6.3 34.3-25.5 63.3-54.5 82.7v68h87.9c51.5-47.4 81.2-117.3 81.2-195.7z"
                fill="#4285F4"
              />
              <path
                d="M272 544.3c73.8 0 135.8-24.5 181.1-66.8l-87.9-68c-24.4 16.3-55.6 25.9-93.2 25.9-71.7 0-132.5-48.3-154.3-113.5H26.6v71.4A272 272 0 00272 544.3z"
                fill="#34A853"
              />
              <path
                d="M117.7 321.9a163.8 163.8 0 010-103.5v-71.4H26.6a272 272 0 000 246.3l91.1-71.4z"
                fill="#FBBC05"
              />
              <path
                d="M272 107.7c39.9 0 75.7 13.8 103.9 41.2l77.8-77.8C407.8 25.2 345.8 0 272 0A272 272 0 0026.6 147l91.1 71.4C139.5 156 200.3 107.7 272 107.7z"
                fill="#EA4335"
              />
            </svg>
            Login with Google
          </motion.button>
          <div className="text-center mt-4">
  <span className="text-sm ">
    Don&apos;t have an account?{" "}
    <span
      onClick={() => navigate("/register")}
      className="text-blue-400 font-semibold hover:underline cursor-pointer"
    >
      Register
    </span>
  </span>
</div>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
