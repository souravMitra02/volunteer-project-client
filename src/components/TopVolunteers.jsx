import React from "react";
import { motion } from "framer-motion";

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


const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      staggerChildren: 0.3,
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
};

const TopVolunteers = () => {
  return (
    <motion.section
      className=" py-20 px-4 transition-colors duration-300"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.5 }} 
      variants={containerVariants}
    >
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          className="text-4xl font-bold mb-4 text-orange-600 "
          variants={cardVariants}
        >
          Top Volunteers of the Month
        </motion.h2>

        <motion.p
          className=" mb-10 max-w-xl mx-auto text-lg"
          variants={cardVariants}
        >
          Meet the heroes who went above and beyond to make a difference this month.
        </motion.p>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8"
          variants={containerVariants}
        >
          {volunteers.map(({ id, name, hours, role, img }) => (
            <motion.div
              key={id}
              className="bg-white/20 backdrop-blur-md border-gray-700 rounded-xl overflow-hidden shadow-lg hover:shadow-indigo-500/30 hover:-translate-y-1 transition-all duration-300 transform max-w-sm w-full mx-auto p-5"
              variants={cardVariants}
              whileHover={{ scale: 1.05 }}
            >
              <img
                src={img}
                alt={name}
                className="w-24 h-24 mx-auto rounded-full mb-4 object-cover ring-4 ring-orange-600"
              />
              <h3 className="text-xl font-semibold ">{name}</h3>
              <p className="text-indigo-500 dark:text-green-400 font-medium">
                {hours}+ Hours Contributed
              </p>
              <p className="text-sm  mt-2">{role}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default TopVolunteers;
