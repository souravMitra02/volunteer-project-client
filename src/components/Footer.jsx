import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-indigo-900 py-12 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 md:flex md:justify-between md:items-start gap-12">

        {/* Logo + Description */}
        <div className="md:w-1/3 mb-10 md:mb-0">
          <h2 className="text-3xl font-extrabold text-orange-600 dark:text-white mb-4">
            Volunteer Hub
          </h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            Join hands to build a better tomorrow. Connect, volunteer, and make an impact every day with your time and passion.
          </p>
        </div>

        {/* Quick Links */}
        <div className="md:w-1/3 mb-10 md:mb-0">
          <h3 className="text-xl font-semibold border-b-2 border-orange-500 inline-block mb-4 text-indigo-800 dark:text-indigo-100">
            Quick Links
          </h3>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300 font-medium">
            <li>
              <a href="/" className="hover:text-orange-500 transition-colors">Home</a>
            </li>
            <li>
              <a href="/posts" className="hover:text-orange-500 transition-colors">All Posts</a>
            </li>
            <li>
              <a href="/add-post" className="hover:text-orange-500 transition-colors">Add Volunteer Post</a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="md:w-1/3">
          <h3 className="text-xl font-semibold border-b-2 border-orange-500 inline-block mb-4 text-indigo-800 dark:text-indigo-100">
            Contact Us
          </h3>
          <address className="not-italic text-gray-700 dark:text-gray-300 space-y-3 text-sm">
            <p className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-orange-500" />
              <a href="mailto:support@volunteerhub.com" className="hover:text-orange-500">
                support@volunteerhub.com
              </a>
            </p>
            <p className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-orange-500" />
              <a href="tel:+8801234567890" className="hover:text-orange-500">
                +880 1234 567890
              </a>
            </p>
            <p className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-orange-500" />
              123 Volunteer Street, Dhaka, Bangladesh
            </p>
          </address>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="mt-10 pt-6 border-t border-indigo-200 dark:border-indigo-600 text-center text-sm text-gray-500 dark:text-gray-400">
        &copy; {new Date().getFullYear()} Volunteer Hub. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
