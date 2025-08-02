import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const volunteers = [
  { id: 1, name: "Rafiq Hasan", hours: 130, role: "Community Outreach", img: "https://randomuser.me/api/portraits/men/32.jpg" },
  { id: 2, name: "Nusrat Jahan", hours: 110, role: "Fundraising Volunteer", img: "https://randomuser.me/api/portraits/women/44.jpg" },
  { id: 3, name: "Imran Hossain", hours: 95, role: "Event Coordinator", img: "https://randomuser.me/api/portraits/men/53.jpg" },
  { id: 4, name: "Tahmina Akter", hours: 120, role: "Medical Support", img: "https://randomuser.me/api/portraits/women/65.jpg" },
  { id: 5, name: "Samiul Islam", hours: 102, role: "Disaster Relief", img: "https://randomuser.me/api/portraits/men/74.jpg" },
  { id: 6, name: "Fatema Begum", hours: 98, role: "Child Education", img: "https://randomuser.me/api/portraits/women/58.jpg" },
  { id: 7, name: "Mahbub Rahman", hours: 140, role: "Logistics Coordinator", img: "https://randomuser.me/api/portraits/men/85.jpg" },
  { id: 8, name: "Sharmin Nahar", hours: 105, role: "Mental Health Support", img: "https://randomuser.me/api/portraits/women/71.jpg" },
];

const fadeVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
  exit: { opacity: 0, y: -20, transition: { duration: 0.4 } },
};

const TopVolunteers = () => {
  return (
    <motion.section
      className="py-16 px-4 sm:px-6 md:px-10 lg:px-20 transition-colors duration-300"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.5 }}
    >
      <div className="max-w-7xl mx-auto text-center">
        <motion.h2 className="text-3xl sm:text-4xl font-bold mb-4 text-orange-600">
          Top Volunteers of the Month
        </motion.h2>

        <motion.p className="mb-10 max-w-2xl mx-auto text-base sm:text-lg">
          Meet the heroes who went above and beyond to make a difference this month.
        </motion.p>

        <motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
          <AnimatePresence>
            {volunteers.map(({ id, name, hours, role, img }) => (
              <motion.div
                key={id}
                className="bg-white/20 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-lg hover:shadow-indigo-500/30 hover:-translate-y-1 transition-all duration-300 transform w-full p-5"
                variants={fadeVariant}
                initial="hidden"
                animate="visible"
                exit="exit"
                whileHover={{ scale: 1.05 }}
              >
                <img
                  src={img}
                  alt={name}
                  className="w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-full mb-4 object-cover ring-4 ring-orange-600"
                />
                <h3 className="text-lg sm:text-xl font-semibold">{name}</h3>
                <p className="text-indigo-500 dark:text-green-400 font-medium">
                  {hours}+ Hours Contributed
                </p>
                <p className="text-sm mt-2">{role}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default TopVolunteers;
