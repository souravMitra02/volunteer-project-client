import { Link } from 'react-router';
import { Heart } from "lucide-react";

// Define tag colors
const tagColors = {
  Teamwork: "bg-green-100 text-green-800",
  Communication: "bg-blue-100 text-blue-800",
  Leadership: "bg-yellow-100 text-yellow-800",
  Urgent: "bg-red-100 text-red-800",
  Fundraising: "bg-purple-100 text-purple-800",
  "Medical Aid": "bg-orange-100 text-orange-800",
};

const VolunteerCard = ({ post }) => {
  const {
    _id,
    thumbnail,
    postTitle,
    category,
    deadline,
    status = "Urgent",
    skills = ["Teamwork", "Communication"],
  } = post;

  return (
    <div className="card bg-white dark:bg-gray-800 border rounded-lg shadow hover:shadow-xl flex flex-col transition-all duration-300">
      {/* Image + Status */}
      <div className="relative">
        <img
  src={thumbnail}
  alt={postTitle}
  className="w-full aspect-[16/9] object-cover object-center rounded-t-lg"
/>
        {/* Status Badge */}
        <span
          className={`absolute top-2 left-2 badge text-white text-xs px-2 py-1 rounded 
          ${
            status === "Urgent"
              ? "bg-red-600"
              : status === "Closed"
              ? "bg-gray-500"
              : "bg-green-600"
          }`}
        >
          {status}
        </span>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col justify-between h-full">
        <div>
          <h3 className="text-xl font-semibold mb-1 text-gray-800 dark:text-white">
            {postTitle}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-300 mb-1">
            Category: {category}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-300 mb-2">
            Deadline: {new Date(deadline).toLocaleDateString()}
          </p>

          {/* Skill Tags with Color */}
          <div className="flex flex-wrap gap-1 mt-2">
            {skills.map((skill, i) => (
              <span
                key={i}
                className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                  tagColors[skill] || "bg-gray-100 text-gray-700"
                }`}
              >
                #{skill}
              </span>
            ))}
          </div>
        </div>

        {/* View Button */}
        <Link
          to={`/volunteer-posts/${_id}`}
          className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white py-1.5 px-4 rounded text-sm text-center"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default VolunteerCard;
