import { useState } from "react";
import blogService from "../services/blogs";

const Comment = ({ id, commentAdded }) => {
  const [comment, setComment] = useState("");

  const addComment = async (event) => {
    event.preventDefault();
    console.log("toimii");
    const returnedComment = await blogService.createComment(
      { content: comment },
      id,
    );
    commentAdded(returnedComment);
    setComment("");
  };

  return (
    <form onSubmit={addComment}>
      <div>
        <input
          value={comment}
          onChange={(event) => setComment(event.target.value)}
        />
        <button>add comment</button>
      </div>
    </form>
  );
};

export default Comment;
