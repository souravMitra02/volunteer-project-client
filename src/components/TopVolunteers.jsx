import React from "react";
import { motion } from "framer-motion";

const volunteers = [
  { id: 1, name: "Rafiq Hasan", hours: 130, role: "Community Outreach", img: "https://randomuser.me/api/portraits/men/32.jpg" },
  { id: 2, name: "Nusrat Jahan", hours: 110, role: "Fundraising Volunteer", img: "https://randomuser.me/api/portraits/women/44.jpg" },
  { id: 3, name: "Imran Hossain", hours: 95, role: "Event Coordinator", img: "https://randomuser.me/api/portraits/men/53.jpg" },
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
      className="bg-gray-100 dark:bg-gray-900 py-20 px-4 transition-colors duration-300"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.5 }}  // 0.5 মানে: section এর অর্ধেক এলেই ট্রিগার হবে
      variants={containerVariants}
    >
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          className="text-4xl font-bold mb-4 text-gray-800 dark:text-white"
          variants={cardVariants}
        >
          Top Volunteers of the Month
        </motion.h2>

        <motion.p
          className="text-gray-600 dark:text-gray-300 mb-10 max-w-xl mx-auto text-lg"
          variants={cardVariants}
        >
          Meet the heroes who went above and beyond to make a difference this month.
        </motion.p>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
          variants={containerVariants}
        >
          {volunteers.map(({ id, name, hours, role, img }) => (
            <motion.div
              key={id}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 rounded-2xl shadow-sm hover:shadow-lg transition duration-300 text-center"
              variants={cardVariants}
              whileHover={{ scale: 1.05 }}
            >
              <img
                src={img}
                alt={name}
                className="w-24 h-24 mx-auto rounded-full mb-4 object-cover ring-4 ring-indigo-400"
              />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{name}</h3>
              <p className="text-green-600 dark:text-green-400 font-medium">
                {hours}+ Hours Contributed
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{role}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default TopVolunteers;
