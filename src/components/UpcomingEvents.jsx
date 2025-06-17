import React from "react";
import { CalendarDays, MapPin } from "lucide-react";

const events = [
  {
    id: 1,
    title: " Beach Cleanup Drive",
    date: "June 22, 2025",
    location: "Cox’s Bazar",
  },
  {
    id: 2,
    title: " Tree Plantation Campaign",
    date: "July 5, 2025",
    location: "Dhaka University Campus",
  },
  {
    id: 3,
    title: " Blood Donation Camp",
    date: "July 15, 2025",
    location: "Chittagong Medical College",
  },
];

const UpcomingEvents = () => {
  return (
    <section className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-20 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          📅 Upcoming Volunteer Events
        </h2>
        <p className="text-gray-600 text-lg mb-12 max-w-2xl mx-auto">
          Be part of impactful events happening near you. Join hands for change and make a difference.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {events.map(({ id, title, date, location }) => (
            <div
              key={id}
              className="group bg-white rounded-2xl border border-gray-200 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 p-6 text-left"
            >
              <h3 className="text-xl font-semibold text-indigo-700 group-hover:text-indigo-900 mb-3">
                {title}
              </h3>

              <div className="flex items-center text-gray-500 text-sm mb-2">
                <CalendarDays className="w-5 h-5 mr-2 text-blue-500" />
                <span>{date}</span>
              </div>

              <div className="flex items-center text-gray-500 text-sm">
                <MapPin className="w-5 h-5 mr-2 text-red-500" />
                <span>{location}</span>
              </div>

              <button className="mt-5 w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow hover:shadow-md transition duration-200">
                Register Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvents;
