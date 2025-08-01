import { use } from "react";
import { AuthContext } from "../context/AuthContext/AuthContext";
import Swal from "sweetalert2";

const BeVolunteerModal = ({ post, closeModal }) => {
  const { user } = use(AuthContext);

  const handleRequest = (e) => {
    e.preventDefault();
    const form = e.target;

    const requestData = {
      postId: post._id,
      thumbnail: post.thumbnail,
      postTitle: post.postTitle,
      description: post.description,
      category: post.category,
      location: post.location,
      volunteersNeeded: post.volunteersNeeded,
      deadline: post.deadline,
      organizerName: post.organizerName,
      organizerEmail: post.organizerEmail,
      volunteerName: user.displayName,
      volunteerEmail: user.email,
      suggestion: form.suggestion.value,
      status: "requested",
    };

    fetch("https://jp-server-ten.vercel.app/volunteer-request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertResult?.insertedId) {
          Swal.fire("Success!", "Volunteer request submitted!", "success");
          closeModal();
        } else {
          Swal.fire("Error", "Could not send request.", "error");
        }
      });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center  bg-opacity-40 px-4 ">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 relative overflow-y-auto max-h-[90vh] ">
        {/* Close button */}
        <button
          onClick={closeModal}
          className="absolute top-3 right-3 text-red-600 text-2xl font-bold hover:text-red-800 transition"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center text-gray-400">
          Be a Volunteer
        </h2>

        <form onSubmit={handleRequest} className="grid grid-cols-1 gap-4">
          <input
            readOnly
            value={post.thumbnail}
            className="input input-bordered w-full"
          />
          <input
            readOnly
            value={post.postTitle}
            className="input input-bordered w-full"
          />
          <textarea
            readOnly
            value={post.description}
            className="textarea textarea-bordered w-full"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              readOnly
              value={post.category}
              className="input input-bordered w-full"
            />
            <input
              readOnly
              value={post.location}
              className="input input-bordered w-full"
            />
            <input
              readOnly
              value={post.volunteersNeeded}
              className="input input-bordered w-full"
            />
            <input
              readOnly
              value={new Date(post.deadline).toLocaleDateString()}
              className="input input-bordered w-full"
            />
            <input
              readOnly
              value={post.organizerName}
              className="input input-bordered w-full"
            />
            <input
              readOnly
              value={post.organizerEmail}
              className="input input-bordered w-full"
            />
            <input
              readOnly
              value={user?.displayName}
              className="input input-bordered w-full"
            />
            <input
              readOnly
              value={user?.email}
              className="input input-bordered w-full"
            />
          </div>

          <textarea
            name="suggestion"
            placeholder="Your suggestion"
            className="textarea textarea-bordered w-full"
            required
          />

          <input type="hidden" name="status" value="requested" />

          <button
            type="submit"
            className="btn btn-success w-full  font-semibold hover:bg-green-700 transition"
          >
            Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default BeVolunteerModal;
