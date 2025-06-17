import React, { useEffect, useState, use } from "react";
import { AuthContext } from "../context/AuthContext/AuthContext";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import MyVolunteerRequestsTable from "./MyVolunteerRequestsTable";

const MyPosts = () => {
  const { user } = use(AuthContext);
  const [myPosts, setMyPosts] = useState([]);
  const [myRequests, setMyRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user?.email) return;

    setLoading(true);

    fetch(`http://localhost:3000/my-posts?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setMyPosts(data);
      })
      .catch((error) => console.log(error));

    fetch(`http://localhost:3000/my-volunteer-requests?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => setMyRequests(data))
      .catch(() => setMyRequests([]))
      .finally(() => setLoading(false));
  }, [user]);

  if (!user) {
    return <p>Please login to see your posts.</p>;
  }

  return (
    <div className="container mx-auto p-4 mt-20">
      <h2 className="text-xl font-semibold mb-4">My Volunteer Need Posts</h2>
      {loading ? (
        <div className="flex justify-center items-center py-10">
          <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        </div>
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
                <td className="border border-gray-300 p-2">
                  {post.volunteersNeeded}
                </td>
                <td className="border border-gray-300 p-2">
                  <button
                    className="bg-yellow-400 px-2 py-1 mr-2 rounded"
                    onClick={() => navigate(`/update-post/${post._id}`)}
                  >
                    Update
                  </button>
                 <button
  className="bg-red-500 px-2 py-1 text-white rounded"
  onClick={() => {
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to delete "${post.postTitle}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/volunteer-posts/${post._id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then(() => {
            setMyPosts(prev => prev.filter(p => p._id !== post._id));
            Swal.fire(
              'Deleted!',
              `"${post.postTitle}" has been deleted.`,
              'success'
            );
          })
          .catch(() => {
            Swal.fire(
              'Error!',
              'Something went wrong while deleting.',
              'error'
            );
          });
      }
    });
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

      <h2 className="text-xl font-semibold mb-4 text-center mt-5">
        My Volunteer Request Posts
      </h2>
      {loading ? (
        <div className="flex justify-center items-center py-10">
          <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        </div>
      ) : myRequests.length === 0 ? (
        <p className="text-center">
          You have not made any volunteer requests yet.
        </p>
      ) : (
        <MyVolunteerRequestsTable userEmail={user.email}></MyVolunteerRequestsTable>
      )}
    </div>
  );
};

export default MyPosts;
