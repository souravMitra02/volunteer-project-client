import React, { use } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../context/AuthContext/AuthContext";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";

const Register = () => {
  const { createUser, googleLogin } = use(AuthContext);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const photoURL = form.photoURL.value;

    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const isLengthValid = password.length >= 6;

    if (!hasUppercase || !hasLowercase || !isLengthValid) {
      toast.error(
        "Password must have an uppercase, a lowercase & at least 6 characters."
      );
      return;
    }

    createUser(email, password)
      .then((result) => {
        console.log(result.user);
        Swal.fire({
          title: "Success!",
          text: "Registration successful!",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/login");
        });
        form.reset();
      })
      .catch((error) => {
        console.log(error.message);
        toast.error(error.message);
      });
  };

  const handleGoogleLogin = () => {
    googleLogin()
      .then((result) => {
        console.log(result.user);
        Swal.fire({
          title: "Success!",
          text: "Google Login successful!",
          icon: "success",
          confirmButtonText: "OK",
        });
        navigate("/");
      })
      .catch((error) => {
        console.error(error.message);
        toast.error("Google login failed.");
      });
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center px-4">
      <Helmet>
        <title>Register | Volunteer Hub</title>
      </Helmet>

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md bg-white/10 backdrop-blur-md border-2 border-gray-200 shadow-3xl shadow-gray-500 rounded-2xl p-8 md:mt-10 lg:mt-32"
      >
        <h2 className="text-3xl font-extrabold text-center mb-6 ">
          Create Your Account
        </h2>

        <form onSubmit={handleRegister} className="space-y-6">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Full Name</label>
            <input
              type="text"
              name="name"
              className="w-full px-4 py-2 rounded-xl bg-white/10 border placeholder-gray-400 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400"
              placeholder="Your name"
              required
            />
          </div>

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

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              className="w-full px-4 py-2 rounded-xl bg-white/10 border placeholder-gray-400 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400"
              placeholder="Enter your password"
              required
            />
            <p className="text-xs text-gray-300 mt-1">
              * Must include at least one uppercase, one lowercase letter and be at least 6 characters.
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Photo URL</label>
            <input
              type="text"
              name="photoURL"
              className="w-full px-4 py-2 rounded-xl bg-white/10 border placeholder-gray-400 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400"
              placeholder="https://your-photo-link.com"
            />
          </div>

          <motion.button
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full py-2 rounded-xl bg-blue-500 hover:bg-blue-600 font-semibold transition duration-300 shadow-md hover:shadow-lg"
          >
            Register
          </motion.button>

          <div className="flex items-center gap-2 my-4">
            <hr className="flex-grow border-gray-500" />
            <span className="text-sm ">OR</span>
            <hr className="flex-grow border-gray-500" />
          </div>

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
            Register with Google
          </motion.button>

          <div className="text-center mt-4">
            <span className="text-sm text-gray-300">
              Already have an account?{" "}
              <span
                onClick={() => navigate("/login")}
                className="text-blue-400 font-semibold hover:underline cursor-pointer"
              >
                Login
              </span>
            </span>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Register;
