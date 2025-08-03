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
    <section  data-aos="fade-up"
      className="max-w-4xl mx-auto px-4 md:px-8 py-12 mt-10">
      <div className="shadow-2xl rounded-2xl p-10 border-2 border-white/40 dark:border-orange-500">
      <h2 className="text-3xl text-orange-600 font-bold mb-4 text-center">Update Your Post</h2>
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
          <option className="text-black" value="">Select Category</option>
          <option className="text-black" value="healthcare">Healthcare</option>
          <option className="text-black" value="education">Education</option>
          <option className="text-black" value="social service">Social Service</option>
          <option className="text-black" value="animal welfare">Animal Welfare</option>
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
            className="w-1/2 border p-2 rounded "
          />
          <input
            value={user.email}
            readOnly
            className="w-1/2 border p-2 rounded "
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-pink-600 hover:to-orange-600 text-white font-semibold px-4 py-2 rounded-xl shadow hover:shadow-lg transition-all duration-300"
        >
          Update Post
        </button>
      </form>
    </div>
    </section>
  );
};

export default UpdatePost;
