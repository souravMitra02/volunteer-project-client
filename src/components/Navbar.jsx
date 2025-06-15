import React, { use} from 'react';
import { Link, NavLink } from 'react-router';
import ThemeToggle from './ThemeToggle';
import Swal from 'sweetalert2';
import { FaSignOutAlt } from "react-icons/fa";
import { AuthContext } from '../context/AuthContext/AuthContext';


const Navbar = () => {
  const { user, logoutUser } = use(AuthContext);

  const links = (
    <>
      <li><NavLink to='/' className="hover:text-orange-400 font-medium">Home</NavLink></li>
      <li><NavLink to='/posts' className="hover:text-orange-400 font-medium">All Volunteer Posts</NavLink></li>
    </>
  );

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

  return (
    <div className="navbar bg-base-100 shadow-sm sticky top-0 z-50">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2"
              viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            {links}
          </ul>
        </div>
        <Link to='/' className="text-2xl font-bold text-orange-600">Volunteer Hub</Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {links}
        </ul>
      </div>

      <div className="navbar-end gap-2">
        <ThemeToggle />

        {!user ? (
          <>
            <NavLink to='/register' className="underline font-semibold">Register</NavLink>
            <NavLink to='/login' className="bg-orange-500 hover:bg-orange-600 px-4 py-1 rounded text-white font-semibold">
              Login
            </NavLink>
          </>
        ) : (
          <>
           
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar tooltip tooltip-bottom" data-tip={user.displayName || 'User'}>
                <div className="w-10 rounded-full">
                  <img src={user.photoURL || 'https://i.ibb.co/Yb3gfHm/avatar.png'} alt="user" />
                </div>
              </label>
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-48">
                <li><NavLink to="/add-post">Add Volunteer Post</NavLink></li>
                <li><NavLink to="/my-posts">Manage My Posts</NavLink></li>
                <li><button onClick={handleLogout} className="text-red-500 font-semibold flex items-center gap-2">
                  <FaSignOutAlt /> Logout
                </button></li>
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
