import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Spinner from "../components/Spinner";

// Grid icon
const GridIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 inline-block mr-1"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <rect
      x="3"
      y="3"
      width="7"
      height="7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <rect
      x="14"
      y="3"
      width="7"
      height="7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <rect
      x="14"
      y="14"
      width="7"
      height="7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <rect
      x="3"
      y="14"
      width="7"
      height="7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Table icon
const TableIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 inline-block mr-1"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 6h16M4 10h16M4 14h16M4 18h16"
    />
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
    <div className="max-w-6xl mx-auto px-4 py-8 mt-20">
      <div className="flex flex-col sm:flex-row gap-2 mb-6 items-center">
        <input
          type="text"
          placeholder="Search by Post Title"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="input input-bordered w-full sm:w-auto flex-grow"
        />
        <button
          onClick={handleSearch}
          className="btn btn-primary whitespace-nowrap"
        >
          Search
        </button>

        <button
          onClick={() => setIsTableLayout((prev) => !prev)}
          className="btn btn-secondary whitespace-nowrap flex items-center"
          title={isTableLayout ? "Show Cards" : "Show Table"}
        >
          {isTableLayout ? <GridIcon /> : <TableIcon />}
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-10">
          <Spinner />
        </div>
      ) : (
        <>
          {!isTableLayout ? (
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
              {posts.map((post) => (
                <div
                  key={post._id}
                  className="card border p-4 rounded shadow-sm flex flex-col"
                >
                  <img
                    src={post.thumbnail}
                    alt={post.postTitle}
                    className="h-40 w-full object-cover rounded mb-3"
                  />
                  <h2 className="text-xl font-bold">{post.postTitle}</h2>
                  <p>
                    <strong>Location:</strong> {post.location}
                  </p>
                  <p>
                    <strong>Volunteers Needed:</strong> {post.volunteersNeeded}
                  </p>
                  <p>
                    <strong>Category:</strong> {post.category}
                  </p>
                  <button
                    onClick={() => navigate(`/volunteer-posts/${post._id}`)}
                    className="btn btn-outline btn-sm mt-auto self-start"
                  >
                    View Details
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table-auto w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 p-2 text-left">
                      Title
                    </th>
                    <th className="border border-gray-300 p-2 text-left">
                      Location
                    </th>
                    <th className="border border-gray-300 p-2 text-left">
                      Volunteers Needed
                    </th>
                    <th className="border border-gray-300 p-2 text-left">
                      Category
                    </th>
                    <th className="border border-gray-300 p-2 text-left">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map((post) => (
                    <tr key={post._id} className="hover:bg-gray-50">
                      <td className="border border-gray-300 p-2">
                        {post.postTitle}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {post.location}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {post.volunteersNeeded}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {post.category}
                      </td>
                      <td className="border border-gray-300 p-2">
                        <button
                          onClick={() =>
                            navigate(`/volunteer-posts/${post._id}`)
                          }
                          className="btn btn-outline btn-sm"
                        >
                          View Details
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
