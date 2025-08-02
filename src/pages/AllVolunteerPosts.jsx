import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Spinner from "../components/Spinner";
import VolunteerCard from "../components/VolunteerCard";

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
            className="input input-bordered w-full focus:outline-orange-600"
          />
          <button onClick={handleSearch} className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-pink-600 hover:to-orange-600 text-white font-semibold px-4 py-2 rounded-xl shadow hover:shadow-lg transition-all duration-300">Search</button>
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
                <VolunteerCard key={post._id} post={post} />
              ))}
            </div>
          ) : (
            // Table View
            <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-700">
  <table className="min-w-full divide-y divide-gray-600 bg-white/20 text-sm">
    <thead>
      <tr className="text-center uppercase tracking-wider text-xs bg-white/20">
        <th className="px-6 py-4">Title</th>
        <th className="px-6 py-4">Location</th>
        <th className="px-6 py-4">Needed</th>
        <th className="px-6 py-4">Category</th>
        <th className="px-6 py-4 text-center">Action</th>
      </tr>
    </thead>
    <tbody className="divide-y divide-gray-700">
      {posts.map((post) => (
        <tr
          key={post._id}
          className="hover:bg-white/10 transition duration-300 text-center"
        >
          <td className="px-6 py-4 whitespace-nowrap">{post.postTitle}</td>
          <td className="px-6 py-4">{post.location}</td>
          <td className="px-6 py-4">{post.volunteersNeeded}</td>
          <td className="px-6 py-4">
            <span className="inline-block   px-3 py-1 rounded-full text-xs font-medium">
              {post.category}
            </span>
          </td>
          <td className="px-6 py-4 text-center">
            <button
              onClick={() => navigate(`/volunteer-posts/${post._id}`)}
              className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-pink-600 hover:to-orange-600 text-white font-semibold px-4 py-2 rounded-xl shadow hover:shadow-lg transition-all duration-300"
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
