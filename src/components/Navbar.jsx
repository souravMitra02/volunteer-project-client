import React, { useContext } from "react";
import { Link, NavLink } from "react-router";
import ThemeToggle from "./ThemeToggle";
import Swal from "sweetalert2";
import { FaSignOutAlt } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext/AuthContext";

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);

  const handleLogout = () => {
    logoutUser()
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Logged out!",
          text: "You have successfully logged out.",
          timer: 2000,
          showConfirmButton: false,
        });
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops!",
          text: err.message || "Something went wrong.",
        });
      });
  };

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-orange-500 dark:text-orange-400 font-semibold underline"
      : "text-gray-800 dark:text-gray-300 hover:text-orange-500 font-medium";

  const publicLinks = (
    <>
      <li><NavLink to="/" className={navLinkClass}>Home</NavLink></li>
      <li><NavLink to="/posts" className={navLinkClass}>All Posts</NavLink></li>
      <li><NavLink to="/reports" className={navLinkClass}>Reports</NavLink></li>
      <li><NavLink to="/about" className={navLinkClass}>About</NavLink></li>
      <li><NavLink to="/contact" className={navLinkClass}>Contact</NavLink></li>
    </>
  );

  const privateLinks = (
    <>
      <li><NavLink to="/volunteer-posts" className={navLinkClass}>Add Post</NavLink></li>
      <li><NavLink to="/my-posts" className={navLinkClass}>My Posts</NavLink></li>
    </>
  );

  return (
    <div className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/40 dark:bg-[#0f172a]/30 border-b border-gray-300 dark:border-gray-700 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center">

        {/* Left: Logo */}
        <Link to="/" className="text-xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
          Volunteer Hub
        </Link>

        {/* Center: Nav Links */}
        <div className="hidden lg:flex">
          <ul className="menu menu-horizontal gap-4">
            {publicLinks}
            {user && privateLinks}
          </ul>
        </div>

        {/* Right: User & Theme */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          {!user ? (
            <>
              <NavLink to="/register" className={navLinkClass}>Register</NavLink>
              <NavLink
                to="/login"
                className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-pink-500 hover:to-orange-500 text-white px-4 py-1.5 rounded-full font-semibold shadow-md"
              >
                Login
              </NavLink>
            </>
          ) : (
            <div className="dropdown dropdown-end hidden lg:block">
              <label
                tabIndex={0}
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full ring ring-orange-400 ring-offset-2">
                  <img
                    src={user.photoURL || "https://i.ibb.co/Yb3gfHm/avatar.png"}
                    alt="user"
                  />
                </div>
              </label>
              <ul className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-white dark:bg-[#0f172a] rounded-box w-48">
                {privateLinks}
                <li>
                  <button
                    onClick={handleLogout}
                    className="text-red-500 font-semibold flex items-center gap-2"
                  >
                    <FaSignOutAlt /> Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
