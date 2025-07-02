import React from "react";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

const defaultImage =
  "https://via.placeholder.com/400x250?text=Image+Not+Available";

const campaigns = [
  {
    id: 1,
    title: "Clean Water for Villages",
    imageUrl:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    description:
      "Providing clean and safe drinking water to remote villages, improving health and wellbeing.",
    goalAmount: 5000,
    raisedAmount: 3500,
  },
  {
    id: 2,
    title: "Education for All",
    imageUrl:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
    description:
      "Supporting education for underprivileged children through scholarships and school supplies.",
    goalAmount: 7000,
    raisedAmount: 4200,
  },
  {
    id: 3,
    title: "Healthcare Access",
    imageUrl:
      "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&w=800&q=80",
    description:
      "Bringing essential healthcare services to rural communities with mobile clinics and awareness programs.",
    goalAmount: 8000,
    raisedAmount: 6000,
  },
  {
    id: 4,
    title: "Plant Trees, Save Earth",
    imageUrl:
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=800&q=80",
    description:
      "Organizing tree plantation drives to combat climate change and promote biodiversity.",
    goalAmount: 3000,
    raisedAmount: 2700,
  },
  {
    id: 5,
    title: "Food for Hungry",
    imageUrl:
      "https://images.unsplash.com/photo-1542831371-d531d36971e6?auto=format&fit=crop&w=800&q=80",
    description:
      "Providing nutritious meals to homeless and food-insecure families in urban and rural areas.",
    goalAmount: 6000,
    raisedAmount: 4800,
  },
  {
    id: 6,
    title: "Disaster Relief Fund",
    imageUrl:
      "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=800&q=80",
    description:
      "Emergency aid and rehabilitation support for victims of natural disasters.",
    goalAmount: 10000,
    raisedAmount: 7500,
  },
  {
    id: 7,
    title: "Women Empowerment",
    imageUrl:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
    description:
      "Empowering women through vocational training, education, and entrepreneurship programs.",
    goalAmount: 9000,
    raisedAmount: 5200,
  },
  {
    id: 8,
    title: "Clean Energy Initiative",
    imageUrl:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    description:
      "Promoting solar and renewable energy solutions for sustainable living in rural areas.",
    goalAmount: 12000,
    raisedAmount: 8300,
  },
];

const FeaturedCampaigns = () => {
  const handleSeeMore = (title) => {
    Swal.fire({
      icon: "info",
      title: "Coming Soon!",
      text: `Details for "${title}" will be available soon.`,
      confirmButtonColor: "#2563eb",
    });
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-3xl font-bold text-center mb-8 text-primary dark:text-primary-light">
        Featured Campaigns
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {campaigns.map((campaign) => {
          const progressPercent = Math.min(
            Math.round((campaign.raisedAmount / campaign.goalAmount) * 100),
            100
          );
          return (
            <motion.div
              key={campaign.id}
              whileHover={{ scale: 1.05 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-700 overflow-hidden cursor-pointer"
            >
              <img
                src={campaign.imageUrl}
                alt={campaign.title}
                className="h-48 w-full object-cover"
                onError={(e) => (e.target.src = defaultImage)}
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
                  {campaign.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm line-clamp-3">
                  {campaign.description}
                </p>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 mb-4">
                  <div
                    className="bg-primary dark:bg-primary-light h-4 rounded-full"
                    style={{ width: `${progressPercent}%` }}
                    aria-label={`Raised ${progressPercent}% of goal`}
                  ></div>
                </div>
                <div className="flex justify-between text-sm font-medium text-gray-700 dark:text-gray-300">
                  <span>Raised: ${campaign.raisedAmount.toLocaleString()}</span>
                  <span>Goal: ${campaign.goalAmount.toLocaleString()}</span>
                </div>
                <button
                  type="button"
                  className="mt-4 w-full bg-primary hover:bg-primary-dark dark:bg-primary-light dark:hover:bg-primary text-white py-2 rounded-md transition"
                  onClick={() => handleSeeMore(campaign.title)}
                >
                  See More
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default FeaturedCampaigns;
