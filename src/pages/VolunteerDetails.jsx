import React from 'react';

import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const VolunteerDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/volunteer-posts/${id}`)
      .then(res => res.json())
      .then(data => setPost(data));
  }, [id]);

  const handleVolunteer = () => {
    Swal.fire('Thank You!', 'You have requested to be a volunteer.', 'success');
  };

  if (!post) return <div className="flex justify-center items-center py-10">
  <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
</div>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <img src={post.thumbnail} alt={post.postTitle} className="w-full h-64 object-cover rounded mb-6" />
      <h2 className="text-3xl font-bold mb-2">{post.postTitle}</h2>
      <p><strong>Category:</strong> {post.category}</p>
      <p><strong>Deadline:</strong> {new Date(post.deadline).toLocaleDateString()}</p>
      <p><strong>Location:</strong> {post.location}</p>
      <p><strong>Volunteers Needed:</strong> {post.volunteersNeeded}</p>
      <p><strong>Organizer:</strong> {post.organizerName} ({post.organizerEmail})</p>
      <p className="mt-4 mb-6">{post.description}</p>
      <button onClick={handleVolunteer} className="btn bg-orange-500 text-white hover:bg-orange-600">
        Be a Volunteer
      </button>
    </div>
  );
};

export default VolunteerDetails;
