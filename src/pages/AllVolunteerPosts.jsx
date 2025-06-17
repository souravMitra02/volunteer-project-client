import React, { useState, useEffect } from "react";
import { Link } from "react-router";

const AllVolunteerPosts = () => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      const url = search
        ? `/volunteer-posts?search=${encodeURIComponent(search)}`
        : "/volunteer-now";
      const res = await fetch(url);
      const data = await res.json();
      setPosts(data);
    };

    // ডেবাউন্স করার জন্য ৫০০ মিলিসেকেন্ড দেরি
    const timeoutId = setTimeout(fetchPosts, 500);

    return () => clearTimeout(timeoutId);
  }, [search]);

  return (
    <div style={{ maxWidth: 900, margin: "auto", padding: 20 }}>
      <input
        type="search"
        placeholder="Search by Post Title"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ width: "100%", padding: 8, marginBottom: 20 }}
      />

      {posts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
          {posts.map((post) => (
            <div
              key={post._id}
              style={{
                border: "1px solid #ccc",
                borderRadius: 6,
                padding: 15,
                width: 280,
                boxShadow: "2px 2px 6px #eee",
              }}
            >
              <img
                src={post.thumbnail}
                alt={post.postTitle}
                style={{ width: "100%", height: 140, objectFit: "cover", borderRadius: 4 }}
              />
              <h3>{post.postTitle}</h3>
              <p>Category: {post.category}</p>
              <p>Location: {post.location}</p>
              <p>Volunteers Needed: {post.volunteersNeeded}</p>
              <Link to={`/post/${post._id}`} style={{ color: "blue" }}>
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllVolunteerPosts;