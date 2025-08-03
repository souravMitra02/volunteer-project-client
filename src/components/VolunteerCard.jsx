import { Link } from "react-router";

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
    <div className="group bg-white/20 backdrop-blur-md border-gray-700 rounded-xl overflow-hidden shadow-lg hover:shadow-indigo-500/30 hover:-translate-y-1 transition-all duration-300 transform max-w-sm w-full mx-auto">
      {/* Image Section */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={thumbnail}
          alt={postTitle}
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        {/* Status Badge */}
        <div
          className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold uppercase ${
            status === "Urgent"
              ? "bg-red-200 text-red-800"
              : status === "Closed"
              ? "bg-gray-400 text-gray-900"
              : "bg-green-200 text-green-800"
          } shadow-md`}
        >
          {status}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 flex flex-col justify-between h-[14rem]">
        <div>
          <h3 className="text-xl  font-bold mb-1 truncate hover:text-orange-600 transition-colors duration-300">
            {postTitle}
          </h3>
          <p className="text-md  mb-2"><span className="text-orange-600 font-bold">Category:</span> {category}</p>
          <p className="text-md  mb-4">
            <span className="text-orange-600 font-bold">Deadline:</span>{" "}
            {new Date(deadline).toLocaleDateString(undefined, {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span
                key={index}
                className={`px-3 py-1 text-xs rounded-full font-medium transition ${
                  tagColors[skill] || "bg-gray-300 text-gray-800"
                }`}
              >
                #{skill}
              </span>
            ))}
          </div>
        </div>

        {/* Button */}
        <Link
          to={`/volunteer-posts/${_id}`}
          className="mt-5 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-pink-600 hover:to-orange-600 text-white font-bold px-4 py-2 rounded-xl shadow-md transition text-center "
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default VolunteerCard;
