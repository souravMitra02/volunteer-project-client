import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { FaEdit, FaTrash } from "react-icons/fa";
import MyVolunteerRequestsTable from "./MyVolunteerRequestsTable";
import { AuthContext } from "../context/AuthContext/AuthContext";
import axiosSecure from "../hooks/axiosSecure";
import { use } from "react";
import { Helmet } from "react-helmet";

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
      transition: { delay: i * 0.1, duration: 0.3 },
    }),
  };

  const buttonHover = {
    scale: 1.05,
    boxShadow: "0 0 8px rgba(0,0,0,0.15)",
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16 lg:mt-10 md:mt-8 mt-20">
      <Helmet>
              <title>My Post | Volunteer Hub</title>
            </Helmet>
      {/* My Posts Section */}
      <section>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-orange-600 mb-8 text-center  lg:mt-10">
          My Volunteer Posts
        </h2>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-14 h-14 border-4 border-indigo-500 border-dashed rounded-full animate-spin"></div>
          </div>
        ) : myPosts.length === 0 ? (
          <p className="text-center text-lg sm:text-xl font-medium mt-12">
            You have not added any volunteer posts yet.
          </p>
        ) : (
          <>
            {/* Card layout for small devices */}
            <div className="space-y-6 md:hidden">
              {myPosts.map((post, index) => (
                <motion.div
                  key={post._id}
                  className="p-5 rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900 shadow-md transition-all hover:shadow-lg space-y-3"
                  initial="hidden"
                  animate="visible"
                  variants={rowVariants}
                  custom={index}
                >
                  <h3 className="text-xl font-bold text-orange-600">
                    {post.postTitle}
                  </h3>
                  <div className="text-sm space-y-1 text-gray-700 dark:text-gray-300">
                    <p>
                      <span className="font-semibold">Category:</span> {post.category}
                    </p>
                    <p>
                      <span className="font-semibold">Volunteers Needed:</span> {post.volunteersNeeded}
                    </p>
                  </div>
                  <div className="pt-2 flex flex-wrap gap-3">
                    <motion.button
                      onClick={() => navigate(`/update-post/${post._id}`)}
                      className="flex items-center gap-2 px-4 py-2 rounded-md bg-yellow-400 hover:bg-yellow-500 text-black font-semibold shadow-md"
                      aria-label={`Edit post ${post.postTitle}`}
                      whileHover={buttonHover}
                    >
                      <FaEdit /> Edit
                    </motion.button>
                    <motion.button
                      onClick={() => {
                        Swal.fire({
                          title: "Are you sure?",
                          text: `Delete \"${post.postTitle}\"?`,
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
                      className="flex items-center gap-2 px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white font-semibold shadow-md"
                      aria-label={`Delete post ${post.postTitle}`}
                      whileHover={buttonHover}
                    >
                      <FaTrash /> Delete
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Table layout for medium and larger devices */}
            <div className="overflow-x-auto rounded-lg shadow-lg hidden md:block">
              <table className="min-w-full border border-gray-300 ">
                <thead className=" text-sm font-semibold">
                  <tr>
                    <th className="border px-4 py-3 text-center">Title</th>
                    <th className="border px-4 py-3 text-center">Category</th>
                    <th className="border px-4 py-3 text-center">Volunteers</th>
                    <th className="border px-4 py-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="  text-sm">
                  {myPosts.map((post, index) => (
                    <motion.tr
                      key={post._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="transition"
                    >
                      <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-center dark:text-gray-100 whitespace-nowrap">
                        {post.postTitle}
                      </td>
                      <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-center dark:text-gray-300 whitespace-nowrap">
                        {post.category}
                      </td>
                      <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-center dark:text-gray-300 whitespace-nowrap">
                        {post.volunteersNeeded}
                      </td>
                      <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">
                        <div className="flex justify-center flex-wrap gap-2">
                          <button
                            onClick={() => navigate(`/update-post/${post._id}`)}
                            className="px-4 py-2 rounded-md bg-yellow-400 hover:bg-yellow-500 text-black font-semibold shadow flex items-center gap-2 transition"
                          >
                            <FaEdit /> <span className="hidden sm:inline">Edit</span>
                          </button>
                          <button
                            onClick={() => {
                              Swal.fire({
                                title: "Are you sure?",
                                text: `Delete \"${post.postTitle}\"?`,
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
                            className="px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white font-semibold shadow flex items-center gap-2 transition"
                          >
                            <FaTrash /> <span className="hidden sm:inline">Delete</span>
                          </button>
                        </div>
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
        <h2 className="text-2xl sm:text-3xl font-extrabold text-orange-600 pb-3 mb-8 text-center">
          My Volunteer Requests
        </h2>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-14 h-14 border-4 border-indigo-500 border-dashed rounded-full animate-spin"></div>
          </div>
        ) : myRequests.length === 0 ? (
          <p className="text-center text-lg sm:text-xl font-medium mt-12">
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
