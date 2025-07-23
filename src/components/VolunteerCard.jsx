import { Link } from 'react-router';

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
    <div className="max-w-sm mx-auto rounded-xl bg-[#1e293b] border border-gray-700 shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      
      {/* Image */}
      <div className="relative overflow-hidden rounded-t-xl">
        <img
          src={thumbnail}
          alt={postTitle}
          className="w-full h-44 object-cover object-center transition-transform duration-500 hover:scale-105"
          loading="lazy"
        />
        {/* Status Badge */}
        <span
          className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold select-none ${
            status === "Urgent" ? "bg-red-200 text-red-800" :
            status === "Closed" ? "bg-gray-400 text-gray-900" :
            "bg-green-200 text-green-800"
          }`}
        >
          {status.toUpperCase()}
        </span>
      </div>

      {/* Content */}
      <div className="p-5 text-gray-200 flex flex-col justify-between h-56 bg-[#1e293b]">
        <div>
          <h3 className="text-lg font-bold mb-2 truncate hover:text-indigo-400 transition-colors duration-300">
            {postTitle}
          </h3>
          <p className="text-sm text-gray-400 mb-1 truncate">
            Category: {category}
          </p>
          <p className="text-xs text-gray-500 mb-4">
            Deadline: {new Date(deadline).toLocaleDateString(undefined, {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>

          {/* Skills Tags */}
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, i) => (
              <span
                key={i}
                className={`text-xs font-medium px-3 py-1 rounded-full select-none ${
                  tagColors[skill] || "bg-gray-300 text-gray-700"
                }`}
              >
                #{skill}
              </span>
            ))}
          </div>
        </div>

        {/* View Details Button */}
        <Link
          to={`/volunteer-posts/${_id}`}
          className="mt-6 inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md text-center transition duration-300"
          aria-label={`View details for ${postTitle}`}
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default VolunteerCard;
