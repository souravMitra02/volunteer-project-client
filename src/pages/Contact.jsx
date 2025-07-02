import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple Validation
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mt-10 mb-10">
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-900 dark:text-white">
        <span className="border-b-2 border-orange-600 pb-1">Contact Us</span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left: Contact Info */}
        <div className="space-y-6 text-gray-700 dark:text-gray-300">
          <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
          <p>
            Whether you want to volunteer, suggest an event, or just ask a question — we'd love to hear from you!
          </p>

          <div>
            <h3 className="font-semibold">Address</h3>
            <p>123 Volunteer Street, Dhaka, Bangladesh</p>
          </div>

          <div>
            <h3 className="font-semibold">Phone</h3>
            <p>+880 1234 567890</p>
          </div>

          <div>
            <h3 className="font-semibold">Email</h3>
            <p>contact@volunteerhub.com</p>
          </div>

          <div className="mt-8">
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
          className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg space-y-6"
          noValidate
        >
          {status && (
            <p
              className={`text-center font-semibold ${
                status.type === "success" ? "text-green-500" : "text-red-500"
              }`}
            >
              {status.msg}
            </p>
          )}

          {["name", "email", "subject"].map((field) => (
            <div key={field}>
              <label
                htmlFor={field}
                className="block mb-1 font-semibold text-gray-900 dark:text-gray-100 capitalize"
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
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-700  dark:border-gray-600 dark:text-white "
                required
              />
            </div>
          ))}

          <div>
            <label
              htmlFor="message"
              className="block mb-1 font-semibold text-gray-900 dark:text-gray-100"
            >
              Message
            </label>
            <textarea
              name="message"
              id="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              placeholder="Write your message here..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:border-gray-600 "
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 rounded-md transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
