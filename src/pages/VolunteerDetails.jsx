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
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );

  return (
    <div className="min-h-screen flex items-center justify-center px-4 md:px-6 lg:px-8 py-12 mt-20 ">
      {/* Outer Card */}
      <div className=" shadow rounded-2xl p-5 md:p-10 w-full max-w-6xl border-2 border-gray-100">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Image Card */}
          <div className=" rounded-xl overflow-hidden p-2 flex items-center justify-center">
            <img
              src={post.thumbnail}
              alt={post.postTitle}
              className="w-full h-72 md:h-[400px] object-cover rounded-xl transition-transform duration-500 hover:scale-105"
            />
          </div>

          {/* Details Card */}
          <div className="flex flex-col justify-between items-center h-full">
            <div className="space-y-5">
              <h1 className="text-2xl md:text-3xl font-extrabold text-indigo-700  text-center">
                {post.postTitle}
              </h1>
              <p className=" leading-relaxed md:text-left">
                {post.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm ">
                <p>
                  <span className="font-semibold text-indigo-600"> Category:</span> {post.category}
                </p>
                <p>
                  <span className="font-semibold text-indigo-600"> Location:</span> {post.location}
                </p>
                <p>
                  <span className="font-semibold text-indigo-600"> Deadline:</span>{" "}
                  {new Date(post.deadline).toLocaleDateString()}
                </p>
                <p>
                  <span className="font-semibold text-indigo-600"> Volunteers Needed:</span>{" "}
                  {post.volunteersNeeded}
                </p>
              </div>

              <p className=" md:text-left">
                <span className="font-semibold text-indigo-600"> Organizer:</span>{" "}
                {post.organizerName} ({post.organizerEmail})
              </p>
            </div>

            {/* CTA Button */}
            <div className="mt-6">
              {post.volunteersNeeded === 0 ? (
                <p className="text-red-600 font-semibold bg-red-100 px-4 py-2 rounded-lg text-center">
                   Volunteers already fulfilled! You cannot join this event.
                </p>
              ) : (
                <button
                  onClick={() => setShowModal(true)}
                  className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-pink-600 hover:to-orange-600 transition  font-bold px-6 py-3 rounded-xl shadow-lg"
                >
                   Be a Volunteer
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <BeVolunteerModal post={post} closeModal={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default VolunteerDetails;
