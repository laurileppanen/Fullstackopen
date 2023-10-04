import Comment from "./Comment";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import blogService from "../services/blogs";

const Blogi = ({ blogs, toggleLikes }) => {
  const id = useParams().id;
  const blog = blogs.find((n) => n.id === id);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (blog) {
      blogService.getComments(blog.id).then((comments) => {
        setComments(comments);
      });
    }
  }, [blog]);

  const addCommentToState = (comment) => {
    setComments([...comments, comment]);
  };

  if (!blog) {
    return null;
  }
  return (
    <div>
      <h2>
        {blog.title} {blog.author}
      </h2>
      <Link>{blog.url}</Link>
      <br />
      {blog.likes} likes
      <button onClick={() => toggleLikes(blog.id)}>like</button>
      <br />
      added by {blog.user.name}
      <h4>comments</h4>
      <Comment id={id} commentAdded={addCommentToState} />
      <ul>
        {comments.map((comment) => (
          <li key={comment._id}>{comment.content}</li>
        ))}
      </ul>
    </div>
  );
};

export default Blogi;
