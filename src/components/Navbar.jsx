import React, {use} from "react";
import { Link, NavLink } from "react-router";
import ThemeToggle from "./ThemeToggle";
import Swal from "sweetalert2";
import { FaSignOutAlt } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext/AuthContext";

const Navbar = () => {
  const { user, logoutUser } = use(AuthContext);

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
      ? "text-orange-500 dark:text-orange-300 font-semibold underline"
      : "text-gray-700 dark:text-gray-300 hover:text-orange-400 dark:hover:text-orange-300 font-medium";

  
  const publicLinks = (
    <>
      <li><NavLink to="/" className={navLinkClass}>Home</NavLink></li>
      <li><NavLink to="/posts" className={navLinkClass}>All Volunteer Posts</NavLink></li>
      <li><NavLink to="/reports" className={navLinkClass}>Reports</NavLink></li>
      <li><NavLink to="/about" className={navLinkClass}>About Us</NavLink></li>
      <li><NavLink to="/contact" className={navLinkClass}>Contact</NavLink></li>
    </>
  );

  // Authenticated user routes
  const privateLinks = (
    <>
      <li><NavLink to="/volunteer-posts" className={navLinkClass}>Add Volunteer Post</NavLink></li>
      <li><NavLink to="/my-posts" className={navLinkClass}>Manage My Posts</NavLink></li>
    </>
  );

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center">
        
        {/* Logo + Mobile Dropdown */}
        <div className="flex items-center gap-2">
          <div className="dropdown lg:hidden">
            <button tabIndex={0} className="btn btn-ghost">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-2 p-2 shadow bg-base-100 dark:bg-gray-800 rounded-box w-52 z-50">
              {publicLinks}
              {user && privateLinks}
              {user && (
                <li>
                  <button
                    onClick={handleLogout}
                    className="text-red-500 font-semibold flex items-center gap-2"
                  >
                    <FaSignOutAlt /> Logout
                  </button>
                </li>
              )}
            </ul>
          </div>
          <Link to="/" className="text-2xl font-bold text-orange-600 dark:text-orange-400">
            Volunteer Hub
          </Link>
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-2">
            {publicLinks}
            {user && privateLinks}
          </ul>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          {!user ? (
            <>
              <NavLink to="/register" className={navLinkClass}>Register</NavLink>
              <NavLink
                to="/login"
                className="bg-orange-500 hover:bg-orange-600 px-4 py-1 rounded text-white font-semibold"
              >
                Login
              </NavLink>
            </>
          ) : (
            <div className="dropdown dropdown-end hidden lg:block">
              <label
                tabIndex={0}
                className="btn btn-ghost btn-circle avatar tooltip tooltip-bottom"
                data-tip={user.displayName || "User"}
              >
                <div className="w-10 rounded-full ring ring-orange-400 ring-offset-base-100 ring-offset-2">
                  <img
                    src={user.photoURL || "https://i.ibb.co/Yb3gfHm/avatar.png"}
                    alt="user"
                  />
                </div>
              </label>
              <ul className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-white dark:bg-gray-800 rounded-box w-48 z-50">
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
