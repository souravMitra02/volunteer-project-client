import React from 'react';
import { Link, NavLink } from 'react-router';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {

    const links = <>
     <li><NavLink to={'/'} className={'hover:text-orange-300 cursor-pointer'}>Home</NavLink></li>
     
    
    </>
    return (
        <div className="navbar  shadow-sm">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
       {links}
      </ul>
    </div>
    <Link to={'/'} className=" text-2xl font-bold">Volunteer Hub</Link>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
     {links}
    </ul>
        </div>
        
        <div className="navbar-end gap-2">
          <ThemeToggle></ThemeToggle>
    <NavLink to={'/register'} className="underline  font-semibold">Register</NavLink>
    <NavLink to={'/login'} className="bg-orange-500 hover:bg-orange-600 px-4 py-1 rounded  font-semibold">Login</NavLink>
  </div>
</div>
    );
};

export default Navbar;