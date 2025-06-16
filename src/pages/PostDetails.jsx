import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext/AuthContext';
import Swal from 'sweetalert2';

const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      fetch(`http://localhost:3000/volunteer-posts/${id}`)
        .then(res => res.json())
        .then(data => setPost(data))
        .catch(err => console.error(err));
    }
  }, [id, user, navigate]);

  const handleVolunteer = () => {
    Swal.fire({
      icon: 'success',
      title: 'Thanks for Volunteering!',
      text: 'Your interest has been recorded.',
    });
  };

  if (!post) {
    return <div className="flex justify-center items-center py-10">
  <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
</div>;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <img src={post.thumbnail} alt={post.title} className="w-full h-64 object-cover rounded mb-6" />
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p><strong>Description:</strong> {post.description}</p>
      <p><strong>Category:</strong> {post.category}</p>
      <p><strong>Location:</strong> {post.location}</p>
      <p><strong>Deadline:</strong> {post.deadline}</p>
      <p><strong>Volunteers Needed:</strong> {post.volunteersNeeded}</p>
      <p><strong>Organizer:</strong> {post.organizerName} ({post.organizerEmail})</p>

      <button
        onClick={handleVolunteer}
        className="mt-6 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded"
      >
        Be a Volunteer
      </button>
    </div>
  );
};

export default PostDetails;
