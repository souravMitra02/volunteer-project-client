import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const MyVolunteerRequestsTable = ({ userEmail }) => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!userEmail) return;

    setLoading(true);
    fetch(`http://localhost:3000/my-volunteer-requests?email=${userEmail}`)
      .then(res => res.json())
      .then(data => setRequests(data))
      .catch(err => {
        console.error(err);
       ;
      })
     setLoading(false);
  }, [userEmail]);

    const handleCancel = (requestId, postTitle) => {
      console.log(requestId);
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to cancel your volunteer request for "${postTitle}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/cancel-request/${requestId}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then(() => {
            setRequests((prev) => prev.filter((req) => req._id !== requestId));
            Swal.fire(
              "Cancelled!",
              `Your volunteer request for "${postTitle}" has been cancelled.`,
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
    <table className="table-auto w-full border-collapse border border-gray-300 mt-4">
      <thead>
        <tr>
          <th className="border border-gray-300 p-2">Post Title</th>
          <th className="border border-gray-300 p-2">Requested On</th>
          <th className="border border-gray-300 p-2">Organizer Name</th>
          <th className="border border-gray-300 p-2">Location</th>
          <th className="border border-gray-300 p-2">Action</th>
        </tr>
      </thead>
      <tbody>
              {requests.map((req) =>(
                  <tr key={req._id}>
            <td className="border border-gray-300 p-2">{req.postTitle || "N/A"}</td>
            <td className="border border-gray-300 p-2">
              {req.deadline
                ? new Date(req.deadline).toLocaleDateString()
                : "N/A"}
                    
            </td>
            <td className="border border-gray-300 p-2">{req.organizerName || "N/A"}</td>
            <td className="border border-gray-300 p-2">{req.location || "N/A"}</td>
            <td className="border border-gray-300 p-2">
              <button
                onClick={() => handleCancel(req._id, req.postTitle)}
                className="bg-red-500 px-3 py-1 text-white rounded hover:bg-red-600 transition"
              >
                Cancel
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MyVolunteerRequestsTable;
