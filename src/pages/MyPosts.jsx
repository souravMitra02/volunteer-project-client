import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { FaEdit, FaTrash } from "react-icons/fa";
import MyVolunteerRequestsTable from "./MyVolunteerRequestsTable";
import { AuthContext } from "../context/AuthContext/AuthContext";
import axiosSecure from "../hooks/axiosSecure";
import { use } from "react";

const MyPosts = () => {
  const { user } = use(AuthContext);
  const [myPosts, setMyPosts] = useState([]);
  const [myRequests, setMyRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.email) return;

    setLoading(true);
    const token = localStorage.getItem("token");

    Promise.all([
      fetch(`https://jp-server-ten.vercel.app/my-posts?email=${user.email}`, {
        headers: { authorization: `Bearer ${token}` },
      }).then((res) => res.json()),
      fetch(`https://jp-server-ten.vercel.app/volunteer-requests?email=${user.email}`, {
        headers: { authorization: `Bearer ${token}` },
      }).then((res) => res.json()),
    ])
      .then(([postsData, requestsData]) => {
        setMyPosts(postsData || []);
        setMyRequests(requestsData || []);
      })
      .catch(() => {
        setMyPosts([]);
        setMyRequests([]);
      })
      .finally(() => setLoading(false));
  }, [user]);

  if (!user)
    return (
      <p className="text-center text-gray-500 mt-20 text-lg font-medium">
        Please login to see your posts.
      </p>
    );

  const rowVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, type: "spring", stiffness: 80 },
    }),
    hover: { scale: 1.02, boxShadow: "0 4px 15px rgba(99, 102, 241, 0.2)" },
  };

  const buttonHover = {
    scale: 1.05,
    boxShadow: "0 0 8px rgba(0,0,0,0.15)",
  };

  // For table cell padding
  const cellClasses =
    "px-3 sm:px-6 py-2 sm:py-4 align-middle whitespace-nowrap border-r border-gray-300";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16 lg:mt-10 md:mt-8 mt-20">
      {/* My Posts Section */}
      <section>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-indigo-700 border-b-4 border-indigo-300 pb-3 mb-8 text-center">
          My Volunteer Posts
        </h2>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-14 h-14 border-4 border-indigo-500 border-dashed rounded-full animate-spin"></div>
          </div>
        ) : myPosts.length === 0 ? (
          <p className="text-center text-gray-400 text-lg sm:text-xl font-medium mt-12">
            You have not added any volunteer posts yet.
          </p>
        ) : (
          <>
            {/* Card layout for small devices */}
            <div className="space-y-6 md:hidden">
              {myPosts.map((post, index) => (
                <motion.div
                  key={post._id}
                  className="p-4 rounded-lg shadow-md bg-white cursor-pointer"
                  initial="hidden"
                  animate="visible"
                  variants={rowVariants}
                  custom={index}
                  whileHover={{ scale: 1.02, boxShadow: "0 4px 15px rgba(99, 102, 241, 0.2)" }}
                >
                  <h3 className="text-lg font-semibold text-indigo-700 mb-2">{post.postTitle}</h3>
                  <p>
                    <strong>Category:</strong> {post.category}
                  </p>
                  <p>
                    <strong>Volunteers Needed:</strong> {post.volunteersNeeded}
                  </p>
                  <div className="mt-4 flex gap-3">
                    <motion.button
                      onClick={() => navigate(`/update-post/${post._id}`)}
                      className="flex items-center gap-2 px-3 py-2 rounded-md bg-yellow-400 hover:bg-yellow-500 text-black font-semibold shadow-md"
                      aria-label={`Edit post ${post.postTitle}`}
                      whileHover={buttonHover}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <FaEdit />
                      Edit
                    </motion.button>
                    <motion.button
                      onClick={() => {
                        Swal.fire({
                          title: "Are you sure?",
                          text: `Delete "${post.postTitle}"?`,
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonColor: "#d33",
                          cancelButtonColor: "#3085d6",
                          confirmButtonText: "Yes, delete it!",
                        }).then((result) => {
                          if (result.isConfirmed) {
                            axiosSecure
                              .delete(`/volunteer-posts/${post._id}`)
                              .then(() => {
                                setMyPosts((prev) => prev.filter((p) => p._id !== post._id));
                                Swal.fire("Deleted!", "Your post has been deleted.", "success");
                              })
                              .catch(() => {
                                Swal.fire("Error!", "Delete failed.", "error");
                              });
                          }
                        });
                      }}
                      className="flex items-center gap-2 px-3 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white font-semibold shadow-md"
                      aria-label={`Delete post ${post.postTitle}`}
                      whileHover={buttonHover}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <FaTrash />
                      Delete
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>

           
            <div className="overflow-x-auto rounded-lg shadow-lg hidden md:block">
              <table className="min-w-full bg-white rounded-lg overflow-hidden">
                <thead className="bg-indigo-100 text-indigo-900 text-sm font-semibold text-center">
                  <tr>
                    <th className={`${cellClasses} uppercase tracking-wide text-left sm:text-center`}>
                      Title
                    </th>
                    <th className={`${cellClasses} uppercase tracking-wide text-left sm:text-center`}>
                      Category
                    </th>
                    <th className={`${cellClasses} uppercase tracking-wide text-left sm:text-center`}>
                      Volunteers Needed
                    </th>
                    <th className="px-3 sm:px-6 py-2 sm:py-4 uppercase tracking-wide text-center">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {myPosts.map((post, index) => (
                    <motion.tr
                      key={post._id}
                      className="border-b border-gray-200 cursor-pointer text-center"
                      custom={index}
                      initial="hidden"
                      animate="visible"
                      whileHover="hover"
                      variants={rowVariants}
                    >
                      <td
                        className={`${cellClasses} font-semibold text-gray-800 text-left sm:text-center`}
                      >
                        {post.postTitle}
                      </td>
                      <td className={`${cellClasses} text-left sm:text-center`}>{post.category}</td>
                      <td className={`${cellClasses} text-left sm:text-center`}>
                        {post.volunteersNeeded}
                      </td>
                      <td className="px-3 sm:px-6 py-2 sm:py-4 align-middle whitespace-nowrap text-center flex flex-col sm:flex-row justify-center gap-2 sm:gap-4">
                        <motion.button
                          onClick={() => navigate(`/update-post/${post._id}`)}
                          className="mx-auto sm:mx-0 px-3 sm:px-4 py-2 rounded-md bg-yellow-400 hover:bg-yellow-500 text-black font-semibold shadow-md flex items-center gap-2"
                          aria-label={`Edit post ${post.postTitle}`}
                          whileHover={buttonHover}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <FaEdit />
                          <span className="hidden sm:inline">Edit</span>
                        </motion.button>
                        <motion.button
                          onClick={() => {
                            Swal.fire({
                              title: "Are you sure?",
                              text: `Delete "${post.postTitle}"?`,
                              icon: "warning",
                              showCancelButton: true,
                              confirmButtonColor: "#d33",
                              cancelButtonColor: "#3085d6",
                              confirmButtonText: "Yes, delete it!",
                            }).then((result) => {
                              if (result.isConfirmed) {
                                axiosSecure
                                  .delete(`/volunteer-posts/${post._id}`)
                                  .then(() => {
                                    setMyPosts((prev) =>
                                      prev.filter((p) => p._id !== post._id)
                                    );
                                    Swal.fire(
                                      "Deleted!",
                                      "Your post has been deleted.",
                                      "success"
                                    );
                                  })
                                  .catch(() => {
                                    Swal.fire("Error!", "Delete failed.", "error");
                                  });
                              }
                            });
                          }}
                          className="mx-auto sm:mx-0 px-3 sm:px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white font-semibold shadow-md flex items-center gap-2"
                          aria-label={`Delete post ${post.postTitle}`}
                          whileHover={buttonHover}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <FaTrash />
                          <span className="hidden sm:inline">Delete</span>
                        </motion.button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </section>

      {/* My Requests Section */}
      <section>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-indigo-700 border-b-4 border-indigo-300 pb-3 mb-8 text-center">
          💬 My Volunteer Requests
        </h2>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-14 h-14 border-4 border-indigo-500 border-dashed rounded-full animate-spin"></div>
          </div>
        ) : myRequests.length === 0 ? (
          <p className="text-center text-gray-400 text-lg sm:text-xl font-medium mt-12">
            You have not made any requests yet.
          </p>
        ) : (
          <MyVolunteerRequestsTable userEmail={user.email} />
        )}
      </section>
    </div>
  );
};

export default MyPosts;
