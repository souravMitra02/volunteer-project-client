import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.subject.trim() ||
      !formData.message.trim()
    ) {
      setStatus({ type: "error", msg: "Please fill all the fields." });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus({ type: "error", msg: "Please enter a valid email." });
      return;
    }

    setStatus({ type: "success", msg: "Message sent successfully!" });
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mt-10 mb-10">
      <h1
        className=" font-bold text-center mb-10"
        data-aos="fade-down"
      >
        <span className="text-orange-600 text-4xl">Contact Us</span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-stretch">
        {/* Left: Contact Info */}
        <div className="space-y-6" data-aos="fade-right">
          <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
          <p className="">
            Whether you want to volunteer, suggest an event, or just ask a question — we'd love to hear from you!
          </p>

          <div>
            <h3 className="font-semibold ">Address</h3>
            <p className="">123 Volunteer Street, Dhaka, Bangladesh</p>
          </div>

          <div>
            <h3 className="font-semibold ">Phone</h3>
            <p className="">+880 1234 567890</p>
          </div>

          <div>
            <h3 className="font-semibold ">Email</h3>
            <p className="">contact@volunteerhub.com</p>
          </div>

          <div className="mt-8 rounded-lg overflow-hidden" data-aos="zoom-in">
            <iframe
              title="Volunteer Hub Location"
              src="https://maps.google.com/maps?q=Dhaka&t=&z=13&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="250"
              className="rounded-lg border-0"
              loading="lazy"
            ></iframe>
          </div>
        </div>

        {/* Right: Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="p-8 rounded-xl shadow-lg hover:shadow-indigo-500/30 transition-shadow duration-300 border-2"
          noValidate
          data-aos="fade-left"
        >
          {status && (
            <p
              className={`text-center font-semibold mb-4 ${
                status.type === "success" ? "text-green-600" : "text-red-500"
              }`}
            >
              {status.msg}
            </p>
          )}

          {["name", "email", "subject"].map((field) => (
            <div key={field} className="mb-4">
              <label
                htmlFor={field}
                className="block mb-1 font-semibold capitalize"
              >
                {field}
              </label>
              <input
                type={field === "email" ? "email" : "text"}
                name={field}
                id={field}
                value={formData[field]}
                onChange={handleChange}
                placeholder={`Your ${field}`}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-300"
                required
              />
            </div>
          ))}

          <div className="mb-4">
            <label htmlFor="message" className="block mb-1 font-semibold">
              Message
            </label>
            <textarea
              name="message"
              id="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              placeholder="Write your message here..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600 transition duration-300"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full mt-5 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-pink-500 hover:to-orange-500 text-white font-semibold py-2.5 px-6 rounded-lg shadow-lg transition-all duration-300"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
