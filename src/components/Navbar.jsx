import React, { use } from 'react';
import { Link, NavLink } from 'react-router';
import ThemeToggle from './ThemeToggle';
import Swal from 'sweetalert2';
import { FaSignOutAlt } from "react-icons/fa";
import { AuthContext } from '../context/AuthContext/AuthContext';

const Navbar = () => {
  const { user, logoutUser } = use(AuthContext);

  const handleLogout = () => {
    logoutUser()
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Logged out!',
          text: 'You have successfully logged out.',
          timer: 2000,
          showConfirmButton: false
        });
      })
      .catch(err => {
        Swal.fire({
          icon: 'error',
          title: 'Oops!',
          text: err.message || 'Something went wrong.',
        });
      });
  };

  const links = (
    <>
      <li><NavLink to='/' className="hover:text-orange-400 font-medium">Home</NavLink></li>
      <li><NavLink to='/posts' className="hover:text-orange-400 font-medium">All Volunteer Posts</NavLink></li>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto w-full px-4 flex justify-between items-center py-2">
        {/* Start */}
        <div className="flex items-center gap-2">
          <div className="dropdown lg:hidden">
            <label tabIndex={0} className="btn btn-ghost">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-2 p-2 shadow bg-base-100 rounded-box w-52 z-50">
              {links}
              {user && (
                <>
                  <li><NavLink to="/add-post">Add Volunteer Post</NavLink></li>
                  <li><NavLink to="/my-posts">Manage My Posts</NavLink></li>
                  <li>
                    <button onClick={handleLogout} className="text-red-500 font-semibold flex items-center gap-2">
                      <FaSignOutAlt /> Logout
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
          <Link to="/" className="text-2xl font-bold text-orange-600">Volunteer Hub</Link>
        </div>

        {/* Center - desktop only */}
        <div className="hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {links}
          </ul>
        </div>

        {/* End */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          {!user ? (
            <>
              <NavLink to='/register' className="underline font-semibold">Register</NavLink>
              <NavLink to='/login' className="bg-orange-500 hover:bg-orange-600 px-4 py-1 rounded text-white font-semibold">
                Login
              </NavLink>
            </>
          ) : (
            <div className="dropdown dropdown-end hidden lg:block">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar tooltip tooltip-bottom" data-tip={user.displayName || 'User'}>
                <div className="w-10 rounded-full">
                  <img src={user.photoURL || 'https://i.ibb.co/Yb3gfHm/avatar.png'} alt="user" />
                </div>
              </label>
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-48 z-50">
                <li><NavLink to="/volunteer-posts">Add Volunteer Post</NavLink></li>
                <li><NavLink to="/my-posts">Manage My Posts</NavLink></li>
                <li>
                  <button onClick={handleLogout} className="text-red-500 font-semibold flex items-center gap-2">
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
