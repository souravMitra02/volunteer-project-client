import React, { use } from "react";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthContext/AuthContext";
import { Helmet } from "react-helmet";

const Login = () => {
  const { loginUser, googleLogin } = use(AuthContext);
  const navigate = useNavigate();

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
    <div className="min-h-screen bg-cover bg-center relative flex justify-center items-center px-4">
      <Helmet>
        <title>Login | Volunteer Hub</title>
      </Helmet>

      <div className="absolute inset-0 bg-black opacity-60 z-0"></div>

      <div className="z-10 w-full max-w-md bg-opacity-90 rounded-lg shadow-lg p-6 md:p-10 border-2 border-white/90 m-10 lg:mt-30">
        <h2 className="text-3xl font-bold text-center mb-6 text-white">
          Login Now !!
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="label text-white">Email</label>
            <input
              type="email"
              name="email"
              className="input input-bordered w-full"
              placeholder="Your Email"
              required
            />
          </div>

          <div>
            <label className="label text-white">Password</label>
            <input
              type="password"
              name="password"
              className="input input-bordered w-full"
              placeholder="Your Password"
              required
            />
          </div>

          <div className="text-right">
            <span className="text-sm text-blue-400 underline cursor-pointer">
              Forgot password?
            </span>
          </div>

          <button type="submit" className="btn btn-neutral w-full">
            Login
          </button>

          <div className="divider text-white">or</div>

          <button
            onClick={handleGoogleLogin}
            type="button"
            className="btn bg-white text-black border-gray-300 w-full flex justify-center items-center"
          >
            {/* Google icon */}
            <svg
              width="16"
              height="16"
              viewBox="0 0 512 512"
              className="mr-2"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#EA4335"
                d="M153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
              />
              <path
                fill="#34A853"
                d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
              />
              <path
                fill="#FBBC05"
                d="M90 341a208 200 0 010-171l63 49q-12 37 0 73"
              />
              <path
                fill="#4285F4"
                d="M386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
              />
            </svg>
            Login with Google
          </button>

          <p className="text-sm text-center text-white mt-4">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-500 underline">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
