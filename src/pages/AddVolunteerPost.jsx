import { useContext, useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import AOS from "aos";
import "aos/dist/aos.css";
import { AuthContext } from "../context/AuthContext/AuthContext";

const AddVolunteerPost = () => {
  const { user } = useContext(AuthContext);
  const [deadline, setDeadline] = useState(new Date());

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

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
          Swal.fire(
            "✅ Success!",
            "Volunteer post added successfully!",
            "success"
          );
          form.reset();
        }
      })
      .catch((err) => {
        console.error(err);
        Swal.fire("❌ Error!", "Something went wrong.", "error");
      });
  };

  return (
    <section
      data-aos="fade-up"
      className="max-w-4xl mx-auto px-4 md:px-8 py-12 mt-20"
    >
      <div className="shadow-2xl rounded-2xl p-10 border-2 border-white/40 dark:border-orange-500">
        <h2 className="text-3xl font-bold mb-8 text-center text-orange-600 tracking-wide">
          Add Volunteer Need Post
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Thumbnail */}
          <div>
            <label className="block mb-1 font-semibold  ">Thumbnail URL</label>
            <input
              type="text"
              name="thumbnail"
              placeholder="Image URL"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
            />
          </div>

          {/* Post Title */}
          <div>
            <label className="block mb-1 font-semibold  ">Post Title</label>
            <input
              type="text"
              name="postTitle"
              placeholder="Title"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1 font-semibold  ">Description</label>
            <textarea
              name="description"
              placeholder="Short description"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
              rows={3}
            ></textarea>
          </div>

          {/* Category */}
          <div>
            <label className="block mb-1 font-semibold  ">Category</label>
            <select
              name="category"
              required
              className="w-full px-4 py-2 border rounded-lg  
             focus:outline-none focus:ring-2 focus:ring-orange-500
             transition-all duration-300 "
            >
              <option className="text-black" value="">
                Select Category
              </option>
              <option className="text-black" value="healthcare">
                Healthcare
              </option>
              <option className="text-black" value="education">
                Education
              </option>
              <option className="text-black" value="social service">
                Social Service
              </option>
              <option className="text-black" value="animal welfare">
                Animal Welfare
              </option>
            </select>
          </div>

          {/* Location & Volunteers Needed */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block mb-1 font-semibold ">Location</label>
              <input
                type="text"
                name="location"
                placeholder="Enter location"
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold  ">
                Volunteers Needed
              </label>
              <input
                type="number"
                name="volunteersNeeded"
                placeholder="e.g. 5"
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
              />
            </div>
          </div>

          {/* Deadline */}
          <div>
            <label className="block mb-1 font-semibold ">Deadline</label>
            <DatePicker
              selected={deadline}
              onChange={(date) => setDeadline(date)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
              dateFormat="yyyy-MM-dd"
              required
            />
          </div>

          {/* Organizer Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block mb-1 font-semibold ">
                Organizer Name
              </label>
              <input
                type="text"
                value={user?.displayName}
                readOnly
                className="w-full px-4 py-2 border rounded-lg "
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold ">
                Organizer Email
              </label>
              <input
                type="email"
                value={user?.email}
                readOnly
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-pink-600 hover:to-orange-600 transition  font-bold px-6 py-3 rounded-xl shadow-lg"
          >
            Submit Volunteer Post
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddVolunteerPost;
