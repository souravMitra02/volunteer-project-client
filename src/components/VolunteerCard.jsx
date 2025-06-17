
import { Link } from 'react-router';

const VolunteerCard = ({ post }) => {
  const { _id, thumbnail, postTitle, category, deadline } = post;

  return (
    <div className="card border p-3 rounded-lg shadow hover:shadow-md transition-all duration-300">
      <img
        src={thumbnail}
        alt={postTitle}
        className="w-full h-40 object-cover rounded"
      />
      <h3 className="text-xl font-semibold mt-3">{postTitle}</h3>
      <p className="text-sm text-gray-600 mt-1">Category: {category}</p>
      <p className="text-sm text-gray-600">Deadline: {new Date(deadline).toLocaleDateString()}</p>
      <Link
        to={`/volunteer-posts/${_id}`}
        className="mt-3 inline-block bg-blue-600 text-white py-1 px-4 rounded hover:bg-blue-700"
      >
        View Details
      </Link>
    </div>
  );
};

export default VolunteerCard;
