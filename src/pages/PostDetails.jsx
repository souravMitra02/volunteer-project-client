import React, { useEffect, useState, use } from "react";
import { useParams, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext/AuthContext";
import Swal from "sweetalert2";

const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { user } = use(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      fetch(`https://jp-server-ten.vercel.app/volunteer-posts/${id}`)
        .then((res) => res.json())
        .then((data) => setPost(data))
        .catch((err) => console.error(err));
    }
  }, [id, user, navigate]);

  const handleRequest = (e) => {
    e.preventDefault();
    const suggestion = e.target.suggestion.value;

    const requestData = {
      ...post,
      volunteerName: user.displayName,
      volunteerEmail: user.email,
      suggestion,
      status: "requested",
    };

    fetch("https://jp-server-ten.vercel.app/volunteer-request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          Swal.fire("Requested!", "You have requested successfully.", "success");
          setShowModal(false);
        } else {
          Swal.fire("Failed!", "You have already requested.", "error");
        }
      });
  };

  if (!post) return <div className="text-center py-10 text-lg">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 ">
      <img
        src={post.thumbnail}
        alt={post.postTitle}
        className="w-full h-64 object-cover rounded-lg shadow mb-6"
      />
      <h1 className="text-4xl font-bold mb-4 text-blue-800">{post.postTitle}</h1>
      <div className="space-y-2">
        <p><strong>Description:</strong> {post.description}</p>
        <p><strong>Category:</strong> {post.category}</p>
        <p><strong>Location:</strong> {post.location}</p>
        <p><strong>Deadline:</strong> {post.deadline}</p>
        <p><strong>Volunteers Needed:</strong> {post.volunteersNeeded}</p>
        <p><strong>Organizer:</strong> {post.organizerName} ({post.organizerEmail})</p>
      </div>

      <button
        onClick={() => setShowModal(true)}
        className="mt-6 bg-orange-500 hover:bg-orange-600 px-6 py-2 rounded-lg shadow-md transition"
      >
        Be a Volunteer
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg">
            <h2 className="text-2xl font-semibold mb-4 text-center text-green-700">Volunteer Request</h2>
            <form onSubmit={handleRequest} className="space-y-3">
              {["thumbnail", "postTitle", "description", "category", "location", "volunteersNeeded", "deadline", "organizerName", "organizerEmail"].map((field, index) => (
                <input
                  key={index}
                  readOnly
                  value={post[field]}
                  className="input input-bordered w-full"
                />
              ))}
              <input
                readOnly
                value={user.displayName}
                className="input input-bordered w-full"
              />
              <input
                readOnly
                value={user.email}
                className="input input-bordered w-full"
              />
              <textarea
                name="suggestion"
                placeholder="Enter your suggestion"
                className="textarea textarea-bordered w-full"
              />
              <button type="submit" className="btn btn-success w-full">Request</button>
            </form>
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 block text-center text-red-600 hover:underline w-full"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostDetails;
