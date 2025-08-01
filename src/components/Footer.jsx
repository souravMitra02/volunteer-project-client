import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className=" transition-all duration-300  bg-white/10  backdrop-blur-3xl border-b border-gray-300  shadow-2xl mt-20 pt-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 ">
        {/* Logo & Description */}
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent mb-2">
            Volunteer Hub
          </h2>
          <p className=" leading-relaxed">
            Join hands to build a better tomorrow. Connect, volunteer, and make
            an impact every day with your time and passion.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold   border-b-2 border-orange-500 inline-block mb-4">
            Quick Links
          </h3>
          <ul className="space-y-3  font-medium">
            {[
              { name: "Home", href: "/" },
              { name: "All Posts", href: "/posts" },
              { name: "Add Volunteer Post", href: "/add-post" },
            ].map((link, idx) => (
              <li key={idx}>
                <a
                  href={link.href}
                  className="hover:text-orange-500 transition-all duration-200 hover:pl-1 block"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold   border-b-2 border-orange-500 inline-block mb-4">
            Contact Us
          </h3>
          <address className="not-italic t d text-sm space-y-4">
            <p className="flex items-center gap-3">
              <Mail className="w-5 h-5 " />
              <a
                href="mailto:support@volunteerhub.com"
                className="hover:text-orange-500 transition"
              >
                support@volunteerhub.com
              </a>
            </p>
            <p className="flex items-center gap-3">
              <Phone className="w-5 h-5" />
              <a
                href="tel:+8801234567890"
                className="hover:text-orange-500 transition"
              >
                +880 1234 567890
              </a>
            </p>
            <p className="flex items-center gap-3">
              <MapPin className="w-5 h-5 " />
              123 Volunteer Street, Dhaka, Bangladesh
            </p>
          </address>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="mt-10 border-t border-indigo-200 dark:border-indigo-600 text-center py-6 text-sm  ">
        &copy; {new Date().getFullYear()} Volunteer Hub. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
