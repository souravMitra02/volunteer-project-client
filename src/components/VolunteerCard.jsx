import { Link } from 'react-router';
import { Heart } from "lucide-react";

const tagColors = {
  Teamwork: "bg-green-600/20 text-green-400",
  Communication: "bg-blue-600/20 text-blue-400",
  Leadership: "bg-yellow-600/20 text-yellow-400",
  Urgent: "bg-red-600/20 text-red-400",
  Fundraising: "bg-purple-600/20 text-purple-400",
  "Medical Aid": "bg-orange-600/20 text-orange-400",
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
    <div className="group card bg-[#0f172a] text-white border border-gray-700 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 overflow-hidden">

      {/* Image Section */}
      <div className="relative">
        <img
          src={thumbnail}
          alt={postTitle}
          className="w-full aspect-[16/9] object-cover object-center rounded-t-2xl"
        />
        {/* Gradient Status Badge */}
        <span
          className={`absolute top-3 left-3 text-xs font-semibold px-2 py-1 rounded-full bg-gradient-to-r ${
            status === "Urgent"
              ? "from-red-500 to-orange-500"
              : status === "Closed"
              ? "from-gray-500 to-gray-700"
              : "from-green-500 to-emerald-500"
          }`}
        >
          {status}
        </span>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col justify-between h-full">
        <div>
          <h3 className="text-lg font-bold mb-1 group-hover:text-blue-400 transition">
            {postTitle}
          </h3>
          <p className="text-xs text-gray-400 mb-1">
            Category: {category}
          </p>
          <p className="text-xs text-gray-500 mb-2">
            Deadline: {new Date(deadline).toLocaleDateString()}
          </p>

          {/* Skills */}
          <div className="flex flex-wrap gap-1 mt-3">
            {skills.map((skill, i) => (
              <span
                key={i}
                className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                  tagColors[skill] || "bg-gray-700 text-gray-300"
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
          className="mt-4 inline-block bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-blue-500 transition text-white py-2 px-4 rounded-lg text-sm text-center font-medium shadow-md hover:shadow-lg"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default VolunteerCard;
