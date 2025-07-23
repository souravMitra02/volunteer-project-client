import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router";
import { FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";
import Swal from "sweetalert2";
import ThemeToggle from "./ThemeToggle";
import { AuthContext } from "../context/AuthContext/AuthContext";

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
const closeMenu =()=> setMenuOpen(false);
  const handleLogout = () => {
    logoutUser()
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Logged out!",
          timer: 2000,
          showConfirmButton: false,
        });
        setMenuOpen(false);
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
      ? "text-orange-500 font-semibold underline"
      : "  hover:text-orange-500 font-medium";
  

  const publicLinks = (
    <>
      <li><NavLink to="/" className={navLinkClass} onClick={closeMenu}>Home</NavLink></li>
      <li><NavLink to="/posts" className={navLinkClass} onClick={closeMenu}>All Posts</NavLink></li>
      <li><NavLink to="/reports" className={navLinkClass} onClick={closeMenu}>Reports</NavLink></li>
      <li><NavLink to="/about" className={navLinkClass} onClick={closeMenu}>About</NavLink></li>
      <li><NavLink to="/contact" className={navLinkClass} onClick={closeMenu}>Contact</NavLink></li>
    </>
  );

  const privateLinks = (
    <>
      <li><NavLink to="/volunteer-posts" className={navLinkClass}>Add Post</NavLink></li>
      <li><NavLink to="/my-posts" className={navLinkClass}>My Posts</NavLink></li>
    </>
  );

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white/20  backdrop-blur-md border-b border-gray-300  shadow-sm rounded-full mt-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex justify-between items-center">

        {/* Logo & Hamburger */}
        <div className="flex items-center gap-3">
          <button
            className="lg:hidden text-2xl text-gray-800 "
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>

          <Link
            to="/"
            className="text-xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent"
          >
            Volunteer Hub
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex">
          <ul className="menu menu-horizontal gap-4">
            {publicLinks}
            {user && privateLinks}
          </ul>
        </div>

        {/* Theme Toggle + Auth */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          {!user ? (
            <NavLink
              to="/login"
              className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-pink-500 hover:to-orange-500 text-white px-4 py-1.5 rounded-full font-semibold shadow-md"
            >
              Login
            </NavLink>
          ) : (
            <div className="dropdown dropdown-end hidden lg:block">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full ring ring-orange-400 ring-offset-2">
                  <img
                    src={user.photoURL || "https://i.ibb.co/Yb3gfHm/avatar.png"}
                    alt="user"
                  />
                </div>
              </label>
              <ul className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-white  text-gray-800  rounded-box w-48">
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

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white  py-4 px-6 text-gray-800 dark:text-white">
          <ul className="flex flex-col space-y-3">
            {publicLinks}
            {user && privateLinks}
            {user && (
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded font-semibold mt-4 text-white"
              >
                <FaSignOutAlt className="inline mr-2" /> Logout
              </button>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
