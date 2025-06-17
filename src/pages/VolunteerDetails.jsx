import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import BeVolunteerModal from "./BeVolunteerModal";

const VolunteerDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch(`https://jp-server-ten.vercel.app/volunteer-posts/${id}`)
      .then((res) => res.json())
      .then((data) => setPost(data));
  }, [id]);

  if (!post)
    return (
      <div className="flex justify-center items-center py-10">
        <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <img
        src={post.thumbnail}
        alt={post.postTitle}
        className="w-full h-64 object-cover rounded mb-6"
      />
      <h2 className="text-3xl font-bold mb-2">{post.postTitle}</h2>
      <p>
        <strong>Category:</strong> {post.category}
      </p>
      <p>
        <strong>Deadline:</strong>{" "}
        {new Date(post.deadline).toLocaleDateString()}
      </p>
      <p>
        <strong>Location:</strong> {post.location}
      </p>
      <p>
        <strong>Volunteers Needed:</strong> {post.volunteersNeeded}
      </p>
      <p>
        <strong>Organizer:</strong> {post.organizerName} ({post.organizerEmail})
      </p>
      <p className="mt-4 mb-6">{post.description}</p>

      {post.volunteersNeeded === 0 ? (
        <p className="text-red-600 font-semibold">
          Volunteers already fulfilled! You cannot join this event.
        </p>
      ) : (
        <button
          onClick={() => setShowModal(true)}
          className="btn bg-orange-500 text-white hover:bg-orange-600"
        >
          Be a Volunteer
        </button>
      )}

      {showModal && (
        <BeVolunteerModal post={post} closeModal={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default VolunteerDetails;
