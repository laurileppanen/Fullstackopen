import { useState } from "react";
import PropTypes from "prop-types";

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const [informationVisible, setInformationVisible] = useState(false);

  const hideWhenVisible = { display: informationVisible ? "none" : "" };
  const showWhenVisible = { display: informationVisible ? "" : "none" };

  const deleteButton = () => {
    if (blog.user.username === userLoggedIn) {
      return (
        <div>
          {" "}
          <button onClick={() => handleDelete(blog)}>remove</button>{" "}
        </div>
      );
    }
  };

  return (
    <div className="blog" style={blogStyle}>
      <div className="titleandauthor">
        {blog.title} {blog.author}
      </div>
    </div>
  );
};

export default Blog;
