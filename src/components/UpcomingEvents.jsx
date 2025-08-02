import React, { use } from "react";
import { CalendarDays, MapPin } from "lucide-react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext/AuthContext";

const events = [
  {
    id: 1,
    title: "Beach Cleanup Drive",
    date: "June 22, 2025",
    location: "Cox’s Bazar",
  },
  {
    id: 2,
    title: "Tree Plantation Campaign",
    date: "July 5, 2025",
    location: "Dhaka University Campus",
  },
  {
    id: 3,
    title: "Blood Donation Camp",
    date: "July 15, 2025",
    location: "Chittagong Medical College",
  },
];

const UpcomingEvents = () => {
  const navigate = useNavigate();
  const { user } = use(AuthContext); 

  const handleRegister = (title) => {
    if (!user) {
      // যদি login না করা থাকে
      Swal.fire({
        title: "Please Login First",
        text: "You must be logged in to register for an event.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Go to Login",
        cancelButtonText: "Cancel",
        confirmButtonColor: "#4f46e5",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
    } else {
      Swal.fire({
        title: "Registered Successfully!",
        text: `You have been registered for the "${title}" event.`,
        icon: "success",
        confirmButtonColor: "#4f46e5",
      });
    }
  };

  return (
    <section className=" transition-colors duration-300 py-20 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-orange-600 mb-4">
           Upcoming Volunteer Events
        </h2>
        <p className="text-lg mb-12 max-w-2xl mx-auto">
          Be part of impactful events happening near you. Join hands for change and make a difference.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {events.map(({ id, title, date, location }) => (
            <div
              key={id}
              className="group  border border-gray-200 dark:border-gray-700 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-6 text-left space-y-3"
            >
              <h3 className="text-xl font-semibold  group-hover:text-orange-600  mb-3">
                {title}
              </h3>

              <div className="flex items-center  text-sm mb-2">
                <CalendarDays className="w-5 h-5 mr-2 text-blue-500 " />
                <span>{date}</span>
              </div>

              <div className="flex items-center  text-sm">
                <MapPin className="w-5 h-5 mr-2 text-red-500 dark:text-red-400" />
                <span>{location}</span>
              </div>

              <button
                className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-pink-600 hover:to-orange-600 transition  font-bold px-6 py-2 rounded-xl shadow-lg"
                onClick={() => handleRegister(title)}
              >
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
