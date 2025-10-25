import React, { use,  useState } from "react";
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

  console.log("AuthContext functions:", { loginUser, googleLogin });

  // =====================
  // Email/Password Login
  // =====================
  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Email login form submitted");

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const result = await loginUser(email, password);
      console.log("Login result:", result);

      const userName = result.user.displayName || "Volunteer";
      const userEmail = result.user.email;
      console.log("User Name:", userName, "Email:", userEmail);

      Swal.fire({
        icon: "success",
        title: "Login Successful!",
        showConfirmButton: false,
        timer: 1500,
      });

      // Send welcome email
      await fetch("https://jp-server-ten.vercel.app/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: userEmail,
          userName: userName,
          postTitle: "Welcome Back to Volunteer Hub!",
        }),
      });

      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error.message,
      });
    }
  };

  // =====================
  // Google Login
  // =====================
  const handleGoogleLogin = async () => {
    try {
      const result = await googleLogin();
      const userName = result.user.displayName || "Volunteer";
      const userEmail = result.user.email;

      Swal.fire({
        icon: "success",
        title: "Google Login Successful!",
        showConfirmButton: false,
        timer: 1500,
      });

      // Send welcome email
      await fetch("https://jp-server-ten.vercel.app/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: userEmail,
          userName: userName,
          postTitle: "Welcome Back to Volunteer Hub!",
        }),
      });

      navigate("/");
    } catch (error) {
      console.error("Google login error:", error);
      Swal.fire({
        icon: "error",
        title: "Google Login Failed",
        text: error.message,
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center px-4">
      <Helmet>
        <title>Login | Volunteer Hub</title>
      </Helmet>

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md bg-white/10 backdrop-blur-md border-2 border-gray-200 shadow-3xl shadow-gray-500 rounded-2xl p-8 md:mt-10 lg:mt-40"
      >
        <h2 className="text-3xl font-extrabold text-center mb-6">
          Login to Your Account
        </h2>

        <form onSubmit={handleLogin} className="space-y-6">
          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Email Address</label>
            <input
              type="email"
              name="email"
              className="w-full px-4 py-2 rounded-xl bg-white/10 border placeholder-gray-400 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-orange-600"
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
              className="w-full px-4 py-2 rounded-xl bg-white/10 border placeholder-gray-400 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-orange-600"
              placeholder="Enter your password"
              required
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-9 text-lg cursor-pointer"
            >
              {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
            </span>
          </div>

          <div className="text-right">
            <span className="text-sm text-orange-600 hover:underline cursor-pointer">
              Forgot password?
            </span>
          </div>

          <motion.button
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-pink-600 hover:to-orange-600 text-white font-semibold px-4 py-2 rounded-xl shadow hover:shadow-lg transition-all duration-300"
          >
            Login
          </motion.button>

          {/* Divider */}
          <div className="flex items-center gap-2 my-4">
            <hr className="flex-grow border-gray-500" />
            <span className="text-sm">OR</span>
            <hr className="flex-grow border-gray-500" />
          </div>

          {/* Google Login */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleGoogleLogin}
            type="button"
            className="w-full py-2 flex items-center justify-center gap-2 rounded-xl hover:cursor-pointer hover:bg-gray-200 font-medium border transition-all bg-white text-black"
          >
            <span>Login with Google</span>
          </motion.button>

          <div className="text-center mt-4">
            <span className="text-sm">
              Don&apos;t have an account?{" "}
              <span
                onClick={() => navigate("/register")}
                className="text-orange-600 font-semibold hover:underline cursor-pointer"
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
