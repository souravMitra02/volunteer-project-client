import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Spinner from "../components/Spinner";

// Icons
const GridIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const TableIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h7v7H3V3zm11 0h7v7h-7V3zM3 14h7v7H3v-7zm11 0h7v7h-7v-7z" />
  </svg>
);

const AllVolunteerPosts = () => {
  const [posts, setPosts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isTableLayout, setIsTableLayout] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchPosts = (search = "") => {
    setLoading(true);
    fetch(`https://jp-server-ten.vercel.app/volunteer-posts?search=${search}`)
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSearch = () => {
    fetchPosts(searchText);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 mt-20">
      {/* Search & Toggle Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-6">
        <div className="flex flex-grow gap-2 w-full">
          <input
            type="text"
            placeholder="🔍 Search post title"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="input input-bordered w-full"
          />
          <button onClick={handleSearch} className="btn btn-primary">Search</button>
        </div>
        <button
          onClick={() => setIsTableLayout((prev) => !prev)}
          className="btn btn-outline flex items-center whitespace-nowrap"
          title={isTableLayout ? "Switch to Grid View" : "Switch to Table View"}
        >
          {isTableLayout ? <GridIcon /> : <TableIcon />}
          {isTableLayout ? "Grid View" : "Table View"}
        </button>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="flex justify-center py-10">
          <Spinner />
        </div>
      ) : (
        <>
          {/* Grid View */}
          {!isTableLayout ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <div
                  key={post._id}
                  className="bg-white shadow-xl rounded-2xl overflow-hidden flex flex-col hover:shadow-2xl transition-all"
                >
                  {/* Image */}
                  <div className="w-full h-52 md:h-64 overflow-hidden">
                    <img
                      src={post.thumbnail}
                      alt={post.postTitle}
                      className="w-full h-full object-cover transform hover:scale-105 transition duration-300 rounded-t-2xl"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col flex-grow space-y-2">
                    <h2 className="text-lg md:text-xl font-bold ">{post.postTitle}</h2>
                    <p className="text-sm text-gray-600">
                      <strong> Location:</strong> {post.location}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong> Needed:</strong> {post.volunteersNeeded}
                    </p>
                    <p className="text-sm text-gray-600 mb-3">
                      <strong> Category:</strong> {post.category}
                    </p>

                    {/* CTA Button */}
                    <button
                      onClick={() => navigate(`/volunteer-posts/${post._id}`)}
                      className="mt-auto bg-gradient-to-r from-orange-500 to-pink-500 hover:from-pink-600 hover:to-orange-600 text-white font-bold px-4 py-2 rounded-xl shadow-md transition"
                    >
                       View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Table View
            <div className="overflow-x-auto shadow-lg rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100 text-gray-700 text-left">
                  <tr>
                    <th className="px-4 py-2">Title</th>
                    <th className="px-4 py-2">Location</th>
                    <th className="px-4 py-2">Needed</th>
                    <th className="px-4 py-2">Category</th>
                    <th className="px-4 py-2">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {posts.map((post) => (
                    <tr key={post._id} className="hover:bg-gray-50">
                      <td className="px-4 py-2">{post.postTitle}</td>
                      <td className="px-4 py-2">{post.location}</td>
                      <td className="px-4 py-2">{post.volunteersNeeded}</td>
                      <td className="px-4 py-2">{post.category}</td>
                      <td className="px-4 py-2">
                        <button
                          onClick={() => navigate(`/volunteer-posts/${post._id}`)}
                          className="btn btn-sm btn-outline"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AllVolunteerPosts;
