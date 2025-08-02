import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { FiDelete } from "react-icons/fi";
import { MdCancel } from "react-icons/md";

const MyVolunteerRequestsTable = ({ userEmail }) => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!userEmail) return;

    setLoading(true);
    fetch(
      `https://jp-server-ten.vercel.app/volunteer-requests?email=${userEmail}`
    )
      .then((res) => res.json())
      .then((data) => {
        setRequests(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [userEmail]);

  const handleCancel = (requestId, postTitle) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to cancel your volunteer request for \"${postTitle}\"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://jp-server-ten.vercel.app/cancel-request/${requestId}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then(() => {
            setRequests((prev) => prev.filter((req) => req._id !== requestId));
            Swal.fire(
              "Cancelled!",
              `Your volunteer request for \"${postTitle}\" has been cancelled.`,
              "success"
            );
          })
          .catch(() => {
            Swal.fire(
              "Error!",
              "Something went wrong while cancelling your request.",
              "error"
            );
          });
      }
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  if (requests.length === 0) {
    return (
      <p className="text-center mt-4">
        You have not made any volunteer requests yet.
      </p>
    );
  }

  return (
    <div className="mt-4">
      {/* Desktop Table */}
      <div className="hidden md:block">
        <table className="table-auto w-full border-collapse border border-gray-300 rounded-xl shadow-xl ">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Post Title</th>
              <th className="border border-gray-300 p-2">Requested On</th>
              <th className="border border-gray-300 p-2">Organizer Name</th>
              <th className="border border-gray-300 p-2">Location</th>
              <th className="border border-gray-300 p-2">Action</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {requests.map((req) => (
              <tr key={req._id}>
                <td className="border border-gray-300 p-2">
                  {req.postTitle || "N/A"}
                </td>
                <td className="border border-gray-300 p-2">
                  {req.deadline
                    ? new Date(req.deadline).toLocaleDateString()
                    : "N/A"}
                </td>
                <td className="border border-gray-300 p-2">
                  {req.organizerName || "N/A"}
                </td>
                <td className="border border-gray-300 p-2">
                  {req.location || "N/A"}
                </td>
                <td className="border border-gray-300 p-2 flex justify-center">
                  <button
                    onClick={() => handleCancel(req._id, req.postTitle)}
                    className="bg-red-500 px-3 py-1 text-white rounded hover:bg-red-600 transition flex items-center gap-1 justify-center"
                  >
                    <MdCancel /> Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {requests.map((req) => (
          <div
            key={req._id}
            className="border border-gray-300 p-4 rounded-xl shadow-lg bg-white dark:bg-gray-900 dark:text-white transition-transform duration-300 ease-in-out animate-fade-in hover:scale-[1.01]"
          >
            <h2 className="text-lg font-bold text-orange-600 mb-2">
              {req.postTitle || "N/A"}
            </h2>
            <div className="text-sm space-y-1">
              <p>
                <span className="font-medium">Requested On:</span> {req.deadline ? new Date(req.deadline).toLocaleDateString() : "N/A"}
              </p>
              <p>
                <span className="font-medium">Organizer:</span> {req.organizerName || "N/A"}
              </p>
              <p>
                <span className="font-medium">Location:</span> {req.location || "N/A"}
              </p>
            </div>
            <button
              onClick={() => handleCancel(req._id, req.postTitle)}
              className="mt-4 w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition flex items-center justify-center gap-2 "
            >
              <MdCancel className="text-lg" /> Cancel Request
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyVolunteerRequestsTable;
