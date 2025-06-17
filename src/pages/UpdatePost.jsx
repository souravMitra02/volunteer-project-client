import React, { useEffect, useState, use } from "react";
import { useParams, useNavigate } from "react-router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthContext/AuthContext";

const UpdatePost = () => {
  const { id } = useParams();
  const { user } = use(AuthContext);
  const navigate = useNavigate();

  const [postData, setPostData] = useState(null);
  const [deadline, setDeadline] = useState(new Date());

  useEffect(() => {
    fetch(`https://jp-server-ten.vercel.app/volunteer-posts/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setPostData(data);
        setDeadline(new Date(data.deadline));
      });
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedData = {
      thumbnail: form.thumbnail.value,
      postTitle: form.postTitle.value,
      description: form.description.value,
      category: form.category.value,
      location: form.location.value,
      volunteersNeeded: parseInt(form.volunteersNeeded.value),
      deadline: deadline,
      organizerName: user.displayName,
      organizerEmail: user.email,
    };

    fetch(`https://jp-server-ten.vercel.app/volunteer-posts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    })
      .then((res) => res.json())
      .then(() => {
        Swal.fire("Success", "Post updated successfully!", "success");
        navigate("/my-posts");
      });
  };

  if (!postData) return <p>Loading post data...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow mt-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Update Your Post</h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        <input
          name="thumbnail"
          defaultValue={postData.thumbnail}
          placeholder="Thumbnail URL"
          className="w-full border p-2 rounded"
          required
        />
        <input
          name="postTitle"
          defaultValue={postData.postTitle}
          placeholder="Post Title"
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          name="description"
          defaultValue={postData.description}
          placeholder="Description"
          className="w-full border p-2 rounded"
          required
        ></textarea>

        <select
          name="category"
          defaultValue={postData.category}
          className="w-full border p-2 rounded"
          required
        >
          <option value="">Select Category</option>
          <option value="healthcare">Healthcare</option>
          <option value="education">Education</option>
          <option value="social service">Social Service</option>
          <option value="animal welfare">Animal Welfare</option>
        </select>

        <input
          name="location"
          defaultValue={postData.location}
          placeholder="Location"
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="number"
          name="volunteersNeeded"
          defaultValue={postData.volunteersNeeded}
          placeholder="Volunteers Needed"
          className="w-full border p-2 rounded"
          required
        />

        <div>
          <label className="block mb-1 font-semibold">Deadline:</label>
          <DatePicker
            selected={deadline}
            onChange={(date) => setDeadline(date)}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div className="flex gap-4">
          <input
            value={user.displayName}
            readOnly
            className="w-1/2 border p-2 rounded bg-gray-100"
          />
          <input
            value={user.email}
            readOnly
            className="w-1/2 border p-2 rounded bg-gray-100"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          Update Post
        </button>
      </form>
    </div>
  );
};

export default UpdatePost;
