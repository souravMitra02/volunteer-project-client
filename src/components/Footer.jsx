import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-200 dark:bg-indigo-900 py-10 transition-all duration-300">
            <div className="container mx-auto px-6 md:flex md:justify-between md:items-start space-y-8 md:space-y-0">
                
                {/* Logo and Description */}
                <div className="md:w-1/3">
                    <h2 className="text-3xl font-extrabold mb-4 text-indigo-800 dark:text-indigo-100">Volunteer Hub</h2>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        Join hands to create a better community. Connect, volunteer, and make an impact every day.
                    </p>
                </div>

                {/* Quick Links */}
                <div className="md:w-1/3">
                    <h3 className="text-xl font-semibold mb-4 border-b border-orange-400 pb-2 inline-block text-indigo-800 dark:text-indigo-100">
                        Quick Links
                    </h3>
                    <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                        <li>
                            <a href="/" className="hover:text-orange-500 transition-colors duration-300">Home</a>
                        </li>
                        <li>
                            <a href="/posts" className="hover:text-orange-500 transition-colors duration-300">All Posts</a>
                        </li>
                        <li>
                            <a href="/add-post" className="hover:text-orange-500 transition-colors duration-300">Add Volunteer Post</a>
                        </li>
                        <li>
                            <a href="/profile" className="hover:text-orange-500 transition-colors duration-300">My Profile</a>
                        </li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div className="md:w-1/3">
                    <h3 className="text-xl font-semibold mb-4 border-b border-orange-400 pb-2 inline-block text-indigo-800 dark:text-indigo-100">
                        Contact Us
                    </h3>
                    <address className="not-italic text-gray-700 dark:text-gray-300 space-y-2">
                        <p>Email: <a href="mailto:support@volunteerhub.com" className="hover:text-orange-500">support@volunteerhub.com</a></p>
                        <p>Phone: <a href="tel:+8801234567890" className="hover:text-orange-500">+880 1234 567890</a></p>
                        <p>Address: 123 Volunteer Street, Dhaka, Bangladesh</p>
                    </address>
                </div>
            </div>

            {/* Copyright */}
            <div className="mt-10 border-t border-indigo-300 dark:border-indigo-600 pt-6 text-center text-gray-600 dark:text-gray-400 text-sm select-none">
                &copy; {new Date().getFullYear()} Volunteer Hub. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
