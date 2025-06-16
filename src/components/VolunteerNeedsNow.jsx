// VolunteerNeedsNow.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import VolunteerCard from './VolunteerCard';

const VolunteerNeedsNow = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3000/')
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
    return <div className="flex justify-center items-center py-10">
  <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
</div>;
  }

  return (
    <section className="py-10 px-4 md:px-12">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
        Volunteer Needs Now
      </h2>

      {posts.length === 0 ? (
        <p className="text-center text-gray-600">No upcoming volunteer posts found.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <VolunteerCard key={post._id} post={post} />
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              to="/volunteer-posts"
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
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
