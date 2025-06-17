import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext/AuthContext";

const MyPosts = () => {
  const { user } = useContext(AuthContext);
  const [myPosts, setMyPosts] = useState([]);
  const [myRequests, setMyRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user?.email) return;

    setLoading(true);
    fetch(`/my-posts?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => setMyPosts(data))
      .catch(() => setMyPosts([]));

    // Fetch my volunteer requests
    fetch(`/my-volunteer-requests?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => setMyRequests(data))
      .catch(() => setMyRequests([]))
      .finally(() => setLoading(false));
  }, [user]);

  if (!user) {
    return <p>Please login to see your posts.</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">My Volunteer Need Posts</h2>
      {loading ? (
        <p>Loading...</p>
      ) : myPosts.length === 0 ? (
        <p>You have not added any volunteer posts yet.</p>
      ) : (
        <table className="table-auto w-full border-collapse border border-gray-300 mb-8">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Title</th>
              <th className="border border-gray-300 p-2">Category</th>
              <th className="border border-gray-300 p-2">Volunteers Needed</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {myPosts.map((post) => (
              <tr key={post._id}>
                <td className="border border-gray-300 p-2">{post.postTitle}</td>
                <td className="border border-gray-300 p-2">{post.category}</td>
                <td className="border border-gray-300 p-2">{post.volunteersNeeded}</td>
                <td className="border border-gray-300 p-2">
                  {/* Update and Delete buttons: implement handlers */}
                  <button
                    className="bg-yellow-400 px-2 py-1 mr-2 rounded"
                    onClick={() => {
                      // redirect to update page, e.g. /update-post/:id
                      window.location.href = `/update-post/${post._id}`;
                    }}
                  >
                    Update
                  </button>
                  <button
                    className="bg-red-500 px-2 py-1 text-white rounded"
                    onClick={() => {
                      // implement delete functionality here
                      if (
                        window.confirm(
                          `Are you sure you want to delete "${post.postTitle}"?`
                        )
                      ) {
                        fetch(`/volunteer-posts/${post._id}`, {
                          method: "DELETE",
                        })
                          .then((res) => res.json())
                          .then(() => {
                            setMyPosts((prev) =>
                              prev.filter((p) => p._id !== post._id)
                            );
                            alert("Post deleted successfully");
                          });
                      }
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <h2 className="text-xl font-semibold mb-4">My Volunteer Request Posts</h2>
      {loading ? (
        <p>Loading...</p>
      ) : myRequests.length === 0 ? (
        <p>You have not made any volunteer requests yet.</p>
      ) : (
        <ul className="list-disc pl-6">
          {myRequests.map((req) => (
            <li key={req._id}>
              <strong>{req.postTitle || "Post Title"}</strong> — Requested on{" "}
              {new Date(req.requestDate).toLocaleDateString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyPosts;
