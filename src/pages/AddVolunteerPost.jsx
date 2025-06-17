import { use, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthContext/AuthContext";

const AddVolunteerPost = () => {
  const { user } = use(AuthContext);
  const [deadline, setDeadline] = useState(new Date());

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const newPost = {
      thumbnail: form.thumbnail.value,
      postTitle: form.postTitle.value,
      description: form.description.value,
      category: form.category.value,
      location: form.location.value,
      volunteersNeeded: parseInt(form.volunteersNeeded.value),
      deadline,
      organizerName: user?.displayName,
      organizerEmail: user?.email,
    };

    fetch("https://jp-server-ten.vercel.app/volunteer-posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPost),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire("Success!", "Post added successfully.", "success");
          form.reset();
        }
      })
      .catch((err) => {
        console.error(err);
        Swal.fire("Oops!", "Something went wrong.", "error");
      });
  };

  return (
    <section className="max-w-3xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-6">Add Volunteer Need Post</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="thumbnail"
          placeholder="Thumbnail URL"
          required
          className="input input-bordered w-full"
        />
        <input
          type="text"
          name="postTitle"
          placeholder="Post Title"
          required
          className="input input-bordered w-full"
        />
        <textarea
          name="description"
          placeholder="Description"
          required
          className="textarea textarea-bordered w-full"
        ></textarea>

        <select
          name="category"
          required
          className="select select-bordered w-full"
        >
          <option value="">Select Category</option>
          <option value="healthcare">Healthcare</option>
          <option value="education">Education</option>
          <option value="social service">Social Service</option>
          <option value="animal welfare">Animal Welfare</option>
        </select>

        <input
          type="text"
          name="location"
          placeholder="Location"
          required
          className="input input-bordered w-full"
        />
        <input
          type="number"
          name="volunteersNeeded"
          placeholder="No. of Volunteers Needed"
          required
          className="input input-bordered w-full"
        />

        <div>
          <label className="block mb-1 font-medium">Deadline</label>
          <DatePicker
            selected={deadline}
            onChange={(date) => setDeadline(date)}
            className="input input-bordered w-full"
            dateFormat="yyyy-MM-dd"
            required
          />
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            value={user?.displayName}
            readOnly
            className="input input-bordered w-full"
          />
          <input
            type="email"
            value={user?.email}
            readOnly
            className="input input-bordered w-full"
          />
        </div>

        <button
          type="submit"
          className="btn bg-green-600 text-white hover:bg-green-700 w-full"
        >
          Add Post
        </button>
      </form>
    </section>
  );
};

export default AddVolunteerPost;
