import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const EditPost = ({ posts, handleEdit, editBody, setEditBody, editTitle, setEditTitle }) => {
  const { id } = useParams();
  const post = posts.find(post => post?.id?.toString() === id); // Use find instead of filter

  useEffect(() => {
    if (post) {
      setEditTitle(post.title);
      setEditBody(post.body);
    }
  }, [post, setEditTitle, setEditBody]);

  useEffect(() => {
    console.log('Updated Title:', editTitle); // To see if editTitle is being set
  }, [editTitle]);

  return (
    <main className="NewPost">
      {editTitle ? (
        <>
          <h2>Edit Post</h2>
          <form className="newPostForm" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="postTitle">Title:</label>
            <input
              id="postTitle"
              type="text"
              required
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />

            <label htmlFor="postBody">Post:</label>
            <textarea
              id="postBody"
              required
              value={editBody}
              onChange={(e) => setEditBody(e.target.value)}
            />

            <button type="submit" onClick={() => handleEdit(post.id)}>
              Submit
            </button>
          </form>
        </>
      ) : (
        <>
          <h2>Post Not Found</h2>
          <p>Well, that's disappointing</p>
          <Link to="/">Visit Our Homepage</Link>
        </>
      )}
    </main>
  );
};

export default EditPost;
