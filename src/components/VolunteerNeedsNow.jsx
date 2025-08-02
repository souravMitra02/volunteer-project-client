import { useEffect, useState } from "react";
import { Link } from "react-router";
import VolunteerCard from "./VolunteerCard";

const VolunteerNeedsNow = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://jp-server-ten.vercel.app/volunteer-now")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <section className="py-10 px-4 md:px-12 max-w-7xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-orange-600">
        Volunteer Needs Now
      </h2>

      {posts.length === 0 ? (
        <p className="text-center text-gray-600">
          No upcoming volunteer posts found.
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {posts.slice(0, 8).map((post) => (
              <VolunteerCard key={post._id} post={post} />
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              to="/volunteer-posts"
              className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-pink-600 hover:to-orange-600 text-white font-semibold px-4 py-2 rounded-xl shadow hover:shadow-lg transition-all duration-300"
            >
              See All
            </Link>
          </div>
        </>
      )}
    </section>
  );
};

export default VolunteerNeedsNow;
